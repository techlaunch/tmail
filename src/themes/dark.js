import { createMuiTheme } from '@material-ui/core/styles';

export const dark = createMuiTheme({ 
  "typography": {
    "useNextVariants": true,
  },
  "palette": {
    "common": {
      "black": "#000",
      "white": "#fff"
    },
    "background": {
      "paper": "#fff",
      "default": "#fafafa"
    },
    "primary": {
      "light": "rgba(0, 188, 212, 1)",
      "main": "rgba(53, 146, 218, 1)",
      "dark": "rgba(33, 150, 243, 1)",
      "contrastText": "#fff"
    },
    "secondary": {
      "light": "#ff4081",
      "main": "#f50057",
      "dark": "#c51162",
      "contrastText": "#fff"
    },
    "error": {
      "light": "#e57373",
      "main": "#f44336",
      "dark": "#d32f2f",
      "contrastText": "#fff"
    },
    "text": {
      "primary": "rgba(0, 0, 0, 0.87)",
      "secondary": "rgba(0, 0, 0, 0.54)",
      "disabled": "rgba(0, 0, 0, 0.38)",
      "hint": "rgba(0, 0, 0, 0.38)"
    }
  } 
});