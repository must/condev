import { style, when } from 'themed-jss';

export const ListViewStyle = style(theme => ({
  background: theme.backgroundColor,
  color: theme.textColor,
  fontFamily: theme.fontFamily,
  fontSize: theme.text.size.normal,
  display: 'flex',
  boxSizing: 'border-box',
  margin: '0 0 1em 0',
}));

export const ListStyle = style(theme => ({
  background: theme.backgroundColor,
  color: theme.textColor,
  listStyle: 'none',
  padding: '1em',
  width: '20%',
  height: '80vh',
  margin: 0,
  overflow: 'scroll',
}));

export const ListItemStyle = style(theme => ({
  padding: '1em 0.5em',
  border: '1px solid #eee',
  borderColor: theme.textColor,
  borderStyle: 'none none solid none',
  cursor: 'pointer',

  [when(':hover')]: {
    background: theme.highlightTextColor,
    color: theme.highlightBackground
  }
}));

export const DetailStyle = style((theme) => ({
  background: theme.secondaryBackgroundColor,
  color: theme.secondaryTextColor,
  width: '80%',
  height: '80vh',
  overflow: 'scroll',
}));
