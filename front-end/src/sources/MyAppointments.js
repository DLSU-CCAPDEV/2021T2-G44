// IMPORTS
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useCookies } from 'react-cookie';

// MATERIAL UI
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Paper } from '@material-ui/core';
import { Grid as DxGrid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';

// DATA
import { GetUserData } from '../controllers/UserController';
import { GetEventsData } from '../controllers/EventController';
import { GetAppointmentsData } from '../controllers/AppointController';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        position: 'relative',
        marginTop: '5em',
    },
    text: {
        fontWeight: 'bold',
        color: theme.palette.primary.main,
    },
    paper: {
        marginLeft: '5em',
        marginRight: '5em',
    },
}));

export default function MyAppointments() {
    const classes = useStyles();

    const [cookies] = useCookies(['uid']);
    const [currentUser, setCurrentUser] = useState(null);
    const [userAppointments, setUserAppointments] = useState(null);
    const [userEvents, setUserEvents] = useState(null);
    const [hostIDs, setHostIDs] = useState(null);
    const [rows, setRows] = useState(null);

    // GET DATA FROM CONTROLLERS
    useMemo(() => {
        const getData = async () => {
            GetUserData(cookies.uid)
                .then((res) => {
                    return res;
                })
                .then((user) => {
                    setCurrentUser(user);
                    return GetAppointmentsData(currentUser.id);
                })
                .then((res) => {
                    return res;
                })
                .then((appoint) => {
                    setUserAppointments(appoint);
                    return GetEventsData(userAppointments.eventID);
                })
                .then((res) => {
                    return res;
                })
                .then((events) => {
                    setUserEvents(events);
                    return GetUserData(userEvents.hostID);
                })
                .then((res) => {
                    return res;
                })
                .then((hostIDs) => {
                    setHostIDs(hostIDs);
                })
                .catch((err) => {
                    console.error(err);
                });
        };

        getData();

        if (currentUser != null && userEvents != null && userAppointments != null && hostIDs != null) {
            let rowData = [];
            // IF user only has one event
            if (!Array.isArray(userEvents)) {
                rowData = [
                    {
                        title: userEvents.title,
                        date: `${userAppointments.startTime} - ${userAppointments.endTime}`,
                        isPrivate: JSON.stringify(userEvents.isPrivate) == 'true' ? 'Private' : 'Public',
                        hostName: `${hostIDs.firstName} ${hostIDs.lastName}`,
                    },
                ];

                setRows(rowData);
            }
        }
    }, [currentUser, userAppointments, userEvents, hostIDs]);

    // GENERATE COLUMN HEADERS
    const [columns] = useState([
        { name: 'title', title: 'Event Name' },
        { name: 'date', title: 'Date' },
        { name: 'isPrivate', title: 'Event Type' },
        { name: 'hostName', title: 'Created By' },
    ]);

    return (
        <div className={classes.root}>
            <Grid container direction="column" spacing={3}>
                {/* Title */}
                <Grid item container direction="row" alignItems="center">
                    <Typography variant="h2" className={classes.text}>
                        My Appointments
                    </Typography>
                </Grid>

                {/* Grid table */}
                <Grid item container>
                    <Paper elevation={5} square className={classes.paper}>
                        {hostIDs && currentUser && userAppointments && userEvents && (
                            <DxGrid rows={rows} columns={columns}>
                                <Table />
                                <TableHeaderRow />
                            </DxGrid>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}
