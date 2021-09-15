import { Box } from "@mui/material/";
import { IRecipe } from "../Shared/Types";

interface props {
  recipe: IRecipe;
}

export const RecipeSpecifications = ({ recipe }: props) => {
  return (
    <Box mt="10px" display="flex" flexDirection="column">
      <div>{`From: ${recipe.source || "unknown"}`}</div>
      <div>{`Yield: ${recipe.serves || "unknown"}`}</div>
      {/* <div>{`Time: ${recipe.time || 'unknown'}`}</div> */}
      <div>{`NetCarbs: ${recipe.netCarbs || "unknown"}`}</div>
      <div>{`Main Ingredient: ${recipe.mainIngredient || "unknown"}`}</div>
      <div>{`Region: ${recipe.region || "unknown"}`}</div>
    </Box>
  );
};
