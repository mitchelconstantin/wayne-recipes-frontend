import { emptyUser, IRecipe, IUser } from "./Types";
import jwt_decode from "jwt-decode";

const TOKEN = "token";
const LOCAL_RECIPES = "localRecipes";

export const logIn = (token: string) => {
  localStorage.setItem(TOKEN, token);
};

export const logOut = () => {
  localStorage.removeItem(TOKEN);
  window.location.reload();
};
export const isLoggedIn = (): boolean => !!getToken();
export const userEmail = (): string => getUserInfo().email;
export const isAdmin = (): boolean => isLoggedIn() && getUserInfo().isAdmin;
export const isOwner = (): boolean => isLoggedIn() && getUserInfo().isOwner;
export const getToken = (): string => localStorage.getItem(TOKEN) || "";

export const getUserInfo = (): IUser => {
  const token = getToken();
  if (!token) return emptyUser;
  const decoded: IUser = jwt_decode(token);
  return decoded;
};

export const getLocalRecipes = (): IRecipe[] => {
  const r = localStorage.getItem(LOCAL_RECIPES) || null;
  if (!r) return [];
  try {
    const result = JSON.parse(r);
    return result;
  } catch (err) {
    return [];
  }
};

export const storeLocalRecipes = (recipes: IRecipe[]) => {
  const stringified = JSON.stringify(recipes);
  localStorage.setItem(LOCAL_RECIPES, stringified);
};
