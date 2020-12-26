import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Snackbar, ThemeProvider, SnackbarOrigin } from "@material-ui/core";
import { Alert, Color } from "@material-ui/lab";
import { getTheme } from "./theme";
import { useMobileQuery } from "./Hooks/isMobile";
import { useDarkThemeEnabled } from "./Hooks/darkTheme";

const uniqueSnackbarID = "SnackbarContainer-12345";

interface Props {
  message: string;
  severity: Color;
}

export const CustomSnackbar = ({ message, severity }: Props) => {
  const [open, setOpen] = useState(true);
  const { darkThemeEnabled } = useDarkThemeEnabled();
  const theme = getTheme(darkThemeEnabled);
  const isMobile = useMobileQuery();

  const handleClose = (_event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  const anchorOrigin: SnackbarOrigin = isMobile
    ? { vertical: "bottom", horizontal: "center" }
    : { vertical: "bottom", horizontal: "right" };

  return (
    <ThemeProvider theme={theme}>
      <Snackbar
        anchorOrigin={anchorOrigin}
        open={open}
        autoHideDuration={4500}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export const SnackbarContainer = () => <div id={uniqueSnackbarID} />;

export class SnackbarService {
  static success(message: string) {
    this.showSnackbar(message, "success");
  }

  static warning(message: string) {
    this.showSnackbar(message, "warning");
  }

  static error(message: string) {
    this.showSnackbar(message, "error");
  }

  static info(message: string) {
    this.showSnackbar(message, "info");
  }

  private static showSnackbar(message: string, severity: Color) {
    const container = document.getElementById(uniqueSnackbarID);
    const Snackbar = () => (
      <CustomSnackbar message={message} severity={severity} />
    );

    ReactDOM.render(<Snackbar />, container);
  }
}
