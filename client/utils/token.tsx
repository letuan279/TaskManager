import apiClient from "../api/apiClient";

export const setupToken = () => {
  if (localStorage.getItem("token")) {
    apiClient.defaults.headers.authorization =
      "Bearer " + localStorage.getItem("token");
  }
};
