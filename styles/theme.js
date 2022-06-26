import { createGlobalStyle } from 'styled-components';

export const lightTheme = {
  body: '#FFF',
  text: 'black',
  textLight: 'grey',
  headerBackground: '#fff',
  borderColor: '#d8d7d7',
  background: '#fff',
  like: '#5789cd',
  dislike: 'red',
  confirm: 'green',

  white: '#fff',
};

export const darkTheme = {
  body: '#2a2929',
  text: '#FFF',
  textLight: '#fff',
  headerBackground: '#2a2929',
  borderColor: 'grey',
  background: '#2a2929',
  like: '#5789cd',
  dislike: 'red',
  confirm: 'green',

  white: '#fff',
};

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme, ...props }) => {
      console.log('test', props);
      return theme?.body;
    }};
    color: ${({ theme }) => theme?.text};
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.50s linear;
  }`;

export const useTheme = (theme) => (theme === 'light' ? lightTheme : darkTheme);
