import { checkingCredentials, login, logout } from "./authSlices"
import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from "../../firebase/providers";

export const checkingAuthentication = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  }
}

export const startGoogleSingIn = () => {
  return async (dispatch) => {
    dispatch(checkingAuthentication());

    const result = await singInWithGoogle();

    if (!result.ok) return dispatch(logout(result.errorMessage));

    dispatch(login(result));

  }
}

export const startcreatindUserWithEmailPassword = ({ email, password, displayName }) => {
  return async (dispatch) => {

    dispatch(checkingAuthentication());

    const { ok, errorMessage, uid, photoURL } = await registerUserWithEmailPassword({ email, password, displayName });

    if (!ok) return dispatch(logout({ errorMessage }));

    dispatch(login({ uid, email, displayName, photoURL }));

  }
}

export const startLoginWithEmailPassword = ({ email, password }) => {
  return async (dispacth) => {
    dispacth(checkingCredentials());

    const { ok, errorMessage, uid, photoURL, displayName } = await loginWithEmailPassword({ email, password });

    if (!ok) return dispacth(logout({ errorMessage }));

    dispacth(login({ uid, email, displayName, photoURL }));

  }
}

export const startLogoutFirebase = () => {
  return async (dispatch) => {
    await logoutFirebase();
    dispatch(logout());
  }
}

