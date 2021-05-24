import React, { useState, useEffect } from 'react';

// import '../assets/styles.css';

import {
    Avatar,
    Typography,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide,
    Snackbar,
} from '@material-ui/core';

import SendMessage from './SendMessage';

import { toggleRead, streamFile, deleteMessage } from '../../controllers/MailController';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ViewMessage(props) {
    const [replyDialogOpen, setReplyDialogOpen] = useState(false);
    const [snackbar, setSnackbar] = useState(null);

    const messageContent = props.message.content.split('\n');

    // Tag the message as read
    useEffect(() => {
        if (!props.message.isRead && props.mailbox === 0) {
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
        setSnackbar('Preparing your file for download.');
        setTimeout(() => setSnackbar(null), 5000);
        streamFile(file);
    };

    const handleDelete = async () => {
        const status = await deleteMessage(props.message._id);
        console.log(status);
        if(!status.success) {
            setSnackbar(status.errors[0].msg);
            setTimeout(() => setSnackbar(null), 5000);
            handleClose();
            return;
        }

        setSnackbar("Message Deleted.");
        setTimeout(() => setSnackbar(null), 5000);
        handleClose();
        
        // Refresh the mail list
        const [render, doRerender] = props.reRender;
        doRerender(!render);
    }
    
    if (props.message != null)
        return (
            <div>
                <Snackbar
                    open={snackbar ? true : false}
                    onClose={() => setSnackbar(null)}
                    message={snackbar}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    key={'topcenter'}
                />
                <Dialog open={props.dialogOpen} TransitionComponent={Transition} onClose={handleClose}>
                    <DialogTitle id="alert-dialog=slide=title">{props.message.subject}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {props.mailbox === 0 && (
                                <div>
                                    <Avatar alt="Message Avatar" src={`${process.env.REACT_APP_BACK_END_API}/api/file/stream/${props.message.sender.avatar}`}>
                                        {`${props.message.sender.firstName[0]} ${props.message.sender.lastName[0]}`}
                                    </Avatar>
                                    <Typography variant="h6">
                                        Sender: {`${props.message.sender.firstName} ${props.message.sender.lastName}`}
                                    </Typography>
                                </div>
                            )}
                            {props.mailbox === 1 && (
                                <div>
                                    <Avatar alt="Message Avatar" src={`${process.env.REACT_APP_BACK_END_API}/api/file/stream/${props.message.recepient.avatar}`}>
                                        {`${props.message.sender.firstName[0]} ${props.message.recepient.lastName[0]}`}
                                    </Avatar>
                                    <Typography variant="h6">
                                        Recepient:{' '}
                                        {`${props.message.recepient.firstName} ${props.message.recepient.lastName}`}
                                    </Typography>
                                </div>
                            )}
                            <Typography variant="body1">Sent: {`${props.message.sendTime}`}</Typography>
                            <br />
                            <Typography style={{ color: 'black' }} variant="body1">
                                {messageContent.map((e, i) => (
                                    <p key={i}>{e}</p>
                                ))}
                            </Typography>
                            <br />
                            {props.message.attachments.length > 0 && <Typography>Attachments</Typography>}
                            {props.message.attachments.length === 0 && <Typography>No attachments</Typography>}
                            {props.message.attachments.map((file, i) => {
                                return (
                                    <Button
                                        onClick={() => handleFileDownload(file)}
                                        style={{ marginLeft: '1em' }}
                                        key={file}
                                    >
                                        Attachment #{i + 1}
                                    </Button>
                                );
                            })}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDelete}>Delete Mail</Button>
                        {props.mailbox === 0 && <Button onClick={handleMarkAsUnread}>Mark as Unread</Button>}
                        {props.mailbox === 0 && <Button onClick={handleReply}>Reply</Button>}
                        <Button onClick={handleClose}>Close</Button>
                    </DialogActions>
                </Dialog>

                {props.message.sender && (
                    <SendMessage
                        dialogOpen={replyDialogOpen}
                        setDialogOpen={setReplyDialogOpen}
                        replyAddress={props.message.sender.email || ''}
                        threadSubject={props.message.subject || ''}
                        thread={
                            '\n\n---------------------------------------------------------\n' +
                            `From: ${props.message.sender.firstName} ${props.message.sender.lastName}\n\n` +
                            props.message.content +
                            '\n---------------------------------------------------------\n'
                        }
                        reRender={props.reRender}
                    />
                )}
            </div>
        );
    else return <div></div>;
}
