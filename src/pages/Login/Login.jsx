import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '/Logistix_logo.png';
import CustomSnackbar from '../../components/CustomSnackbar';
import { login } from './loginApi';
import { Controller, useForm } from 'react-hook-form';
import { FORM, PADDING } from '../../constants/styles';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(false);
  const [snackbar, setSnackbar] = useState(
    location.state ? location.state.message : '',
  );

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleLogin = async (data) => {
    try {
      await login(data);
      setLoading(false);
      navigate('/dashboard');
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: FORM.CONTAINER_MIN_HEIGHT }}
    >
      <Grid
        item
        xs={12}
        sm={8}
        md={6}
        lg={4}
        sx={{
          padding: PADDING.LARGE,
          border: FORM.BORDER,
          borderRadius: FORM.BORDER_RADIUS,
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <img
            src={logo}
            alt="Login"
            style={{ width: '100%', maxWidth: FORM.IMAGE_LOGIN }}
          />
        </Box>
        {error && <Alert severity="error">{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit(handleLogin)} noValidate>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: 'Email is required',
              pattern: {
                value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                message: 'Invalid email address',
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                type="text"
                variant="outlined"
                margin="normal"
                fullWidth
                error={Boolean(errors.email)}
                helperText={errors.email ? errors.email.message : ''}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{ required: 'Password is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                fullWidth
                error={Boolean(errors.password)}
                helperText={errors.password ? errors.password.message : ''}
              />
            )}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2, height: FORM.BUTTON_HEIGHT }}
            disabled={isSubmitting}
            fullWidth
          >
            {isSubmitting ? <CircularProgress size={20} /> : 'Login'}
          </Button>
          <Typography sx={{ textAlign: 'center', mt: 2 }}>
            Don't have an account?
            <Link component="button" to="/register">
              Register here
            </Link>
          </Typography>
        </Box>
      </Grid>
      <CustomSnackbar
        message={{
          type: 'success',
          message: snackbar,
        }}
        open={Boolean(snackbar)}
        setOpen={setSnackbar}
      />
    </Grid>
  );
}

export default Login;
