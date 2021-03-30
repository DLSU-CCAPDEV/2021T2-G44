import React from 'react';
import logo from './assets/logo.svg';
import { useEffect } from 'react';
import { Typography, Grid, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';

// React Scheduler Material UI
import { Scheduler, MonthView, Appointments } from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState } from '@devexpress/dx-react-scheduler';

// Material UI
import { fade, withStyles, makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

// Art
import calendarArt from './assets/calendarArt.svg';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        position: 'relative',
        marginTop: '4em',
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
    calendarArt: {
        marginLeft: '3em',
    },
    calendarTitle: {
        fontWeight: 'bold',
        align: 'right',
    },
    radioLabel: {
        position: 'absolute',
        right: '1em',
        bottom: '3em',
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
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
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
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export default function MyCalendar() {
    const classes = useStyles();

    useEffect(() => {
        document.title = 'My Calendar';
    });

    const [calendarView, setCalendarView] = React.useState('Month');

    const handleChange = (event) => {
        setCalendarView(event.target.value);
    };

    return (
        <Grid container direction="row" className={classes.root} xs={12} spacing={6}>
            {/** LEFT SIDE of the Page */}
            <Grid item container direction="column" xs={9}>
                {/** Title and controls */}
                <Grid item container direction="row" justify="flex-start" alignItems="center">
                    {/** Calendar Art */}
                    <Grid item xs={4}>
                        <img src={calendarArt} className={classes.calendarArt} />
                    </Grid>

                    {/** Calendar Title */}
                    <Grid item xs={4}>
                        <Typography variant="h2" className={classes.calendarTitle}>
                            My Calendar
                        </Typography>
                    </Grid>

                    {/* Input and Buttons */}
                    <Grid item container direction="column" alignItems="flex-end" xs={4}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend" className={classes.radioLabel} style={{ right: '0' }}>
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
                                    style={{ marginRight: '0' }}
                                    value="Week"
                                    control={<Radio color="primary" />}
                                    label="Week"
                                />
                            </RadioGroup>
                        </FormControl>

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
                    <Scheduler>
                        <MonthView />
                    </Scheduler>
                </Grid>
            </Grid>

            {/** RIGHT SIDE of the Page */}
            <Grid item container xs={3}>
                <Paper elevation={3} className={classes.toDoList}>
                    <Grid item container direction="row" justify="center">
                        <Typography variant="h4" className={classes.toDoListTitle}>
                            To-Do List
                        </Typography>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
}
