// IMPORTS
import React, { useState } from 'react';

// MATERIAL UI
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Paper } from '@material-ui/core';

import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
//import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PublicIcon from '@material-ui/icons/Public';
import ScheduleIcon from '@material-ui/icons/Schedule';
import TitleIcon from '@material-ui/icons/Title';
import NavigationIcon from '@material-ui/icons/Navigation';

// ART
import MyAppointmentsArt from './assets/MyAppointmentsArt.svg';

// CUSTOM TABLE CELLS
const TableHeaderCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#7868E6',
        color: 'white',
        width: '20%',
        fontSize: '20px',
        textAlign: 'center',
    },
    body: {
        fontWeight: 'bold',
    },
}))(TableCell);

// CUSTOM TABLE ROW
const DataRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        '&:hover': {
            background: theme.palette.accent.main,
        },
        cursor: 'pointer',
    },
}))(TableRow);

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: '8em 0 8em 0',
    },
    text: {
        fontWeight: 'bold',
        color: theme.palette.primary.main,
        marginLeft: '0.5em',
    },
    paper: {
        marginLeft: '5em',
        marginRight: '5em',
        marginBottom: '5em',
    },
    margin: {
        margin: theme.spacing(1),
        alignSelf: 'center',
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));

function createData(title, dateTime, type, createdBy) {
    return { title, dateTime, type, createdBy };
}

export default function MyAppointments() {
    const classes = useStyles();

    const [openEventDialog, setOpenEventDialog] = useState(false);
    const [eventDetails, setEventDetails] = useState(null);

    const handleEventDialogClose = () => {
        setOpenEventDialog(false);
    };

    const handleEventDialogOpen = (row) => {
        setEventDetails(row);
        setOpenEventDialog(true);
    };

    // useEffect(() => {
    //     GetUserData(cookies.uid)
    //         .then((user) => {
    //             setCurrentUser(user);
    //             return GetAppointmentsData(user.id);
    //         })
    //         .then((appointments) => {
    //             setUserAppointments(appointments);
    //             return GetEventsData(appointments);
    //         })
    //         .then((events) => {
    //             setUserEvents(events);
    //             return GetHostsData(events);
    //         })
    //         .then((hosts) => {
    //             setHostIDs(hosts);
    //         })
    //         .catch((err) => {
    //             console.error(err);
    //         });
    // }, [cookies.uid]);

    // if (currentUser != null && userEvents != null && userAppointments != null && hostIDs != null && rows == null) {
    //     console.log(currentUser);
    //     console.log(userAppointments);
    //     console.log(userEvents);
    //     console.log(hostIDs);

    //     let rowData = [];
    //     // IF user only has one event
    //     if (!Array.isArray(userEvents)) {
    //         console.log('Only one event is detected');
    //         rowData = [
    //             {
    //                 title: userEvents.title,
    //                 date: `${userAppointments.startTime} - ${userAppointments.endTime}`,
    //                 isPrivate: JSON.stringify(userEvents.isPrivate) == 'true' ? 'Private' : 'Public',
    //                 hostName: `${hostIDs.firstName} ${hostIDs.lastName}`,
    //             },
    //         ];
    //         setRows(rowData);
    //     } else {
    //         console.log('Multiple events detected');
    //         setRows(rowGenerator(userAppointments, userEvents, hostIDs));
    //     }
    // }

    // GENERATE COLUMN HEADERS
    // const [columns] = useState([
    //     { name: 'title', title: 'Event Name' },
    //     { name: 'date', title: 'Date' },
    //     { name: 'isPrivate', title: 'Event Type' },
    //     { name: 'hostName', title: 'Created By' },
    // ]);

    const [rows] = useState([
        createData('Website Re-Design Plan', '10:15 - 11:00', 'Public', 'Shoobs Querol'),
        createData('Forte 2021', '10:15 - 11:00', 'Public', 'Lasallian Youth Orchestra'),
        createData('Neural Network Training', '10:15 - 11:00', 'Public', 'Arren Antioquia'),
        createData('Windblume Festival', '10:15 - 11:00', 'Private', 'Antonio The Ipis'),
        createData('Pyroregisvine Slaying', '10:15 - 11:00', 'Private', 'Gian Madrid'),
    ]);

    return (
        <div className={classes.root}>
            <Grid container direction="column">
                {/* Title */}
                <Grid item container direction="row" alignItems="center">
                    <img
                        src={MyAppointmentsArt}
                        alt="My Appointments Art"
                        style={{ height: '175px', marginLeft: '8em' }}
                    />
                    <Typography variant="h2" className={classes.text}>
                        My Appointments
                    </Typography>
                </Grid>

                {/* Grid table */}
                <Grid item container justify="center">
                    <TableContainer component={Paper} style={{ width: '90%', marginTop: '1em' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableHeaderCell>Event Title</TableHeaderCell>
                                    <TableHeaderCell>Date & Time</TableHeaderCell>
                                    <TableHeaderCell>Event Type</TableHeaderCell>
                                    <TableHeaderCell>Created By</TableHeaderCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <Dialog
                                    TransitionComponent={Transition}
                                    open={openEventDialog}
                                    onClose={handleEventDialogClose}
                                    aria-labelledby="event-dialog-title"
                                    aria-describedby="event-dialog-description"
                                    fullWidth={true}
                                    maxWidth="sm"
                                >
                                    <DialogTitle id="event-dialog-title">Event Details</DialogTitle>

                                    <DialogContent dividers>
                                        {eventDetails && (
                                            <List>
                                                <ListItem>
                                                    <ListItemIcon>
                                                        <TitleIcon />
                                                    </ListItemIcon>
                                                    <ListItemText primary={eventDetails.title} />
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemIcon>
                                                        <ScheduleIcon />
                                                    </ListItemIcon>
                                                    <ListItemText primary={eventDetails.dateTime} />
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemIcon>
                                                        <PublicIcon />
                                                    </ListItemIcon>
                                                    <ListItemText primary={`${eventDetails.type} event`} />
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemIcon>
                                                        <AccountCircleIcon />
                                                    </ListItemIcon>
                                                    <ListItemText primary={`Created by ${eventDetails.createdBy}`} />
                                                </ListItem>
                                            </List>
                                        )}
                                        <Grid container direction="row" justify="center">
                                            <Fab
                                                variant="extended"
                                                size="medium"
                                                color="primary"
                                                aria-label="add"
                                                className={classes.margin}
                                                onClick={(e) => alert('You clicked me!')}
                                            >
                                                <NavigationIcon className={classes.extendedIcon} />
                                                Go To Event
                                            </Fab>
                                        </Grid>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleEventDialogClose} color="primary">
                                            Close
                                        </Button>
                                    </DialogActions>
                                </Dialog>

                                {rows.map((row) => (
                                    <DataRow key={row.title} onClick={() => handleEventDialogOpen(row)}>
                                        <TableHeaderCell align="center" component="th" scope="row">
                                            {row.title}
                                        </TableHeaderCell>
                                        <TableHeaderCell align="center">{row.dateTime}</TableHeaderCell>
                                        <TableHeaderCell align="center">{row.type}</TableHeaderCell>
                                        <TableHeaderCell align="center">{row.createdBy}</TableHeaderCell>
                                    </DataRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </div>
    );
}
