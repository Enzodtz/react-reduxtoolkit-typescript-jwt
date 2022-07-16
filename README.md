# react-reduxtoolkit-typescript-jwt

Demo/Template for typed apps using ReduxToolkit with JWT auth.

### Getting Started

```
npm i
npm start
```

### Backend

The backend for this application can be found [here](https://github.com/Enzodtz/django-rest-framework-jwt-demo). It's using a simple JWT backend made with Django Rest Framework and SimpleJWT module. Notice that inside the project, this is high customizable, and you won't need to change a lot, due to JWT patterns.

### Useful Code Understanding Guide

This app uses `redux-toolkit`, so if you're familiar with it, it will be easier to you to understand the project and work on new features.

- `features/auth/` the files for each JWT lifetime processes, you might need to edit them for your backend.
- `pages/dashboard` example of usage of user in global state
- `App.tsx` example of private routes (`pages/SecretPage.tsx`)
- `pages/Login.tsx pages/Register.tsx` example of form submits and error handle for this backend
- `app/hooks`.ts hooks for `useDispatch` and `useSelector` with `app/store` type definitions
- `app/store.ts` the store for the project. Notice the first `load` action dispatch
