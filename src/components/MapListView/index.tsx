import * as React from 'react';

import { useThemedStyle } from 'themed-jss/react';
import { ListStyle, MapListViewStyle } from './style';

export const Item: React.FC = ({ children }) => (<li>{children}</li>);


export type MapListItemType = {
  Item: typeof Item;
};

export const List: React.FC & MapListItemType = ({ children }) => (
  <ul className={useThemedStyle(ListStyle)}>{children}</ul>
);

List.Item = Item;


export type MapListType = {
  List: typeof List;
};

export const MapListView: React.FC & MapListType= ({ children }) => (
  <div className={useThemedStyle(MapListViewStyle)}>{children}</div>
);

MapListView.List = List;
