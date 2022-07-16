import axios from "axios";
import constants from "./constants";

export default axios.create({
  baseURL: constants.API_BASE_URL,
  // validateStatus: () => true, // api return 400 for form errors
});

export const setAxiosToken = (token: string) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else delete axios.defaults.headers.common["Authorization"];
};
