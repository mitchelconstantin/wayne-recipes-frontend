import { RecipeTransform } from "./RecipeTransform";
import { IRecipe } from "../Shared/Types";

const baconGuacamoleDevileEggs: IRecipe = {
  id: "1",
  title: "Bacon Guacamole Deviled Eggs",
  source: "Internet",
  serves: "12 eggs",
  mainIngredient: "Eggs",
  region: "American",
  type: "Appetizer",
  ingredients: `6 large eggs, hard-boiled
4 strips thick cut bacon, cooked crisp and crumbled, divided
1 large avocado, peeled, pitted and cubed
2 tablespoons salsa
2 cloves garlic, minced
1 tablespoon fresh lime juice
1 tablespoon dried minced onion (I use this brand)
½ teaspoon sea salt
pinch of cayenne pepper`,
  directions:
    "Slice the eggs in half, pop the yolks out into a large mixing bowl and fork mash.",
  picture: undefined,
  netCarbs: undefined,
  rating: undefined,
  numberOfReviews: undefined,
};

const unrelatedRecipe: IRecipe = {
  id: "2",
  title: "Spaghetti Bolognese",
  mainIngredient: "Beef",
  region: "Italian",
  type: "Dinner",
  source: "Internet",
  ingredients: "ground beef\ntomato sauce\nspaghetti\nonion\ngarlic",
};

const lasagna: IRecipe = {
  id: "3",
  title: "Lasagna/Spaghetti Sauce with Beef",
  mainIngredient: "Tomato",
  region: "Italian",
  type: "Sauce",
  source: "Wayne",
  ingredients:
    "1 lb ground beef\n1 tbsp of cooking oil\n1 med onion, chopped\n1 clove garlic, chopped\n1 (6 oz) can tomato paste\n1 (16 oz) can tomato sauce\n1 can stewed tomatoes\n8 oz chopped mushrooms\n1 tsp salt\n1 1/2 tsp oregano\n1/2 tsp black pepper",
};

const koreanBeefBowl: IRecipe = {
  id: "4",
  title: "Korean Beef Bowl",
  mainIngredient: "Beef",
  region: "Korean",
  type: "Dinner",
  source: "Internet",
  ingredients: "1 lb ground beef\nsoy sauce\nsesame oil\nginger",
};

describe("RecipeTransform.filterBySearchTerm", () => {
  it('returns the avocado recipe when searching "avocado"', () => {
    const recipes = [baconGuacamoleDevileEggs, unrelatedRecipe];
    const results = RecipeTransform.filterBySearchTerm(recipes, "avocado");
    const titles = results.map((r) => r.title);
    expect(titles).toContain("Bacon Guacamole Deviled Eggs");
  });

  it('does not return unrelated recipes when searching "avocado"', () => {
    const recipes = [baconGuacamoleDevileEggs, unrelatedRecipe];
    const results = RecipeTransform.filterBySearchTerm(recipes, "avocado");
    const titles = results.map((r) => r.title);
    expect(titles).not.toContain("Spaghetti Bolognese");
  });

  it('returns the avocado recipe when searching "guacamole" via title', () => {
    const recipes = [baconGuacamoleDevileEggs, unrelatedRecipe];
    const results = RecipeTransform.filterBySearchTerm(recipes, "guacamole");
    const titles = results.map((r) => r.title);
    expect(titles).toContain("Bacon Guacamole Deviled Eggs");
  });

  it('does not return lasagna when searching "korean" even though it has oregano', () => {
    const recipes = [lasagna, koreanBeefBowl];
    const results = RecipeTransform.filterBySearchTerm(recipes, "korean");
    const titles = results.map((r) => r.title);
    expect(titles).not.toContain("Lasagna/Spaghetti Sauce with Beef");
    expect(titles).toContain("Korean Beef Bowl");
  });

  it('returns lasagna when searching "oregano" via exact ingredient match', () => {
    const recipes = [lasagna, koreanBeefBowl];
    const results = RecipeTransform.filterBySearchTerm(recipes, "oregano");
    const titles = results.map((r) => r.title);
    expect(titles).toContain("Lasagna/Spaghetti Sauce with Beef");
    expect(titles).not.toContain("Korean Beef Bowl");
  });

  it('ranks exact region match above fuzzy title match when searching "asian"', () => {
    const italianSausageSoup: IRecipe = {
      id: "5",
      title: "Italian Sausage Soup",
      mainIngredient: "Italian Sausage",
      region: "Italian",
      type: "Soup",
      source: "Internet",
      ingredients: "1 pound Italian sausage\n1 clove garlic, minced\n1 (14.5 oz) can Italian-style stewed tomatoes",
    };
    const loMein: IRecipe = {
      id: "6",
      title: "Lo Mein, Shrimp",
      mainIngredient: "Shrimp",
      region: "Asian",
      type: "Pasta",
      source: "Internet",
      ingredients: "2 tablespoons vegetable oil\n1 pound small shrimp\nsoy sauce\nsesame oil",
    };
    const results = RecipeTransform.filterBySearchTerm([italianSausageSoup, loMein], "asian");
    const titles = results.map((r) => r.title);
    expect(titles).toContain("Lo Mein, Shrimp");
    expect(titles.indexOf("Lo Mein, Shrimp")).toBeLessThan(
      titles.indexOf("Italian Sausage Soup") === -1 ? Infinity : titles.indexOf("Italian Sausage Soup"),
    );
  });
});
