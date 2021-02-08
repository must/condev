import { style } from 'themed-jss';

export const MapListViewStyle = style(theme => ({
  background: theme.backgroundColor,
  color: theme.textColor,
  fontFamily: theme.fontFamily,
  fontSize: theme.text.size.normal
}));

export const ListStyle = style(theme => ({
  background: theme.backgroundColor,
  color: theme.textColor,
  listStyle: 'none',
  padding: '2em'
}));
