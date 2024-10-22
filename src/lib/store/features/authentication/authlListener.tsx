"use client"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "@/lib/firebase/firebase.config";
import { clearUser, setUser } from "@/lib/store/features/authentication/authSlice";
import { AppDispatch } from "../../store";


const auth = getAuth(app);

const AuthListener = () => {

    const dispatch : AppDispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({
            email: user.email,
            username: user.displayName || "", 
          })
        );
      } else {
        dispatch(clearUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);
  return (
    <div></div>
  )
}

export default AuthListener