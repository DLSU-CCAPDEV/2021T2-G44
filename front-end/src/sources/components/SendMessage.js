import React, { useState, useEffect } from "react";

import { sendMessage } from '../../controllers/MailController';

import Loading from './Loading';

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
    const [messageContent, setMessageContent] = useState(null);
    const [attachments, setAttachments] = useState([]);
    const [loading, setLoading] = useState(true);

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

        props.setDialogOpen(false);
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
