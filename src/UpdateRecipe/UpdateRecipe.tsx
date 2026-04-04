/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Button, TextField, Typography, Box, Grid, Divider } from "@mui/material";
import { useParams } from "react-router-dom";
import { ImageUploader } from "./ImageUploader";
import { isOwner } from "../Shared/AppBehaviors";
import { IRecipe, emptyRecipe, emptyFilterOptions } from "../Shared/Types";
import { RecipeAPI } from "../Shared/APIs/RecipeAPI";
import { SnackbarService } from "../Shared/SnackbarService";
import { formContainerSx, formTextFieldSx } from "../Shared/formStyles";
import { Loading } from "../Shared/Components/Loading";
import { Dropdown } from "./Dropdown";
import { DeleteRecipeDialog } from "./DeleteRecipeDialog";
import { ListEditor } from "./ListEditor";

const getRecipeData = async (recipeId: string) => {
  const recipe = recipeId ? await RecipeAPI.getRecipe(recipeId) : emptyRecipe;
  const filters = await RecipeAPI.getFilters();
  if (!recipe) {
    SnackbarService.error("Could not find that recipe");
    window.location.href = "/";
    return {};
  }
  return { recipe: { ...recipe }, filters: { ...filters } };
};

const saveRecipe = async (recipe: IRecipe) => {
  const { id } = await RecipeAPI.saveRecipe(recipe);
  setTimeout(() => (window.location.href = `/r/${id}`), 1500);
};

export const UpdateRecipe = () => {
  const [openModal, setOpenModal] = useState(false);
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState<IRecipe>(emptyRecipe);
  const [filters, setFilters] = useState(emptyFilterOptions);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRecipeData(recipeId).then(({ recipe, filters }) => {
      filters && setFilters(filters);
      recipe && setRecipe(recipe);
      setLoading(false);
    });
  }, []);

  const handleChange = (type: string, newValue: any) => {
    setRecipe((prev) => ({ ...prev, [type]: newValue }));
  };

  const disabled = !(recipe.title && recipe.ingredients && recipe.directions);
  if (loading) return <Loading />;

  return (
    <Box sx={formContainerSx}>
      <Typography variant="h5" fontWeight={500} gutterBottom alignSelf="flex-start">
        {recipeId ? "Edit Recipe" : "New Recipe"}
      </Typography>
      <Divider sx={{ width: "100%", mb: 3 }} />

      <ImageUploader
        setPicture={(newImage: string) => handleChange("picture", newImage)}
        picture={recipe.picture}
      />

      <TextField
        value={recipe.title || ""}
        onChange={(e) => handleChange("title", e.target.value)}
        required
        label="Title"
        sx={{ ...formTextFieldSx, mb: 3 }}
      />

      <Grid container spacing={2} sx={{ width: "100%", mb: 1 }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Dropdown
            handleChange={(_: any, value: any) => handleChange("type", value)}
            items={filters.types}
            value={recipe.type || ""}
            title="Recipe Type"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Dropdown
            handleChange={(_: any, value: any) => handleChange("source", value)}
            items={filters.sources}
            value={recipe.source || ""}
            title="Source"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Dropdown
            handleChange={(_: any, value: any) => handleChange("mainIngredient", value)}
            items={filters.mainIngredients}
            value={recipe.mainIngredient || ""}
            title="Main Ingredient"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Dropdown
            handleChange={(_: any, value: any) => handleChange("region", value)}
            items={filters.regions}
            value={recipe.region || ""}
            title="Region"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            value={recipe.serves || ""}
            onChange={(e) => handleChange("serves", e.target.value)}
            label="Serves"
            fullWidth
            sx={formTextFieldSx}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            value={recipe.netCarbs || ""}
            onChange={(e) => handleChange("netCarbs", e.target.value)}
            label="Net Carbs"
            fullWidth
            sx={formTextFieldSx}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ width: "100%", mb: 3 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <ListEditor
            variant="bullets"
            label="Ingredients"
            required
            value={recipe.ingredients || ""}
            onChange={(v) => handleChange("ingredients", v)}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <ListEditor
            variant="numbered"
            label="Directions"
            required
            value={recipe.directions || ""}
            onChange={(v) => handleChange("directions", v)}
          />
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
        <Button
          disabled={disabled}
          variant="contained"
          color="primary"
          onClick={() => saveRecipe(recipe)}
        >
          {recipeId ? "Update Recipe" : "Save Recipe"}
        </Button>
        {isOwner() && recipeId && (
          <Button
            variant="outlined"
            color="error"
            onClick={() => setOpenModal(true)}
          >
            Delete Recipe
          </Button>
        )}
      </Box>

      <DeleteRecipeDialog
        open={openModal}
        id={recipe.id || "1"}
        onClose={() => setOpenModal(false)}
      />
    </Box>
  );
};
