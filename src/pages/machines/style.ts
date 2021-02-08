import { style } from 'themed-jss';

export const DetailStyle = style(() => ({
  padding: '2em',
}));

export const MachineStatus = style(theme => ({
  textTransform: 'capitalize',
  '&.running': {
    color: theme.colors.green,
  },
  '&.errored': {
    color: theme.colors.red,
  },
  '&.finished': {
    color: theme.colors.blue,
  },
  '&.repaired': {
    color: theme.colors.lightGreen,
  }
}));

export const BtnStyle = style(theme => ({
  background: theme.primaryColor,
  color: theme.backgroundColor,
  border: '1px solid #ddd'
}));
