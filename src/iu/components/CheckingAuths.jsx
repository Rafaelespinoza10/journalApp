import { CircularProgress, Grid2 as Grid  } from "@mui/material"
export const CheckingAuths = () => {
  return (


        <Grid 
        container 
        spacing={ 0 }
        direction={"column"}
        alignContent={"center"}
        justifyContent={"center"}    
        sx={{ minHeight:'100vh', minWidth: '100vw', backgroundColor: 'primary.main', padding:4 }}  
    > 
    <Grid 
        container
        direction='row'
        justifyContent={ 'center'}
        >
            <CircularProgress color='warning' />

        </Grid>
        </Grid>

    )
}
