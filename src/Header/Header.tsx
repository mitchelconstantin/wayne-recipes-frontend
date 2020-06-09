import React from "react";
import { Box, makeStyles } from "@material-ui/core/";
import { SmallAppBar } from "./SmallAppBar";
import { LargeAppBar } from "./LargeAppBar";

const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.down("sm")]: {
      paddingBottom: "70px",
    },
    [theme.breakpoints.up("md")]: { paddingBottom: "0px" },
  },
  coloredBox: {
    background: "linear-gradient(0.25turn, #f44723, #f56730, #f44723)",
    marginTop: "-100px",
    height: "100px",
  },
}));

export const Header = () => {
  const classes = useStyles();
  return (
    <Box className={classes.container} displayPrint="none">
      <div className={classes.coloredBox} />
      <SmallAppBar />
      <LargeAppBar />
    </Box>
  );
};
