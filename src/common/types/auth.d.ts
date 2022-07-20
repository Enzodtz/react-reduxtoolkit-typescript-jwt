export type RegisterFormType = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export type LoginFormType = {
  email: string;
  password: string;
};

export type UserType = {
  id: number;
  name: string;
  email: string;
  refresh: string;
  access: string;
  accessExp: number;
  refreshExp: number;
};

export type AuthStateType = {
  user?: UserType | null;
  fieldErrors: Object;
  globalError: string;
  loading: boolean;
};
