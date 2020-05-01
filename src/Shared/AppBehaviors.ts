import { IUser } from "./Types";

const getLocalStorage = (item: string, isString?: boolean) => {
  const result = localStorage.getItem(item);
  if (!result) return false;
  if (isString) return result;
  return JSON.parse(result);
};

export const logIn = (user: IUser) => {
  localStorage.setItem('isLoggedIn', 'true');
  localStorage.setItem('userEmail', user.email);
  localStorage.setItem('isAdmin', user.isAdmin.toString());
  localStorage.setItem('isOwner', user.isOwner.toString());
};

export const logOut = () => {
  localStorage.setItem('isLoggedIn', 'false');
  localStorage.setItem('email', '');
  localStorage.setItem('isAdmin', 'false');
  localStorage.setItem('isOwner', 'false');
  window.location.reload();
};
export const isLoggedIn = (): boolean => !!getLocalStorage('isLoggedIn');
export const userEmail = (): string => getLocalStorage('userEmail', true);
export const isAdmin = (): boolean => !!getLocalStorage('isAdmin');
export const isOwner = (): boolean => !!getLocalStorage('isOwner');
