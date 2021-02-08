import * as React from 'react';
import { MapListView, List, Item } from '../components/MapListView';
import { Machine } from '../models';

import { Themed } from 'themed-jss/react';
import { main } from '../themes/main';

import { useThemedStyle } from 'themed-jss/react';
import { MachineStatus } from './machines/style';

export interface MachinePageProps {
  data: Machine[];
}

const MachineComponent = ({ machine }: { machine: Machine }) => (
  <Item>
    <h4>{machine.id}</h4>
    <span
      className={`${useThemedStyle(MachineStatus)} ${machine.status}`}
    >{machine.status}</span>
  </Item>
);

export const MachinesPage = ({ data }: MachinePageProps) => (
  <Themed theme={main}>
    <MapListView>
      <List>
        { data.map(machine => <MachineComponent machine={machine} />) }
      </List>
    </MapListView>
  </Themed>
);
