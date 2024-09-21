import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material'
import { Typography, Grid2 as Grid, Button, TextField, IconButton, } from '@mui/material'
import { ImagesGallery } from '../../journal/components/ImagesGallery'
import { useForm } from '../../hooks/useForms'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useRef } from 'react';
import { setActiveNote, starSaveNote, startDeleteNote, startUploadingFiles } from '../../store/journal';
import  Swal  from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css'

export const NoteView = () => {
    const dispatch = useDispatch();
    const { activeNotes, messageSaved, isSaving  } = useSelector(state => state.journal);
    const { body, title, date, onInputChange, formState, } = useForm( activeNotes);
    const fileInputRef  = useRef();

        const dateString = useMemo(() => {
        const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
        };
    
        const newDate = new Date(date).toLocaleDateString('en-US', options); // puedes cambiar 'en-US' según tu preferencia de idioma

        return newDate;
        }, [date]);

        
        useEffect(() => {
          dispatch( setActiveNote( formState ) );
        }, [formState]); //cuando el formstate cambia 
        
        useEffect(() => {
            if(messageSaved.length > 0 ){
                Swal.fire('The note has been uptated ', messageSaved, 'success');
            }
        }, [ messageSaved])
        

        const onSetNote = () =>{
            dispatch( starSaveNote() );  // se hace el dispatch del startSaveNote para 
        }

        const onFileInputChange = ({ target })=>{
           if(target.files === 0 )return;
            console.log('subiendo archivos');
           dispatch(startUploadingFiles(target.files));
        }

        const onDeleteNote = () => {
            dispatch(startDeleteNote()); 
        }

    return (
    <>
        <Grid 
            container
            direction={'row'}
            justifyContent={"space-between"}
            alignItems={"center"}
            sx={{mb:1}}    
            className = { 'animate__animated animate__fadeIn'}
        >   
            <Grid item>
                <Typography
                    fontSize={ 39 }
                    fontWeight={'Light'}
                    > { dateString } </Typography>
            </Grid>

          <input 
            type="file"
            multiple
            ref={ fileInputRef }
            onChange={  onFileInputChange }
            style={{ display: 'none'}}
          />

          <IconButton
            color="primary"
            disabled= {  isSaving }
            onClick={ ()=>{
                fileInputRef.current.click()
            }}
          > 
                <UploadOutlined />
          </IconButton>
            <Grid item>
                <Button 
                disabled={ isSaving }
                onClick={ onSetNote }
                color="primary" sx={{padding:2}}>
                    <SaveOutlined sx={{fontSize: 30, mr:1 }}/>
                    Save
                </Button>
            </Grid>


        </Grid>
            <Grid container>
                <TextField 
                    type = 'text'
                    variant='filled'
                    direction='row'
                    justifyContent='center'
                    alignItems='center'
                    fullWidth
                    placeholder='Write a title'
                    label='Title'
                    sx={{border: 'none', mb: 1}}
                    name="title"
                    value={ title }
                    onChange={ onInputChange }

                />

                <TextField 
                    type = 'text'
                    variant='filled'
                    direction='row'
                    justifyContent='center'
                    alignItems='center'
                    fullWidth
                    multiline
                    placeholder='What is up today?'
                    minRows={ 5 }
                    sx={{border: 'none', mb: 1}}
                    name="body"
                    value= { body }
                    onChange= { onInputChange }
                />
            </Grid>
            <Grid
                container
                justifyContent={ "end"}
            >
                <Button
                    onClick={ onDeleteNote }
                    sx={{mt: 2}}
                    color= { "error"}
                >
                        <DeleteOutline />
                        Delete
                </Button>

            </Grid>
            {/* Galeria de Imagnes */}
            <ImagesGallery 
                  images={Array.isArray(activeNotes.imageUrls) ? activeNotes.imageUrls : []}
    />

    
    </>
  )
}
