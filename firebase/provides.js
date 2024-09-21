import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile  } from "firebase/auth";
import { FireBaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();


export const signInWithGoogle = async()=>{

    try {        
        
        const result = await signInWithPopup(FireBaseAuth, googleProvider);
        // const credentials = GoogleAuthProvider.credentialFromResult(result);
        // console.log(credentials);
        const {displayName, email, photoURL, uid} = result.user;
        
       
        return{
            ok: true, 
            displayName, email, photoURL, uid
        }

    } catch (error) {
        // const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
         return{
            ok: false,
            errorMessage, 

         }
    
    }


}

export const registerUserWithEmailAndPassword = async ( {email, password, displayName}) =>{
    
    let errorMessage;
    try {
        
        // metodo de Firebase
        const response = await createUserWithEmailAndPassword(FireBaseAuth, email, password ); //AUTENTICACION DE FIREBASE, EMAIL, PASSWORD
        const {uid, photoURL, } = response.user;
        //TODO: actualizar el displayname en firebase
        await updateProfile( FireBaseAuth.currentUser, { displayName } );
        
        
        
        return{
            ok: true, 
            uid, photoURL, email, displayName, 
        }
        
    } catch (error) {
        
        if (error.code === 'auth/email-already-in-use') {
             errorMessage  = 'El correo electrónico ya está en uso. Intenta iniciar sesión.';
            // Mostrar un mensaje al usuario
        } else {
            console.error('Error al crear el usuario:', error);
            // Manejar otros posibles errores
        }

        return{
            ok: false,
            errorMessage,
        }
    }
}


export const loginWithEmailAndPassword = async ({  email, password }) =>{
    
    try {
        
        const response = await signInWithEmailAndPassword( FireBaseAuth, email, password);
        const { uid,
            photoURL , 
            displayName, 
        } = response.user;
       
            return {
                ok: true,
                uid,
                photoURL,
                displayName,  
            };

    } catch (error) {
       
        console.log(error.code);
        console.log(error.message);

        switch (error.code) {
            case 'auth/wrong-password':
                console.error('Contraseña incorrecta');
                break;
            case 'auth/user-not-found':
                console.error('Usuario no encontrado');
                break;
            default:
                console.error('Error de autenticación:', error.message);
        }

        return {
            ok: false,
            errorMessage : error.message,
        };
    }
    // ! signInWithEmailAndPassword
}

export const logoutFireBase = async() =>{
    return await FireBaseAuth.signOut();
}