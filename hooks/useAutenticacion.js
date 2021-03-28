import React, { useState, useEffect } from "react";
import firebase from "../firebase/firebase";
import { auth } from "firebase";
import firebaseConfig from "../firebase/config";

function useAutenticacion() {
  const [usuarioAutenticado, gurardarUsuarioAutenticado] = useState(null);
  useEffect(() => {
    const unsuscribe = firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        gurardarUsuarioAutenticado(user);
      } else {
        gurardarUsuarioAutenticado(null);
      }
    });
    return () => {
      unsuscribe();
    };
  }, []);
  return usuarioAutenticado;
}
export default useAutenticacion;
