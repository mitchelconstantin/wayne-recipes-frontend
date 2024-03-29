import { Button, Dialog, DialogTitle } from "@mui/material";
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
    SnackbarService.success("recipe deleted");
    setTimeout(() => (window.location.href = "/all"), 1500);
  };

  return (
    <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">
        Are you sure you want to delete this recipe?
      </DialogTitle>
      <Button color="primary" variant="contained" onClick={handleDelete}>
        YES DELETE IT
      </Button>
      <Button color="primary" variant="contained" onClick={onClose}>
        oops, no
      </Button>
    </Dialog>
  );
};
