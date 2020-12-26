import React, { useState } from "react";
import { Tooltip, IconButton } from "@material-ui/core";
import { Print, Edit, Grade, AddShoppingCart } from "@material-ui/icons";
import { SnackbarService } from "../SnackbarService";
import { IRecipe } from "../Types";
import { ShoppingListAPI } from "../APIs/ShoppingListAPI";
import { RateRecipeDialog } from "../../ShowRecipe/RateRecipeDialog";

interface PrintButtonProps {
  label: string;
}
export const PrintButton = ({ label }: PrintButtonProps) => {
  return (
    <Tooltip title={`Print ${label}`}>
      <IconButton onClick={window.print}>
        <Print />
      </IconButton>
    </Tooltip>
  );
};

interface ShoppingButtonProps {
  recipe: IRecipe;
}
export const AddToShoppingListButton = ({ recipe }: ShoppingButtonProps) => {
  const addToShoppingList = async () => {
    const res = await ShoppingListAPI.addToList(recipe.id);
    if (res.error) {
      SnackbarService.error(res.message);
      return;
    }
    SnackbarService.success("added to list!");
    return;
  };
  return (
    <Tooltip title="Add to Shopping List">
      <IconButton onClick={addToShoppingList} aria-label="add to list">
        <AddShoppingCart />
      </IconButton>
    </Tooltip>
  );
};

interface EditButtonProps {
  id?: string;
}
export const EditRecipeButton = ({ id }: EditButtonProps) => {
  return (
    <Tooltip title="Edit Recipe">
      <IconButton href={`/r/${id}/edit`} aria-label="edit recipe">
        <Edit />
      </IconButton>
    </Tooltip>
  );
};

interface ImadeItButtonProps {
  recipe: IRecipe;
  reloadRecipe: Function;
}
export const IMadeItButton = ({ recipe, reloadRecipe }: ImadeItButtonProps) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Tooltip title="Leave a review">
        <IconButton onClick={() => setOpenModal(true)} aria-label="rate recipe">
          <Grade />
        </IconButton>
      </Tooltip>
      <RateRecipeDialog
        open={openModal}
        recipe={recipe}
        reloadRecipe={reloadRecipe}
        handleClose={() => setOpenModal(false)}
      />
    </>
  );
};
