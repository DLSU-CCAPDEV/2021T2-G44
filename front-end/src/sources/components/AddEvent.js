import React, { useState } from 'react';

// Material UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

// Controller
import { addEvent } from '../../controllers/EventController';
import { GetUserID } from '../../controllers/UserController';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function AddEvent() {
    /* React States and Event Handlers*/
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [eventAddSuccess, setEventAddSuccess] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });

    const [eventAddError, setEventAddError] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });

    const { successVert, successHorizon, openEventAddSuccess } = eventAddSuccess;
    const { errorVert, errorHorizon, openEventAddError } = eventAddError;

    const [title, setTitle] = useState('');
    const [allDay, setAllDay] = React.useState({ isAllDay: true });

    const [selectedStartDate, setSelectedStartDate] = useState(new Date());
    const [selectedEndDate, setSelectedEndDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());

    const [privateEvent, setPrivateEvent] = useState({ isPrivate: null });
    const [numParticipants, setNumParticipants] = useState(null);
    const [timeLimit, setTimeLimit] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const handleConfirmEvent = async (newState) => {
        const userResponse = await GetUserID();
        const uid = userResponse.uid;

        const tempEventModel = {
            hostID: uid,
            title: title,
            allDay: Boolean(allDay),
            startDate: selectedStartDate,
            endDate: selectedEndDate,
            startTime: startTime,
            endTime: endTime,
            isPrivate: Boolean(privateEvent.isPrivate),
            numParticipants: Number(numParticipants),
            participantIDs: [],
            appointmentIDs: [],
            timeLimit: Number(timeLimit),
            description: '',
            comments: [],
        };

        const response = await addEvent(tempEventModel);

        if (response.success !== true) {
            handleErrorMsg(response.errors[0].msg);
            setEventAddError({ openEventAddError: true, ...newState });
            setOpen(false);
        }

        if (response.success === true) {
            setEventAddSuccess({ openEventAddSuccess: true, ...newState });
            setOpen(false);
        }
    };

    const handleEventAddSuccessClose = () => {
        setEventAddSuccess({ ...eventAddSuccess, openEventAddSuccess: false });
    };

    const handleEventAddErrorClose = () => {
        setEventAddError({ ...eventAddError, openEventAddError: false });
    };

    const handleErrorMsg = (msg) => {
        setErrorMsg(msg);
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleAllDayEvent = (event) => {
        setAllDay({ ...allDay, [event.target.name]: event.target.checked });
    };

    const handleStartDateChange = (date) => {
        setSelectedStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setSelectedEndDate(date);
    };

    const handleStartTimeChange = (date) => {
        const tempDate = selectedStartDate;
        tempDate.setHours(date.getHours(), date.getMinutes());
        setStartTime(tempDate);
    };

    const handleEndTimeChange = (date) => {
        const tempDate = selectedEndDate;
        tempDate.setHours(date.getHours(), date.getMinutes());
        setEndTime(tempDate);
    };

    const handlePrivateEvent = (event) => {
        setPrivateEvent({ ...privateEvent, [event.target.name]: event.target.checked });
    };

    const handleNumParticipantsChange = (event) => {
        setNumParticipants(event.target.value);
    };

    const handletimeLimitChange = (event) => {
        setTimeLimit(event.target.value);
    };

    return (
        <div>
            <Grid container direction="column" alignItems="stretch">
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    size="large"
                    onClick={handleClickOpen}
                >
                    Add Event
                </Button>
            </Grid>

            {/* Appointment Form */}
            <Dialog open={open} onClose={handleClose} aria-labelledby="add-event-dialog" maxWidth="sm" fullWidth={true}>
                <DialogTitle id="add-event-dialog-title">Add an Event</DialogTitle>

                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="event-title"
                        label="Event Title"
                        type="text"
                        fullWidth
                        value={title}
                        onChange={handleTitleChange}
                    />
                    <DialogContentText>Name your event</DialogContentText>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-between">
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="start-date-picker"
                                label="Start Date"
                                value={selectedStartDate}
                                onChange={handleStartDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />

                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="end-date-picker"
                                label="End Date"
                                value={selectedEndDate}
                                onChange={handleEndDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </Grid>
                        <DialogContentText>Specify the start and end date of your event</DialogContentText>
                    </MuiPickersUtilsProvider>
                    <TextField
                        id="filled-number"
                        label="Participants"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="normal"
                        size="small"
                        value={numParticipants}
                        onChange={handleNumParticipantsChange}
                    />
                    <DialogContentText>Specify the number of participants who can join this event</DialogContentText>
                    <TextField
                        id="filled-number"
                        label="Minutes"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="normal"
                        size="small"
                        value={timeLimit}
                        onChange={handletimeLimitChange}
                    />
                    <DialogContentText>Specify the number of minutes each appointment will be</DialogContentText>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={allDay.isAllDay}
                                    onChange={handleAllDayEvent}
                                    name="isAllDay"
                                    color="primary"
                                />
                            }
                            label="All Day Event"
                        />
                    </FormGroup>

                    {allDay.isAllDay === false ? (
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container justify="space-between">
                                <KeyboardTimePicker
                                    margin="normal"
                                    id="start-time-picker"
                                    label="Start Time"
                                    value={startTime}
                                    onChange={handleStartTimeChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change time',
                                    }}
                                />

                                <KeyboardTimePicker
                                    margin="normal"
                                    id="end-time-picker"
                                    label="End Time"
                                    value={endTime}
                                    onChange={handleEndTimeChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change time',
                                    }}
                                />
                            </Grid>
                            <DialogContentText>Specify the start and end time of your event</DialogContentText>
                        </MuiPickersUtilsProvider>
                    ) : null}

                    <FormControlLabel
                        control={
                            <Switch
                                checked={privateEvent.isPrivate}
                                onChange={(e) => handlePrivateEvent(e)}
                                name="isPrivate"
                            />
                        }
                        label="Set as Private Event"
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={(e) => handleConfirmEvent({ vertical: 'top', horizontal: 'center' })}
                        color="primary"
                    >
                        Add Event
                    </Button>
                </DialogActions>
            </Dialog>
            {/* EVENT ADD SUCCESS */}
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={openEventAddSuccess}
                autoHideDuration={6000}
                onClose={handleEventAddSuccessClose}
                key={successVert + successHorizon}
            >
                <Alert onClose={handleEventAddSuccessClose} severity="success">
                    Event has been added!
                </Alert>
            </Snackbar>

            {/* EVENT ADD ERROR */}
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={openEventAddError}
                autoHideDuration={6000}
                onClose={handleEventAddErrorClose}
                key={errorVert + errorHorizon}
            >
                <Alert onClose={handleEventAddErrorClose} severity="error">
                    {errorMsg}
                </Alert>
            </Snackbar>
        </div>
    );
}
