import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#eb82a7",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#f6c5da",
    },
    background: {
      // paper: "#f7e9e9",
    },
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
    button: {
      textTransform: "none",
    },
  },
  breakpoints: {
    // bootstrap breakpoints
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  },
});
