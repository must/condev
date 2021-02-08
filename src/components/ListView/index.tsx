import React, { useState } from 'react';

import { useThemedStyle } from 'themed-jss/react';
import { ListStyle, ListViewStyle, ListItemStyle, DetailStyle } from './style';
import { MasterContext, useMasterContext } from './MasterContext';

export type ItemType = {
  id: string;
};

export const Item: React.FC<ItemType> = ({ children, id }) => {
  const { setCurrent } = useMasterContext();

  return <li
    className={useThemedStyle(ListItemStyle)}
    onClick={() => setCurrent(id)}
  >
    {children}
  </li>;
};


export type ListItemType = {
  Item: typeof Item;
};

export const List: React.FC & ListItemType = ({ children }) => (
  <ul className={useThemedStyle(ListStyle)}>{children}</ul>
);

List.Item = Item;

export type ListDetailType = {
  isDefault?: boolean;
  id?: string;
};

export const Detail: React.FC<ListDetailType> = ({
  children, id,
  isDefault = false
}) => {
  const { current } = useMasterContext();
  const detailStyle = useThemedStyle(DetailStyle);

  const display = (
    isDefault &&
    current === 'default'
  ) || (
    id &&
    current === id
  );

  return display ?
    <div className={detailStyle}>
      {children}
    </div> : <></>;
};


export type ListType = {
  List: typeof List;
  Detail: typeof Detail;
};

export const ListView: React.FC & ListType= ({ children }) => {
  const [current, setCurrent] = useState<string>('default');

  return <MasterContext.Provider
    value={{ current, setCurrent }}>
    <div className={useThemedStyle(ListViewStyle)}>{children}</div>
  </MasterContext.Provider>;
};

ListView.List = List;
ListView.Detail = Detail;
