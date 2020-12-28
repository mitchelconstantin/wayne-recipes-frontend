import axios from "axios";
import { getToken, getUserInfo, logOut } from "./AppBehaviors";
import { SnackbarService } from "./SnackbarService";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api/`,
});

instance.interceptors.request.use(
  function (config) {
    const token = getToken();
    console.log("token", token);
    config.headers.Authorization = token;
    return config;
  },
  function (error) {
    console.log("looks like an err", error);
    // Do something with request error
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("got an err (in handler)", error);
    return Promise.reject(error);

    //todo reconfigure these if statements once using token validation
    //one route for logged out users, one for not enough permission
    // if (error?.config?.url === "auth/login/") {
    //   SnackbarService.error(error.response.data.detail);
    // } else if (error?.response?.status === 401) {
    //   alert("Your session has expired, please login again");
    //   logOut();
    // } else if (error?.response?.status === 403) {
    //   SnackbarService.error(
    //     "You do not have permission to access that resource"
    //   );
    // }
    // return Promise.reject(error);
  }
);

export { instance };
