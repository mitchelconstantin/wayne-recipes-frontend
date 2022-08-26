import Hashids from "hashids";
const hashids = new Hashids("wayne-recipes", 6);

export const configureRecipe = (recipe) => {
  return { ...recipe, id: encode(recipe.id) };
};

export const configureListItem = (listItem) => {
  return { ...listItem, recipe_id: encode(listItem.recipe_id) };
};

export const encode = (dbId) => {
  const recipeId = hashids.encode(dbId);
  return recipeId;
};

export const decode = (recipeId) => {
  const [dbId] = hashids.decode(recipeId);
  return dbId;
};
