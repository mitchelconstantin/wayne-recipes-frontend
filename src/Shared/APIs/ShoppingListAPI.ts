import { IShoppingListItem } from "../Types";
import { userEmail } from "../../Shared/AppBehaviors";
import { netlifyInstance } from "../axiosInstance";
import { AxiosRequestConfig } from "axios";

export class ShoppingListAPI {
  static get = async (): Promise<IShoppingListItem[]> => {
    const { data } = await netlifyInstance.get(
      `get-user-shopping-list/?email=${userEmail()}`
    );
    return data.list;
  };

  static addToList = async (recipeId?: string) => {
    const url = `add-one-to-shopping-list/`;
    const config: AxiosRequestConfig = {
      data: { recipeId, userEmail: userEmail() },
    };
    try {
      const res = await netlifyInstance.post(url, config);
      return res.data;
    } catch {
      return { message: "unknown error", error: true };
    }
  };

  static removeFromList = async (recipeId: string) => {
    const url = `remove-one-from-shopping-list/`;
    const config: AxiosRequestConfig = {
      data: { recipeId, userEmail: userEmail() },
    };
    const res = await netlifyInstance.delete(url, config);
    return res.data;
  };

  static update = async (list: IShoppingListItem) => {
    const url = `update-shopping-list-item`;
    const config: AxiosRequestConfig = {
      data: { list, userEmail: userEmail() },
    };
    const res = await netlifyInstance.patch(url, config);
    return res.data;
  };
}
