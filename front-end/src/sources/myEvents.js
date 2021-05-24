import { useEffect, useState } from 'react';
import Loading from './components/Loading';

import { getUserEvents, countUserEvents } from '../controllers/EventController.js';
import PublicEventSearch from './components/PublicEventSearch';
import ViewParticipants from './components/ViewParticipants';

import {
    Snackbar,
    Grid,
    Fab,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { Link } from 'react-router-dom';
import myEventsArt from './assets/myEventsArt.svg';

// ART

// helpers
const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));

// Custom Styles
const styles = {
    tableHeaders: {
        from: {
            backgroundColor: '#7868E6',
            color: 'white',
            width: '40%',
            fontSize: '20px',
        },
        subject: {
            backgroundColor: '#7868E6',
            color: 'white',
            width: '50%',
            fontSize: '20px',
        },
        date: {
            backgroundColor: '#7868E6',
            color: 'white',
            width: '10%',
            fontSize: '20px',
        },
    },
    tableData: {
        odd: {
            backgroundColor: '#EDEEF7',
        },
        even: {
            backgroundColor: 'white',
        },
        td: {
            height: '2em',
        },
    },
};

export default function PublicEvents(props) {
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState('');

    const [events, setEvents] = useState(null);
    const [eventCount, setEventCount] = useState(0);
    const [snackbar, setSnackbar] = useState(null);

    const [viewParticipantsDialogOpen, setViewParticipantsDialogOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const classes = useStyles();

    document.title = 'My Events - Sched-It';

    useEffect(() => {
        const getData = async () => {
            const eventCountStatus = await countUserEvents();

            if (!eventCountStatus.success) {
                setSnackbar(eventCountStatus.errors[0].msg);
                setTimeout(() => setSnackbar(null), 5000);
                return;
            }
            setEventCount(eventCountStatus.totalUserEvents);

            const publicEvents = await getUserEvents();

            if (!publicEvents.success) {
                setSnackbar(publicEvents.errors[0].msg);
                setTimeout(() => setSnackbar(null), 5000);
                return;
            }
            setEvents(publicEvents.events);
        };
        getData().catch((err) => {
            setSnackbar(String(err));
            setTimeout(() => setSnackbar(null), 5000);
            return;
        });
    }, [page, search]);

    const handleOpenParticipants = (event) => {
        setSelectedEvent(event);
        setViewParticipantsDialogOpen(true);
    };

    return (
        <Grid container direction="column" style={{ padding: '8em 0 8em 0' }}>
            <Snackbar
                open={snackbar ? true : false}
                onClose={() => setSnackbar(null)}
                message={snackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                key={'topcenter'}
            />
            <ViewParticipants 
                setDialogOpen={setViewParticipantsDialogOpen}
                dialogOpen={viewParticipantsDialogOpen}
                selectedEvent={selectedEvent}
            />

            <Grid item container direction="row" justify="center">
                <Grid item container direction="row" xs={3}>
                    <img src={myEventsArt} alt="My Events Art" style={{ height: '200px' }} />
                </Grid>

                {/** Mail Title */}
                <Grid item container direction="column" justify="center" alignItems="flex-start" xs={2}>
                    <Typography variant="h2" color="primary" style={{ fontWeight: 'bold' }}>
                        My Events
                    </Typography>
                    <PublicEventSearch setSearch={setSearch} />
                </Grid>

                {!events && <Loading loadingText="Loading My Created Events" />}
                {events && (
                    <Grid item container direction="column" alignItems="center">
                        <Grid item container justify="center">
                            <TableContainer component={Paper} style={{ width: '80%', marginTop: '1em' }}>
                                <Table aria-label="Inbox Messages">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={styles.tableHeaders.from} align="center">
                                                Event
                                            </TableCell>
                                            <TableCell style={styles.tableHeaders.subject} align="center">
                                                Date and Time
                                            </TableCell>
                                            <TableCell style={styles.tableHeaders.date} align="center">
                                                Edit
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {events &&
                                            events.map((m, i) => (
                                                <TableRow
                                                    className="pointerHover"
                                                    key={m._id}
                                                    style={i % 2 === 0 ? styles.tableData.odd : styles.tableData.even}
                                                    onClick={() => handleOpenParticipants(m)}
                                                >
                                                    <TableCell style={styles.tableData.td}>
                                                        <Typography
                                                            align="center"
                                                            variant="subtitle1"
                                                            style={{ fontWeight: m.isRead ? '400' : '600' }}
                                                        >
                                                            {`${m.title}`}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell style={styles.tableData.td}>
                                                        <Typography
                                                            align="center"
                                                            variant="subtitle1"
                                                            style={{ fontWeight: m.isRead ? '400' : '600' }}
                                                        >
                                                            {m.allDay
                                                                ? new Date(m.startDate).toDateString() + ' All Day'
                                                                : new Date(m.startDate).toDateString() +
                                                                  ' ' +
                                                                  new Date(m.startTime).toLocaleTimeString() +
                                                                  ' - ' +
                                                                  new Date(m.endDate).toDateString() +
                                                                  ' ' +
                                                                  new Date(m.endTime).toLocaleTimeString()}
                                                        </Typography>
                                                    </TableCell>
                                                    {/* <TableCell style={styles.tableData.td}>
                                                        <Typography
                                                            align="center"
                                                            variant="subtitle1"
                                                            style={{ fontWeight: m.isRead ? '400' : '600' }}
                                                        >
                                                            {String(m.numParticipants - m.participating) +
                                                                ' slots left'}
                                                        </Typography>
                                                    </TableCell> */}
                                                    <TableCell style={styles.tableData.td}>
                                                        {/* PUT BUTTON THAT REDIRECTS TO EVENT HERE */}
                                                        <center>
                                                            <Fab
                                                                size="medium"
                                                                color="primary"
                                                                aria-label="add"
                                                                align="center"
                                                                className={classes.margin}
                                                                component={Link}
                                                                disabled={m.numParticipants - m.participating === 0}
                                                                to={'/view-event/' + m._id}
                                                            >
                                                                <KeyboardArrowRightIcon />
                                                            </Fab>
                                                        </center>
                                                        {/* <Typography align="center">hotdog</Typography> */}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            alignItems="center"
                            justify="flex-end"
                            style={{ margin: '2em 0 0 0', width: '80%' }}
                        >
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={() => setPage(page - 1)}
                                disabled={page === 0}
                            >
                                <ArrowLeftIcon />
                            </Button>
                            <Typography style={{ margin: '0 1em 0 1em' }} variant="h6">
                                Page {page + 1} of {Math.floor(1 + eventCount / 7)}
                            </Typography>
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={() => setPage(page + 1)}
                                disabled={page === Math.floor(eventCount / 7)}
                            >
                                <ArrowRightIcon />
                            </Button>
                        </Grid>
                    </Grid>
                )}
            </Grid>
        </Grid>
    );
}
