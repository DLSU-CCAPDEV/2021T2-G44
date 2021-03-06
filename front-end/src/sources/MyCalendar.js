import React, { useState, useCallback } from 'react';
import moment from 'moment';

import { useEffect } from 'react';
import { Typography, Grid, Paper } from '@material-ui/core';
import ToDoComponent from './components/ToDoList';
import AddEventButton from './components/AddEvent';
import DeleteEventButton from './components/DeleteEvent';
import SearchEvent from './components/SearchEvent';

// React Scheduler Material UI
import {
    Scheduler,
    MonthView,
    WeekView,
    DateNavigator,
    Appointments,
    TodayButton,
    Toolbar,
    AppointmentForm,
    AppointmentTooltip,
    ConfirmationDialog,
    AllDayPanel,
} from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';

// Material UI
import { fade, makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import NotesIcon from '@material-ui/icons/Notes';

// Images
import calendarArt from './assets/calendarArt.svg';

// Controllers
import { GetUserAppointments } from '../controllers/AppointmentController';
import { GetEvent } from '../controllers/EventController';

// Styles
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: '6em',
        marginBottom: '1em',
    },
    calendarTitle: {
        fontWeight: 'bold',
        align: 'right',
    },
    radioLabel: {
        fontWeight: 'bold',
    },
    radioButtons: {
        colorPrimary: 'primary',
        colorSecondary: 'primary',
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.primary.main, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.primary.main, 0.5),
        },
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: 0,
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        marginRight: '1em',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
    },
    toDoList: {
        backgroundColor: theme.palette.accent.main,
        flexGrow: 1,
    },
    toDoListTitle: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: '1em',
    },
    addButton: {
        marginLeft: '5em',
        marginBottom: 'em',
    },
    cells: {
        color: theme.palette.accent.main,
    },
}));

export default function MyCalendar() {
    const classes = useStyles();

    const [calendarView, setCalendarView] = useState('Month');
    const [eventDetails, setEventDetails] = useState([]);

    useEffect(async () => {
        const response = await GetUserAppointments();
        const aData = response.appointments;

        if (eventDetails.length === 0) {
            aData.forEach(async (appointment) => {
                var eid = appointment.eventID;
                var event = await GetEvent(eid, '');
                
                const calendarData = {...event.eventData};
                calendarData.startTime = new Date(appointment.startTime);
                calendarData.endTime = new Date(appointment.endTime);

                setEventDetails([...eventDetails, calendarData]);
            });
        }

        document.title = 'My Calendar - Sched-it';
    }, []);

    const handleChange = (event) => {
        setCalendarView(event.target.value);
    };

    const handleGoToEventDialog = () => {};

    /* Customized components */

    const disableAddWeekView = useCallback((props) => {
        return <WeekView.TimeTableCell {...props} onDoubleClick={(e) => undefined} />;
    }, []);

    const disableAddMonthView = useCallback((props) => {
        return <MonthView.TimeTableCell {...props} onDoubleClick={(e) => undefined} />;
    }, []);

    const Content = ({ children, appointmentData, classes, ...restProps }) => (
        <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
            <Grid container alignItems="center">
                <Grid item container xs={10} alignItems="center" style={{ marginLeft: '1.4em' }}>
                    <NotesIcon style={{ marginRight: '.84em' }} color="primary" />
                    {`${moment(appointmentData.startTime).format('h:mm A')} - ${moment(appointmentData.endTime).format(
                        'h:mm A'
                    )}`}
                </Grid>
            </Grid>
        </AppointmentTooltip.Content>
    );

    /*  Rendered View */
    return (
        <Grid container direction="row" className={classes.root} xs={12} spacing={3}>
            {/** LEFT SIDE of the Page */}

            <Grid item container direction="column" xs={9}>
                {/** Title and controls */}
                <Grid item container direction="row" justify="space-between">
                    {/** Calendar Art */}
                    <Grid item container direction="row" xs={3} style={{ marginLeft: '2%' }}>
                        <img src={calendarArt} alt="Calendar Art" />
                    </Grid>

                    {/** Calendar Title */}
                    <Grid item container direction="column" justify="center" alignItems="center" xs={3}>
                        <Typography variant="h2" color="primary" className={classes.calendarTitle}>
                            My Calendar
                        </Typography>
                    </Grid>

                    {/* Add Event Button */}
                    <Grid item container direction="column" xs={2} justify="flex-end" alignItems="stretch">
                        <AddEventButton />
                    </Grid>

                    {/* Input and Buttons */}
                    <Grid
                        item
                        container
                        direction="column"
                        alignItems="flex-end"
                        justify="flex-end"
                        xs={2}
                        style={{ marginLeft: '0.5em' }}
                    >
                        {/* Calendar View Radio Buttons */}
                        <FormControl component="fieldset">
                            <FormLabel component="legend" className={classes.radioLabel} style={{ textAlign: 'right' }}>
                                Calendar View
                            </FormLabel>
                            <RadioGroup
                                aria-label="calendar View"
                                name="calendarView"
                                value={calendarView}
                                onChange={handleChange}
                                row
                            >
                                <FormControlLabel value="Month" control={<Radio color="primary" />} label="Month" />
                                <FormControlLabel
                                    value="Week"
                                    control={<Radio color="primary" />}
                                    label="Week"
                                    style={{ marginRight: '0' }}
                                />
                            </RadioGroup>
                        </FormControl>

                        {/* Search Bar */}
                        <SearchEvent />
                    </Grid>
                </Grid>

                {/** Calendar */}
                <Grid item container>
                    {eventDetails && (
                        <Scheduler height={700} data={eventDetails}>
                            <ViewState currentViewName={calendarView} />
                            <EditingState />
                            <IntegratedEditing />
                            <MonthView timeTableCellComponent={disableAddMonthView} />
                            <WeekView timeTableCellComponent={disableAddWeekView} />
                            <AllDayPanel />
                            <ConfirmationDialog />
                            <Appointments />
                            <AppointmentTooltip
                                showOpenButton={false}
                                showDeleteButton={false}
                                contentComponent={Content}
                            />
                            {/* <AppointmentForm /> */}
                            <Toolbar />
                            <DateNavigator />
                            <TodayButton />
                        </Scheduler>
                    )}
                </Grid>
            </Grid>

            {/** RIGHT SIDE of the Page */}
            <Grid item container xs={3}>
                <Paper elevation={5} className={classes.toDoList}>
                    <Typography variant="h4" className={classes.toDoListTitle}>
                        To-Do List
                    </Typography>
                    <ToDoComponent />
                </Paper>
            </Grid>
        </Grid>
    );
}
