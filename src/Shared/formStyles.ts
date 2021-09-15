import makeStyles from '@mui/styles/makeStyles';

export const useContainerStyles = makeStyles((theme) => ({
  formContainer: {
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  formTextField: {
    width: "50%",
  },
}));
