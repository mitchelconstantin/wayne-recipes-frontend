import { IRecipe, IReview } from "../Types";
import { netlifyInstance } from "../axiosInstance";
import { AxiosRequestConfig } from "axios";
import { SnackbarService } from "../SnackbarService";

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
    const { data } = await netlifyInstance.get("get-all-filters");
    return data;
  };

  static getRecipe = async (id: string): Promise<IRecipe | null> => {
    try {
      const { data } = await netlifyInstance.get(`get-one-recipe/?id=${id}`);
      console.log("got here, returning data", data);
      return data.recipe;
    } catch (e) {
      console.log("got netlify err", e);
      SnackbarService.error("Error fetching recipe");
      setTimeout(() => (window.location.href = "/all"), 1500);
      return null;
    }
  };

  static deleteRecipe = async (id: string) => {
    await netlifyInstance.delete(`delete-one-recipe/?id=${id}`);
    return;
  };

  static saveRecipe = async (recipe: IRecipe) => {
    const config: AxiosRequestConfig = {
      data: { recipe },
    };
    try {
      const { data } = await netlifyInstance.patch(
        `patch-one-recipe/?id=${recipe.id}`,
        config
      );
      SnackbarService.success(`successfully updated ${data.recipe.title}`);
      return data.recipe;
    } catch {
      SnackbarService.error("error updating recipe");
    }
  };

  static reviewRecipe = async (review: IReview): Promise<string> => {
    const config: AxiosRequestConfig = {
      data: { review },
    };
    const res = await netlifyInstance.post("post-one-review", config);
    return res.data;
  };

  static getUserRecipeReview = async (
    userEmail: string,
    recipeId: string
  ): Promise<IReview | undefined> => {
    const url = `get-user-recipe-review/?recipeId=${recipeId}&email=${userEmail}`;
    const { data } = await netlifyInstance.get(url);
    return data.review;
  };

  static getReviews = async (recipeId: string): Promise<IReview[]> => {
    const url = `get-all-recipe-reviews/?recipeId=${recipeId}`;
    const { data } = await netlifyInstance.get(url);
    return data.reviews;
  };

  static uploadImage = async (
    image: string,
    recipeId: string
  ): Promise<string> => {
    const config: AxiosRequestConfig = {
      data: { image, recipeId },
    };
    const res = await netlifyInstance.post("upload-one-photo", config);
    return res.data.link;
  };
}
