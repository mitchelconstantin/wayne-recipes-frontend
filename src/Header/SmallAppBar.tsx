import React from 'react';
import { AppBar, makeStyles } from '@material-ui/core/';
import { Logo } from '../Shared/Components/Logo';
import { HeaderButtons } from './HeaderButtons';

const useStyles = makeStyles(theme => ({
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    justifyItems: 'center',
    background: 'linear-gradient(0.25turn, #f44723, #f56730, #f44723)',
    padding: '15px',
    paddingLeft: '20px',
    paddingRight: '20px',
    height: '70px',
  },
  image: {
    height: '40px',
    width: '40px',
    cursor: 'pointer'
  }
}));

export const SmallAppBar = () => {
  const classes = useStyles();

  return (
    <AppBar
      className={classes.toolbar}
      position="fixed"
    >
      <Logo className={classes.image} />
      <HeaderButtons />
    </AppBar>
  );
};
