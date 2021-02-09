import { Machine, MachineType, MachineStatus, MachineEvent } from '../models';

export interface APIMachineResponseType {
  id: string;
  floor: number;
  install_date: string;
  last_maintenance: string;
  latitude: number;
  longitude: number;
  machine_type: MachineType;
  status: MachineStatus;
}

export interface APIMachineUpdateType {
  id: string;
  machine_id: string;
  timestamp: string;
  status: MachineStatus;
}

export type MachinesAPIResponseType = {
  data: APIMachineResponseType[]
};

const fromUTC = (timestamp: string) => {
  const date = new Date(timestamp);

  return new Date(date.getTime());
};

const normalizeMachine = (m: APIMachineResponseType): Machine => {
  return {
    ...m,
    install_date: new Date(m.install_date),
    last_maintenance: new Date(m.last_maintenance),
    createdAt: new Date(),
    updatedAt: new Date(),
    pings: 0,
    errors: m.status === 'errored' ? 1 : 0,
    last_online: m.status === 'errored' ? new Date() : null,
    events: []
  };
};

const normalizeUpdateEvent = (update: APIMachineUpdateType): MachineEvent => {
  return {
    ...update,
    timestamp: fromUTC(update.timestamp)
  };
};

const apiUrl = 'https://machinestream.herokuapp.com/api/v1/machines';
const wsUrl = 'ws://machinestream.herokuapp.com/api/v1/events/websocket?vsn=2.0.0';

export const getMachines = () => fetch(apiUrl)
  .then(
    res => (res.json() as Promise<MachinesAPIResponseType>)
  ).then(response => response.data.map(machine => normalizeMachine(machine)));

export const dataConnector = {
  initialize() {
    return getMachines();
  },
  connect(cb: (item: Machine) => void) {
    const ws = new WebSocket(wsUrl);
    ws.onmessage = ({ data }) => {
      const parsedData = JSON.parse(data);
      if(parsedData[3] === 'new') {
        cb(parsedData[4]);
      }
    };

    ws.onopen = () => ws.send('["1", "1", "events", "phx_join", {}]');

    const heartBeat = setInterval(() => {
      ws.send('[null, "2", "phoenix", "heartbeat", {}]');
    }, 30000);

    return () => {
      clearInterval(heartBeat);
      ws.close();
    };
  },
  update(data: Machine[], update: APIMachineUpdateType) {
    const machineIndex = data.findIndex(m => m.id === update.machine_id);

    return data.map((machine, index) => {
      if (
        index !== machineIndex ||
        machine.events.findIndex(e => e.id === update.id) !== -1
      ) {
        return machine;
      }

      return {
        ...machine,
        status: update.status,
        updatedAt: fromUTC(update.timestamp),
        errors: update.status === 'errored' ? machine.errors + 1 : machine.errors,
        pings: machine.pings + 1,
        last_online: update.status === 'errored' ? fromUTC(update.timestamp) : null,
        events: [...machine.events, normalizeUpdateEvent(update)]
      } as Machine;
    });
  },
};
