import {
  Alert,
  Autocomplete,
  CircularProgress,
  Dialog,
  DialogContent,
  Divider,
  Stack,
  TextField,
  useMediaQuery,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import Validator from '../../utils/Validator';
import CustomSelect from './CustomSelect';
import { addShipments, updateShipments } from './dashboardApi';
import { getLoggedUserId } from '../../utils/Utils';
import {
  StyledButton,
  StyledDialogTitle,
  StyledIconButton,
} from './styledComponents';

function ShipmentForm({
  type,
  handleType,
  locations,
  shipment,
  setSnackbar,
  setFlag,
}) {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('md'));
  const [formData, setFormData] = useState({
    source: null,
    destination: null,
    weight: '',
    status: 'In-Transit',
    description: '',
  });

  const [formErrors, setFormErrors] = useState({
    source: '',
    destination: '',
    weight: '',
    status: '',
    description: '',
  });

  const formValidations = {
    source: [
      {
        validationName: 'isRequiredDropdown',
        validationParam: true,
      },
    ],
    destination: [
      {
        validationName: 'isRequiredDropdown',
        validationParam: true,
      },
    ],
    weight: [
      {
        validationName: 'isRequired',
        validationParam: true,
      },
      {
        validationName: 'isPattern',
        validationParam: [
          `^(?:[1-9]|[1-9][0-9]|[1-9][0-9][0-9])$`,
          'Range: 1-999',
        ],
      },
    ],
    description: [
      {
        validationName: 'isMaxLength',
        validationParam: 1000,
      },
    ],
  };

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddShipment = async () => {
    setLoading(true);
    try {
      const data = {
        ...formData,
        source: formData.source._id,
        destination: formData.destination._id,
        weight: `${formData.weight}kg`,
        createdBy: getLoggedUserId(),
      };
      const response = await addShipments(data);
      setFlag((prev) => !prev);
      handleType('');
      setSnackbar(response);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  const handleEditShipment = async () => {
    setLoading(true);
    try {
      const data = {
        ...formData,
        source: formData.source._id,
        destination: formData.destination._id,
        weight: `${formData.weight}kg`,
      };
      const response = await updateShipments(shipment._id, data);
      setFlag((prev) => !prev);
      handleType('');
      setSnackbar(response);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateAll()) {
      if (type == 'add') {
        handleAddShipment();
      } else {
        handleEditShipment();
      }
    }
  };

  const validateAll = () => {
    // console.log(formData);
    let isValid = true;
    Object.keys(formValidations).forEach((name) => {
      if (!validate(name, formData[name])) {
        isValid = false;
      }
    });
    if (isValid && !validateLocations()) {
      isValid = false;
    }
    return isValid;
  };

  const validate = (name, value) => {
    if (!formValidations[name]) {
      return true;
    }
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

  const validateLocations = () => {
    if (formData.source._id == formData.destination._id) {
      setError("Locations can't be same");
      return false;
    }
    return true;
  };

  const handleInputChange = (e, name, value) => {
    setError('');
    name = name ?? e.target.name;
    value = name == 'source' || name == 'destination' ? value : e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    validate(name, value);
  };

  useEffect(() => {
    if (type == 'edit') {
      setFormData({
        source: shipment.source,
        destination: shipment.destination,
        weight: parseInt(shipment.weight).toString(),
        status: shipment.status,
        description: shipment.description,
      });
    }
  }, [type, shipment]);

  return (
    <Dialog
      open={Boolean(type)}
      onClose={() => handleType('')}
      fullScreen={isXs}
    >
      <StyledDialogTitle>
        {type == 'edit' ? 'Edit shipment' : 'Add shipment'}
      </StyledDialogTitle>
      <StyledIconButton aria-label="close" onClick={() => handleType('')}>
        <CloseIcon />
      </StyledIconButton>
      <Divider />
      <DialogContent>
        {error && <Alert severity="error">{error}</Alert>}
        <Autocomplete
          options={locations}
          getOptionLabel={(option) => option.location}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select source"
              variant="outlined"
              error={Boolean(formErrors.source)}
              helperText={formErrors.source}
            />
          )}
          isOptionEqualToValue={(option, value) => option._id === value?._id}
          onChange={(e, value) => handleInputChange(e, 'source', value)}
          value={formData.source}
          sx={{ mt: 2 }}
          fullWidth
        />

        <Autocomplete
          options={locations}
          getOptionLabel={(option) => option.location}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select destination"
              variant="outlined"
              error={Boolean(formErrors.destination)}
              helperText={formErrors.destination}
            />
          )}
          isOptionEqualToValue={(option, value) => option._id === value?._id}
          onChange={(e, value) => handleInputChange(e, 'destination', value)}
          value={formData.destination}
          sx={{ mt: 2 }}
          fullWidth
        />

        <Stack mt={2} direction="row" spacing={2}>
          <TextField
            label="Weight (in Kg)"
            type="number"
            variant="outlined"
            margin="normal"
            name="weight"
            fullWidth
            value={formData.weight}
            onChange={(e) => handleInputChange(e)}
            error={Boolean(formErrors.weight)}
            helperText={formErrors.weight}
          />
          <CustomSelect
            handleChange={handleInputChange}
            value={formData.status}
            required={true}
          />
        </Stack>
        <TextField
          label="Description"
          multiline
          rows={4}
          fullWidth
          margin="normal"
          variant="outlined"
          name="description"
          value={formData.description}
          onChange={(e) => handleInputChange(e)}
          error={Boolean(formErrors.description)}
          helperText={formErrors.description}
        />
        <StyledButton
          variant="contained"
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? <CircularProgress size={20} /> : 'Submit'}
        </StyledButton>
      </DialogContent>
    </Dialog>
  );
}

export default ShipmentForm;
