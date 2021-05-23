// IMPORTS
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

// MATERIAL UI
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Paper } from '@material-ui/core';

import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
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
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

// ART
import MyAppointmentsArt from './assets/MyAppointmentsArt.svg';

// Controllers
import { GetEvent } from '../controllers/EventController';
import { GetUserAppointments } from '../controllers/AppointmentController';
import { GetUserData } from '../controllers/UserController';

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
  return <Slide direction='up' ref={ref} {...props} />;
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

export default function MyAppointments() {
  const classes = useStyles();

  const [openEventDialog, setOpenEventDialog] = useState(false);
  const [appointments, setAppointments] = useState(null);
  const [eventDetails, setEventDetails] = useState([]);
  const [names, setNames] = useState([]);
  const [clickedEvent, setClickedEvent] = useState(null);

  const handleEventDialogClose = () => {
    setOpenEventDialog(false);
  };

  const handleEventDialogOpen = async (row) => {
    setClickedEvent(row);
    setOpenEventDialog(true);
  };

  useEffect(async () => {
    const response = await GetUserAppointments();
    const aData = response.appointments;

    setAppointments(aData);

    if (eventDetails.length === 0) {
      aData.forEach(async (appointment) => {
        // GET EVENT DATA USING APPOINTMENT
        var eid = appointment.eventID;
        var event = await GetEvent(eid, '');
        var eData = event.eventData;

        // GET USER'S FULL NAME FROM HOSTID OF EVENT
        var userResponse = await GetUserData(eData.hostID);
        var uData = userResponse.userData;
        var fullName = `${uData.firstName} ${uData.lastName}`;
        eData.creator = fullName;

        // ADD EVENT DATA TO ARRAY
        setEventDetails([...eventDetails, eData]);
      });
    }
  }, []);

  return (
    <div className={classes.root}>
      <Grid container direction='column'>
        {/* Title */}
        <Grid item container direction='row' alignItems='center'>
          <img src={MyAppointmentsArt} alt='My Appointments Art' style={{ height: '175px', marginLeft: '8em' }} />
          <Typography variant='h2' className={classes.text}>
            My Appointments
          </Typography>
        </Grid>

        {/* Grid table */}
        <Grid item container justify='center'>
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
                {/* EVENT OPEN DIALOG */}
                <Dialog
                  TransitionComponent={Transition}
                  open={openEventDialog}
                  onClose={handleEventDialogClose}
                  aria-labelledby='event-dialog-title'
                  aria-describedby='event-dialog-description'
                  fullWidth={true}
                  maxWidth='sm'
                >
                  <DialogTitle id='event-dialog-title'>Event Details</DialogTitle>

                  <DialogContent dividers>
                    {clickedEvent && (
                      <List>
                        <ListItem>
                          <ListItemIcon>
                            <TitleIcon />
                          </ListItemIcon>
                          <ListItemText primary={clickedEvent.title} />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <CalendarTodayIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary={`${moment(clickedEvent.startTime).format('MMMM Do YYYY')} - ${moment(
                              clickedEvent.endTime
                            ).format('MMMM Do YYYY')}`}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <ScheduleIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary={`${moment(clickedEvent.startTime).format('h:mm:ss a')} - ${moment(
                              clickedEvent.endTime
                            ).format('h:mm:ss a')}`}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <PublicIcon />
                          </ListItemIcon>
                          <ListItemText primary={clickedEvent.isPrivate ? `Private Event` : `Public Event`} />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <AccountCircleIcon />
                          </ListItemIcon>
                          <ListItemText primary={`Created by ${clickedEvent.creator}`} />
                        </ListItem>
                      </List>
                    )}
                    <Grid container direction='row' justify='center'>
                      {clickedEvent && (
                        <Fab
                          variant='extended'
                          size='medium'
                          color='primary'
                          aria-label='add'
                          className={classes.margin}
                          component={Link}
                          to={'/view-event/' + clickedEvent._id}
                        >
                          <NavigationIcon className={classes.extendedIcon} />
                          Go To Event
                        </Fab>
                      )}
                    </Grid>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleEventDialogClose} color='primary'>
                      Close
                    </Button>
                  </DialogActions>
                </Dialog>

                {eventDetails &&
                  eventDetails.map((row) => (
                    <DataRow key={row.title} onClick={() => handleEventDialogOpen(row)}>
                      <TableHeaderCell align='center' component='th' scope='row'>
                        {row.title}
                      </TableHeaderCell>
                      <TableHeaderCell align='center'>{`${moment(row.startTime).format('MMMM Do YYYY')} - ${moment(
                        row.endTime
                      ).format('MMMM Do YYYY')}`}</TableHeaderCell>
                      <TableHeaderCell align='center'>
                        {row.isPrivate ? `Private Event` : `Public Event`}
                      </TableHeaderCell>
                      <TableHeaderCell align='center'>{row.creator}</TableHeaderCell>
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
