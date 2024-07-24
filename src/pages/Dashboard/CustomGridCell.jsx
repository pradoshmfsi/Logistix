import { Grid, Typography } from '@mui/material';

function CustomGridCell({ title, value }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Typography variant="subtitle1" color="textSecondary">
          {title}
        </Typography>
      </Grid>
      <Grid item xs={8}>
        {value}
      </Grid>
    </Grid>
  );
}

export default CustomGridCell;
