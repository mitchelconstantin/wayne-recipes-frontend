import React, { useState } from "react";
import { Box, Button, TextField } from "@material-ui/core";
import { emptyUser } from "../Shared/Types";
import { UserAPI } from "../Shared/APIs/UserAPI";
import { useContainerStyles } from "../Shared/formStyles";

export const SignUp = () => {
  const [user, setUser] = useState(emptyUser);
  const [signedUp, setSignedUp] = useState(false);
  const classes = useContainerStyles();
  const handleChange = (type: string, newValue: string) => {
    setUser((prev) => ({ ...prev, [type]: newValue }));
  };

  const handleSignUpClick = async () => {
    const isCreated = await UserAPI.createUser(user);
    if (isCreated) setSignedUp(true);
  };

  if (signedUp)
    return (
      <Box className={classes.formContainer}>
        <Button href="/login" color="primary" variant="contained">
          Go to Sign In
        </Button>
      </Box>
    );

  return (
    <Box className={classes.formContainer}>
      {!signedUp && (
        <>
          <TextField
            label="First Name"
            value={user.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            margin="normal"
          />
          <TextField
            label="Last Name"
            value={user.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            margin="normal"
          />
          <TextField
            label="Email"
            required
            value={user.email}
            onChange={(e) => handleChange("email", e.target.value)}
            margin="normal"
          />
          <TextField
            id="standard-password-input"
            label="Password"
            onChange={(e) => handleChange("password", e.target.value)}
            type="password"
            value={user.password}
            required
            autoComplete="current-password"
            margin="normal"
          />
          <Box>
            <Button
              onClick={handleSignUpClick}
              disabled={
                !(
                  user.email &&
                  user.password &&
                  user.firstName &&
                  user.lastName
                )
              }
              color="primary"
              variant="contained"
              style={{ marginRight: "16px" }}
            >
              Sign up
            </Button>
            <Button href="login" color="primary" variant="contained">
              Login
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};
