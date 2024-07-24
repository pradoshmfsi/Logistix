import {
  Alert,
  Autocomplete,
  Checkbox,
  Dialog,
  DialogContent,
  Divider,
  FormControlLabel,
  Stack,
  TextField,
  useMediaQuery,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useCallback, useEffect, useState } from 'react';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import dayjs from 'dayjs';
import CustomSelect from './CustomSelect';
import { getLoggedUserId } from '../../utils/Utils';
import {
  StyledButton,
  StyledDialogTitle,
  StyledIconButton,
} from './styledComponents';

function FiltersForm({
  filterOpen,
  setFilterOpen,
  locations,
  filters,
  setFilters,
  resetFilters,
}) {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('md'));

  const [created, setCreated] = useState({
    from: null,
    to: null,
  });

  const [error, setError] = useState('');

  const handleInputChange = (e, name, value) => {
    name = name ?? e.target.name;
    value = name == 'status' ? e.target.value : value;
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (date, name) => {
    setCreated((prevState) => ({
      ...prevState,
      [name]: date,
    }));
    if (name == 'from' && date && date > created.to) {
      setCreated((prevState) => ({
        ...prevState,
        to: null,
      }));
    }
  };

  const handleCheckbox = () => {
    if (!filters.createdBy) {
      setFilters((prevState) => ({
        ...prevState,
        createdBy: getLoggedUserId(),
      }));
    } else {
      setFilters((prevState) => ({
        ...prevState,
        createdBy: null,
      }));
    }
  };

  const validateDates = useCallback(() => {
    if (Boolean(created.from) != Boolean(created.to)) {
      setError('Please set both start and end date');
      return false;
    }
    setError('');
    return true;
  }, [created]);

  const submitFilterForm = () => {
    if (validateDates()) {
      setFilters((prevState) => ({
        ...prevState,
        createdFrom: created.from ? dayjs(created.from) : null,
        createdTo: created.to ? dayjs(created.to) : null,
      }));
      setFilterOpen(false);
    }
  };

  const resetFilterForm = () => {
    setCreated({
      from: null,
      to: null,
    });
    resetFilters();
    setFilterOpen(false);
  };

  useEffect(() => {
    validateDates();
  }, [validateDates, created]);

  return (
    <Dialog open={filterOpen} fullScreen={isXs}>
      <StyledDialogTitle id="customized-dialog-title">
        Filters
      </StyledDialogTitle>
      <StyledIconButton
        aria-label="close"
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
        onClick={() => setFilterOpen(false)}
      >
        <CloseIcon />
      </StyledIconButton>
      <Divider />
      <DialogContent>
        {error && <Alert severity="error">{error}</Alert>}
        <CustomSelect handleChange={handleInputChange} value={filters.status} />
        <Autocomplete
          options={locations}
          getOptionLabel={(option) => option.location}
          renderInput={(params) => (
            <TextField {...params} label="Select source" variant="outlined" />
          )}
          isOptionEqualToValue={(option, value) => option._id === value?._id}
          onChange={(e, value) => handleInputChange(e, 'source', value)}
          value={filters.source}
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
            />
          )}
          isOptionEqualToValue={(option, value) => option._id === value?._id}
          onChange={(e, value) => handleInputChange(e, 'destination', value)}
          value={filters.destination}
          sx={{ mt: 2 }}
          fullWidth
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack direction="row" spacing={2} mt={2}>
            <MobileDateTimePicker
              label="Created from"
              value={created.from}
              onChange={(date) => handleDateChange(date, 'from')}
            />
            <MobileDateTimePicker
              label="Created to"
              value={created.to}
              onChange={(date) => handleDateChange(date, 'to')}
              minDate={created.from}
              disabled={!created.from}
            />
          </Stack>
        </LocalizationProvider>
        <FormControlLabel
          control={
            <Checkbox
              checked={Boolean(filters.createdBy)}
              onChange={handleCheckbox}
            />
          }
          label="Created by me"
        />
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <StyledButton variant="contained" onClick={submitFilterForm}>
            View Results
          </StyledButton>
          <StyledButton variant="outlined" onClick={resetFilterForm}>
            Reset
          </StyledButton>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default FiltersForm;
