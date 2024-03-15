import {experimental_extendTheme as extendTheme} from "@mui/material/styles";
import {cyan, deepOrange, teal, orange} from "@mui/material/colors";

// Create a theme instance.
const theme = extendTheme({
  trello: {
    appBarHeight: "68px",
    boarBatHeight: "58px",
  },

  colorSchemes: {
    light: {
      palette: {
        primary: teal,
        secondary: deepOrange,
      },
    },
    dark: {
      palette: {
        primary: cyan,
        secondary: orange,
      },
    },
  },
});

export default theme;
