import { Link as LinkRouter } from 'react-router'
import { Google } from "@mui/icons-material";
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { startGoogleSingIn, startLoginWithEmailPassword } from '../../store/auth/thunks';
import { useMemo } from 'react';

const loginUser = {
  email: '',
  password: ''
}

export function LoginPage() {

  const { status, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch((state) => state.auth);

  const checkingStatus = useMemo(() => status === 'checking', [status]);

  const { email, password, onInputChange } = useForm(loginUser);

  const onSubmit = (event) => {
    event.preventDefault();

    // console.log({ email, password })
    // dispatch(checkingAuthentication(email, password));
    dispatch(startLoginWithEmailPassword({ email, password }))
  }

  const onGoogleSingIn = () => {
    dispatch(startGoogleSingIn());
  }

  return (
    <AuthLayout title='Login'>

      <form onSubmit={onSubmit} >
        <Grid container>
          <Grid item xs={12} sx={{ mb: 2 }}>
            <TextField
              label="Correo"
              placeholder="correo@gmail.com"
              type="email"
              fullWidth
              name='email'
              value={email}
              onChange={onInputChange}
            />
          </Grid>

          <Grid item xs={12} sx={{ mb: 2 }}>
            <TextField
              label="Contraseña"
              placeholder="*******"
              type="password"
              name='password'
              value={password}
              onChange={onInputChange}
              fullWidth
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2 }}>

            <Grid item xs={12} display={errorMessage ? '' : 'none'} >
              <Alert severity='error'>
                {errorMessage}
              </Alert>
            </Grid>


            <Grid item xs={12} sm={6}>
              <Button
                disabled={checkingStatus}
                type='submit'
                variant="contained"
                fullWidth>
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                disabled={checkingStatus}
                variant="contained"
                fullWidth
                onClick={onGoogleSingIn}>
                <Google />
                <Typography sx={{ ml: 1 }} >Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction={'row'} justifyContent={'end'}>
            <Link component={LinkRouter} to='/auth/register' color="inherit">
              Crear cuenta
            </Link>

          </Grid>

        </Grid>
      </form>

    </AuthLayout>
  );
};