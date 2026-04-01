import { Box, Typography } from "@mui/material";
import { IRecipe } from "../Shared/Types";

interface props {
  recipe: IRecipe;
}

export const RecipeSpecifications = ({ recipe }: props) => {
  const specs = [
    { label: "Source", value: recipe.source },
    { label: "Yield", value: recipe.serves },
    { label: "Net Carbs", value: recipe.netCarbs },
    { label: "Main Ingredient", value: recipe.mainIngredient },
    { label: "Region", value: recipe.region },
  ].filter(({ value }) => !!value);

  if (!specs.length) return null;

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 1.5, mb: 1 }}>
      {specs.map(({ label, value }) => (
        <Box key={label}>
          <Typography variant="caption" color="text.disabled" sx={{ display: "block", lineHeight: 1.2 }}>
            {label}
          </Typography>
          <Typography variant="body2" fontWeight={500}>
            {value}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};
