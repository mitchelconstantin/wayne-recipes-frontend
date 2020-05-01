import React, { useState } from 'react';
import { Box, Button, TextField } from '@material-ui/core';
import { emptyUser } from '../Shared/Types';
import { UserAPI } from '../Shared/APIs/UserAPI';
import { useContainerStyles } from '../Shared/formStyles';

export const SignUp = () => {
  const [user, setUser] = useState(emptyUser);
  const [signedUp, setSignedUp] = useState(false);
  const classes = useContainerStyles();
  const handleChange = (type: string, newValue: string) => {
    setUser(prev => ({ ...prev, [type]: newValue }));
  };

  const handleSignUpClick = async () => {
    await UserAPI.createUser(user);
    setSignedUp(true);
  };

  return (
    <Box className={classes.formContainer}>
      {!signedUp && (
        <>
          <TextField
            label="First Name"
            value={user.firstName}
            onChange={e => handleChange('firstName', e.target.value)}
            margin="normal"
          />
          <TextField
            label="Last Name"
            value={user.lastName}
            onChange={e => handleChange('lastName', e.target.value)}
            margin="normal"
          />
          <TextField
            label="Email"
            required
            value={user.email}
            onChange={e => handleChange('email', e.target.value)}
            margin="normal"
          />
          <TextField
            id="standard-password-input"
            label="Password"
            onChange={e => handleChange('password', e.target.value)}
            type="password"
            value={user.password}
            required
            autoComplete="current-password"
            margin="normal"
          />
          <Button
            onClick={handleSignUpClick}
            disabled={
              !(user.email && user.password && user.firstName && user.lastName)
            }
            className={classes.formButton}
          >
            Sign up
          </Button>
        </>
      )}
      <Button href="login" className={classes.formButton}>
        Login
      </Button>
    </Box>
  );
};
