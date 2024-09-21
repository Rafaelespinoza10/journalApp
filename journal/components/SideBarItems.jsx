import { TurnedInNot } from "@mui/icons-material"
import { Grid2 as Grid,  ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useMemo } from "react"
import { useDispatch} from "react-redux"
import { setActiveNote } from "../../store/journal"

export const SideBarItems = ( { title = '', body, id, date, imageUrls = [] }) => {
    
    
    const dispatch = useDispatch();
    
    const onClickListButton =() =>{
        dispatch( setActiveNote({ id, title, body, date, imageUrls  }));
    }
    const newTitle = useMemo(()=>{
        return title.length > 15
        ? title.substring(0,15) + " ..." 
        : title
    },[title ])


  return (
    <ListItem key= { id } disablePadding >
    <ListItemButton 
       onClick={ onClickListButton }
    >
        <ListItemIcon>
            <TurnedInNot />
        </ListItemIcon>
        <Grid container >
            <ListItemText primary={newTitle } />
            <ListItemText secondary={ body } />
        </Grid>

    </ListItemButton>
</ListItem>
  )
}
