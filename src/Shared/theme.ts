import { createTheme } from "@mui/material/styles";

export const getTheme = (dark: boolean) =>
  createTheme({
    palette: {
      mode: dark ? "dark" : "light",
      primary: {
        main: "#e4673d",
      },
    },
    typography: {
      fontFamily: '"Roboto", sans-serif',
      h3: {
        fontFamily: '"DM Serif Display", serif',
      },
      h5: {
        fontFamily: '"DM Serif Display", serif',
      },
    },
  });
