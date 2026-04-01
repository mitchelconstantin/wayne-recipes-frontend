import { useState } from "react";
import { Box, Button, Divider, Grid, Paper, TextField, Typography } from "@mui/material";
import { PersonAddOutlined } from "@mui/icons-material";
import { emptyUser } from "../Shared/Types";
import { UserAPI } from "../Shared/APIs/UserAPI";

export const SignUp = () => {
  const [user, setUser] = useState(emptyUser);
  const [signedUp, setSignedUp] = useState(false);

  const handleChange = (type: string, newValue: string) => {
    setUser((prev) => ({ ...prev, [type]: newValue }));
  };

  const handleSignUpClick = async () => {
    const isCreated = await UserAPI.createUser(user);
    if (isCreated) setSignedUp(true);
  };

  if (signedUp)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", pt: 10 }}>
        <Button href="/login" color="primary" variant="contained">
          Go to Sign In
        </Button>
      </Box>
    );

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "flex-start", pt: { xs: 4, md: 8 }, px: 2 }}>
      <Paper variant="outlined" sx={{ width: "100%", maxWidth: 400, borderRadius: 3, p: 4 }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
          <Box sx={{ bgcolor: "primary.main", borderRadius: "50%", p: 1, mb: 1.5, display: "flex" }}>
            <PersonAddOutlined sx={{ color: "white", fontSize: 20 }} />
          </Box>
          <Typography variant="h6" fontWeight={600}>Create account</Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 6 }}>
              <TextField
                label="First Name"
                fullWidth
                value={user.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <TextField
                label="Last Name"
                fullWidth
                value={user.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
              />
            </Grid>
          </Grid>
          <TextField
            label="Email"
            required
            fullWidth
            value={user.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            required
            fullWidth
            value={user.password}
            onChange={(e) => handleChange("password", e.target.value)}
            autoComplete="new-password"
          />
          <Button
            onClick={handleSignUpClick}
            disabled={!(user.email && user.password && user.firstName && user.lastName)}
            color="primary"
            variant="contained"
            fullWidth
            sx={{ mt: 1 }}
          >
            Create Account
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="body2" color="text.secondary">
            Already have an account?&nbsp;
          </Typography>
          <Typography variant="body2" component="a" href="/login" color="primary" sx={{ textDecoration: "none", fontWeight: 500 }}>
            Sign in
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};
