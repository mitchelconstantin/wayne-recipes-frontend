import React, { useContext } from "react";
import {
  makeStyles,
  AppBar,
  CssBaseline,
  Slide,
  Toolbar,
  useScrollTrigger,
  Typography,
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
    marginRight: theme.spacing(4),
  },
  title: {
    flexGrow: 1,
    color: theme.palette.type === "dark" ? "silver" : "white",
  },
}));

export const Header = () => {
  const classes = useStyles();
  const { darkThemeEnabled } = useContext(DarkThemeContext);
  const trigger = useScrollTrigger();

  const title = `WAYNE'S FAMILY RECIPES`;

  return (
    <>
      <CssBaseline />
      <Slide appear={false} direction="down" in={!trigger}>
        <AppBar className={classes.toolbar}>
          <Toolbar>
            <Logo className={classes.image} dark={darkThemeEnabled} />
            <Typography variant="h6" className={classes.title}>
              {title}
            </Typography>
            <HeaderButtons />
          </Toolbar>
        </AppBar>
      </Slide>
      <Toolbar />
    </>
  );
};
