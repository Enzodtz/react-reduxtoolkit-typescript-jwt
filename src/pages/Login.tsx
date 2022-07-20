import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "app/hooks";
import { login, register as authRegister } from "features/auth/authSlice";
import { LoginFormType, RegisterFormType } from "common/types/auth";
import { useEffect, useState } from "react";

function Login() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormType>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    user,
    loading,
    globalError,
    fieldErrors: serverFieldErrors,
  } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
    // @ts-ignore
    for (const [key, value] of Object.entries(serverFieldErrors)) {
      // @ts-ignore
      setError(key, { type: "custom", message: value[0] });
    }
  }, [user, serverFieldErrors, loading, navigate, dispatch, setError]);

  // TODO: Add form validation (with yum?)
  const onSubmit: SubmitHandler<LoginFormType> = (data) => {
    dispatch(login(data));
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {globalError != "" && <p>Error: {globalError}</p>}

        <input {...register("email")} placeholder="Email" />
        {errors.email && <p>{errors.email.message}</p>}
        <br />
        <input {...register("password")} placeholder="Password" />
        {errors.password && <p>{errors.password.message}</p>}
        <br />
        <input
          type="submit"
          value={loading ? "Loading..." : "Send"}
          disabled={loading}
        />
      </form>
    </>
  );
}

export default Login;
