import { createGlobalStyle } from 'styled-components';

const greyLight = '#f4f4f4';

export const lightTheme = {
  name: 'light',
  body: '#fbfbfc',
  text: 'black',
  textLight: '#B4B4B4',
  headerBackground: '#fbfbfc',
  borderColor: '#e9e7e7',
  background: '#fff',
  like: '#5789cd',
  dislike: 'red',
  confirm: 'green',
  quizzHover: '#e9e7e7',

  error: 'red',
  success: 'green',

  white: '#fff',
  greyLight,
  hover: greyLight,
};

export const darkTheme = {
  name: 'dark',
  body: '#2a2929',
  text: '#FFF',
  textLight: '#fff',
  headerBackground: '#1f1e1e',
  borderColor: '#555555',
  background: '#2a2929',
  like: '#5789cd',
  dislike: 'red',
  confirm: 'green',
  greyLight,
  quizzHover: '#555555',

  error: 'red',
  success: 'green',

  white: '#fff',
  hover: 'grey',
};

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme, ...props }) => {
      return theme?.body;
    }};
    color: ${({ theme }) => theme?.text};
    transition: all 0.50s linear;
  }`;

export const useTheme = (theme) => (theme === 'light' ? lightTheme : darkTheme);
