import { createMuiTheme } from "@material-ui/core";

export const getTheme = (dark: boolean) => {
  return createMuiTheme({
    palette: {
      type: dark ? "dark" : "light",
      primary: {
        main: "#e4673d",
      },
    },
  });
};
