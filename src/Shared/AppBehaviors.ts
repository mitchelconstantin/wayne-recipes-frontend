import { IUser } from "./Types";

const IS_LOGGED_IN = "isLoggedIn";
const USER_EMAIL = "userEmail";
const IS_ADMIN = "isAdmin";
const IS_OWNER = "isOwner";
const TOKEN = "token";

const getLocalStorage = (item: string, isString?: boolean) => {
  const result = localStorage.getItem(item);
  if (!result) return false;
  if (isString) return result;
  return JSON.parse(result);
};

export const logIn = (user: IUser) => {
  localStorage.setItem(IS_LOGGED_IN, "true");
  localStorage.setItem(USER_EMAIL, user.email);
  localStorage.setItem(IS_ADMIN, user.isAdmin.toString());
  localStorage.setItem(IS_OWNER, user.isOwner.toString());
  localStorage.setItem(TOKEN, "testToken");
};

export const logOut = () => {
  localStorage.setItem(IS_LOGGED_IN, "false");
  localStorage.setItem(USER_EMAIL, "");
  localStorage.setItem(IS_ADMIN, "false");
  localStorage.setItem(IS_OWNER, "false");
  localStorage.setItem(TOKEN, "");
  window.location.reload();
};
export const isLoggedIn = (): boolean => !!getLocalStorage(IS_LOGGED_IN);
export const userEmail = (): string => getLocalStorage(USER_EMAIL, true);
export const isAdmin = (): boolean => !!getLocalStorage(IS_ADMIN);
export const isOwner = (): boolean => !!getLocalStorage(IS_OWNER);
export const getToken = (): string => getLocalStorage(TOKEN, true);

export const getUserInfo = () => ({
  isLoggedIn: isLoggedIn(),
  email: userEmail(),
  isAdmin: isAdmin(),
  isOwner: isOwner(),
  token: getToken(),
});
