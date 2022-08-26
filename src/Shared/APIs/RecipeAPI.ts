import { IRecipe, IReview } from "../Types";
import { herokuInstance, netlifyInstance } from "../axiosInstance";
import { AxiosRequestConfig } from "axios";

interface FiltersPayload {
  regions: string[];
  types: string[];
  mainIngredients: string[];
  sources: string[];
  ratings: number[];
}

export class RecipeAPI {
  static getAllRecipes = async (): Promise<IRecipe[]> => {
    const { data } = await netlifyInstance.get("get-all-recipes");
    return data.recipes;
  };

  static getFilters = async (): Promise<FiltersPayload> => {
    const res = await herokuInstance.get("recipes/filters");
    return res.data;
  };

  static getRecipe = async (id: string): Promise<IRecipe> => {
    try {
      const res = await herokuInstance.get(`recipes/${id}`);
      return res.data;
    } catch {
      window.location.href = "/all";
      //@ts-ignore
      return;
    }
  };

  static deleteRecipe = async (id: string) => {
    await herokuInstance.delete(`recipes/${id}`);
    return;
  };

  static saveRecipe = async (recipe: IRecipe) => {
    const config: AxiosRequestConfig = {
      data: { recipe },
    };
    const res = await herokuInstance.patch(`recipes/${recipe.id}`, config);
    return res.data;
  };

  static reviewRecipe = async (review: IReview): Promise<string> => {
    const config: AxiosRequestConfig = {
      data: { review },
    };
    const res = await herokuInstance.post("reviews", config);
    return res.data;
  };

  static getUserRecipeReview = async (
    userEmail: string,
    recipeId: string
  ): Promise<IReview | undefined> => {
    const url = `reviews/${recipeId}/${userEmail}`;
    const res = await herokuInstance.get(url);
    return res.data;
  };

  static getReviews = async (id: string): Promise<IReview[]> => {
    const res = await herokuInstance.get(`reviews/${id}`);
    return res.data;
  };

  static uploadImage = async (
    image: string,
    recipeId: string
  ): Promise<string> => {
    const config: AxiosRequestConfig = {
      data: { image, recipeId },
    };
    const res = await herokuInstance.post("image", config);
    return res.data.link;
  };
}
