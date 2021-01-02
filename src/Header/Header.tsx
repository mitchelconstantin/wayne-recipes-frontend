import React, { useContext } from "react";
import {
  makeStyles,
  AppBar,
  CssBaseline,
  Slide,
  Toolbar,
  useScrollTrigger,
} from "@material-ui/core/";
import { DarkThemeContext } from "../App";
import { Logo } from "../Shared/Components/Logo";
import { HeaderButtons } from "./HeaderButtons";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    background: "linear-gradient(90deg, #f44723, #f56730, #f44723)",
    boxShadow: "none",
  },
  image: {
    height: "40px",
    width: "40px",
    cursor: "pointer",
  },
}));

export const Header = () => {
  const classes = useStyles();
  const { darkThemeEnabled } = useContext(DarkThemeContext);
  const trigger = useScrollTrigger();

  return (
    <>
      <CssBaseline />
      <Slide appear={false} direction="down" in={!trigger}>
        <AppBar className={classes.toolbar}>
          <Toolbar>
            <Logo className={classes.image} dark={darkThemeEnabled} />
            <HeaderButtons />
          </Toolbar>
        </AppBar>
      </Slide>
      <Toolbar />
    </>
  );
};
