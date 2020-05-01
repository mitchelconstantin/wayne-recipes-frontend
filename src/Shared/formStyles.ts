import { makeStyles } from '@material-ui/core/styles';

export const useContainerStyles = makeStyles(theme => ({
  formContainer: {
    margin: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'static'
  },
  formButton: {
    margin: '10px',
    backgroundColor: '#e4673d',
    variant: 'contained'
  },
  formTextField: {
    width: '50%'
  },
  formDropdown: {

  },
}));
