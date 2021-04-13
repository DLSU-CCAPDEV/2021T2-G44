import React, { useState } from "react";

import "../assets/styles.css";

import {
    Typography,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide,
} from "@material-ui/core";

import SendMessage from "./SendMessage";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ViewInvite(props) {
    const handleClose = () => {
        props.setDialogOpen(false);
    };

    const handleAccept = async () => {
        alert("Invite accepted.");
    };

    const handleDeny = async () => {
        alert("Invite denied.");
    };

    if (props.selectedInvitation != null)
        return (
            <div>
                <Dialog
                    open={props.dialogOpen}
                    TransitionComponent={Transition}
                    onClose={handleClose}
                >
                    <DialogTitle id="alert-dialog=slide=title">{`Invitation to: ${props.selectedInvitation.event.title}`}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <Typography variant="body1">
                                {`You have been invited to ${props.selectedInvitation.event.title} by ${props.selectedInvitation.host.firstName} ${props.selectedInvitation.host.lastName}.`}
                            </Typography>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleAccept}>Accept</Button>
                        <Button onClick={handleDeny}>Deny</Button>
                        <Button onClick={handleClose}>Close</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    else return <div></div>;
}
