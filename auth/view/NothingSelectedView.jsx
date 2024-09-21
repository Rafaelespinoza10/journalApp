
import { StarOutline } from '@mui/icons-material';
import {Grid2 as Grid, Typography } from '@mui/material';

export const NothingSelectedView = () => {
  return (
        <Grid 
        className = { 'animate__animated animate__fadeIn'}
        container 
        spacing={ 0 }
        direction="column"
        alignContent="center"
        justifyContent="center"   
        sx={{ minHeight:'100vh ', minWidth: '100vw', backgroundColor: 'primary.main', borderRadius:3}}  
    > 
        <Grid item xs={ 12 }>
            <StarOutline  sx={{fontSize: 100, color: 'white', p:0}}/>
        </Grid>

        <Grid item xs={ 12 }>
           <Typography color="white" variant="h7" > Selected o created a new note </Typography>
        </Grid>
    
    </Grid>

  )
}
