import { useState, useContext } from "react";
import { Menu, MenuItem, Switch, IconButton } from "@mui/material/";
import { makeStyles } from "@mui/styles";
import { MoreVert } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { isLoggedIn, logOut, isAdmin, isOwner } from "../Shared/AppBehaviors";
import { DarkThemeContext } from "../App";
import preval from "preval.macro";
import { AboutDialog } from "../About/AboutDialog";

const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.mode === "dark" ? "silver" : "white",
  },
}));

export const HeaderButtons = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { darkThemeEnabled, toggleDarkThemeEnabled } =
    useContext(DarkThemeContext);
  const classes = useStyles();
  const [aboutDialogOpen, setAboutDialogOpen] = useState(false);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dateTimeStamp = preval`module.exports = new Date().toLocaleString();`;

  return (
    <>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className={classes.button}
        size="large"
      >
        <MoreVert />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {isLoggedIn() ? (
          <div>
            <MenuItem onClick={logOut}>Logout</MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/list">
              Shopping List
            </MenuItem>
          </div>
        ) : (
          <MenuItem onClick={handleClose} component={Link} to="/login">
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
        <MenuItem
          onClick={() => {
            setAboutDialogOpen(true);
            handleClose();
          }}
        >
          About
        </MenuItem>
        <MenuItem>updated: {dateTimeStamp}</MenuItem>
      </Menu>
      <AboutDialog
        open={aboutDialogOpen}
        handleClose={() => setAboutDialogOpen(false)}
      />
    </>
  );
};
