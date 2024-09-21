import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { FireBaseDB } from '../../firebase/config';
import { addNewEmptyNotes, deleteNoteById, savingNewNotes, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from './journalSlice';
import { fileUpload, loadNotes } from '../../helpers';


export const startNewNote = () =>{
    //inicio del proceso
    
    return async (dispatch, getState) => {
        dispatch(savingNewNotes());
        //uid 
        
        const{ uid } = getState().auth;
 
        const newNote={
            title: '',
            body: '',
            imageUrls : [],
            date: new Date().getTime(),
        }
        const newDoc  = doc(collection(FireBaseDB, `${ uid }/journal/notes`));
        await setDoc( newDoc, newNote);

        newNote.id = newDoc.id;
        //!dispatch
        dispatch(addNewEmptyNotes (newNote));
        dispatch(setActiveNote(newNote));

        //dispatch (newNote)

    }
}

export const startLoadingNotes =  () =>{
    return async(dispatch, getState) => {
        const { uid } = getState().auth;
        if(!uid) throw new Error('El UID no existe');
        const notes =await loadNotes(uid);
        dispatch(setNotes(  notes ));
    }
}

export const starSaveNote  = () =>{
    return async( dispatch, getState ) =>{

        dispatch( setSaving() );
        const { uid } = getState().auth;
        const {activeNotes } = getState().journal
        const noteToFireStore = { ...activeNotes };
        delete noteToFireStore.id;  //elimina una propiedad id del activeNote
        console.log(noteToFireStore);
        const docRef = doc( FireBaseDB, `${ uid }/journal/notes/${activeNotes.id}`);
        await setDoc(docRef, noteToFireStore, { merge: true});  // el merge mantiene los campos que no son actualizados. 
        dispatch( updateNote( activeNotes ) ); 
    }
}

export const startUploadingFiles = ( files=[] )=>{
    return async (dispatch) =>{
        dispatch( setSaving() );

        // await fileUpload( files[0] );

        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push( fileUpload(file ) )
        }
        const responseUrls = await Promise.all( fileUploadPromises );
        dispatch( setPhotosToActiveNote( responseUrls ));
    }
}
export const startDeleteNote = ()=>{
    return async (dispatch, getState) =>{
        const { uid } = getState().auth;
        const { activeNotes } = getState().journal; 


        const docRef = doc( FireBaseDB, `${uid}/journal/notes/${activeNotes.id}`); 
        await deleteDoc(docRef);

        //limpiar del store 
        dispatch( deleteNoteById( activeNotes.id ));

    }
}