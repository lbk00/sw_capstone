import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const ResultModal = ({ title, content, callbackFn }) => {
  return (
    <Dialog
      open={true}
      onClose={callbackFn}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <Typography variant="h4" component="div">
          {content}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={callbackFn} color="primary" autoFocus>
          Close Modal
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ResultModal;