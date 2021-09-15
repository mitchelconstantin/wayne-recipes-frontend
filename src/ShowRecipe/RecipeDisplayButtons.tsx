import { Box } from "@mui/material/";
import { isAdmin, isLoggedIn } from "../Shared/AppBehaviors";
import {
  PrintButton,
  AddToShoppingListButton,
  EditRecipeButton,
  IMadeItButton,
} from "../Shared/Components/CustomButtons";
import { IRecipe } from "../Shared/Types";

interface props {
  recipe: IRecipe;
  reloadRecipe: Function;
}

export const RecipeDisplayButtons = ({ recipe, reloadRecipe }: props) => {
  return (
    <Box display="flex" displayPrint="none" ml="-8px">
      {isLoggedIn() && <AddToShoppingListButton recipe={recipe} />}
      {isLoggedIn() && (
        <IMadeItButton reloadRecipe={reloadRecipe} recipe={recipe} />
      )}
      <PrintButton label="Recipe" />
      {isAdmin() && <EditRecipeButton id={recipe.id} />}
    </Box>
  );
};
