import { emptyUser, IUser } from "./Types";
import jwt_decode from "jwt-decode";

const TOKEN = "token";

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
