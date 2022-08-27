import axios from "axios";
import { getToken, logOut } from "./AppBehaviors";
import { SnackbarService } from "./SnackbarService";

const netlifyInstance = axios.create({
  baseURL: `/.netlify/functions/`,
});

netlifyInstance.interceptors.request.use(
  function (config) {
    const token = getToken();
    config.headers.Authorization = token;
    return config;
  },
  function (error) {
    console.log("err in intercepted request", error);
    return Promise.reject(error);
  }
);

netlifyInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("err in intercepted response", error);

    if (error?.config?.url === "login") {
      SnackbarService.error(error.response.data.message);
    } else if (error?.response?.status === 401) {
      alert("Your session has expired, please login again");
      logOut();
    } else if (error?.response?.status === 403) {
      SnackbarService.error(
        "You do not have permission to access that resource"
      );
    } else {
      SnackbarService.error(
        error?.response?.data?.message || "unknown error occured"
      );
    }
    return Promise.reject(error);
  }
);

export { netlifyInstance };
