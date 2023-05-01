import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

export const theme = extendTheme({
  cssVarPrefix: '',
  typography: {
    fontFamily: 'Roboto',
    h1: {
      fontSize: '3.5em'
    },
    h2: {
      fontSize: '3em'
    },
  },
  spacing: (factor: number) => `${0.25 * factor}rem`, // (Bootstrap strategy),
  colorSchemes: {
        light: {
          palette: {
            primary: {
              main: '#ff5252',
            },
          },
        },
        dark: {
          palette: {
            primary: {
              main: '#000',
            },
          },
        },
      },

});
