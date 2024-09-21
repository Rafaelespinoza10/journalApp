import { Box, Divider, Drawer, Toolbar, Typography, List } from '@mui/material'; 
import { useSelector } from 'react-redux';
import { useAuthentication } from '../../hooks';
import { SideBarItems } from './SideBarItems';


export const SideBar = ({ drawerWidth = 240 }) => {
     
    const { displayName } = useAuthentication( {} );
    const { notes } = useSelector(state => state.journal);

    return (
    <Box
        component={'nav'}
        sx={{width : {sm: drawerWidth }, flexShrink: {sm: 0}}}
    >     
        <Drawer 
            variant={'permanent'}  //temporary (mostrarlo de manera condicional)
            open={true}
            sx={{
                display:{ xs:'block' },
                '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth}
            }}
        >
            <Toolbar>
                <Typography variant={'h6'} noWrap component={'div'}>
                    { displayName }
                </Typography>
            </Toolbar>
            <Divider />
            

            <List>
                {
                    notes.map(note =>(
                        <SideBarItems key ={note.id} { ...note } />
                    ))
                }
            </List>
        </Drawer>
    </Box>
  )
}
