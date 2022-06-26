import { createGlobalStyle } from 'styled-components';

const greyLight = '#f4f4f4';

export const lightTheme = {
  body: '#FFF',
  text: 'black',
  textLight: 'grey',
  headerBackground: '#fff',
  borderColor: '#e9e7e7',
  background: '#fff',
  like: '#5789cd',
  dislike: 'red',
  confirm: 'green',

  white: '#fff',
  greyLight,
  hover: greyLight,
};

export const darkTheme = {
  body: '#2a2929',
  text: '#FFF',
  textLight: '#fff',
  headerBackground: '#2a2929',
  borderColor: '#555555',
  background: '#2a2929',
  like: '#5789cd',
  dislike: 'red',
  confirm: 'green',
  greyLight,

  white: '#fff',
  hover: 'grey',
};

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme, ...props }) => {
      return theme?.body;
    }};
    color: ${({ theme }) => theme?.text};
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.50s linear;
  }`;

export const useTheme = (theme) => (theme === 'light' ? lightTheme : darkTheme);
