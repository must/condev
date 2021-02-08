export type MachineStatus = 'running' | 'errored' | 'finished';
export type MachineType = 'measurement' | 'microscope';

export interface Machine {
  id: string;
  floor: number;
  install_date: string;
  last_maintenance: string;
  latitude: number;
  longitude: number;
  machine_type: MachineType;
  status: MachineStatus;
}
