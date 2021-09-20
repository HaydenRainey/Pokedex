import { createTheme, colors } from '@material-ui/core';
import shadows from './shadows';
import {EvergyColors} from '../colors/EvergyColors';
import typography from './typography';

const theme = createTheme({
  palette: {
    background: {
      dark: EvergyColors.WebGreyBackground,
      default: colors.common.white,
      paper: colors.common.white
    },
    primary: {
      main: '#CC0000'
    },
    secondary: {
      main: '#FF0000'
    },
    border: {
      main: 'black'
    },
    breakpoints: {
      values: {
        tablet: 640,
        laptop: 1024,
        desktop: 1280,
      },
    },
    text: {
      primary: EvergyColors.DarkTextGrey,
      secondary: EvergyColors.TextGrey,
      white: '#fff'
    }
  },
  spacing: [0,4,6,7,8,9,10,11,16,32,64],
  shadows,
  typography
});

export default theme;
