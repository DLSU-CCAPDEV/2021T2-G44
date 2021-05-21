import React from 'react';

import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    InputLabel,
    MenuItem,
    FormHelperText,
    FormControl,
    Select,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Material UI icons
import BookmarkIcon from '@material-ui/icons/Bookmark';

const customStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 250,
    },
}));

export default function FormDialog() {
    const classes = customStyles();

    const [openMakeAppointmentDialog, setOpenMakeAppointmentDialog] = React.useState(false);
    const [selectDate, setSelectDate] = React.useState(null);
    const [timeSlot, setTimeSlot] = React.useState(null);

    const handleMakeAppointmentOpen = () => {
        setOpenMakeAppointmentDialog(true);
    };

    const handleMakeAppointmentClose = () => {
        setOpenMakeAppointmentDialog(false);
    };

    const handleDateChange = (event) => {
        setSelectDate(event.target.value);
    };

    const handleTimeSlotChange = (event) => {
        setTimeSlot(event.target.value);
    };

    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                onClick={handleMakeAppointmentOpen}
                startIcon={<BookmarkIcon />}
                size="large"
            >
                Book an Appointment
            </Button>
            <Dialog
                open={openMakeAppointmentDialog}
                onClose={handleMakeAppointmentClose}
                aria-labelledby="make-appointment-title"
                maxWidth="sm"
                fullWidth={true}
            >
                <DialogTitle id="make-appointment-title">Book an Appointment</DialogTitle>
                <DialogContent>
                    <DialogContentText>Book an appointment by choosing an available time slot.</DialogContentText>

                    <Grid container direction="row" justify="space-evenly">
                        <FormControl className={classes.formControl}>
                            <InputLabel id="date-selector-label">Date</InputLabel>
                            <Select
                                labelId="date-selector-label"
                                id="date-selector"
                                value={selectDate}
                                onChange={handleDateChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                            <FormHelperText>Available Dates</FormHelperText>
                        </FormControl>

                        <FormControl className={classes.formControl}>
                            <InputLabel id="time-selector-label">Timeslot</InputLabel>
                            <Select
                                labelId="time-selector-label"
                                id="time-selector"
                                value={timeSlot}
                                onChange={handleTimeSlotChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                            <FormHelperText>Available Timeslots</FormHelperText>
                        </FormControl>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleMakeAppointmentClose} color="primary">
                        Cancel
                    </Button>
                    {timeSlot && selectDate ? (
                        <Button onClick={handleMakeAppointmentClose} color="primary">
                            Book Appointment
                        </Button>
                    ) : (
                        <Button onClick={handleMakeAppointmentClose} color="primary" disabled>
                            Book Appointment
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </div>
    );
}
