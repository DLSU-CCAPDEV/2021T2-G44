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
    Snackbar
} from "@material-ui/core";

import SendMessage from "./SendMessage";

import { toggleRead, streamFile } from '../../controllers/MailController';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ViewMessage(props) {
    
    const [replyDialogOpen, setReplyDialogOpen] = useState(false);
    const [snackbar, setSnackbar] = useState(null);

    const messageContent = props.message.content.split("\n");

    // Tag the message as read
    useEffect(() => {
        if(!props.message.isRead && props.message.sender) {
            props.message.isRead = true;
            toggleRead(props.message._id);
        }
    }, [props.dialogOpen, props.message]);

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
    };

    const handleFileDownload = async (file) => {
        setSnackbar("Preparing your file for download.");
        streamFile(file);
    }

    if (props.message != null)
        return (
            <div>
                <Snackbar
                    open={ snackbar ? true : false }
                    onClose={ () => setSnackbar(null) }
                    message={ snackbar }
                    anchorOrigin={ { vertical: 'top', horizontal: 'center' } }
                    key={'topcenter'}
                />
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
                            <br />
                            {props.message.attachments.length > 0 && ( <Typography>Attachments</Typography> )}
                            {props.message.attachments.length === 0 && ( <Typography>No attachments</Typography> )}
                            {props.message.attachments.map((attachment, i) => {
                                return <Button onClick={() => handleFileDownload(attachment)} style={ { marginLeft: "1em" } } key={attachment}>Attachment #{i+1}</Button>
                            })}
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
