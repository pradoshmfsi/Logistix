import { Box, CircularProgress } from '@mui/material';
import { BACKGROUND } from '../constants/styles';

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
        backgroundColor: BACKGROUND.BLUR,
        zIndex: 1000,
      }}
    >
      <CircularProgress />
    </Box>
  );
}

export default CircularLoader;
