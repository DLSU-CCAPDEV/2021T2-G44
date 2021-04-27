import React, { useState, useEffect } from "react";

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

import { toggleRead } from '../../controllers/MailController';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ViewMessage(props) {
    
    const [replyDialogOpen, setReplyDialogOpen] = useState(false);

    const messageContent = props.message.content.split("\n");

    // Tag the message as read
    useEffect(() => {
        if(!props.message.isRead) {
            props.message.isRead = true;
            toggleRead(props.message._id);
        }
    }, [props.dialogOpen]);

    const handleClose = () => {
        props.setDialogOpen(false);
    };

    const handleReply = () => {
        // Open the send message dialog
        setReplyDialogOpen(true);
    };

    const handleMarkAsUnread = () => {
        props.message.isRead = false;
        toggleRead(props.message._id);
        props.setDialogOpen(false);
    }

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
                                {messageContent.map((e, i) => <p key={i}>{e}</p>)}
                            </Typography>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        {props.message.sender && <Button onClick={handleReply}>Reply</Button>}
                        {props.message.sender && <Button onClick={handleMarkAsUnread}>Mark as Unread</Button>}
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
