import {
  Dialog,
  DialogContent,
  Typography,
  Link,
  Box,
  IconButton,
  Chip,
} from "@mui/material";
import { Close, Code, MenuBook } from "@mui/icons-material";
import preval from "preval.macro";

interface Props {
  handleClose: any;
  open: boolean;
}

const dateTimeStamp = preval`module.exports = new Date().toLocaleString();`;

export const AboutDialog = ({ handleClose, open }: Props) => {
  return (
    <Dialog
      onClose={handleClose}
      open={open}
      maxWidth="xs"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3 } }}
    >
      <IconButton
        onClick={handleClose}
        size="small"
        sx={{ position: "absolute", right: 10, top: 10, color: "text.secondary" }}
      >
        <Close fontSize="small" />
      </IconButton>

      <DialogContent sx={{ pt: 4, pb: 3, px: 3, textAlign: "center" }}>
        <MenuBook sx={{ fontSize: 36, color: "primary.main", mb: 1 }} />
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Wayne's Recipes
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8, mb: 3 }}>
          A recipe app for hosting Constantin Family recipes on the web. All of
          the recipes you see have been collected by my father, Wayne over the
          last 30 years.
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2.5 }}>
          <Chip
            component={Link}
            href="https://github.com/mitchelconstantin/wayne-recipes-frontend"
            target="_blank"
            rel="noopener"
            icon={<Code />}
            label="Source"
            variant="outlined"
            size="small"
            clickable
          />
        </Box>
        <Typography variant="caption" color="text.disabled">
          Updated {dateTimeStamp}
        </Typography>
      </DialogContent>
    </Dialog>
  );
};
