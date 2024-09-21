import{ Link  as RouterLink } from 'react-router-dom'
import { Button, Grid2  as Grid, TextField, Link, Typography, Alert} from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { starCreateingUserWithEmailAndPassword } from '../../store/auth';


const initialState = {
  email :'',
  password: '',
  displayName: '',

}

const formValidations = {
    email: [(value) => value.includes('@'), 'The email is not valid'] ,
    password :  [(value)=> value.length >= 6, 'the password must contains at least 6 characters'],
    displayName : [(value) => value.length >= 1, 'The name is required'],
}

export const RegisterPage = () => {
 const [formSubmitted, setformSubmitted] = useState(false);
  const dispatch = useDispatch();
  const { displayName, displayNameValid,  email, emailValid, password, onInputChange, formState, 
    isFormValid, passwordValid, 
  } = useForm(initialState, formValidations);

 
  const  { status, errorMessage } = useSelector(state => state.auth);  
  
  const isCheckingAuthentication = useMemo(()=>{
    status === 'checking'
  }, [ status ]);

  const onSubmit = (event) =>{
    event.preventDefault();
    setformSubmitted(true);
    if( !isFormValid ) return; 
    dispatch( starCreateingUserWithEmailAndPassword(formState));
  }

  return (
      
    <AuthLayout title='Create Account'>
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
        label="Name" 
        type="text" 
        placeholder='your name'
        sx={ {width: "350px"} }
        name="displayName"
        value={ displayName }
        onChange={ onInputChange }
        error = { !!displayNameValid && formSubmitted }
        helperText= { displayNameValid }
/>
    </Grid>
    <Grid item xs={ 12 } sx={{mt:2}}>
      <TextField 
        label="Email" 
        type="Email" 
        placeholder='your email '
        sx={{width:"350px"}}
        name="email"
        value={ email }
        error  = { !!emailValid  && formSubmitted }
        onChange={ onInputChange }
        helperText= { emailValid}
      />
    </Grid>
    <Grid item xs={ 12 } sx={{mt:2}}>
      <TextField 
        label="Password" 
        type="password" 
        placeholder='your password '
        sx={{width:"350px"}}
        name="password"
        value={ password }
        error={ !!passwordValid &&  formSubmitted}
        onChange={ onInputChange }
        helperText= { passwordValid }
      />
    </Grid>

    <Grid
      item 
      xs={ 12 }
      display= { errorMessage ? '' : 'none' }
    
    >
      <Alert
        severity='error'
      >
        { errorMessage }
      </Alert>
    </Grid>
    <Grid container spacing={1} direction={'row'} alignContent={'center'} justifyContent={'center'} sx={{mb:2}}>
      <Grid item   xs={ 12 } sm={6}>
        <Button 
          type="submit"
          disabled={ isCheckingAuthentication }
          variant='contained'
           sx={{width:'200px'}}>
            Create Account
        </Button>
      </Grid>

    </Grid>

    <Grid container direction={'row'} justifyContent={'end'}>
      <Typography sx={{mr: 1}}> Do you have an account?, </Typography>
      <Link component={ RouterLink } color="inherit" to='/auth/login'>
        Login
      </Link>
    </Grid>
  
  </Grid>
</form>
</AuthLayout>
  )
}
