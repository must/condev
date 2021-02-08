import { Machine } from '../models';

export type MachinesAPIResponseType = {
  data: Machine[]
};

const apiUrl = 'https://machinestream.herokuapp.com/api/v1/machines';
const wsUrl = 'ws://machinestream.herokuapp.com/api/v1/events/websocket?vsn=2.0.0';

export const getMachines = () => fetch(apiUrl)
  .then(
    res => (res.json() as Promise<MachinesAPIResponseType>)
  ).then(response => response.data);

export const dataConnector = {
  initialize() {
    return getMachines();
  },
  connect(cb: (item: Machine) => void) {
    const ws = new WebSocket(wsUrl);
    ws.onmessage = ({ data }) => {
      cb(JSON.parse(data));
    };

    return () => ws.close();
  },
  update(data: Machine[], item: Machine) {
    // for simplicity only consider "add" here
    return [...data, item];
  },
};
