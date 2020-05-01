import React from 'react';
import { Box } from '@material-ui/core/';
import { isAdmin, isLoggedIn } from '../Shared/AppBehaviors';
import {
  PrintButton,
  AddToShoppingListButton,
  EditRecipeButton
} from '../Shared/Components/CustomButtons';
import { IRecipe } from '../Shared/Types';

interface props {
  recipe: IRecipe;
}

export const RecipeDisplayButtons = ({ recipe }: props) => {
  return (
    <Box display="flex" displayPrint="none">
      {isLoggedIn() && <AddToShoppingListButton recipe={recipe} />}
      <PrintButton label="Recipe" />
      {isAdmin() && <EditRecipeButton id={recipe.id} />}
    </Box>
  );
};
