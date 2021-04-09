import React from "react";

// Material UI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddIcon from "@material-ui/icons/Add";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from "@material-ui/pickers";

/* ANCHOR Time Picker Component */
const TimeFrameEvent = () => {
    const [selectedStartDate, setSelectedStartDate] = React.useState(new Date());
    const handleStartDateChange = (date) => {
        setSelectedStartDate(date);
    };

    const [selectedEndDate, setSelectedEndDate] = React.useState(new Date());
    const handleEndDateChange = (date) => {
        setSelectedEndDate(date);
    };
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-between">
                <KeyboardTimePicker
                    margin="normal"
                    id="start-time-picker"
                    label="Start Time"
                    value={selectedStartDate}
                    onChange={handleStartDateChange}
                    KeyboardButtonProps={{
                        "aria-label": "change time",
                    }}
                />

                <KeyboardTimePicker
                    margin="normal"
                    id="end-time-picker"
                    label="End Time"
                    value={selectedEndDate}
                    onChange={handleEndDateChange}
                    KeyboardButtonProps={{
                        "aria-label": "change time",
                    }}
                />
            </Grid>
            <DialogContentText>Specify the start and end time of your event</DialogContentText>
        </MuiPickersUtilsProvider>
    );
};

export default function AddEvent() {
    /* ANCHOR React Hooks and States */
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [selectedStartDate, setSelectedStartDate] = React.useState(new Date());
    const handleStartDateChange = (date) => {
        setSelectedStartDate(date);
    };

    const [selectedEndDate, setSelectedEndDate] = React.useState(new Date());
    const handleEndDateChange = (date) => {
        setSelectedEndDate(date);
    };

    const [privateEvent, setPrivateEvent] = React.useState({ isPrivate: false });
    const handlePrivateEvent = (event) => {
        setPrivateEvent({ ...privateEvent, [event.target.name]: event.target.checked });
    };

    const [allDay, setAllDay] = React.useState({ isAllDay: true });
    const handleAllDayEvent = (event) => {
        setAllDay({ ...allDay, [event.target.name]: event.target.checked });
    };

    return (
        <div>
            <Grid container direction="column" alignItems="stretch">
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    size="large"
                    onClick={handleClickOpen}
                >
                    Add Event
                </Button>
            </Grid>

            {/* ANCHOR Appointment Form */}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="add-event-dialog"
                maxWidth="sm"
                fullWidth={true}
            >
                <DialogTitle id="add-event-dialog-title">Add an Event</DialogTitle>

                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="event-title"
                        label="Event Title"
                        type="text"
                        fullWidth
                    />
                    <DialogContentText>Name your event</DialogContentText>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-between">
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="start-date-picker"
                                label="Start Date"
                                value={selectedStartDate}
                                onChange={handleStartDateChange}
                                KeyboardButtonProps={{
                                    "aria-label": "change date",
                                }}
                            />

                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="end-date-picker"
                                label="End Date"
                                value={selectedEndDate}
                                onChange={handleEndDateChange}
                                KeyboardButtonProps={{
                                    "aria-label": "change date",
                                }}
                            />
                        </Grid>
                        <DialogContentText>
                            Specify the start and end date of your event
                        </DialogContentText>
                    </MuiPickersUtilsProvider>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={allDay.isAllDay}
                                    onChange={handleAllDayEvent}
                                    name="isAllDay"
                                    color="primary"
                                />
                            }
                            label="Whole Day Event"
                        />
                    </FormGroup>

                    {allDay.isAllDay === false ? <TimeFrameEvent /> : null}

                    <FormControlLabel
                        control={
                            <Switch
                                checked={privateEvent.isPrivate}
                                onChange={handlePrivateEvent}
                                name="isPrivate"
                            />
                        }
                        label="Set as Private Event"
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Add Event
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
