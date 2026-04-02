import Fuse from "fuse.js";
import { IRecipe, IFilters } from "../Shared/Types";

const fuse = new Fuse<IRecipe>([], {
  keys: [
    { name: "title", weight: 4 },
    { name: "mainIngredient", weight: 3 },
    { name: "ingredients", weight: 2 },
    { name: "region", weight: 1 },
    { name: "type", weight: 1 },
    { name: "source", weight: 1 },
  ],
  threshold: 0.4,
  ignoreLocation: true,
  includeScore: true,
});

export class RecipeTransform {
  static filterByAttribute = (
    recipes: IRecipe[],
    atttribute: string,
    val: any,
  ) => {
    //@ts-ignore
    const result = recipes.filter((recipe) => recipe[atttribute] === val);
    return result;
  };

  static filterByAttributeMinimmum = (
    recipes: IRecipe[],
    atttribute: string,
    val: any,
  ) => {
    //@ts-ignore
    const result = recipes.filter((recipe) => recipe[atttribute] >= val);
    return result;
  };

  static filterBySearchTerm = (recipes: IRecipe[], searchTerm: string) => {
    fuse.setCollection(
      recipes.map((r) => ({
        ...r,
        ingredients: (r.ingredients ?? "").split(/\r?\n/).filter(Boolean),
      })) as any,
    );
    return fuse.search(searchTerm).map((r) => recipes[r.refIndex]);
  };

  static filterRecipes = (recipes: IRecipe[], selectedFilters: IFilters) => {
    const {
      mainIngredient,
      region,
      type,
      source,
      rating,
      debouncedSearchTerm,
    } = selectedFilters;

    let filteredResults = recipes;
    if (mainIngredient) {
      filteredResults = RecipeTransform.filterByAttribute(
        filteredResults,
        "mainIngredient",
        mainIngredient,
      );
    }

    if (region) {
      filteredResults = RecipeTransform.filterByAttribute(
        filteredResults,
        "region",
        region,
      );
    }

    if (type) {
      filteredResults = RecipeTransform.filterByAttribute(
        filteredResults,
        "type",
        type,
      );
    }

    if (source) {
      filteredResults = RecipeTransform.filterByAttribute(
        filteredResults,
        "source",
        source,
      );
    }

    if (rating) {
      filteredResults = RecipeTransform.filterByAttributeMinimmum(
        filteredResults,
        "rating",
        rating,
      );
    }

    if (debouncedSearchTerm) {
      filteredResults = RecipeTransform.filterBySearchTerm(
        filteredResults,
        debouncedSearchTerm,
      );
    }
    return filteredResults;
  };
}
