import React, { useState } from "react";

import '../assets/styles.css';

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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ViewMessage(props) {

    console.log(props.mailbox);

    const handleOpen = () => {
        props.setDialogOpen(true);
    };

    const handleClose = () => {
        props.setDialogOpen(false);
    };

    if(props.message != null)
        return (
            <div>
                <Dialog
                    open={props.dialogOpen}
                    keepMounted
                    TransitionComponent={Transition}
                    onClose={handleClose}
                >
                    <DialogTitle id="alert-dialog=slide=title">{props.message.subject}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {props.mailbox === 0 && (
                                <Typography variant="h6">
                                    Sender:{" "}
                                    {`${props.message.sender.firstName} ${props.message.sender.lastName}`}
                                </Typography>
                            )}
                            {props.mailbox === 1 && (
                                <Typography variant="h6">
                                    Recepient:{" "}
                                    {`${props.message.recepient.firstName} ${props.message.recepient.lastName}`}
                                </Typography>
                            )}
                            <Typography variant="body1">
                                Sent: {`${props.message.sendTime}`}
                            </Typography>
                            <br />
                            <Typography style={{ color: "black" }} variant="body1">
                                {props.message.content}
                            </Typography>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button>Reply</Button>
                        <Button onClick={handleClose}>Close</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    else
        return <div></div>;
}
