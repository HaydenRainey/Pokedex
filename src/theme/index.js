import { createMuiTheme, colors } from '@material-ui/core';
import shadows from './shadows';
import {evergyColors} from '../colors/colors';
import typography from './typography';

const theme = createMuiTheme({
  palette: {
    background: {
      dark: evergyColors.WebGreyBackground,
      default: colors.common.white,
      paper: colors.common.white
    },
    primary: {
      main: evergyColors.Indigo,
    },
    secondary: {
      main: evergyColors.WebBlue
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
      primary: evergyColors.DarkTextGrey,
      secondary: evergyColors.TextGrey
    }
  },
  spacing: [0,4,8,16,32,64],
  shadows,
  typography
});

export default theme;
