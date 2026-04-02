import Fuse from "fuse.js";
import { IRecipe, IFilters } from "../Shared/Types";

const fuse = new Fuse<IRecipe>([], {
  keys: [
    { name: "title", weight: 4 },
    { name: "mainIngredient", weight: 3 },
  ],
  threshold: 0.2,
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
    fuse.setCollection(recipes);
    const fuseResults = fuse.search(searchTerm);
    const fuseMatchedIds = new Set(fuseResults.map((r) => r.item.id));

    const term = searchTerm.toLowerCase();
    const exactMatches = recipes.filter(
      (r) =>
        !fuseMatchedIds.has(r.id) &&
        [r.region, r.type, r.source, r.ingredients]
          .some((field) => (field ?? "").toLowerCase().includes(term)),
    );

    return [...fuseResults.map((r) => r.item), ...exactMatches];
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
