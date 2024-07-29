import {
  Alert,
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '/Logistix_logo.png';
import Validator from '../../utils/Validator';
import { getLocations } from '../Dashboard/dashboardApi';
import { addUser } from './registerApi';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    location: null,
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    location: '',
  });

  const formValidations = {
    name: [
      {
        validationName: 'isRequired',
        validationParam: true,
      },
    ],
    email: [
      {
        validationName: 'isRequired',
        validationParam: true,
      },
      {
        validationName: 'isPattern',
        validationParam: ['[a-z0-9]+@[a-z]+.[a-z]{2,3}'],
      },
    ],
    password: [
      {
        validationName: 'isRequired',
        validationParam: true,
      },
    ],
    confirmPassword: [
      {
        validationName: 'isRequired',
        validationParam: true,
      },
    ],
    location: [
      {
        validationName: 'isRequiredDropdown',
        validationParam: true,
      },
    ],
  };

  const [locations, setLocations] = useState([]);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchLocations = async () => {
    try {
      const response = await getLocations();
      setLocations(response);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const handleRegister = async () => {
    setLoading(true);
    try {
      const payload = { ...formData, location: formData.location._id };
      const response = await addUser(payload);
      setLoading(false);
      navigate('/login', {
        state: { message: response },
      });
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateAll()) {
      handleRegister();
    }
  };

  const validateAll = () => {
    let isValid = true;
    Object.keys(formValidations).forEach((name) => {
      if (!validate(name, formData[name])) {
        isValid = false;
      }
    });
    if (isValid && !validatePasswords()) {
      isValid = false;
    }
    return isValid;
  };

  const validate = (name, value) => {
    const validator = Validator(value);

    return !formValidations[name].some((validation) => {
      const result = validator[validation.validationName](
        validation.validationParam,
      );
      setFormErrors((prevState) => ({
        ...prevState,
        [name]: result,
      }));
      return result;
    });
  };

  const validatePasswords = () => {
    if (formData.password != formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    setError('');
    return true;
  };

  const handleInputChange = (e, name, value) => {
    name = name ?? e.target.name;
    value = name == 'location' ? value : e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    validate(name, value);
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
            style={{ width: '100%', maxWidth: '150px' }}
          />
        </Box>

        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          label="Name"
          type="text"
          variant="outlined"
          margin="normal"
          name="name"
          fullWidth
          value={formData.name}
          onChange={(e) => handleInputChange(e)}
          error={Boolean(formErrors.name)}
          helperText={formErrors.name}
        />
        <TextField
          label="Email"
          type="text"
          variant="outlined"
          margin="normal"
          fullWidth
          name="email"
          value={formData.email}
          onChange={(e) => handleInputChange(e)}
          error={Boolean(formErrors.email)}
          helperText={formErrors.email}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
          name="password"
          value={formData.password}
          onChange={(e) => handleInputChange(e)}
          error={Boolean(formErrors.password)}
          helperText={formErrors.password}
        />
        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={(e) => handleInputChange(e)}
          error={Boolean(formErrors.confirmPassword)}
          helperText={formErrors.confirmPassword}
        />
        <Autocomplete
          options={locations}
          getOptionLabel={(option) => option.location}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select a location"
              variant="outlined"
              error={Boolean(formErrors.location)}
              helperText={formErrors.location}
            />
          )}
          isOptionEqualToValue={(option, value) => option._id === value?._id}
          onChange={(e, value) => handleInputChange(e, 'location', value)}
          value={formData.location}
          sx={{ mt: 2 }}
          fullWidth
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2, height: '40px' }}
          disabled={loading}
          fullWidth
        >
          {loading ? <CircularProgress size={20} /> : 'Register'}
        </Button>
      </Grid>
    </Grid>
  );
}

export default Register;
