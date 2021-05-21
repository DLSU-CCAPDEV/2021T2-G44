import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Loading from './components/Loading';

// Material UI components
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography, Button, TextField, FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

// Material UI icons
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import BookIcon from '@material-ui/icons/Book';
import EditIcon from '@material-ui/icons/Edit';
import LanguageIcon from '@material-ui/icons/Language';
import PersonIcon from '@material-ui/icons/Person';

// Custom components
import CreateAppointment from './components/CreateAppointment';
import Comments from './components/Comments';

// Assets
import coverPhoto from './assets/coverPhoto.png';

// Controllers
import { getEvent, updateEvent } from '../controllers/EventController';
import { GetUserData } from '../controllers/UserController';

// Markdown Parser
const marked = require('marked');

// Custom styles
const customStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        position: 'relative',
        marginTop: '5em',
    },
    sections: {
        marginLeft: '25em',
        marginRight: '25em',
        backgroundColor: theme.palette.accent.main,
    },
    mainTitle: {
        fontWeight: 'bold',
        color: theme.palette.primary.main,
    },
    content: {
        padding: '2em',
    },
    icons: {
        marginRight: '0.5em',
    },
    editButton: {
        marginLeft: '0.5em',
    },
}));

/* Time Picker Component */

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function EventPage() {
    const classes = customStyles();
    const history = useHistory();

    // Get event ID
    const { eventID } = useParams();
    // States for Event
    const [loading, setLoading] = useState(true);
    const [hostID, setHostID] = useState(null);
    const [title, setTitle] = useState(null);
    const [allDay, setAllDay] = useState({ isAllDay: null });
    const [privateEvent, setPrivateEvent] = useState({ isPrivate: null });
    const [numParticipants, setNumParticipants] = useState(null);
    const [participantIDs, setParticipantIDs] = useState(null);
    const [appointmentIDs, setAppointmentIDs] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [timeLimit, setTimeLimit] = useState(null);
    const [description, setDescription] = useState(null);

    // States for editing event
    const [editable, setEditable] = useState(false);

    // States for current user
    const [userID, setUserID] = useState(null);

    // Snackbars for success and errors
    const [successMsg, setSuccessMsg] = useState(null);
    const [errMsg, setErrMsg] = useState(null);

    const [editSuccess, setEditSuccess] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const { successVert, successHorizon, openEditSuccess } = editSuccess;

    const [editError, setEditError] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const { errVert, errHorizon, openEditError } = editError;

    const handleEditSuccessClose = () => {
        setEditSuccess({ ...editSuccess, openEditSuccess: false });
    };

    const handleEditErrorClose = () => {
        setEditError({ ...editError, openEditError: false });
    };

    const handleDisplaySuccess = (msg) => {
        setSuccessMsg(msg);
    };

    const handleDisplayError = (msg) => {
        setErrMsg(msg);
    };

    // Event Handlers
    const handleEditPageClick = () => {
        setEditable(!editable);
    };

    const handleTitleEdit = (event) => {
        setTitle(event.target.value);
    };

    const handleAllDayEdit = (event) => {
        setAllDay({ ...allDay, [event.target.name]: event.target.checked });
    };

    const handlePrivateEvent = (event) => {
        setPrivateEvent({ ...privateEvent, [event.target.name]: event.target.checked });
    };

    const handleNumParticipants = (event) => {
        setNumParticipants(event.target.value);
    };

    const handleStartDateEdit = (date) => {
        setStartDate(date);
    };

    const handleEndDateEdit = (date) => {
        setEndDate(date);
    };

    const handleStartTimeEdit = (date) => {
        setStartTime(date);
    };

    const handleEndTimeEdit = (date) => {
        setEndTime(date);
    };

    const handleTimeLimitEdit = (event) => {
        setTimeLimit(event.target.value);
    };

    const handleDescriptionEdit = (event) => {
        setDescription(event.target.value);
    };

    const returnMarkup = () => {
        const rawMarkup = marked(description);
        return { __html: rawMarkup };
    };

    const handleFinishEditingClick = async (newState) => {
        const tempEventData = {
            _id: eventID,
            hostID: hostID,
            title: title,
            allDay: allDay,
            startDate: startDate,
            endDate: endDate,
            startTime: startTime,
            endTime: endTime,
            isPrivate: privateEvent,
            numParticipants: numParticipants,
            participantIDs: participantIDs,
            appointmentIDs: appointmentIDs,
            timeLimit: timeLimit,
            description: description,
            comments: [],
        };

        const response = await updateEvent(tempEventData);

        if (response.success !== true) {
            handleDisplayError(response.errors[0].msg);
            setEditError({ openEditError: true, ...newState });
        }

        if (response.success === true) {
            handleDisplaySuccess('Editing Successful!');
            setEditSuccess({ openEditSuccess: true, ...newState });
            setEditable(!editable);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (!loading) setLoading(true);

            const eventData = await getEvent(eventID, '');
            const userData = await GetUserData();

            if (!eventData.success) {
                setLoading(false);
                setTimeout(() => {
                    history.push('/my-calendar');
                }, 5000);
                return;
            }

            const eData = eventData.eventData;
            const uData = userData.userData;

            setUserID(uData._id);
            setHostID(eData.hostID);
            setTitle(eData.title);
            setAllDay(eData.allDay);
            setPrivateEvent(eData.isPrivate);
            setNumParticipants(eData.numParticipants);
            setStartDate(eData.startDate);
            setEndDate(eData.endDate);
            setStartTime(eData.startTime);
            setEndTime(eData.endTime);
            setTimeLimit(eData.timeLimit);
            setDescription(eData.description);

            document.title = `${eData.title} - Sched-it`;

            setLoading(false);
        };

        fetchData().catch((err) => {
            console.error(err);

            setTimeout(() => {
                history.push('/my-calendar');
            }, 5000);
        });
    }, []);

    if (!loading) {
        if (hostID === userID) {
            return (
                <div className={classes.root}>
                    <Grid item container spacing={3} direction="column" justify="center" alignItems="stretch" xs={12}>
                        {/* Event details and description */}
                        <Grid item>
                            <Paper elevation={5} className={classes.sections}>
                                <div className={classes.content}>
                                    <Grid
                                        item
                                        container
                                        direction="row"
                                        justify="center"
                                        style={{ 'marginBottom': '1em' }}
                                    >
                                        <img src={coverPhoto} style={{ 'maxWidth': '100%' }} />
                                    </Grid>

                                    {/* Event Title */}
                                    <Grid
                                        item
                                        container
                                        direction="row"
                                        alignItems="center"
                                        style={{ 'marginBottom': '1em' }}
                                    >
                                        {editable ? (
                                            <TextField
                                                id="title-edit"
                                                value={title}
                                                onChange={(e) => handleTitleEdit(e)}
                                                label="Title"
                                                variant="outlined"
                                                style={{ 'width': '25em' }}
                                            />
                                        ) : (
                                            <Typography variant="h2" className={classes.mainTitle}>
                                                {title}
                                            </Typography>
                                        )}
                                    </Grid>

                                    {/* Event Type */}
                                    <Grid
                                        item
                                        container
                                        direction="row"
                                        alignItems="center"
                                        style={{ 'marginBottom': '0.5em' }}
                                    >
                                        {editable ? (
                                            <FormGroup>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={privateEvent.isPrivate}
                                                            onChange={handlePrivateEvent}
                                                            name="isPrivate"
                                                            color="primary"
                                                        />
                                                    }
                                                    label="Private Event"
                                                />
                                            </FormGroup>
                                        ) : (
                                            <div>
                                                {privateEvent.isPrivate ? (
                                                    <Grid
                                                        item
                                                        container
                                                        direction="row"
                                                        alignItems="center"
                                                        style={{ 'marginBottom': '0.5em' }}
                                                    >
                                                        <LanguageIcon fontSize="large" className={classes.icons} />
                                                        <Typography style={{ 'fontWeight': 'bold' }}>
                                                            Private Event
                                                        </Typography>
                                                    </Grid>
                                                ) : (
                                                    <Grid
                                                        item
                                                        container
                                                        direction="row"
                                                        alignItems="center"
                                                        style={{ 'marginBottom': '0.5em' }}
                                                    >
                                                        <LanguageIcon fontSize="large" className={classes.icons} />
                                                        <Typography style={{ 'fontWeight': 'bold' }}>
                                                            Public Event
                                                        </Typography>
                                                    </Grid>
                                                )}
                                            </div>
                                        )}
                                    </Grid>

                                    {/* Event Date */}
                                    <Grid
                                        item
                                        container
                                        direction="row"
                                        alignItems="center"
                                        style={{ 'marginBottom': '0.5em' }}
                                    >
                                        <CalendarTodayIcon fontSize="large" className={classes.icons} />
                                        {editable ? (
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <KeyboardDatePicker
                                                    disableToolbar
                                                    variant="inline"
                                                    format="MM/dd/yyyy"
                                                    margin="normal"
                                                    id="start-date-picker"
                                                    label="Start Date"
                                                    value={startDate}
                                                    onChange={handleStartDateEdit}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change date',
                                                    }}
                                                    style={{ 'marginRight': '1em' }}
                                                />

                                                <KeyboardDatePicker
                                                    disableToolbar
                                                    variant="inline"
                                                    format="MM/dd/yyyy"
                                                    margin="normal"
                                                    id="end-date-picker"
                                                    label="End Date"
                                                    value={endDate}
                                                    onChange={handleEndDateEdit}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change date',
                                                    }}
                                                />
                                            </MuiPickersUtilsProvider>
                                        ) : (
                                            <Typography variant="body1" style={{ 'fontWeight': 'bold' }}>
                                                {`${new Date(startDate).toLocaleString().split(',')[0]} - 
                                                ${new Date(endDate).toLocaleString().split(',')[0]}`}
                                            </Typography>
                                        )}
                                    </Grid>

                                    {/* Whole day / limited time event */}
                                    <Grid
                                        item
                                        container
                                        direction="row"
                                        alignItems="center"
                                        style={{ 'marginBottom': '0.5em' }}
                                    >
                                        <AccessTimeIcon fontSize="large" className={classes.icons} />
                                        {editable ? (
                                            <div>
                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                    <KeyboardTimePicker
                                                        margin="normal"
                                                        id="start-time-picker"
                                                        label="Start Time"
                                                        value={startTime}
                                                        onChange={handleStartTimeEdit}
                                                        disabled={allDay.isAllDay ? true : false}
                                                        KeyboardButtonProps={{
                                                            'aria-label': 'change time',
                                                        }}
                                                        style={{ 'marginRight': '1em' }}
                                                    />

                                                    <KeyboardTimePicker
                                                        margin="normal"
                                                        id="end-time-picker"
                                                        label="End Time"
                                                        value={endTime}
                                                        onChange={handleEndTimeEdit}
                                                        disabled={allDay.isAllDay ? true : false}
                                                        KeyboardButtonProps={{
                                                            'aria-label': 'change time',
                                                        }}
                                                    />
                                                </MuiPickersUtilsProvider>
                                                <FormGroup>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={allDay.isAllDay}
                                                                onChange={handleAllDayEdit}
                                                                name="isAllDay"
                                                                color="primary"
                                                            />
                                                        }
                                                        label="All Day Event"
                                                    />
                                                </FormGroup>
                                            </div>
                                        ) : allDay.isAllDay ? (
                                            <Typography variant="body1" style={{ 'fontWeight': 'bold' }}>
                                                All Day Event
                                            </Typography>
                                        ) : (
                                            <Typography variant="body1" style={{ 'fontWeight': 'bold' }}>
                                                {`${new Date(startDate).toLocaleString().split(',')[1]} - 
                                                ${new Date(endDate).toLocaleString().split(',')[1]}`}
                                            </Typography>
                                        )}
                                    </Grid>

                                    {/* Time limit per appointment */}
                                    <Grid
                                        item
                                        container
                                        direction="row"
                                        alignItems="center"
                                        style={{ 'marginBottom': '1em' }}
                                    >
                                        <BookIcon fontSize="large" className={classes.icons} />
                                        {editable ? (
                                            <TextField
                                                id="time-limit-edit"
                                                label="Time Limit"
                                                value={timeLimit}
                                                onChange={handleTimeLimitEdit}
                                                type="number"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                variant="outlined"
                                                size="small"
                                            />
                                        ) : (
                                            <Typography variant="body1" style={{ 'fontWeight': 'bold' }}>
                                                {`${timeLimit} minutes`}
                                            </Typography>
                                        )}
                                    </Grid>

                                    {/* Number of participants */}
                                    <Grid
                                        item
                                        container
                                        direction="row"
                                        alignItems="center"
                                        style={{ 'marginBottom': '0.5em' }}
                                    >
                                        <PersonIcon fontSize="large" className={classes.icons} />
                                        {editable ? (
                                            <TextField
                                                id="time-limit-edit"
                                                label="Number of Participants"
                                                value={numParticipants}
                                                onChange={handleNumParticipants}
                                                type="number"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                variant="outlined"
                                                size="small"
                                            />
                                        ) : (
                                            <Typography variant="body1" style={{ 'fontWeight': 'bold' }}>
                                                {`${numParticipants} participants`}
                                            </Typography>
                                        )}
                                    </Grid>

                                    {/* Description */}
                                    <Grid
                                        item
                                        container
                                        direction="row"
                                        alignItems="center"
                                        style={{ 'marginBottom': '0.5em' }}
                                    >
                                        <Typography variant="h4" className={classes.mainTitle}>
                                            Description
                                        </Typography>
                                    </Grid>

                                    {/* Description Content */}
                                    <Grid item container direction="row" style={{ 'marginBottom': '1em' }}>
                                        {editable ? (
                                            <TextField
                                                id="description-edit"
                                                label="Description"
                                                multiline
                                                rows={40}
                                                defaultValue={description}
                                                onChange={(e) => handleDescriptionEdit(e)}
                                                variant="outlined"
                                                style={{ 'width': '100%' }}
                                            />
                                        ) : (
                                            <div dangerouslySetInnerHTML={returnMarkup()} />
                                        )}
                                    </Grid>

                                    {/* Edit Page */}
                                    <Grid
                                        item
                                        container
                                        direction="row"
                                        justify="center"
                                        style={{ 'marginBottom': '0.5em' }}
                                    >
                                        {editable ? (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={(e) => {
                                                    handleFinishEditingClick({
                                                        vertical: 'top',
                                                        horizontal: 'center',
                                                    });
                                                }}
                                                startIcon={<EditIcon />}
                                                size="large"
                                            >
                                                Finish Editing
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={handleEditPageClick}
                                                startIcon={<EditIcon />}
                                                size="large"
                                            >
                                                Edit Page
                                            </Button>
                                        )}
                                    </Grid>

                                    {/* SUCCESS SNACKBAR */}
                                    <Snackbar
                                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                                        open={openEditSuccess}
                                        autoHideDuration={6000}
                                        onClose={handleEditSuccessClose}
                                        key={successVert + successHorizon}
                                    >
                                        <Alert onClose={handleEditSuccessClose} severity="success">
                                            {successMsg}
                                        </Alert>
                                    </Snackbar>

                                    {/* ERROR SNACKBAR */}
                                    <Snackbar
                                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                                        open={openEditError}
                                        autoHideDuration={6000}
                                        onClose={handleEditErrorClose}
                                        key={errVert + errHorizon}
                                    >
                                        <Alert onClose={handleEditErrorClose} severity="error">
                                            {errMsg}
                                        </Alert>
                                    </Snackbar>
                                </div>
                            </Paper>
                        </Grid>
                        {/* Comments section */}
                        <Grid item>
                            <Comments />
                        </Grid>
                    </Grid>
                </div>
            );
        } else {
            return (
                <div className={classes.root}>
                    <Grid item container spacing={3} direction="column" justify="center" alignItems="stretch" xs={12}>
                        {/* Event details and description */}
                        <Grid item>
                            <Paper elevation={5} className={classes.sections}>
                                <div className={classes.content}>
                                    <Grid
                                        item
                                        container
                                        direction="row"
                                        justify="center"
                                        style={{ 'marginBottom': '1em' }}
                                    >
                                        <img src={coverPhoto} style={{ 'maxWidth': '100%' }} />
                                    </Grid>

                                    {/* Event Title */}
                                    <Grid item container direction="row" style={{ 'marginBottom': '1em' }}>
                                        <Typography variant="h2" className={classes.mainTitle}>
                                            {title}
                                        </Typography>
                                    </Grid>

                                    {/* Event Date */}
                                    <Grid
                                        item
                                        container
                                        direction="row"
                                        alignItems="center"
                                        style={{ 'marginBottom': '0.5em' }}
                                    >
                                        <CalendarTodayIcon fontSize="large" className={classes.icons} />
                                        <Typography variant="body1" style={{ 'fontWeight': 'bold' }}>
                                            {`${new Date(startDate).toLocaleString().split(',')[0]} - 
                                            ${new Date(endDate).toLocaleString().split(',')[0]}`}
                                        </Typography>
                                    </Grid>

                                    {/* Whole day / limited time event */}
                                    <Grid
                                        item
                                        container
                                        direction="row"
                                        alignItems="center"
                                        style={{ 'marginBottom': '0.5em' }}
                                    >
                                        <AccessTimeIcon fontSize="large" className={classes.icons} />
                                        {allDay === true ? (
                                            <Typography variant="body1" style={{ 'fontWeight': 'bold' }}>
                                                Whole Day Event
                                            </Typography>
                                        ) : (
                                            <Typography variant="body1" style={{ 'fontWeight': 'bold' }}>
                                                {`${new Date(startDate).toLocaleString().split(',')[1]} - 
                                                ${new Date(endDate).toLocaleString().split(',')[1]}`}
                                            </Typography>
                                        )}
                                    </Grid>

                                    {/* Time limit per appointment */}
                                    <Grid
                                        item
                                        container
                                        direction="row"
                                        alignItems="center"
                                        style={{ 'marginBottom': '1em' }}
                                    >
                                        <BookIcon fontSize="large" className={classes.icons} />
                                        <Typography variant="body1" style={{ 'fontWeight': 'bold' }}>
                                            {`${Number(timeLimit) / 60} minutes`}
                                        </Typography>
                                    </Grid>

                                    {/* Description */}
                                    <Grid item container direction="row" style={{ 'marginBottom': '0.5em' }}>
                                        <Typography variant="h4" className={classes.mainTitle}>
                                            Description
                                        </Typography>
                                    </Grid>

                                    {/* Description Content */}
                                    <Grid item container direction="row" style={{ 'marginBottom': '1em' }}>
                                        <Typography variant="h4" className={classes.mainTitle}>
                                            {description}
                                        </Typography>
                                    </Grid>

                                    {/* Make an appointment */}
                                    <Grid
                                        item
                                        container
                                        direction="row"
                                        justify="center"
                                        style={{ 'marginBottom': '0.5em' }}
                                    >
                                        <CreateAppointment />
                                    </Grid>
                                </div>
                            </Paper>
                        </Grid>
                        {/* Comments section: Subject to move to component */}
                        <Grid item>
                            <Comments />
                        </Grid>
                    </Grid>
                </div>
            );
        }
    } else {
        return <Loading loadingText="Loading Event" />;
    }
}
