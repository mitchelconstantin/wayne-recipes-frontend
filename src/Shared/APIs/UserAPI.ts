import { IUser } from "../Types";
import { SnackbarService } from "../SnackbarService";
import { netlifyInstance } from "../axiosInstance";
import { AxiosRequestConfig } from "axios";
import { logIn } from "../AppBehaviors";

export class UserAPI {
  static loginToServer = async (user: IUser) => {
    const config: AxiosRequestConfig = {
      data: { user },
    };
    try {
      const res = await netlifyInstance.post("log-user-in", config);
      console.log("response", res);
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
      await netlifyInstance.post("create-one-user", config);
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
      const { data } = await netlifyInstance.get("get-all-users");
      return data.users;
    } catch (err: any) {
      SnackbarService.error(err.message);
      return [];
    }
  };

  static updateUsers = async (users: IUser[]) => {
    const config: AxiosRequestConfig = {
      data: { users },
    };
    try {
      const res = await netlifyInstance.patch("update-user-permission", config);
      return res.data;
    } catch {
      SnackbarService.error("that user already exists, please try logging in");
      return;
    }
  };
}
