import { IShoppingListItem } from "../Types";
import { userEmail } from "../../Shared/AppBehaviors";
//todo convert file to axios
const apiUrl = (path: string) =>
  `${process.env.REACT_APP_API_URL}/api/shoppingList/${path}`;

export class ShoppingListAPI {
  static get = async (): Promise<IShoppingListItem[]> => {
    const url = apiUrl(userEmail());
    const res = await fetch(url);
    const { list } = await res.json();
    return list;
  };

  static addToList = async (recipeId?: string) => {
    const url = apiUrl(userEmail());
    let res;
    try {
      res = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipeId }),
      });
    } catch {
      return { message: "unknown error", error: true };
    }
    const json = await res.json();
    if (!res.ok) return { message: json.message, error: true };
    return json;
  };

  static removeFromList = async (recipeId: string) => {
    const url = apiUrl(userEmail());
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recipeId }),
    });
    const json = await res.json();
    return json;
  };

  static update = async (list: IShoppingListItem) => {
    const url = apiUrl(userEmail());
    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ list }),
    });
    const json = await res.json();
    return json;
  };
}
