import React, { useEffect, useState } from 'react';

// import "../assets/styles.css";

import { GetEventAppointments } from '../../controllers/AppointmentController';
import { GetUserData } from '../../controllers/UserController';

import {
    List,
    ListItem,
    ListItemText,
    Typography,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide,
} from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ViewParticipants(props) {

    const [appointments, setAppointments] = useState([]);

    const handleClose = () => {
        props.setDialogOpen(false);
    };

    useEffect(async () => {
        const appointments = await GetEventAppointments(props.selectedEvent._id);
        if(!appointments.success) {
            alert(appointments.errors[0].msg);
            return;
        }
        const processedAppointments = await Promise.all(appointments.appointments.map(async app => {
            app.participant = (await GetUserData(app.participantID)).userData;
            return app;
        }));
        setAppointments(processedAppointments);
    }, [props.selectedEvent]);

    if (props.selectedEvent != null)
        return (
            <div>
                <Dialog open={props.dialogOpen} TransitionComponent={Transition} onClose={handleClose}>
                    <DialogTitle id="alert-dialog=slide=title">{`All Participants of ${props.selectedEvent.title}`}</DialogTitle>
                    <DialogContent dividers>
                        <DialogContentText>
                            <List>
                                {appointments && appointments.map((app, i) => (
                                    <ListItem key={app}>
                                        <ListItemText>{`${i+1} - ${app.participant.firstName} ${app.participant.lastName} | ${new Date(app.startTime).toLocaleString()} - ${new Date(app.endTime).toLocaleString()}`}</ListItemText>
                                    </ListItem>
                                ))}
                            </List>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Close</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    else return <div></div>;
}
