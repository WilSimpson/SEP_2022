import React from 'react';
// import DefaultLayout from '../layout/default.layout';
import CancelIcon from '@mui/icons-material/Cancel';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle} from '@mui/material';
export default function GamePlayTimeout(props) {
  return (
    <Dialog
      open={props.open}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
        <CancelIcon color='error' fontSize='large' />
        {'  Your session has expired'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          Too much time has passed since you last chose an option in this game.
          By starting a new game you can start again.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.returnHome}>Return Home</Button>
        <Button onClick={props.startNewGame} variant='contained' autoFocus>Start New Game</Button>
      </DialogActions>
    </Dialog>
  );
}
