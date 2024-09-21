import {Box, Toolbar} from '@mui/material';
import { NavBar, SideBar } from '../components';


// crear el navbar en un tamanio especifico
const drawerWidth = 240;



export const JournalLayout = ( { children }) => {
  return (

        <Box sx={{display: 'flex'}}   className = { 'animate__animated animate__fadeIn'} >
            {/* navbar */}
            <NavBar  drawerWidth={drawerWidth}/>
            {/* sidebar */}
            <SideBar drawerWidth={drawerWidth}/>
            {/* main  */}
            <Box component='main'
                sx={{flexGrow: 1, p:2}}    
            >
                <Toolbar />
                { children }
            </Box>
        </Box>


    )
}
