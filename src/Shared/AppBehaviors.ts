import { emptyUser, IUser } from "./Types";
import jwt_decode from "jwt-decode";

// const IS_LOGGED_IN = "isLoggedIn";
// const USER_EMAIL = "userEmail";
// const IS_ADMIN = "isAdmin";
// const IS_OWNER = "isOwner";
const TOKEN = "token";

// const getLocalStorage = (item: string, isString?: boolean) => {
//   const result = localStorage.getItem(item);
//   if (!result) return false;
//   if (isString) return result;
//   return JSON.parse(result);
// };

export const logIn = (token: string) => {
  // localStorage.setItem(IS_LOGGED_IN, "true");
  // localStorage.setItem(USER_EMAIL, user.email);
  // localStorage.setItem(IS_ADMIN, user.isAdmin.toString());
  // localStorage.setItem(IS_OWNER, user.isOwner.toString());
  localStorage.setItem(TOKEN, token);
};

export const logOut = () => {
  // localStorage.setItem(IS_LOGGED_IN, "false");
  // localStorage.setItem(USER_EMAIL, "");
  // localStorage.setItem(IS_ADMIN, "false");
  // localStorage.setItem(IS_OWNER, "false");
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
