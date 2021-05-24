import React from 'react';

// import "../assets/styles.css";

import {
    Typography,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide,
} from '@material-ui/core';

import { respondInvitation } from '../../controllers/InvitesController';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ViewInvite(props) {
    const handleClose = () => {
        props.setDialogOpen(false);
    };

    const handleAccept = async () => {
        alert('Invite accepted.');
        const result = await respondInvitation(props.selectedInvitation._id, 'accept');
        if(!result.success) {
            alert(result.errors[0].msg);
            console.log(result.errors[0].msg)
            return;
        }
        props.invokeUpdate(!props.update);
        props.setDialogOpen(false);
    };

    const handleDeny = async () => {
        alert('Invite denied.');
        const result = await respondInvitation(props.selectedInvitation._id, 'deny');
        if(!result.success) {
            alert(result.errors[0].msg);
            console.log(result.errors[0].msg)
            return;
        }
        props.invokeUpdate(!props.update);
        props.setDialogOpen(false);
    };

    if (props.selectedInvitation != null)
        return (
            <div>
                <Dialog open={props.dialogOpen} TransitionComponent={Transition} onClose={handleClose}>
                    <DialogTitle id="alert-dialog=slide=title">{`Invitation to: ${props.selectedInvitation.event.title}`}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <Typography variant="body1">
                                {`You have been invited to ${props.selectedInvitation.event.title} by ${props.selectedInvitation.inviter.firstName} ${props.selectedInvitation.inviter.lastName}.`}
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
