import { style } from 'themed-jss';

export const MachineStatus = style(theme => ({
  '&.running': {
    color: theme.colors.green,
  },
  '&.errored': {
    color: theme.colors.red,
  },
  '&.finished': {
    color: theme.colors.blue,
  }
}));
