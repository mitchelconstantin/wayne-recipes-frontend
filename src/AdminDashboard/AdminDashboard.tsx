import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Paper,
  Typography,
} from "@mui/material";
import { AdminPanelSettings } from "@mui/icons-material";
import { IUser } from "../Shared/Types";
import { SnackbarService } from "../Shared/SnackbarService";
import { UserAPI } from "../Shared/APIs/UserAPI";
import { formContainerSx } from "../Shared/formStyles";
import { Loading } from "../Shared/Components/Loading";

const updateUsers = async (users: IUser[]) => {
  await UserAPI.updateUsers(users);
  SnackbarService.success("Permissions updated");
};

export const AdminDashboard = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    UserAPI.getAllUsers().then((users) => {
      setUsers(users);
      setLoading(false);
    });
  }, []);

  const handleChange = (user: IUser, i: number) => {
    const newUsers = users.slice();
    newUsers[i] = { ...user, isAdmin: !user.isAdmin };
    setUsers(newUsers);
  };

  if (loading) return <Loading />;

  return (
    <Box sx={formContainerSx}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, alignSelf: "flex-start", mb: 1 }}>
        <AdminPanelSettings color="primary" />
        <Typography variant="h5" fontWeight={500}>
          Admin Dashboard
        </Typography>
      </Box>
      <Divider sx={{ width: "100%", mb: 3 }} />

      <Paper variant="outlined" sx={{ width: "100%", borderRadius: 2, overflow: "hidden" }}>
        <Box sx={{ px: 2.5, py: 1.5, bgcolor: "action.hover" }}>
          <Typography variant="subtitle2" color="text.secondary" sx={{ textTransform: "uppercase", letterSpacing: 0.5, fontSize: "0.7rem" }}>
            User Permissions
          </Typography>
        </Box>
        <Divider />
        {users.map((user, i) => (
          <Box key={i}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 2.5, py: 1.5 }}>
              <Typography variant="body2">{user.email}</Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={user.isAdmin}
                    onChange={() => handleChange(user, i)}
                    color="primary"
                    size="small"
                  />
                }
                label={<Typography variant="body2" color="text.secondary">Admin</Typography>}
                labelPlacement="start"
                sx={{ mr: 0, gap: 0.5 }}
              />
            </Box>
            {i < users.length - 1 && <Divider />}
          </Box>
        ))}
      </Paper>

      <Box sx={{ alignSelf: "flex-end", mt: 3 }}>
        <Button variant="contained" color="primary" onClick={() => updateUsers(users)}>
          Save
        </Button>
      </Box>
    </Box>
  );
};
