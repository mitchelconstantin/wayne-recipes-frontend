import { useContext } from "react";
import {
  Box,
  AppBar,
  CssBaseline,
  Slide,
  Toolbar,
  useScrollTrigger,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";
import { DarkThemeContext } from "../App";
import { HeaderButtons } from "./HeaderButtons";
import logo from "../Shared/Images/logo.svg";
import { Link } from "react-router-dom";

export const Header = () => {
  const { darkThemeEnabled, toggleDarkThemeEnabled } = useContext(DarkThemeContext);
  const trigger = useScrollTrigger();

  return (
    <Box sx={{ "@media print": { display: "none" } }}>
      <CssBaseline />
      <Slide appear={false} direction="down" in={!trigger}>
        <AppBar sx={{ background: "linear-gradient(90deg, #f44723, #f67030)" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              component={Link}
              to={"/all"}
              size="large"
            >
              <img
                src={logo}
                style={{ height: "32px", width: "32px" }}
                alt={"Logo"}
              />
            </IconButton>
            <Typography
              variant="h6"
              sx={{
                pl: 1,
                flexGrow: 1,
                color: "white",
                fontWeight: 500,
                letterSpacing: "0.02em",
              }}
            >
              Wayne's Family Recipes
            </Typography>
            <Tooltip title={darkThemeEnabled ? "Switch to light mode" : "Switch to dark mode"}>
              <IconButton onClick={toggleDarkThemeEnabled} sx={{ color: "white", mr: 0.5 }}>
                {darkThemeEnabled ? <LightMode fontSize="small" /> : <DarkMode fontSize="small" />}
              </IconButton>
            </Tooltip>
            <HeaderButtons />
          </Toolbar>
        </AppBar>
      </Slide>
      <Toolbar />
    </Box>
  );
};
