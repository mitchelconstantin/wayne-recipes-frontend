import { useContext } from "react";
import {
  Box,
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
    background: "linear-gradient(90deg, #f44723, #f56730, #f44723)",
  },
  image: {
    height: "36px",
    width: "36px",
  },
  title: {
    paddingLeft: theme.spacing(1),
    marginRight: "-5px",
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
    <Box>
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
    </Box>
  );
};
