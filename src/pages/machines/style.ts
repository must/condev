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
