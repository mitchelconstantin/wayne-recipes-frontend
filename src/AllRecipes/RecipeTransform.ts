import Fuse from "fuse.js";
import { IRecipe, IFilters } from "../Shared/Types";

const CATEGORICAL_KEYS = [
  "mainIngredient",
  "region",
  "type",
  "source",
] as const;

const fuseTitles = new Fuse<IRecipe>([], {
  keys: [{ name: "title", weight: 1 }],
  threshold: 0.2,
  ignoreLocation: true,
  includeScore: true,
});

const fuseCategories = new Fuse<IRecipe>([], {
  keys: CATEGORICAL_KEYS.map((k) => ({ name: k, weight: 1 })),
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
    const term = searchTerm.toLowerCase();
    const seen = new Set<string>();
    const result: IRecipe[] = [];

    const addIfNew = (recipe: IRecipe) => {
      if (recipe.id && !seen.has(recipe.id)) {
        seen.add(recipe.id);
        result.push(recipe);
      }
    };

    const unseen = () => recipes.filter((r) => r.id && !seen.has(r.id));

    // Tier 1: exact title match
    recipes
      .filter((r) => r.title.toLowerCase().includes(term))
      .forEach(addIfNew);

    // Tier 2: exact categorical match (region, mainIngredient, type, source)
    recipes
      .filter((r) =>
        CATEGORICAL_KEYS.some((k) => (r[k] ?? "").toLowerCase().includes(term)),
      )
      .forEach(addIfNew);

    // Tier 3: fuzzy title match
    fuseTitles.setCollection(unseen());
    fuseTitles.search(searchTerm).forEach((r) => addIfNew(r.item));

    // Tier 4: fuzzy categorical match
    fuseCategories.setCollection(unseen());
    fuseCategories.search(searchTerm).forEach((r) => addIfNew(r.item));

    // Tier 5: ingredient match (exact substring)
    recipes
      .filter(
        (r) =>
          r.id &&
          !seen.has(r.id) &&
          (r.ingredients ?? "").toLowerCase().includes(term),
      )
      .forEach(addIfNew);

    return result;
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
