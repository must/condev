import { theme } from 'themed-jss';

export const main = theme(
  // light mode properties:
  {
    primaryColor: '#00917c',
    backgroundColor: '#f7f7f7',
    textColor: '#424242',
    fontFamily: "Calibri, 'Trebuchet MS', sans-serif",

    highlightBackground: '#f7f7f7',
    highlightTextColor: '#424242',

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
    backgroundColor: '#152f4e',
    textColor: '#dcdcdc',

    highlightBackground: '#f7f7f7',
    highlightTextColor: '#424242',

    colors: {
      green: '#8bff8b',
      blue: '#8fa6ff',
      red: '#ff5353',
    }
  }
);
