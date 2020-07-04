import React, { useContext } from "react";
import { Box, makeStyles, AppBar } from "@material-ui/core/";
import { DarkThemeContext } from "../App";
import { Logo } from "../Shared/Components/Logo";
import { HeaderButtons } from "./HeaderButtons";

const useStyles = makeStyles((theme) => ({
  paddingContainer: {
    paddingBottom: "70px",
  },
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
    background: "linear-gradient(90deg, #f44723, #f56730, #f44723)",
    height: "170px",
    marginTop: "-100px",
    boxShadow: "none",
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

export const Header = () => {
  const classes = useStyles();
  const { darkThemeEnabled } = useContext(DarkThemeContext);

  return (
    <Box boxShadow={0} className={classes.paddingContainer} displayPrint="none">
      <AppBar className={classes.toolbar} position="fixed">
        <Box className={classes.coloredBox} />
        <Box className={classes.container}>
          <Logo className={classes.image} dark={darkThemeEnabled} />
          <HeaderButtons />
        </Box>
      </AppBar>
    </Box>
  );
};
