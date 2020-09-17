import { createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";

 

export const appMaterial = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: green[500],
    },
    secondary: {
      main: '#f44336',
    },
  },
});