import { styled } from '@mui/material/styles';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, IconButton } from '@mui/material';

export const StyledDialogTitle = styled(DialogTitle)`
  margin: 0;
  padding: 2;
  width: 400px;
`;

export const StyledIconButton = styled(IconButton)({
  position: 'absolute',
  right: 8,
  top: 8,
  color: (theme) => theme.palette.grey[500],
});

export const StyledButton = styled(Button)({
  color: 'primary',
  width: '100%',
  mt: 2,
});
