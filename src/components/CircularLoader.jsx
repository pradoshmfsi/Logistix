import { Box, CircularProgress } from '@mui/material';

function CircularLoader() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1000,
      }}
    >
      <CircularProgress />
    </Box>
  );
}

export default CircularLoader;
