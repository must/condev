import React from 'react';

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

const MachineItemComponent = ({ machine }: { machine: Machine }) => (
  <Item id={machine.id}>
    <h4>{machine.id}</h4>
    Status:
    <span
      className={`${useThemedStyle(MachineStatus)} ${machine.status}`}
    > {machine.status}</span>
  </Item>
);

const MapComponent = ({ data }: MachinePageProps) => {
  const center = centroid(data);

  return (<Detail isDefault>
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
          key={machine.id}
          lat={machine.latitude}
          lng={machine.longitude}
          text={machine.id}
        />
      )}
    </Map>
  </Detail>);
};

export const MachinesPage = ({ data }: MachinePageProps) => {

  return (
    <Themed theme={main}>
      <ListView>
        <List>
          { data.map(machine =>
            <MachineItemComponent key={machine.id} machine={machine} />
          )}
        </List>
        <MapComponent data={data}/>
        { data.map(machine => <Detail id={machine.id}>
          {machine.id}
        </Detail>) }
      </ListView>
    </Themed>
  );
};
