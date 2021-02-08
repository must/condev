import * as React from 'react';

import { useThemedStyle } from 'themed-jss/react';
import { ListStyle, ListViewStyle, ListItemStyle, DetailStyle } from './style';

export const Item: React.FC = ({ children }) => (<li className={useThemedStyle(ListItemStyle)}>{children}</li>);


export type ListItemType = {
  Item: typeof Item;
};

export const List: React.FC & ListItemType = ({ children }) => (
  <ul className={useThemedStyle(ListStyle)}>{children}</ul>
);

List.Item = Item;

export const Detail: React.FC = ({ children }) => (
  <div className={useThemedStyle(DetailStyle)}>{children}</div>
);


export type ListType = {
  List: typeof List;
  Detail: typeof Detail;
};

export const ListView: React.FC & ListType= ({ children }) => (
  <div className={useThemedStyle(ListViewStyle)}>{children}</div>
);

ListView.List = List;
ListView.Detail = Detail;
