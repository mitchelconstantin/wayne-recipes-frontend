import { IUser } from "../Types";
import { SnackbarService } from "../SnackbarService";

const apiUrl = (path: string) => `${process.env.REACT_APP_API_URL}/api/${path}`;

export class UserAPI {
  static loginToServer = async (user: IUser) => {
    const url = apiUrl("login");
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user }),
    });
    return res;
  };

  static createUser = async (user: IUser) => {
    const userCopy = { ...user, email: user.email.toLowerCase() };
    const url = apiUrl("users");
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: userCopy }),
    });
    if (res.status === 400)
      SnackbarService.error("that user already exists, please try logging in");
    if (res.status === 200) {
      SnackbarService.success(
        "user created, now login with that username and password"
      );
    }
    return;
  };

  static getAllUsers = async (): Promise<IUser[]> => {
    const url = apiUrl("users");
    const res = await fetch(url);
    const json = await res.json();
    return json;
  };

  static updateUsers = async (users: IUser[]) => {
    const url = apiUrl("users");
    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ users }),
    });
    const json = await res.json();
    return json;
  };
}
