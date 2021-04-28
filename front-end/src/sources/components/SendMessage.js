import React, { useState, useEffect } from "react";

import { sendMessage } from '../../controllers/MailController';

import CloseIcon from '@material-ui/icons/Close';
import Loading from './Loading';
import {DropzoneDialog} from 'material-ui-dropzone';

import "../assets/styles.css";

import {
    Grid,
    TextField,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide,
    Typography
} from "@material-ui/core";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const textFieldStyles = {
    margin: "1em",
    minWidth: "500px",
};

export default function SendMessage(props) {
    // Field change handlers
    const [recepientEmail, setRecepientEmail] = useState(null);
    const [messageSubject, setMessageSubject] = useState(null);
    const [messageContent, setMessageContent] = useState([null]);
    const [attachments, setAttachments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

    // Initialize message states if ever this is a reply
    useEffect(() => {
        setRecepientEmail(props.replyAddress || "");
        setMessageSubject(props.threadSubject || "");
        setMessageContent(props.thread || "");
        setLoading(false);
    }, [props.replyAddress, props.thread, props.threadSubject]);


    const handleClose = () => {
        props.setDialogOpen(false);
    };

    const handleSend = async (e) => {
        e.preventDefault();

        // Call send message
        props.setDialogOpen(false);

        const sendStatus = await sendMessage(recepientEmail, {
            subject: messageSubject,
            content: messageContent,
            attachments: attachments
        });

        if(!sendStatus) {
            alert("Message send failed.");
            return;
        };

        alert("Message has been sent.");
    };

    // Dropzone Handlers
    const handleSave = async (files) => {
        setAttachments(attachments.concat(files));
        setUploadDialogOpen(false);
    };

    const handleRemoveFiles = async (index) => {
        // Remove the ith element of the array
        const fileList = attachments;
        fileList.splice(index, 1);
        setAttachments([...fileList]);
    };

    return (
        <div>
            <Dialog open={props.dialogOpen} TransitionComponent={Transition} onClose={handleClose}>
                {loading && <Loading />}
                {!loading && 
                    <form onSubmit={handleSend}>
                    <DialogTitle id="alert-dialog=slide=title">Send a Message</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <Grid container direction="column" alignItems="stretch" spacing={2}>
                                <TextField
                                    id="messageRecepient"
                                    label="Recepient Email Address"
                                    type="email"
                                    required
                                    style={textFieldStyles}
                                    defaultValue={ recepientEmail }
                                    onChange={(e) => { setRecepientEmail(e.target.value); }}
                                />
                                <TextField
                                    id="messageSubject"
                                    label="Message Subject"
                                    required
                                    style={textFieldStyles}
                                    defaultValue={ messageSubject }
                                    onChange={(e) => { setMessageSubject(e.target.value); }}
                                />
                                <TextField
                                    id="messageContent"
                                    label="Message Content"
                                    multiline
                                    rows={10}
                                    variant="filled"
                                    defaultValue={ messageContent }
                                    required
                                    style={textFieldStyles}
                                    onChange={(e) => { setMessageContent(e.target.value); }}
                                />
                                <Typography style={ { margin: "1em" } }>Attachments</Typography>
                                { attachments &&
                                    attachments.map((file, i) => {
                                        return <Grid container direction="row" alignItems="center">
                                            <Button key={i} onClick={() => handleRemoveFiles(i)} style={ { marginLeft: "1em" } }><CloseIcon /></Button>
                                            <Typography style={{ marginLeft: "1em" }}>{file.name}</Typography>
                                        </Grid>;
                                    })
                                }
                                <Button style={{ margin:"1em" }} onClick={() => setUploadDialogOpen(true)}>Add Attachments</Button>
                                <DropzoneDialog
                                    dialogTitle={"Upload Attachments"}
                                    open={uploadDialogOpen}
                                    onSave={handleSave}
                                    showPreviews={true}
                                    cancelButtonText={"Cancel"}
                                    submitButtonText={"Attach"}
                                    maxFileSize={500000}
                                    onClose={() => setUploadDialogOpen(false)}
                                    showFileNamesInPreview={true}
                                />
                            </Grid>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit">Send</Button>
                        <Button onClick={handleClose}>Close</Button>
                    </DialogActions>
                </form>}
            </Dialog>
        </div>
    );
}
