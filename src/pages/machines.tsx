import React, { useEffect, useState } from 'react';

import { ListView, List, Item, Detail } from '../components/ListView';
import { Map, Pin } from '../components/Map';
import { Machine } from '../models';

import { Themed } from 'themed-jss/react';
import { main } from '../themes/main';

import { useThemedStyle } from 'themed-jss/react';
import {
  MachineStatus, DetailStyle, BtnStyle,
  TextareaStyle, CommentsStyle, CommentStyle
} from './machines/style';
import { centroid } from '../util/geo';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { timeSince } from '../util/date';

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

const PingsComponent: React.FC<{ machine: Machine }> = ({ machine }) => {
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <>{
    machine.pings ?
      Math.round(machine.pings / ((
        time -
        machine.updatedAt.getTime()
      ) / 1000 / 60 / 60)) : 0
  }</>;
};

const MachineDetailComponent: React.FC<{ machine: Machine }> = ({ machine }) => {
  const [comments, setComments] = useLocalStorage(`machine#${machine.id}`, []);
  const [value, setValue] = useState('');

  const commentStyle = useThemedStyle(CommentStyle);

  return <Detail id={machine.id}>
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
          <li>Number of pings per hours: <PingsComponent machine={machine}/></li>
          <li>Number of errors: {
            machine.errors
          }</li>
        </ul>
        <input
          className={useThemedStyle(TextareaStyle)}
          value={value}
          onChange={(v) => setValue(v.target.value)}
          type='text'
        />
        <button
          className={useThemedStyle(BtnStyle)}
          onClick={() => {
            setComments([{ text: value, createdAt: new Date() }, ...comments]);
            setValue('');
          }}
        >Add note</button>
        <ul
          className={useThemedStyle(CommentsStyle)}
        >
          {comments.map(comment =>
            <li
              className={commentStyle}
              key={comment.createdAt}
            >
              <div>{comment.text}</div>
              <div>{timeSince(new Date(comment.createdAt))}</div>
            </li>)}
        </ul>
      </div>
    </div>
  </Detail>;
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
