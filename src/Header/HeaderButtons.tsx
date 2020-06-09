import React, { useState } from "react";
import { Box, Menu, Button, makeStyles } from "@material-ui/core/";
import { isLoggedIn, logOut, isAdmin, isOwner } from "../Shared/AppBehaviors";

const useStyles = makeStyles((theme) => ({
  button: {
    color: "white",
  },
  menuButton: {},
  menu: {
    display: "flex",
    flexDirection: "column",
  },
}));
export const HeaderButtons = () => {
  const [anchorEl, setAnchorEl] = useState(null);
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
        <Box className={classes.menu}>
          {isLoggedIn() ? (
            <>
              <Button onClick={logOut} className={classes.menuButton}>
                Logout
              </Button>
              <Button href="/list" className={classes.menuButton}>
                Shopping List
              </Button>
            </>
          ) : (
            <Button href="/login" className={classes.menuButton}>
              Login
            </Button>
          )}
          {isAdmin() && (
            <Button href="/new" className={classes.menuButton}>
              Add new recipe
            </Button>
          )}
          {isOwner() && (
            <Button href="/dashboard" className={classes.menuButton}>
              Admin Dashboard
            </Button>
          )}
          <Button>updated 1:40pm 06/09</Button>
        </Box>
      </Menu>
    </Box>
  );
};
