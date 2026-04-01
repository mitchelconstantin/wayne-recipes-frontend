import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Divider, IconButton, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
import { RecipeAPI } from "../Shared/APIs/RecipeAPI";
import { SnackbarService } from "../Shared/SnackbarService";

interface props {
  onClose: any;
  id: string;
  open: boolean;
}

export const DeleteRecipeDialog = ({ onClose, id, open }: props) => {
  const handleDelete = async () => {
    await RecipeAPI.deleteRecipe(id);
    SnackbarService.success("Recipe deleted");
    setTimeout(() => (window.location.href = "/all"), 1500);
  };

  return (
    <Dialog onClose={onClose} open={open} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ pr: 6 }}>
        Delete Recipe?
        <IconButton
          onClick={onClose}
          size="small"
          sx={{ position: "absolute", right: 12, top: 12, color: "text.secondary" }}
        >
          <Close fontSize="small" />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ pt: 2 }}>
        <Typography variant="body2" color="text.secondary">
          This action cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} color="inherit">Cancel</Button>
        <Button onClick={handleDelete} variant="contained" color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
