import React from 'react';

import { PiletApi } from 'sample-piral';
import { Menu } from './menu';

import { MachinesPage } from './pages/machines';

import { dataConnector } from './api';
import { lastEvents } from './tiles/lastEvents';

export function setup(app: PiletApi) {
  const connect = app.createConnector(dataConnector);

  app.registerMenu(Menu);
  app.registerPage('/machines', connect(MachinesPage));

  app.registerTile(connect(lastEvents), {
    initialColumns: 4,
    initialRows: 1,
  });
}
