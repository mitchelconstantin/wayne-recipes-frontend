import React from 'react';
import { Tooltip, IconButton } from '@material-ui/core';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import Print from '@material-ui/icons/Print';
import Edit from '@material-ui/icons/Edit';
import SnackbarService from '../SnackbarService';
import { IRecipe } from '../Types';
import { ShoppingListAPI } from '../APIs/ShoppingListAPI';

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
    SnackbarService.success('added to list!');
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
