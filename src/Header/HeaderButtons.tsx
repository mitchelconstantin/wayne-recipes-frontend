import React, { useState, useContext } from "react";
import {
  Box,
  Menu,
  makeStyles,
  MenuItem,
  Switch,
  IconButton,
} from "@material-ui/core/";
import { Link } from "react-router-dom";
import { isLoggedIn, logOut, isAdmin, isOwner } from "../Shared/AppBehaviors";
import { DarkThemeContext } from "../App";
import MoreVertIcon from "@material-ui/icons/MoreVert";

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
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className={classes.button}
      >
        <MoreVertIcon />
      </IconButton>
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
        <MenuItem>updated 6pm 06/12</MenuItem>
        <MenuItem component={Link} to="/about">
          About
        </MenuItem>
      </Menu>
    </Box>
  );
};
