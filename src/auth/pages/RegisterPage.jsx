import { Link as LinkRouter } from 'react-router'
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startcreatindUserWithEmailPassword } from '../../store/auth/thunks';

const formData = {
  email: '',
  password: '',
  displayName: '',
}

const formValidations = {
  email: [(value) => value.includes('@'), 'El Correo debe contener @'],
  password: [(value) => value.length >= 6, 'La contraseña debe ser mayor a 6'],
  displayName: [(value) => value.length >= 1, 'Este campo es obligatorio'],
}

export function RegisterPage() {

  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector((state) => state.auth);
  const statusCheking = useMemo(() => status === 'checking', [status]);

  const {
    displayName, email, password, onInputChange, formState,
    emailValid, passwordValid, displayNameValid
  } = useForm(formData, formValidations);

  const [formSubmitted, setFormSubmitted] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    dispatch(startcreatindUserWithEmailPassword(formState));
  }

  return (
    <AuthLayout title='Register'>

      <form onSubmit={onSubmit}>
        <Grid container>

          <Grid item xs={12} sx={{ mb: 2 }}>
            <TextField
              label="Nombre"
              placeholder="Nombre de Usuario"
              type="text"
              fullWidth
              name='displayName'
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSubmitted}
              helperText={displayNameValid}
            />
          </Grid>

          <Grid item xs={12} sx={{ mb: 2 }}>
            <TextField
              label="Correo"
              placeholder="correo@gmail.com"
              type="email"
              fullWidth
              name='email'
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
            />
          </Grid>

          <Grid item xs={12} sx={{ mb: 2 }}>
            <TextField
              label="Contraseña"
              placeholder="*******"
              type="password"
              fullWidth
              name='password'
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2 }}>

            <Grid
              item
              xs={12}
              display={errorMessage ? '' : 'none'}>
              <Alert severity='error'>
                {errorMessage}
              </Alert>
            </Grid>

            <Grid item xs={12}>
              <Button
                type='submit'
                variant="contained"
                fullWidth
                disabled={statusCheking}
              >
                Crear Cuenta
              </Button>
            </Grid>
          </Grid>

          <Grid container direction={'row'} justifyContent={'end'}>
            <Typography sx={{ mr: 2 }} >¿Ya tienes cuenta?</Typography>
            <Link component={LinkRouter} to='/auth/login' color="inherit">
              Login
            </Link>

          </Grid>

        </Grid>
      </form>

    </AuthLayout>
  );
};