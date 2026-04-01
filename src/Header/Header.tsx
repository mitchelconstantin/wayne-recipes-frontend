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
} from "@mui/material";
import { DarkThemeContext } from "../App";
import { HeaderButtons } from "./HeaderButtons";
import logo from "../Shared/Images/logo.svg";
import darkLogo from "../Shared/Images/darkLogo.svg";
import { Link } from "react-router-dom";

export const Header = () => {
  const { darkThemeEnabled } = useContext(DarkThemeContext);
  const trigger = useScrollTrigger();

  const title = `WAYNE'S FAMILY RECIPES`;

  return (
    <Box>
      <CssBaseline />
      <Slide appear={false} direction="down" in={!trigger}>
        <AppBar sx={{ background: "linear-gradient(90deg, #f44723, #f56730, #f44723)" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              component={Link}
              to={"/all"}
              size="large"
            >
              <img
                src={darkThemeEnabled ? darkLogo : logo}
                style={{ height: "36px", width: "36px" }}
                alt={"Logo"}
              />
            </IconButton>
            <Typography
              variant="h6"
              sx={{
                paddingLeft: 1,
                marginRight: "-5px",
                flexGrow: 1,
                color: (theme) => theme.palette.mode === "dark" ? "silver" : "white",
              }}
            >
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
