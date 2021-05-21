import { useEffect, useState } from 'react';
import Loading from './components/Loading';

import { getPublicEvents } from '../controllers/EventController.js';

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

import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

// ART

// helpers

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

    const [events, setEvents] = useState(null);
    const [snackbar, setSnackbar] = useState(null);

    document.title = 'Public Events - Sched-It';

    useEffect(() => {
        const getData = async () => {
            const publicEvents = await getPublicEvents(7 * page, 7);

            if (!publicEvents.success) {
                setSnackbar(publicEvents.errors[0].msg);
                setTimeout(() => setSnackbar(null), 5000);
                return;
            }
            setEvents(publicEvents.events);
        };
        getData().catch((err) => {
            setSnackbar(err);
            setTimeout(() => setSnackbar(null), 5000);
            return;
        });
    }, [page]);

    return (
        <Grid container direction="column" style={{ padding: '8em 0 8em 0' }}>
            <Snackbar
                open={snackbar ? true : false}
                onClose={() => setSnackbar(null)}
                message={snackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                key={'topcenter'}
            />

            <Grid item container direction="row" justify="center">
                <Grid item container direction="row" xs={2}>
                    {/* <img src={publicEventsArt} alt="Public Events Art" style={{ height: '200px' }} /> */}
                </Grid>

                {/** Mail Title */}
                <Grid item container direction="column" justify="center" alignItems="flex-start" xs={2}>
                    <Typography variant="h2" color="primary" style={{ fontWeight: 'bold' }}>
                        Public Events
                    </Typography>
                </Grid>

                {!events && <Loading loadingText="Loading Public Events" />}
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
                                                Availability
                                            </TableCell>
                                            <TableCell style={styles.tableHeaders.date} align="center">
                                                Sign Up
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
                                                                ? new Date(m.startDate).toLocaleDateString() +
                                                                  ' All Day'
                                                                : new Date(m.startDate).toLocaleDateString() +
                                                                  ' ' +
                                                                  m.StartTime +
                                                                  '-' +
                                                                  new Date(m.endDate).toLocaleDateString() +
                                                                  ' ' +
                                                                  m.endDate}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell style={styles.tableData.td}>
                                                        <Typography
                                                            align="center"
                                                            variant="subtitle1"
                                                            style={{ fontWeight: m.isRead ? '400' : '600' }}
                                                        >
                                                            {m.numParticipants + ' slots'}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell style={styles.tableData.td}>
                                                        {/* PUT BUTTON THAT REDIRECTS TO EVENT HERE */}
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
                                Page {page + 1} of{' '}
                            </Typography>
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={() => setPage(page + 1)}
                                // disabled={
                                //     mailbox === 0
                                //         ? inboxPage === Math.floor(totalMail.inbox / 15)
                                //         : sentPage === Math.floor(totalMail.sentbox / 15)
                                // }
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
