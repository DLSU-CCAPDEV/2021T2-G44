import React, { useState } from "react";

import "../assets/styles.css";

import {
    Grid,
    Typography,
    TextField,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide,
} from "@material-ui/core";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const textFieldStyles = {
    margin: "1em",
    minWidth: "500px",
};

export default function SendMessage(props) {
    const handleClose = () => {
        props.setDialogOpen(false);
    };

    const handleSend = () => {
        // Call to mail handler
    };

    return (
        <div>
            <Dialog
                open={props.dialogOpen}
                keepMounted
                TransitionComponent={Transition}
                onClose={handleClose}
            >
                <DialogTitle id="alert-dialog=slide=title">Send a Message</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Grid container direction="column" alignItems="stretch" spacing={2}>
                            <TextField
                                id="messageRecepient"
                                label="Recepient Email Address"
                                required
                                style={textFieldStyles}
                            />
                            <TextField
                                id="messageSubject"
                                label="Message Subject"
                                required
                                style={textFieldStyles}
                            />
                            <TextField
                                id="messageContent"
                                label="Message Content"
                                multiline
                                rows={10}
                                variant="filled"
                                value={props.thread || ""}
                                required
                                style={textFieldStyles}
                            />
                        </Grid>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSend}>Send</Button>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
