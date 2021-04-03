import React, { useState } from 'react';

// Material UI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function DeleteEvent() {
    const [open, setOpen] = React.useState(true);
    const openDialog = () => {
        setOpen(true);
    };

    const closeDialog = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={closeDialog}
                aria-labelledby="delete-dialog-title"
                aria-describedby="delete-dialog-description"
            >
                <DialogTitle id="delete-dialog-title">{'Delete Event'}</DialogTitle>

                <DialogContent>
                    <DialogContentText id="delete-dialog-description">
                        You seem to have pressed the delete button. Are you sure you want to delete this event?
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={closeDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={closeDialog} color="primary" autoFocus>
                        Delete Event
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
