import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { login, logout } from "../store/auth/authSlices";
import { FirebaseAuth } from "../firebase/config";
import { startLoadingNotes } from "../store/journal/thunks";


export const useAuth = () => {

  const { status } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch(logout());
      const { uid, displayName, email, photoURL } = user;
      dispatch(login({ uid, displayName, email, photoURL }));
      dispatch(startLoadingNotes());
    })
  }, [dispatch]);

  return status
}
