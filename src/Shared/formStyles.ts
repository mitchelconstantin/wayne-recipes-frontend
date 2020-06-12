import { makeStyles } from "@material-ui/core/styles";

export const useContainerStyles = makeStyles((theme) => ({
  formContainer: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  formTextField: {
    width: "50%",
  },
}));
