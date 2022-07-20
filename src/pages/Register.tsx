import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "app/hooks";
import { register as authRegister } from "features/auth/authSlice";
import { RegisterFormType } from "common/types/auth";
import { useEffect, useState } from "react";

function Register() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterFormType>();
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
  const onSubmit: SubmitHandler<RegisterFormType> = (data) => {
    dispatch(authRegister(data));
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {globalError != "" && <p>Error: {globalError}</p>}

        <input {...register("name")} placeholder="Name" />
        {errors.name && <p>{errors.name.message}</p>}
        <br />
        <input {...register("email")} placeholder="Email" />
        {errors.email && <p>{errors.email.message}</p>}
        <br />
        <input {...register("password")} placeholder="Password" />
        {errors.password && <p>{errors.password.message}</p>}
        <br />
        <input
          {...register("passwordConfirm")}
          placeholder="Password Confirm"
        />
        {errors.passwordConfirm && <p>{errors.passwordConfirm.message}</p>}
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

export default Register;
