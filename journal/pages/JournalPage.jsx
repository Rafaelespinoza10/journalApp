// import { NoteView } from "../../auth/view";
import { JournalLayout } from "../layout/JournalLayout";
import { NoteView, NothingSelectedView } from "../../auth/view";
import { IconButton } from "@mui/material";
import { AddLinkOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { startNewNote } from "../../store/journal";

export const JournalPage = () => {
  const dispatch = useDispatch();
  
  const {  isSaving, activeNotes } = useSelector(status => status.journal);

  
  const onClickNewNote = () =>{
    dispatch(startNewNote());
  }


  return (
    <>
        <JournalLayout>
        {
          activeNotes 
          ? <NoteView />
          : <NothingSelectedView />
        }
         
          <IconButton
            disabled = { isSaving }
            onClick={ onClickNewNote }
            size="large"
            sx={{
              color: 'white',
              backgroundColor: 'error.main',
              ':hover':{backgroundColor: 'error.main', opacity: 0.9},
              position: 'fixed',
              right: 50, 
              bottom: 50, 

            }}
          >
            <AddLinkOutlined  sx={{fontSize: 30}}/>
          </IconButton>
        </JournalLayout>
        
    </>
  )
}
