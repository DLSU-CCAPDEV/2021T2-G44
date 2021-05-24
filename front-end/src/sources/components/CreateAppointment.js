import { React, useEffect, useState } from 'react';
import moment from 'moment';

import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    InputLabel,
    MenuItem,
    FormHelperText,
    FormControl,
    Select,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Autocomplete from '@material-ui/lab/Autocomplete';

// Material UI icons
import BookmarkIcon from '@material-ui/icons/Bookmark';

// Controllers
import { GetEventAppointments, GetAppointmentByDate, UpdateAppointment } from '../../controllers/AppointmentController';
import { GetUserID } from '../../controllers/UserController';

// Custom MUI components
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const customStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 250,
    },
}));

export default function FormDialog(props) {
    const classes = customStyles();
    const eventID = props.eventID;

    const [openMakeAppointmentDialog, setOpenMakeAppointmentDialog] = useState(false);
    const [appointmentData, setAppointmentData] = useState([]);
    const [dateOptions, setDateOptions] = useState([]);
    const [selectDate, setSelectDate] = useState(null);

    // Updater
    const [updater, invokeUpdate] = useState(false);

    // Error Msg state
    const [errorMsg, setErrorMsg] = useState(null);

    // Confirm appointment success state
    const [confirmAppointmentSuccess, setConfirmAppointmentSuccess] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const { successVert, successHorizon, openConfirmAppointmentSuccess } = confirmAppointmentSuccess;

    // Confirm appointment error state
    const [confirmAppointmentError, setConfirmAppointmentError] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const { errorVert, errorHorizon, openConfirmAppointmentError } = confirmAppointmentError;

    useEffect(async () => {
        const appointmentResponse = await GetEventAppointments(eventID);
        const appointments = appointmentResponse.appointments;

        setAppointmentData(appointments);
    }, [updater]);

    // Confirm appointment success event handlers
    const handleConfirmAppointmentSuccessClose = () => {
        setConfirmAppointmentSuccess({ ...confirmAppointmentSuccess, openConfirmAppointmentSuccess: false });
    };

    // Confirm appointment error event handlers
    const handleConfirmAppointmentErrorClose = () => {
        setConfirmAppointmentError({ ...confirmAppointmentError, openConfirmAppointmentError: false });
    };

    // Error msg event handler
    const handleErrorMsg = (msg) => {
        setErrorMsg(msg);
    };

    const handleMakeAppointmentOpen = () => {
        var filtered = appointmentData.filter((appointment) => appointment.participantID === '');

        var dates = [];
        filtered.forEach((appointment) => {
            dates.push(appointment.startTime);
        });

        setDateOptions(dates);
        setOpenMakeAppointmentDialog(true);
    };

    const handleMakeAppointmentClose = () => {
        setOpenMakeAppointmentDialog(false);
    };

    const handleConfirmAppointment = async (newState) => {
        const response = await GetAppointmentByDate(eventID, selectDate);
        const appointment = response.appointments[0];

        const userResponse = await GetUserID();
        const uid = userResponse.uid;

        appointment.participantID = uid;
        const appointResponse = await UpdateAppointment(appointment._id, appointment);

        if (appointResponse.success !== true) {
            handleErrorMsg(response.errors[0].msg);
            setConfirmAppointmentError({ openConfirmAppointmentError: true, ...newState });
            setSelectDate(null);
            handleMakeAppointmentClose();
        }

        if (appointResponse.success === true) {
            setConfirmAppointmentSuccess({ openConfirmAppointmentSuccess: true, ...newState });
            setSelectDate(null);
            handleMakeAppointmentClose();
        }

        // Invoke update
        invokeUpdate(!updater);
    };

    const handleDateChange = (date) => {
        setSelectDate(date);
    };

    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                onClick={handleMakeAppointmentOpen}
                startIcon={<BookmarkIcon />}
                size="large"
            >
                Book an Appointment
            </Button>
            <Dialog
                open={openMakeAppointmentDialog}
                onClose={handleMakeAppointmentClose}
                aria-labelledby="make-appointment-title"
                maxWidth="sm"
                fullWidth={true}
            >
                <DialogTitle id="make-appointment-title">Book an Appointment</DialogTitle>
                <DialogContent>
                    <DialogContentText>Book an appointment by choosing an available time slot.</DialogContentText>

                    <Grid container direction="row" justify="space-evenly">
                        <Autocomplete
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Select a Date"
                                    margin="normal"
                                    style={{ marginTop: '0', marginBottom: '2em' }}
                                />
                            )}
                            onChange={(e, newValue) => handleDateChange(newValue)}
                            options={dateOptions}
                            getOptionLabel={(option) => moment(new Date(option)).format('LLLL')}
                            fullWidth={true}
                        />
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleMakeAppointmentClose} color="primary">
                        Cancel
                    </Button>
                    {selectDate ? (
                        <Button
                            onClick={(e) => handleConfirmAppointment({ vertical: 'top', horizontal: 'center' })}
                            color="primary"
                        >
                            Book Appointment
                        </Button>
                    ) : (
                        <Button
                            onClick={(e) => handleConfirmAppointment({ vertical: 'top', horizontal: 'center' })}
                            color="primary"
                            disabled
                        >
                            Book Appointment
                        </Button>
                    )}
                </DialogActions>
            </Dialog>

            {/* CONFIRM APPOINTMENT SUCCESS */}
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={openConfirmAppointmentSuccess}
                autoHideDuration={6000}
                onClose={handleConfirmAppointmentSuccessClose}
                key={successVert + successHorizon}
            >
                <Alert onClose={handleConfirmAppointmentSuccessClose} severity="success">
                    Booking has been confirmed!
                </Alert>
            </Snackbar>

            {/* CONFIRM APPOINTMENT ERROR */}
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={openConfirmAppointmentError}
                autoHideDuration={6000}
                onClose={handleConfirmAppointmentErrorClose}
                key={errorVert + errorHorizon}
            >
                <Alert onClose={handleConfirmAppointmentErrorClose} severity="error">
                    {errorMsg}
                </Alert>
            </Snackbar>
        </div>
    );
}
