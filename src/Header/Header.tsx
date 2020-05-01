import React from 'react';
import { Box, makeStyles } from '@material-ui/core/';
import { SmallAppBar } from './SmallAppBar';
import { LargeAppBar } from './LargeAppBar';

const useStyles = makeStyles(theme => ({
  container: {
    [theme.breakpoints.down('sm')]: {
      paddingBottom: '70px'
    },
    [theme.breakpoints.up('md')]: { paddingBottom: '0px' }
  }
}));

export const Header = () => {
  const classes = useStyles();
  return (
    <Box className={classes.container} displayPrint="none">
      <SmallAppBar />
      <LargeAppBar />
    </Box>
  );
};
