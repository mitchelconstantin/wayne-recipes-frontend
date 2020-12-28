import { IShoppingListItem } from "../Types";
import { userEmail } from "../../Shared/AppBehaviors";
import { instance } from "../axiosInstance";
import { AxiosRequestConfig } from "axios";

export class ShoppingListAPI {
  static get = async (): Promise<IShoppingListItem[]> => {
    const url = `shoppingList/${userEmail()}`;
    const res = await instance.get(url);
    return res.data.list;
  };

  static addToList = async (recipeId?: string) => {
    const url = `shoppingList/${userEmail()}`;
    const config: AxiosRequestConfig = {
      data: { recipeId },
    };
    try {
      const res = await instance.post(url, config);
      return res.data;
    } catch {
      return { message: "unknown error", error: true };
    }
  };

  static removeFromList = async (recipeId: string) => {
    const url = `shoppingList/${userEmail()}`;
    const config: AxiosRequestConfig = {
      data: { recipeId },
    };
    const res = await instance.delete(url, config);
    return res.data;
  };

  static update = async (list: IShoppingListItem) => {
    const url = `shoppingList/${userEmail()}`;
    const config: AxiosRequestConfig = {
      data: { list },
    };
    const res = await instance.patch(url, config);
    return res.data;
  };
}
