import React, { useContext } from "react";
import {
  Box,
  AppBar,
  Typography,
  Hidden,
  makeStyles,
} from "@material-ui/core/";
import { HeaderButtons } from "./HeaderButtons";
import { Logo } from "../Shared/Components/Logo";
import { DarkThemeContext } from "../App";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    background: "linear-gradient(0.25turn, #f44723, #f56730, #f44723)",
    paddingLeft: "20px",
    paddingRight: "20px",
  },
  topRow: {
    display: "flex",
    justifyContent: "top",
    marginButton: "30px",
    marginTop: "20px",
    width: "100%",
  },
  image: {
    height: "80px",
    width: "80px",
    cursor: "pointer",
  },
  title: {
    marginTop: "10px",
    marginRight: "auto",
    fontWeight: 700,
    color: theme.palette.type === "dark" ? "silver" : "",
  },
  subTitle: {
    marginBottom: "10px",
    marginRight: "auto",
    fontWeight: 400,
    color: theme.palette.type === "dark" ? "silver" : "",
  },
}));

export const LargeAppBar = () => {
  const classes = useStyles();
  const { darkThemeEnabled } = useContext(DarkThemeContext);

  const title = `WAYNE'S FAMILY RECIPES`;
  const description = "Traditional Cajun food and so much more!";

  return (
    <Hidden smDown>
      <AppBar className={classes.toolbar} position="sticky">
        <Box className={classes.topRow}>
          <Logo className={classes.image} dark={darkThemeEnabled} />
          <HeaderButtons />
        </Box>
        <Typography className={classes.title} variant="h2">
          {title}
        </Typography>
        <Typography className={classes.subTitle} variant="h6">
          {description}
        </Typography>
      </AppBar>
    </Hidden>
  );
};
