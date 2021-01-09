import {
  Box,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  Typography,
  Link,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";

interface Props {
  handleClose: any;
  open: boolean;
}

export const AboutDialog = ({ handleClose, open }: Props) => {
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle id="id">
        <Box display="flex" alignItems="center">
          <Box flexGrow={1}>{"About"}</Box>
          <Box>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography gutterBottom>
          Wayne's Recipes is a recipe app for hosting Constantin Family recipes
          on the web. All of the recipes you see have been collected by my
          father, Wayne over the last 30 years.
        </Typography>
        <Typography>
          <Link
            href={"https://github.com/mitchelconstantin/wayne-recipes-frontend"}
          >
            frontend code
          </Link>
        </Typography>
        <Typography>
          <Link
            href={
              "https://github.com/mitchelconstLinkntin/wayne-recipes-backend"
            }
          >
            backend code
          </Link>
        </Typography>
      </DialogContent>
    </Dialog>
  );
};
