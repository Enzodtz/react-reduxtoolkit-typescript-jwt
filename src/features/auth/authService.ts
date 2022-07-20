import { LoginFormType, RegisterFormType, UserType } from "common/types/auth";
import axios, { setAxiosToken } from "config/axios";
import jwt from "jwt-decode";

const REGISTER_URL = "/api/users/";
const LOGIN_URL = "/api/auth/login/";
const REFRESH_URL = "/api/auth/refresh/";
const VERIFY_URL = "/api/auth/verify/";

const save = (user: UserType) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const register = async (userData: RegisterFormType) => {
  return axios.post(REGISTER_URL, userData);
};

const login = async (userData: LoginFormType) => {
  return axios.post(LOGIN_URL, userData);
};

const refresh = async (token: string) => {
  return axios.post(REFRESH_URL, { refresh: token });
};

const load = () => {
  // @ts-ignore
  return JSON.parse(localStorage.getItem("user"));
};

const verify = async (token: string) => {
  const decodedToken: any = jwt(token);
  if (new Date(decodedToken.exp * 1000) < new Date()) return false;
  try {
    const response = await axios.post(VERIFY_URL, { token: token });
    return true;
  } catch {
    return false;
  }
};
const authService = {
  register,
  login,
  load,
  refresh,
  verify,
  save,
};
export default authService;
