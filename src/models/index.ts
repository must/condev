export type MachineStatus = 'running' | 'errored' | 'finished';
export type MachineType = 'measurement' | 'microscope';

export interface MachineEvent {
  id: string;
  machine_id: string;
  status: MachineStatus;
  timestamp: Date;
}
export interface Machine {
  id: string;
  floor: number;
  install_date: Date;
  last_maintenance: Date;
  latitude: number;
  longitude: number;
  machine_type: MachineType;
  status: MachineStatus;
  createdAt: Date;
  updatedAt: Date;
  pings: number;
  errors: number;
  last_online: Date;

  events: MachineEvent[];
}
