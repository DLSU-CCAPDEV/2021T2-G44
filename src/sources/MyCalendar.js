import React from 'react';
import logo from './assets/logo.svg';
import { useEffect } from 'react';
import { Typography, Grid, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ToDoComponent from './components/ToDoList';
import AddEventButton from './components/AddEvent';
import DeleteEventButton from './components/DeleteEvent';

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
} from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import { appointments } from './appointments';

// Material UI
import { fade, withStyles, makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

// Art
import calendarArt from './assets/calendarArt.svg';

{
    /* ANCHOR Styles */
}
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        position: 'relative',
        marginTop: '4em',
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

function commitChanges({ added, changed, deleted }) {
    const setState = (state) => {
        let { data } = state;
        if (added) {
            const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
            data = [...data, { id: startingAddedId, ...added }];
        }
        if (changed) {
            data = data.map((appointment) =>
                changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment
            );
        }
        if (deleted !== undefined) {
            data = data.filter((appointment) => appointment.id !== deleted);
        }
        return { data };
    };
}

export default function MyCalendar() {
    const classes = useStyles();

    useEffect(() => {
        document.title = 'My Calendar';
    });

    const [calendarView, setCalendarView] = React.useState('Month');

    const handleChange = (event) => {
        setCalendarView(event.target.value);
        git;
    };

    const openDeleteDialog = () => {
        <DeleteEventButton />;
    };

    {
        /* ANCHOR Customized components */
    }
    const disableAddWeekView = React.useCallback((props) => {
        return <WeekView.TimeTableCell {...props} onDoubleClick={(e) => undefined} />;
    });

    const disableAddMonthView = React.useCallback((props) => {
        return <MonthView.TimeTableCell {...props} onDoubleClick={(e) => undefined} />;
    });

    const deleteEvent = React.useCallback((props) => {
        return (
            <AppointmentTooltip.Layout
                {...props}
                showOpenButton
                showDeleteButton
                onDeleteButtonClick={(e) => openDeleteDialog()}
            />
        );
    });

    {
        /* ANCHOR Rendered View */
    }
    return (
        <Grid container direction="row" className={classes.root} xs={12} spacing={3}>
            {/** LEFT SIDE of the Page */}

            <Grid item container direction="column" xs={9}>
                {/** Title and controls */}
                <Grid item container direction="row" justify="space-between">
                    {/** Calendar Art */}
                    <Grid item container direction="row" xs={2} style={{ marginLeft: '2%' }}>
                        <img src={calendarArt} className={classes.calendarArt} />
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
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </div>
                    </Grid>
                </Grid>

                {/** Calendar */}
                <Grid item container>
                    <Scheduler height={700} data={appointments}>
                        <ViewState currentViewName={calendarView} />
                        <EditingState onCommitChanges={commitChanges} />
                        <IntegratedEditing />
                        <MonthView timeTableCellComponent={disableAddMonthView} />
                        <WeekView timeTableCellComponent={disableAddWeekView} />
                        <ConfirmationDialog />
                        <Appointments />
                        <AppointmentTooltip layoutComponent={deleteEvent} />
                        <AppointmentForm />
                        <Toolbar />
                        <DateNavigator />
                        <TodayButton />
                    </Scheduler>
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
