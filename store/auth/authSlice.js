import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
  
    initialState: {
        status: 'checking', // 'checking' , 'not-authenticated, authenticated,
        uid: null, 
        email: null, 
        displayName: null,
        photoURL : null, 
        errorMessage: null, 
    },
    reducers: {
    login : (state, { payload }) => {
        state.status = 'authenticated';
        state.uid = payload.uid;
        state.email = payload.email;
        state.displayName = payload.displayName;
        state.photoURL = payload.photoURL;
        state.errorMessage = null; 
        
    },
    logout: (state, { payload })=>{
        //colocar el estado como se encuentra actualmente
        state.status = 'not-authenticated';
        state.uid = null;
        state.email = null;
        state.displayName =  null;
        state.photoURL = null;
        state.errorMessage = payload?.errorMessage;
    },
    checkingCredentials: (state)=>{
        state.status = 'checking';
    },
    },
});

//action created functions. 
export const { login, logout, checkingCredentials } = authSlice.actions; 