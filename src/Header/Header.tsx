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
import { grey } from "@mui/material/colors";
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
        <AppBar
          elevation={0}
          sx={{
            background: "linear-gradient(90deg, #f44723, #f67030)",
            borderBottom: "1px solid rgba(0,0,0,0.1)",
          }}
        >
          <Toolbar>
            {/* Orange accent bar */}
            <Box
              sx={{
                width: "3px",
                height: "28px",
                borderRadius: "2px",
                backgroundColor: "#f44723",
                mr: 1.5,
                flexShrink: 0,
              }}
            />
            <IconButton
              edge="start"
              component={Link}
              to={"/all"}
              size="large"
              sx={{ color: "inherit", mr: 0.5 }}
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
                flexGrow: 1,
                fontWeight: 600,
                letterSpacing: "-0.01em",
                color: "white",
                display: { xs: "none", md: "block" },
              }}
            >
              Wayne's Family Recipes
            </Typography>
            {/* Spacer on mobile so buttons stay right-aligned */}
            <Box sx={{ flexGrow: 1, display: { xs: "block", md: "none" } }} />
            <Tooltip title={darkThemeEnabled ? "Switch to light mode" : "Switch to dark mode"}>
              <IconButton
                onClick={toggleDarkThemeEnabled}
                sx={{ color: "white", mr: 0.5 }}
              >
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
