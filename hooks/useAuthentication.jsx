import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FireBaseAuth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { login, logout } from "../store/auth";
import { startLoadingNotes } from "../store/journal";

export const useAuthentication = () => {
    const { status, displayName  } = useSelector(state => state.auth);
    const dispatch = useDispatch();
     
    
    useEffect(() => { 
        //cuando el estado de la autenticacion cambia 
          onAuthStateChanged( FireBaseAuth, async ( user ) => {
              if(!user) return dispatch(logout());  
              const  { uid, email, displayName, photoURL } = user;
              dispatch( login({ uid, email, displayName, photoURL} ));
              dispatch(startLoadingNotes());
          });

      }, [dispatch ])
   
  
    return {
        status, 
        displayName,
         
    }
}
