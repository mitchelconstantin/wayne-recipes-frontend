import { fakeReviews, IRecipe, IReview } from "../Types";

interface FiltersPayload {
  regions: string[];
  types: string[];
  mainIngredients: string[];
  sources: string[];
}

async function stall(stallTime = 3000) {
  await new Promise((resolve) => setTimeout(resolve, stallTime));
}

const apiUrl = (path: string) => `${process.env.REACT_APP_API_URL}/api/${path}`;

export class RecipeAPI {
  static getAllRecipes = async (): Promise<IRecipe[]> => {
    const url = apiUrl("recipes");
    const res = await fetch(url);
    const { recipes } = await res.json();
    return recipes;
  };
  static getFilters = async (): Promise<FiltersPayload> => {
    const url = apiUrl("recipes/filters");
    const res = await fetch(url);
    const json = await res.json();
    return json;
  };

  static getRecipe = async (id: string): Promise<IRecipe> => {
    const url = apiUrl(`recipes/${id}`);
    const res = await fetch(url);
    if (!res.ok) window.location.href = "/all";
    const recipe = await res.json();
    return recipe;
  };

  static deleteRecipe = async (id: string) => {
    const url = apiUrl(`recipes/${id}`);
    await fetch(url, { method: "DELETE" });
    return;
  };

  static saveRecipe = async (recipe: IRecipe) => {
    const url = apiUrl(`recipes/${recipe.id}`);
    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recipe }),
    });
    const json = await res.json();
    return json;
  };

  //todo complete this endpoint
  static reviewRecipe = async (review: IReview): Promise<string> => {
    const url = apiUrl("recipes/review");

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    });
    const json = await res.json();
    return json.link;
  };

  //todo complete this endpoint
  static getReviews = async (id: string): Promise<IReview[]> => {
    const url = apiUrl(`recipes/review/${id}`);
    // const res = await fetch(url);
    // // if (!res.ok) window.location.href = "/all";
    // const reviews = await res.json();
    // return reviews;
    await stall();
    return fakeReviews;
  };

  static uploadImage = async (
    image: string,
    recipeId: string
  ): Promise<string> => {
    const url = apiUrl("image");

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image, recipeId }),
    });
    const json = await res.json();
    return json.link;
  };
}
