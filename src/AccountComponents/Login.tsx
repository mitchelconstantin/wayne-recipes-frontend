import { useState } from "react";
import { Box, Button, Divider, Paper, TextField, Typography } from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { emptyUser } from "../Shared/Types";
import { UserAPI } from "../Shared/APIs/UserAPI";

export const Login = () => {
  const [user, setUser] = useState(emptyUser);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleChange = (type: string, newValue: string) => {
    setUser((prev) => ({ ...prev, [type]: newValue }));
  };

  const handleLoginClick = async () => {
    const userCopy = { ...user, email: user.email.toLowerCase() };
    const successfulLogin = await UserAPI.loginToServer(userCopy);
    setLoggedIn(successfulLogin);
  };

  if (loggedIn)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", pt: 10 }}>
        <Button href="/all" color="primary" variant="contained">
          Go to All Recipes
        </Button>
      </Box>
    );

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "flex-start", pt: { xs: 4, md: 8 }, px: 2 }}>
      <Paper variant="outlined" sx={{ width: "100%", maxWidth: 400, borderRadius: 3, p: 4 }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
          <Box sx={{ bgcolor: "primary.main", borderRadius: "50%", p: 1, mb: 1.5, display: "flex" }}>
            <LockOutlined sx={{ color: "white", fontSize: 20 }} />
          </Box>
          <Typography variant="h6" fontWeight={600}>Sign in</Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Email"
            required
            fullWidth
            value={user.email}
            onChange={(e) => handleChange("email", e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLoginClick()}
          />
          <TextField
            label="Password"
            type="password"
            required
            fullWidth
            value={user.password}
            onChange={(e) => handleChange("password", e.target.value)}
            autoComplete="current-password"
            onKeyDown={(e) => e.key === "Enter" && handleLoginClick()}
          />
          <Button
            onClick={handleLoginClick}
            color="primary"
            variant="contained"
            fullWidth
            disabled={!(user.email && user.password)}
            sx={{ mt: 1 }}
          >
            Sign In
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="body2" color="text.secondary">
            Don't have an account?&nbsp;
          </Typography>
          <Typography variant="body2" component="a" href="/signup" color="primary" sx={{ textDecoration: "none", fontWeight: 500 }}>
            Sign up
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};
