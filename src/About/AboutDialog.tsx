import {
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  Typography,
  Link,
  Box,
  Divider,
} from "@mui/material";
import { Close, Code } from "@mui/icons-material";

interface Props {
  handleClose: any;
  open: boolean;
}

export const AboutDialog = ({ handleClose, open }: Props) => {
  return (
    <Dialog onClose={handleClose} open={open} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ pr: 6 }}>
        About
        <IconButton
          onClick={handleClose}
          size="small"
          sx={{ position: "absolute", right: 12, top: 12, color: "text.secondary" }}
        >
          <Close fontSize="small" />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ pt: 2 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5, lineHeight: 1.7 }}>
          Wayne's Recipes is a recipe app for hosting Constantin Family recipes
          on the web. All of the recipes you see have been collected by my
          father, Wayne over the last 30 years.
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Link
            href="https://github.com/mitchelconstantin/wayne-recipes-frontend"
            target="_blank"
            rel="noopener"
            underline="hover"
            sx={{ display: "flex", alignItems: "center", gap: 0.75, fontSize: "0.875rem" }}
          >
            <Code fontSize="small" /> Frontend source
          </Link>
          <Link
            href="https://github.com/mitchelconstantin/wayne-recipes-backend"
            target="_blank"
            rel="noopener"
            underline="hover"
            sx={{ display: "flex", alignItems: "center", gap: 0.75, fontSize: "0.875rem" }}
          >
            <Code fontSize="small" /> Backend source
          </Link>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
