export type MachineStatus = 'running' | 'errored' | 'finished';
export type MachineType = 'measurement' | 'microscope';

export interface Machine {
  id: string;
  floor: number;
  install_date: Date;
  last_maintenance: Date;
  latitude: number;
  longitude: number;
  machine_type: MachineType;
  status: MachineStatus;
  timestamp: Date;
}
