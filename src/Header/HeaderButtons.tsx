import React, { useState, useContext } from "react";
import {
  Box,
  Menu,
  Button,
  makeStyles,
  MenuItem,
  Switch,
} from "@material-ui/core/";
import { Link } from "react-router-dom";

import { isLoggedIn, logOut, isAdmin, isOwner } from "../Shared/AppBehaviors";
import { DarkThemeContext } from "../App";

const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.type === "dark" ? "silver" : "white",
  },
}));
export const HeaderButtons = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { darkThemeEnabled, toggleDarkThemeEnabled } = useContext(
    DarkThemeContext
  );
  const classes = useStyles();

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box ml="auto">
      <Button href="/all" className={classes.button}>
        All Recipes
      </Button>
      <Button onClick={handleClick} className={classes.button}>
        Menu
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {isLoggedIn() ? (
          <>
            <MenuItem onClick={logOut}>Logout</MenuItem>
            <MenuItem component={Link} to="/list">
              Shopping List
            </MenuItem>
          </>
        ) : (
          <MenuItem component={Link} to="/login">
            Login
          </MenuItem>
        )}
        {isAdmin() && (
          <MenuItem component={Link} to="/new">
            Add new recipe
          </MenuItem>
        )}
        {isOwner() && (
          <MenuItem component={Link} to="/dashboard">
            Admin Dashboard
          </MenuItem>
        )}
        <MenuItem onClick={toggleDarkThemeEnabled}>
          <div style={{ marginRight: "auto" }}>Use Dark Theme</div>
          <Switch checked={darkThemeEnabled} color="primary" />
        </MenuItem>
        {/* timestamp */}
        <MenuItem>updated 10pm 06/11</MenuItem>
      </Menu>
    </Box>
  );
};
