import { loginWithEmailAndPassword, logoutFireBase, registerUserWithEmailAndPassword, signInWithGoogle } from "../../firebase/provides";
import { JournalApp } from "../../src/JournalApp";
import { clearNotesLogOut } from "../journal";
import { checkingCredentials, login, logout } from "./authSlice"


export const checkingAuthentication = (email, password) =>{
    return async (dispatch)=>{

        // disparar el reducer de checar las credenciales del usuario (cambiar a estado checking)
        dispatch(checkingCredentials()); 
    }
}

export const starGoogleSignIn = () =>{
    return async (dispatch)=>{

        dispatch(checkingCredentials());
        const result = await signInWithGoogle();
        console.log({ result });

        if( !result.ok  ){
            return dispatch(logout( result.errorMessage ))            
        }


        // mandar un objeto que pase al login (ya que aqui la autenticacion pasa)
        dispatch( login(result));


    }
}

export const starCreateingUserWithEmailAndPassword  = ({email, password, displayName }) =>{
    return async (dispatch) =>{
        dispatch(checkingCredentials());

       const {ok, uid, photoURL, errorMessage} = await registerUserWithEmailAndPassword({ email, password, displayName });
       
       if(!ok ) return dispatch(logout({errorMessage}));
        dispatch(login({uid, displayName, email, photoURL}));

       
    }

}

export const startLoginWithEmailAndPassword = ({ email, password }) =>{

    return async (dispatch) => {
        dispatch(checkingCredentials());
        console.log(email, password);
        const result  = await loginWithEmailAndPassword({ email, password });

        if(!result.ok ) return dispatch(logout(result));
        dispatch(login(result));

    }

}

export const startLogOut = ()=>{
    return async (dispatch) =>{

        try {
            await logoutFireBase();
            dispatch(clearNotesLogOut());
            dispatch( logout() );
        } catch (error) {
            console.log(error.message);
        }
    }
}

