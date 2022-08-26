/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Button, TextField, Typography, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { ImageUploader } from "./ImageUploader";
import { isOwner } from "../Shared/AppBehaviors";
import { IRecipe, emptyRecipe, emptyFilterOptions } from "../Shared/Types";
import { RecipeAPI } from "../Shared/APIs/RecipeAPI";
import { SnackbarService } from "../Shared/SnackbarService";
import { useContainerStyles } from "../Shared/formStyles";
import { Loading } from "../Shared/Components/Loading";
import { Dropdown } from "./Dropdown";
import { DeleteRecipeDialog } from "./DeleteRecipeDialog";

const getRecipeData = async (recipeId: string) => {
  let recipe;
  if (!recipeId) {
    recipe = emptyRecipe;
  } else {
    recipe = await RecipeAPI.getRecipe(recipeId);
  }
  const filters = await RecipeAPI.getFilters();
  if (!recipe) {
    SnackbarService.error("could not find that recipe");
    window.location.href = "/";
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
  const classes = useContainerStyles();

  useEffect(() => {
    getRecipeData(recipeId).then(({ recipe, filters }) => {
      setFilters(filters);
      setRecipe(recipe);
      setLoading(false);
    });
  }, []);

  const handleChange = (type: string, newValue: any) => {
    setRecipe((prev) => ({ ...prev, [type]: newValue }));
  };
  const disabled = !(recipe.title && recipe.ingredients && recipe.directions);
  if (loading) return <Loading />;
  return (
    <Box className={classes.formContainer}>
      <Typography variant="h6" gutterBottom>
        {recipeId ? "edit this recipe" : "Add a new recipe "}
      </Typography>
      <ImageUploader
        setPicture={(newImage: string) => handleChange("picture", newImage)}
        picture={recipe.picture}
      />
      <TextField
        value={recipe.title || ""}
        onChange={(e) => handleChange("title", e.target.value)}
        required
        id="title"
        label="Title"
        className={classes.formTextField}
      />
      <Dropdown
        handleChange={(e: any, value: any) => {
          handleChange("type", value);
        }}
        items={filters.types}
        value={recipe.type || ""}
        title={"Recipe Type"}
      />
      <Dropdown
        handleChange={(e: any, value: any) => {
          handleChange("source", value);
        }}
        items={filters.sources}
        value={recipe.source || ""}
        title={"Source"}
      />
      <TextField
        value={recipe.serves || ""}
        onChange={(e) => handleChange("serves", e.target.value)}
        required
        id="serves"
        label="Serves"
        className={classes.formTextField}
      />
      <Dropdown
        handleChange={(e: any, value: any) =>
          handleChange("mainIngredient", value)
        }
        items={filters.mainIngredients}
        value={recipe.mainIngredient || ""}
        title={"Main Ingredient"}
      />
      <Dropdown
        handleChange={(e: any, value: any) => handleChange("region", value)}
        items={filters.regions}
        value={recipe.region || ""}
        title={"Region"}
      />
      <TextField
        value={recipe.netCarbs || ""}
        onChange={(e) => handleChange("netCarbs", e.target.value)}
        required
        id="netCarbs"
        label="Net Carbs"
        className={classes.formTextField}
      />
      <TextField
        value={recipe.ingredients || ""}
        onChange={(e) => handleChange("ingredients", e.target.value)}
        required
        id="ingredients"
        className={classes.formTextField}
        label="Ingredients"
        multiline
        rows="4"
      />
      <TextField
        value={recipe.directions || ""}
        onChange={(e) => handleChange("directions", e.target.value)}
        required
        id="directions"
        label="Directions"
        className={classes.formTextField}
        multiline
        rows="4"
      />
      <Button
        disabled={disabled}
        style={{ margin: "8px" }}
        color="primary"
        variant="contained"
        onClick={() => saveRecipe(recipe)}
      >
        {recipeId ? "update recipe" : "save new recipe"}
      </Button>
      {isOwner() && recipeId && (
        <Button
          style={{ margin: "8px", marginTop: "100px", color: "red" }}
          onClick={() => setOpenModal(true)}
          variant="contained"
        >
          delete recipe
        </Button>
      )}
      <DeleteRecipeDialog
        open={openModal}
        id={recipe.id || "1"}
        onClose={() => setOpenModal(false)}
      />
    </Box>
  );
};
