import * as React from 'react';

import { ListView, List, Item, Detail } from '../components/ListView';
import { Map } from '../components/Map';
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
    Status:
    <span
      className={`${useThemedStyle(MachineStatus)} ${machine.status}`}
    > {machine.status}</span>
  </Item>
);

export const MachinesPage = ({ data }: MachinePageProps) => (
  <Themed theme={main}>
    <ListView>
      <List>
        { data.map(machine => <MachineComponent key={machine.id} machine={machine} />) }
      </List>
      <Detail>
        <Map
          apiKey={process.env.GOOGLE_API_KEY}
          center={{
            lat: 59.95,
            lng: 30.33
          }}
          zoom={11}
        />
      </Detail>
    </ListView>
  </Themed>
);
