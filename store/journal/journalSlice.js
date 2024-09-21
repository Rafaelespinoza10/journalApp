import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
     name: 'journal',
     initialState: {
          isSaving: false, 
          messageSaved: '',  
         notes: [],
         activeNotes: null,

         //
        //  active:{
        //     id: 'ASBC1234',
        //     title: '',
        //     body: '',
        //     date: 1233456,
        //     imageUrls: [],   //Arreglo de Https: foto1.pg
        //  }

    },
    reducers: {

        savingNewNotes: ( state ) =>{
            state.isSaving = true; 
        },
        addNewEmptyNotes: (state, action) =>{
            state.notes.push(action.payload);
            state.isSaving = false; 

        },
        setActiveNote: (state, action ) =>{
            state.activeNotes =  action.payload;
            state.messageSaved = '';
        },
    
        setNotes : (state, action ) =>{
            state.notes = action.payload;
        },

        setSaving: (state ) =>{
            state.isSaving = true; 
            state.messageSaved = '';
            // !TODO : MENSAJE DE ERROR

        },
        updateNote: (state, action) =>{
            state.isSaving = false;
            state.notes = state.notes.map( note => {
                
                if(note.id === action.payload.id){
                    return action.payload;    
                }
                return note;
            });

            //TODO: mostrar mensaje de actualizacion 

            state.messageSaved = `${action.payload.title}, successfully updated.`;

        },
        setPhotosToActiveNote : (state, action) =>{
            state.activeNotes.imageUrls = [ ...state.activeNotes.imageUrls, ...action.payload ];
            state.isSaving = false; 
        },
        clearNotesLogOut :  (state) =>{
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = [];
            state.activeNotes = null; 
        },
        deleteNoteById: (state, action) =>{
                state.activeNotes = null;
                state.notes = state.notes.filter(note => note.id !== action.payload );
        },
    },

});



export const { increment, addNewEmptyNotes, setActiveNote, setSaving, updateNote, deleteNoteById, savingNewNotes, setNotes, setPhotosToActiveNote, clearNotesLogOut } = journalSlice.actions;