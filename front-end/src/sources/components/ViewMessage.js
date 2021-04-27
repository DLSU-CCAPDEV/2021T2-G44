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

import SendMessage from "./SendMessage";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ViewMessage(props) {
    
    const [replyDialogOpen, setReplyDialogOpen] = useState(false);

    const messageContent = props.message.content.replace(/\n/g, "\n\n");

    const handleClose = () => {
        props.setDialogOpen(false);
    };

    const handleReply = () => {
        // Open the send message dialog
        setReplyDialogOpen(true);
    };

    if (props.message != null)
        return (
            <div>
                <Dialog
                    open={props.dialogOpen}
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
                                {messageContent}
                            </Typography>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        {props.message.sender && <Button onClick={handleReply}>Reply</Button>}
                        <Button onClick={handleClose}>Close</Button>
                    </DialogActions>
                </Dialog>

                {props.message.sender && (
                    <SendMessage
                        dialogOpen={replyDialogOpen}
                        setDialogOpen={setReplyDialogOpen}
                        replyAddress={props.message.sender.email || ""}
                        threadSubject={props.message.subject || ""}
                        thread={
                            "\n\n---------------------------------------------------------\n" +
                            `From: ${props.message.sender.firstName} ${props.message.sender.lastName}\n\n` +
                            props.message.content +
                            "\n---------------------------------------------------------\n"
                        }
                    />
                )}
            </div>
        );
    else return <div></div>;
}
