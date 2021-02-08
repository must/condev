import * as React from 'react';

import { ListView, List, Item, Detail } from '../components/ListView';
import { Map, Pin } from '../components/Map';
import { Machine } from '../models';

import { Themed } from 'themed-jss/react';
import { main } from '../themes/main';

import { useThemedStyle } from 'themed-jss/react';
import { MachineStatus } from './machines/style';
import { centroid } from '../util/geo';

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

export const MachinesPage = ({ data }: MachinePageProps) => {
  const center = centroid(data);

  return (
    <Themed theme={main}>
      <ListView>
        <List>
          { data.map(machine => <MachineComponent key={machine.id} machine={machine} />) }
        </List>
        <Detail>
          <Map
            apiKey={process.env.GOOGLE_API_KEY}
            center={{
              lat: center.latitude,
              lng: center.longitude
            }}
            zoom={18}
          >
            { data.map(machine =>
              <Pin
                lat={machine.latitude}
                lng={machine.longitude}
                text={machine.id}
              />
            )}
          </Map>
        </Detail>
      </ListView>
    </Themed>
  );
};
