import { useState } from "react";
import { Menu, MenuItem, IconButton } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { isLoggedIn, logOut, isAdmin, isOwner } from "../Shared/AppBehaviors";
import { AboutDialog } from "../About/AboutDialog";

export const HeaderButtons = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [aboutDialogOpen, setAboutDialogOpen] = useState(false);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
        sx={{ color: "white" }}
        size="large"
      >
        <MoreVert />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        slotProps={{ paper: { sx: { minWidth: 180, borderRadius: 2 } } }}
      >
        {isLoggedIn() ? (
          [
            <MenuItem key="logout" onClick={logOut}>Logout</MenuItem>,
            <MenuItem key="list" onClick={handleClose} component={Link} to="/list">
              Shopping List
            </MenuItem>,
          ]
        ) : (
          <MenuItem onClick={handleClose} component={Link} to="/login">
            Login
          </MenuItem>
        )}
        {isAdmin() && (
          <MenuItem onClick={handleClose} component={Link} to="/new">
            Add Recipe
          </MenuItem>
        )}
        {isOwner() && (
          <MenuItem onClick={handleClose} component={Link} to="/dashboard">
            Admin Dashboard
          </MenuItem>
        )}
        <MenuItem
          onClick={() => {
            setAboutDialogOpen(true);
            handleClose();
          }}
        >
          About
        </MenuItem>
      </Menu>
      <AboutDialog
        open={aboutDialogOpen}
        handleClose={() => setAboutDialogOpen(false)}
      />
    </>
  );
};
