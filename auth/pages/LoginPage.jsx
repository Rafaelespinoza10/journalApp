import{ Link  as RouterLink,  } from 'react-router-dom'
import { Button, Grid2  as Grid, TextField, Link, Alert} from '@mui/material';
import {Google} from '@mui/icons-material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { useDispatch, useSelector } from 'react-redux';
import {  starGoogleSignIn, startLoginWithEmailAndPassword } from '../../store/auth';
import { useMemo } from 'react';

const formData = {
  email :'',
  password: '',
}

export const LoginPage = () => {
  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector( state => state.auth);  // se obtiene el status del store
  const { email, password, onInputChange} = useForm(formData);
  const isAuthenticated  = useMemo(() => status === 'checking', [status]);


  const onSubmit = (event)=>{
    event.preventDefault();
//    dispatch(checkingCredentials());
    dispatch(startLoginWithEmailAndPassword({email, password, }));
  }

  const onGoogleSignIn = () =>{
    dispatch(starGoogleSignIn());
    console.log('on Google Sign in');
  }

  return (
   
      <AuthLayout title='Login'>
                  <form onSubmit={ onSubmit }     
                  className = { 'animate__animated animate__fadeIn'}
                  >
                <Grid container
                      spacing={2}
                      direction={'column'}
                      alignItems={'center'}
                      justifyContent={'center'}
                      
                >
                  <Grid item xs={ 12 } sx={{mt:2}}>
                    <TextField 
                      label="Correo" 
                      type="email" 
                      placeholder='correo@gmail.com'
                      sx={ {width: "350px"} }
                      name="email"
                      value ={ email }
                      onChange={ onInputChange }
                    />
                  </Grid>
                  <Grid item xs={ 12 } sx={{mt:2}}>
                    <TextField 
                      label="Password" 
                      type="password" 
                      placeholder='your password '
                      sx={{width:"350px"}}
                      name="password"
                      value ={ password }
                      onChange={ onInputChange }
                      />
                  </Grid >
                      
                  <Grid 
                    container
                    display={errorMessage ? '': 'none'}
                    sx = {{mt:1}}
                  >
                      <Grid
                      item
                      xs={ 12 }
                      >
                        <Alert
                          severity='error'
                        >
                          {errorMessage}
                        </Alert>

                      </Grid>
                  </Grid>
                  
                  <Grid container spacing={1} direction={'row'} alignContent={'center'} justifyContent={'center'} sx={{mb:2}}>
                    <Grid item   xs={ 12 } sm={6}>
                      <Button type="submit" 
                              disabled={ isAuthenticated }
                              variant='contained' 
                              sx={{width:'200px'}}
                        
                              >
                          Login
                      </Button>
                    </Grid>

                    <Grid containerspacing={2} sx={{mb:2}}>
                     <Grid item   xs={ 12 } sm={6}>
                        <Button  
                            variant='contained'
                            disabled={ isAuthenticated }
                            sx={{width:'120px'}}
                            onClick={ onGoogleSignIn }
                            >
                            <Google />
                            
                        </Button>
                      </Grid>
                    </Grid>                  
                  </Grid>

                  <Grid container direction={'row'} justifyContent={'end'}>
                    <Link component={ RouterLink } color="inherit" to='/auth/register'>
                      Create Account 
                    </Link>
                  </Grid>
                
                </Grid>
            </form>
      </AuthLayout>
  )
}
