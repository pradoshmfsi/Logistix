import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function CustomSnackbar({ message, open, setOpen }) {
  // const [open, setOpen] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen('');
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          severity={message.type}
        >
          {message.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default CustomSnackbar;
