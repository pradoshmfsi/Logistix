import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

function StatusDropdown({ value, handleChange, required }) {
  const list = [
    ['In-Transit', 'In-Transit'],
    ['Delivered', 'Delivered'],
    ['Delayed', 'Delayed'],
  ];
  return (
    <FormControl fullWidth>
      <InputLabel id="statusLabel">Status</InputLabel>
      <Select
        labelId="statusLabel"
        value={value}
        label="Status"
        name="status"
        onChange={(e) => handleChange(e)}
      >
        {!required && (
          <MenuItem value="">
            <em>Select status</em>
          </MenuItem>
        )}
        {list.map((item, index) => (
          <MenuItem value={item[0]} key={index}>
            {item[1]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default StatusDropdown;
