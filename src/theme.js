import {experimental_extendTheme as extendTheme} from "@mui/material/styles";

// Create a theme instance.
const theme = extendTheme({
  trello: {
    appBarHeight: "58px",
    boarBatHeight: "60px",
  },

  //custom mode
  // colorSchemes: {
  //   light: {
  //     palette: {
  //       primary: teal,
  //       secondary: deepOrange,
  //     },
  //   },
  //   dark: {
  //     palette: {
  //       primary: cyan,
  //       secondary: blueGrey,
  //     },
  //   },
  // },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
          textTransform: "none",
          borderWidth: "0.5px",
          "&:hover": {borderWidth: "0.5px"},
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {fontSize: "0.875rem"},
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          // color: theme.palette.primary.main,
          fontSize: "0.875rem",
          // ".MuiOutlinedInput-notchedOutline": {
          //   borderColor: theme.palette.primary.light,
          // },
          // "&:hover": {
          //   ".MuiOutlinedInput-notchedOutline": {
          //     borderColor: theme.palette.primary.main,
          //   },
          // },
          "& fieldset": {
            borderWidth: "1px !important",
          },
          "&:hover fieldset": {
            borderWidth: "2px !important",
          },
          "&.Mui-focused fieldset": {
            borderWidth: "2px !important",
          },
        },
      },
    },
  },
});

export default theme;
