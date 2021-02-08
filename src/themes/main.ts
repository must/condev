import { theme } from 'themed-jss';

export const main = theme(
  // light mode properties:
  {
    primaryColor: '#00917c',
    backgroundColor: '#f7f7f7',
    textColor: '#424242',
    fontFamily: "Calibri, 'Trebuchet MS', sans-serif",

    text: {
      size: {
        normal: '1.1em'
      }
    },

    colors: {
      green: 'green',
      blue: 'blue',
      red: 'red',
    }
  },
  // dark mode overrides:
  {
    backgroundColor: '#0f3057',
    textColor: 'white',
  }
);
