import { React, useState, useEffect } from 'react';

// MUI imports
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import { MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

// MUI icons
import AddIcon from '@material-ui/icons/Add';
import VisibilityIcon from '@material-ui/icons/Visibility';

// Controllers
import { GetUserID } from '../../controllers/UserController';
import { createNewAppointment } from '../../controllers/AppointmentController';

// Custom MUI components
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {},
}));

var getDates = function (startDate, endDate) {
    var firstDay = startDate;
    var dates = [],
        currentDate = startDate,
        addDays = function (days) {
            var date = new Date(this.valueOf());
            date.setDate(date.getDate() + days);
            return date;
        };
    while (currentDate <= endDate) {
        dates.push(currentDate);
        currentDate = addDays.call(currentDate, 1);
    }
    return dates;
};

export default function AppointmentButtons(props) {
    const classes = useStyles();
    const eventID = props.eventID;
    const eventDetails = props.data;
    const timeLimit = eventDetails.timeLimit;
    const dateChoices = getDates(new Date(eventDetails.startDate), new Date(eventDetails.endDate));

    // Date choices
    const defaultProps = {
        options: dateChoices,
        getOptionLabel: (option) => new Date(option).toDateString(),
    };

    // Button states
    const [addAppoinmentOpen, setAddAppoinmentOpen] = useState(false);
    const [viewAppoinmentOpen, setViewAppoinmentOpen] = useState(false);

    // Time & Date state
    const [appointmentDate, setAppointmentDate] = useState(new Date());
    const [appointmentTime, setAppointmentTime] = useState(new Date());

    // Error Msg state
    const [errorMsg, setErrorMsg] = useState(null);

    // Appointment add success state
    const [appointmentAddSuccess, setAppointmentAddSuccess] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const { successVert, successHorizon, openAppointmentAddSuccess } = appointmentAddSuccess;

    // Appointment add error state
    const [appointmentAddError, setAppointmentAddError] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const { errorVert, errorHorizon, openAppointmentAddError } = appointmentAddError;

    // Button event handlers
    const handleAddAppointmentOpen = () => {
        setAddAppoinmentOpen(!addAppoinmentOpen);
    };

    const handleViewAppointmentOpen = () => {
        setViewAppoinmentOpen(!viewAppoinmentOpen);
    };

    // Time & Date event handler
    const handleAppointmentDateChange = (date) => {
        console.log(date);
        setAppointmentDate(date);
    };

    const handleAppointmentTimeChange = (date) => {
        setAppointmentTime(date);
    };

    // Error msg event handler
    const handleErrorMsg = (msg) => {
        setErrorMsg(msg);
    };

    // Appointment add success event handlers
    const handleAddAppointmentSuccessClose = () => {
        setAppointmentAddSuccess({ ...appointmentAddSuccess, openAppointmentAddSuccess: false });
    };

    // Appointment add error event handlers
    const handleAddAppointmentErrorClose = () => {
        setAppointmentAddError({ ...appointmentAddError, openAppointmentAddError: false });
    };

    const handleConfirmAddAppointment = async (newState) => {
        const userResponse = await GetUserID();
        const uid = userResponse.uid;
        var finalStartTime = appointmentDate;
        finalStartTime.setHours(appointmentTime.getHours(), appointmentTime.getMinutes());

        var finalEndTime = new Date(JSON.parse(JSON.stringify(finalStartTime)));
        finalEndTime.setMinutes(appointmentTime.getMinutes() + timeLimit);

        console.log(finalStartTime);
        console.log(finalEndTime);
        console.log(typeof ((finalEndTime - finalStartTime) / 60000));
        console.log(typeof timeLimit);

        const tempAppointment = {
            participantID: uid,
            eventID: eventID,
            startTime: finalStartTime,
            endTime: finalEndTime,
        };

        const response = await createNewAppointment(tempAppointment);
        if (response.success !== true) {
            handleErrorMsg(response.errors[0].msg);
            setAppointmentAddError({ openAppointmentAddError: true, ...newState });
            handleAddAppointmentOpen();
        }

        if (response.success === true) {
            setAppointmentAddSuccess({ openAppointmentAddSuccess: true, ...newState });
            handleAddAppointmentOpen();
        }
    };

    return (
        <div>
            <Grid container direction="row" justify="flex-end" spacing={2} style={{ marginLeft: '4.85em' }}>
                {/* ADD APPOINTMENT BUTTON */}
                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        size="large"
                        onClick={handleAddAppointmentOpen}
                    >
                        Add Appointment
                    </Button>
                </Grid>

                {/* VIEW APPOINTMENTS BUTTON */}
                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<VisibilityIcon />}
                        size="large"
                        onClick={handleViewAppointmentOpen}
                    >
                        View Appointments
                    </Button>
                </Grid>
            </Grid>

            <Dialog open={addAppoinmentOpen} onClose={handleAddAppointmentOpen} maxWidth="sm" fullWidth={true}>
                <DialogTitle style={{ fontWeight: 'bold' }}>Add an Appointment</DialogTitle>
                <DialogContent>
                    <Autocomplete
                        {...defaultProps}
                        id="debug"
                        debug
                        renderInput={(params) => <TextField {...params} label="Date" margin="normal" />}
                        onChange={(e, newValue) => handleAppointmentDateChange(newValue)}
                    />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-between">
                            <KeyboardTimePicker
                                margin="normal"
                                id="start-time-picker"
                                label="Time"
                                value={appointmentTime}
                                onChange={handleAppointmentTimeChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                            />
                        </Grid>
                        <DialogContentText>Specify the time of your new appointment</DialogContentText>
                    </MuiPickersUtilsProvider>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddAppointmentOpen} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={(e) => handleConfirmAddAppointment({ vertical: 'top', horizontal: 'center' })}
                        color="primary"
                    >
                        Add Appointment
                    </Button>
                </DialogActions>
            </Dialog>
            {/* EVENT ADD SUCCESS */}
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={openAppointmentAddSuccess}
                autoHideDuration={6000}
                onClose={handleAddAppointmentSuccessClose}
                key={successVert + successHorizon}
            >
                <Alert onClose={handleAddAppointmentSuccessClose} severity="success">
                    Appointment has been added!
                </Alert>
            </Snackbar>

            {/* EVENT ADD ERROR */}
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={openAppointmentAddError}
                autoHideDuration={6000}
                onClose={handleAddAppointmentErrorClose}
                key={errorVert + errorHorizon}
            >
                <Alert onClose={handleAddAppointmentErrorClose} severity="error">
                    {errorMsg}
                </Alert>
            </Snackbar>
        </div>
    );
}
