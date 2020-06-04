import React, { useState } from 'react';
import { Box, Button, TextField } from '@material-ui/core';
import { logIn } from '../Shared/AppBehaviors';
import { emptyUser } from '../Shared/Types';
import SnackbarService from '../Shared/SnackbarService';
import { UserAPI } from '../Shared/APIs/UserAPI';
import { useContainerStyles } from '../Shared/formStyles';

export const Login = () => {
  const [user, setUser] = useState(emptyUser);
  const [loggedIn, setLoggedIn] = useState(false);
  const classes = useContainerStyles();
  const handleChange = (type: string, newValue: string) => {
    setUser((prev) => ({ ...prev, [type]: newValue }));
  };

  const handleLoginClick = async () => {
    const userCopy = { ...user, email: user.email.toLowerCase() };
    try {
      const response = await UserAPI.loginToServer(userCopy);
      if (response.status === 400) {
        SnackbarService.error('yikes, that user does not exist');
        setUser(emptyUser);
      }
      if (response.status === 200) {
        const u = await response.json();
        logIn(u);
        setLoggedIn(true);
        SnackbarService.success('you are now logged in');
      }
    } catch (e) {
      console.log(e);
    } finally {
    }
  };
  if (loggedIn)
    return (
      <Box className={classes.formContainer}>
        <Button href="/all" className={classes.formButton}>
          Go to All Reicpes
        </Button>
      </Box>
    );
  return (
    <Box className={classes.formContainer}>
      <TextField
        label="Email"
        required
        value={user.email}
        onChange={(e) => handleChange('email', e.target.value)}
        margin="normal"
      />
      <TextField
        id="standard-password-input"
        label="Password"
        onChange={(e) => handleChange('password', e.target.value)}
        type="password"
        value={user.password}
        required
        autoComplete="current-password"
        margin="normal"
      />
      <Button
        onClick={handleLoginClick}
        className={classes.formButton}
        disabled={!(user.email && user.password)}
      >
        Login
      </Button>
      <Button href="/signup" className={classes.formButton}>
        Sign Up
      </Button>
    </Box>
  );
};
