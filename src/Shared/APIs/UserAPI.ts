import { IUser } from "../Types";
import { SnackbarService } from "../SnackbarService";
import { instance } from "../axiosInstance";
import { AxiosRequestConfig } from "axios";
import { logIn } from "../AppBehaviors";

const apiUrl = (path: string) => `${process.env.REACT_APP_API_URL}/api/${path}`;

export class UserAPI {
  static loginToServer = async (user: IUser) => {
    const config: AxiosRequestConfig = {
      data: { user },
    };
    try {
      const res = await instance.post("login", config);
      console.log("res", res);

      logIn(res.data);
      SnackbarService.success("you are now logged in");
      return true;
    } catch (e) {
      console.log(e);
      SnackbarService.error("yikes, that user does not exist");
      return false;
    }
  };

  static createUser = async (user: IUser) => {
    const userCopy = { ...user, email: user.email.toLowerCase() };
    const config: AxiosRequestConfig = {
      data: { user: userCopy },
    };
    try {
      await instance.post("users", config);
      SnackbarService.success(
        "user created, now login with that username and password"
      );
      return true;
    } catch {
      SnackbarService.error("that user already exists, please try logging in");
      return false;
    }
  };

  static getAllUsers = async (): Promise<IUser[]> => {
    const res = await instance.get("users");
    return res.data;
  };
  //todo convert to axios
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
