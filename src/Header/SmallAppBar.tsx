import React from "react";
import { AppBar, makeStyles, Box } from "@material-ui/core/";
import { Logo } from "../Shared/Components/Logo";
import { HeaderButtons } from "./HeaderButtons";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    justifyItems: "center",
    padding: "15px",
    paddingLeft: "20px",
    paddingRight: "20px",
    height: "40px",
  },
  toolbar: {
    background: "linear-gradient(0.25turn, #f44723, #f56730, #f44723)",
    height: "170px",
    marginTop: "-100px",
  },
  image: {
    height: "40px",
    width: "40px",
    cursor: "pointer",
  },
  coloredBox: {
    height: "100px",
  },
}));

export const SmallAppBar = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.toolbar} position="fixed">
      <Box className={classes.coloredBox} />
      <Box className={classes.container}>
        <Logo className={classes.image} />
        <HeaderButtons />
      </Box>
    </AppBar>
  );
};
