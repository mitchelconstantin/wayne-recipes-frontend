import React, { useContext } from "react";
import {
  makeStyles,
  AppBar,
  CssBaseline,
  Slide,
  Toolbar,
  useScrollTrigger,
  Typography,
  IconButton,
} from "@material-ui/core/";
import { DarkThemeContext } from "../App";
import { HeaderButtons } from "./HeaderButtons";
import logo from "../Shared/Images/logo.svg";
import darkLogo from "../Shared/Images/darkLogo.svg";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    margin: "auto",
    width: "100vw",
    background: "linear-gradient(90deg, #f44723, #f56730, #f44723)",
    boxShadow: "none",
  },
  image: {
    height: "40px",
    width: "40px",
  },
  title: {
    paddingLeft: theme.spacing(4),
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
            <IconButton
              edge="start"
              color="inherit"
              component={Link}
              to={"/all"}
            >
              <img
                src={darkThemeEnabled ? darkLogo : logo}
                className={classes.image}
                alt={"Logo"}
              />
            </IconButton>
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
