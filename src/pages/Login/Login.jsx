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
import userAxios from '../../api/userAxios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const [snackbar, setSnackbar] = useState(
    location.state ? location.state.message : '',
  );

  const handleLogin = async () => {
    setLoading(true);
    try {
      const url = `user/login`;
      const response = await userAxios.post(url, {
        email,
        password,
      });
      const { data } = response;
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setLoading(false);
      navigate('/dashboard');
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      handleLogin();
    }
  };

  const validate = () => {
    const tempErrors = { email: '', password: '' };
    tempErrors.email = email ? '' : 'Email is required.';
    tempErrors.password = password ? '' : 'Password is required.';
    if (email) {
      const emailPattern = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
      tempErrors.email = emailPattern.test(email) ? '' : 'Email is not valid.';
    }
    setFormErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === '');
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '95vh' }}
    >
      <Grid
        item
        xs={12}
        sm={8}
        md={6}
        lg={4}
        sx={{
          padding: '2rem',
          border: '1px solid #d7d7d7',
          borderRadius: '4px',
        }}
        component="form"
        onSubmit={handleSubmit}
      >
        <Box sx={{ textAlign: 'center' }}>
          <img
            src={logo}
            alt="Login"
            style={{ width: '100%', maxWidth: '250px' }}
          />
        </Box>

        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          label="Email"
          type="text"
          variant="outlined"
          margin="normal"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={Boolean(formErrors.email)}
          helperText={formErrors.email}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={Boolean(formErrors.password)}
          helperText={formErrors.password}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2, height: '40px' }}
          disabled={loading}
          fullWidth
        >
          {loading ? <CircularProgress size={20} /> : 'Login'}
        </Button>
        <Typography sx={{ textAlign: 'center', mt: 2 }}>
          Don't have an account?
          <Link component="button" to="/register">
            Register here
          </Link>
        </Typography>
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
