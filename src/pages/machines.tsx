import React from 'react';

import { ListView, List, Item, Detail } from '../components/ListView';
import { Map, Pin } from '../components/Map';
import { Machine } from '../models';

import { Themed } from 'themed-jss/react';
import { main } from '../themes/main';

import { useThemedStyle } from 'themed-jss/react';
import { MachineStatus, DetailStyle } from './machines/style';
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

const MachineDetailComponent: React.FC<{ machine: Machine }> = ({ machine }) => (
  <Detail id={machine.id}>
    <div className={useThemedStyle(DetailStyle)}>
      <h1>{machine.id}</h1>
      <h5>
        <span className={`${useThemedStyle(MachineStatus)} ${machine.status}`}>
          {machine.status}
        </span>
      </h5>
      <div>
        <h4>Details</h4>
        <ul>
          <li>Number of pings: {machine.pings}</li>
          <li>Number of pings per hours: {
            Math.round(machine.pings / ((
              machine.updatedAt.getMilliseconds() ?? Date.now() -
              machine.createdAt.getMilliseconds()
            ) / 1000 / 60 / 60))
          }</li>
          <li>Number of errors: {
            machine.errors
          }</li>
        </ul>
      </div>
    </div>
  </Detail>
);

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
        { data.map(machine =>
          <MachineDetailComponent
            key={machine.id}
            machine={machine}
          />
        ) }
      </ListView>
    </Themed>
  );
};
