import React, { useState, useEffect } from 'react';
import {
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Box,
  Button,
  Typography
} from '@material-ui/core';
import { isOwner } from '../Shared/AppBehaviors';
import { IUser } from '../Shared/Types';
import SnackbarService from '../Shared/SnackbarService';
import { UserAPI } from '../Shared/APIs/UserAPI';
import { Redirect } from 'react-router-dom';
import { useContainerStyles } from '../Shared/formStyles';
import { Loading } from '../Shared/Components/Loading';

const updateUsers = async (users: IUser[]) => {
  await UserAPI.updateUsers(users);
  SnackbarService.success('permissions have been updated');
};
export const AdminDashboard = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const classes = useContainerStyles();
  
  useEffect(() => {
    UserAPI.getAllUsers().then(users => {
      setUsers(users);
      setLoading(false);
    });
  }, []);

  const handleChange = (user: IUser, i: number) => {
    const newUsers = users.slice();
    const newUser = { ...user, isAdmin: !user.isAdmin };
    newUsers[i] = newUser;
    setUsers(newUsers);
  };

  if (!isOwner()) return <Redirect push to="/all" />;
  if (loading) return <Loading />;
  return (
    <Box className={classes.formContainer}>
      <FormControl component="fieldset">
        <FormLabel>Has Admin priviledges?</FormLabel>
        <FormGroup>
          {users.map((user, i) => (
            <div key={i}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={user.isAdmin}
                    onChange={() => handleChange(user, i)}
                    style={{
                      color: '#e4673d'
                    }}
                  />
                }
                label={
                  <Typography variant="h6" style={{ color: 'black' }}>
                    {user.email}
                  </Typography>
                }
              />
            </div>
          ))}
        </FormGroup>
      </FormControl>
      <Button className={classes.formButton} onClick={() => updateUsers(users)}>
        {' '}
        Save Settings
      </Button>
    </Box>
  );
};
