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

export const TextareaStyle = style(() => ({
  display: 'block',
  marginBottom: '1em'
}));

export const CommentsStyle = style(() => ({
  listStyle: 'none',
  margin: 0,
  padding: '1em',
  width: '30%'
}));

export const CommentStyle = style(() => ({
  margin: '1em 0',
  borderBottom: '1px dashed #eee',
  padding: '0 0 1em 0',
}));
