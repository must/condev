import { PiletApi } from 'sample-piral';
import { Menu } from './menu';

import { MachinesPage } from './pages/machines';

import { dataConnector } from './api';

export function setup(app: PiletApi) {
  const connect = app.createConnector(dataConnector);

  app.registerMenu(Menu);
  app.registerPage('/machines', connect(MachinesPage));
}
