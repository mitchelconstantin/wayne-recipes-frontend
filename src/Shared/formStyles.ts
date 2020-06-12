import { makeStyles } from "@material-ui/core/styles";

export const useContainerStyles = makeStyles((theme) => ({
  formContainer: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "auto",
    height: "100%",
  },
  formButton: {
    margin: "10px",
    backgroundColor: "#e4673d",
    variant: "contained",
  },
  formTextField: {
    width: "50%",
  },
  formDropdown: {},
}));
