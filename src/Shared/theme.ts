import { createTheme, adaptV4Theme } from "@mui/material/styles";

export const getTheme = (dark: boolean) => {
  return createTheme(
    adaptV4Theme({
      palette: {
        mode: dark ? "dark" : "light",
        primary: {
          main: "#e4673d",
        },
      },
    })
  );
};
