import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button}
  from '@mui/material';

export default function EndCourseDialog(props) {
  return (
    <Dialog
      open={props.open}
      onClose={props.close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      id="delete-dialog"
      className="dialog-content"
    >
      <DialogTitle id="alert-dialog-title">
        {'Are you sure you want to end this course?'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This action can only be reversed by an administrator. All reports related to this course will still
          be visible. You will not be able to view or edit this course anymore. You will also no longer
          be able to create game sessions related to this course.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.keepCourse}>Keep Course</Button>
        <Button id="end-course" onClick={props.endCourse} autoFocus>
          End Course
        </Button>
      </DialogActions>
    </Dialog>
  );
}
