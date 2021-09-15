import { IUser } from "../Types";
import { SnackbarService } from "../SnackbarService";
import { instance } from "../axiosInstance";
import { AxiosRequestConfig } from "axios";
import { logIn } from "../AppBehaviors";

export class UserAPI {
  static loginToServer = async (user: IUser) => {
    const config: AxiosRequestConfig = {
      data: { user },
    };
    try {
      const res = await instance.post("login", config);
      logIn(res.data.token);
      SnackbarService.success("you are now logged in");
      return true;
    } catch (e) {
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
        "user created, now login with that email and password"
      );
      return true;
    } catch {
      return false;
    }
  };

  static getAllUsers = async (): Promise<IUser[]> => {
    try {
      const res = await instance.get("users");
      return res.data;
    } catch (err: any) {
      SnackbarService.error(err.message);
      return [];
    }
  };

  static updateUsers = async (users: IUser[]) => {
    const config: AxiosRequestConfig = {
      data: { users: users },
    };
    try {
      const res = await instance.patch("users", config);
      return res.data;
    } catch {
      SnackbarService.error("that user already exists, please try logging in");
      return;
    }
  };
}
