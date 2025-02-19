import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile
} from "firebase/auth";
import { FirebaseAuth } from "./config";


const googleProvider = new GoogleAuthProvider();

export async function singInWithGoogle() {

  try {

    const result = await signInWithPopup(FirebaseAuth, googleProvider);

    const { email, displayName, uid, photoURL } = result.user;

    return {
      ok: true,
      displayName, email, uid, photoURL
    }

  } catch (error) {

    const errorMessage = error.message;

    return {
      ok: false,
      errorMessage
    }
  }

}

export const registerUserWithEmailPassword = async ({ email, password, displayName }) => {

  try {

    const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
    const { uid, photoURL } = resp.user;

    await updateProfile(FirebaseAuth.currentUser, { displayName })

    return {
      ok: true,
      uid, photoURL, email, displayName
    }

  } catch (error) {

    return {
      ok: false, errorMessage: error.message
    }
  }

}

export const loginWithEmailPassword = async ({ email, password }) => {

  try {

    const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);

    const { photoURL, uid, displayName } = resp.user;

    return {
      ok: true,
      email, photoURL, uid, displayName
    }

  } catch (error) {
    return {
      ok: false,
      errorMessage: error.message
    }
  }

}

export const logoutFirebase = async () => {
  return await FirebaseAuth.signOut()

}
