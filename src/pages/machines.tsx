import * as React from 'react';
import { Machine } from '../models';

export interface MachinePageProps {
  data: Machine[];
}

export const MachinesPage = ({ data }: MachinePageProps) => {
  return (
    <div>
      <h1>Machines</h1>
      <ul>
        {data.map(machine => <li>{machine.id}</li>)}
      </ul>
    </div>
  );
};
