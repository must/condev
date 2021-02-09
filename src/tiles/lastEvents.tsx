import React, { useEffect, useState } from 'react';
import { Machine, MachineEvent } from '../models';
import { timeSince } from '../util/date';

export interface LastEventsTileProps {
  data: Machine[];
}

export const lastEvents = ({ data }: LastEventsTileProps) => {
  const events = data
    .reduce((acc: MachineEvent[], machine) => [...acc, ...machine.events], [])
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .slice(0, 4);

  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <ul>{events.map(event => <li key={event.id}>{event.machine_id} {event.status} {timeSince(event.timestamp, time)}</li>)}</ul>;
};
