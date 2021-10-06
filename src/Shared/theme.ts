import { createTheme } from "@mui/material/styles";

export const getTheme = (dark: boolean) =>
  createTheme({
    palette: {
      mode: dark ? "dark" : "light",
      primary: {
        main: "#e4673d",
      },
    },
  });
