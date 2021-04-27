import { useEffect, useState } from 'react';
import { getInbox, getSent } from '../controllers/MailController';

import './assets/styles.css';

import ViewMessage from './components/ViewMessage';
import SendMessage from './components/SendMessage';
import Loading from "./components/Loading";

// Material-UI
import {
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
} from '@material-ui/core';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import NavigationIcon from '@material-ui/icons/Navigation';

// ART
import mailBoxArt from './assets/mailBox.svg';

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

export default function Mail(props) {
    // Temp
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);

    const [mail, setMail] = useState(null);
    const [sent, setSent] = useState(null);

    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [newMessageDialogOpen, setNewMessageDialogOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState(null);
    const [mailbox, setMailbox] = useState(0);

    useEffect(() => {
        switch (mailbox) {
            case 1:
                document.title = 'Sent Mail - Sched-It';
                break;
            default:
                document.title = 'Inbox - Sched-It';
        }
    });

    useEffect(() => {
        setLoading(true);
        const start = page * 10;
        const end = 50 + page * 10;
        getInbox(start, end)
            .then((inbox) => {
                if (inbox) setMail(inbox);
                else {alert("Unable to fetch inbox."); setMail([])};
            })
            .then(() => getSent(start, end))
            .then((sentbox) => {
                if (sentbox) setSent(sentbox);
                else {alert("Unable to fetch sentbox."); setSent([])};
            })
            .then(() => setLoading(false))
            .catch((err) => console.error(err));
    }, [page]);

    const handleClick = (message) => {
        // Render dialog box here
        setDialogMessage(message);
        setViewDialogOpen(true);
    };

    const handleMailBoxChange = (e) => {
        if (e.target.value === 'Inbox') setMailbox(0);
        else setMailbox(1);

        setDialogMessage(null);
    };

    const handleNewMessage = (e) => {
        setNewMessageDialogOpen(true);
    };

    if (mail && sent && !loading) { 
        return (
            <Grid container direction="column" style={{ padding: "8em 0 8em 0" }}>
                <ViewMessage
                    dialogOpen={viewDialogOpen}
                    setDialogOpen={setViewDialogOpen}
                    message={dialogMessage}
                    mailbox={mailbox}
                />

                <SendMessage
                    dialogOpen={newMessageDialogOpen}
                    setDialogOpen={setNewMessageDialogOpen}
                />

                <Grid item container direction="row" justify="center">
                    <Grid item container direction="row" xs={2}>
                        <img
                            src={mailBoxArt}
                            alt="My Appointments Art"
                            style={{ height: "200px" }}
                        />
                    </Grid>

                    {/** Mail Title */}
                    <Grid
                        item
                        container
                        direction="column"
                        justify="center"
                        alignItems="flex-start"
                        xs={3}
                    >
                        <Typography variant="h2" color="primary" style={{ fontWeight: "bold" }}>
                            {mailbox === 0 ? "Inbox" : "Sent Mail"}
                        </Typography>
                    </Grid>

                    {/* Add Message Button */}
                    <Grid
                        item
                        container
                        direction="column"
                        xs={2}
                        justify="flex-end"
                        alignItems="stretch"
                    >
                        <Fab
                            variant="extended"
                            size="medium"
                            color="primary"
                            aria-label="add"
                            onClick={handleNewMessage}
                        >
                            <NavigationIcon style={{ marginRight: "10px" }} />
                            New Message
                        </Fab>
                    </Grid>

                    {/* Input and Buttons */}
                    <Grid
                        item
                        container
                        direction="row"
                        alignItems="flex-end"
                        justify="flex-end"
                        xs={2}
                    >
                        {/* Mail View */}
                        <FormControl component="fieldset">
                            <FormLabel component="legend" style={{ textAlign: "right" }}>
                                Mail View
                            </FormLabel>
                            <RadioGroup aria-label="calendar View" name="calendarView" row>
                                <FormControlLabel
                                    value="Month"
                                    control={
                                        <Radio
                                            checked={mailbox === 0}
                                            onChange={handleMailBoxChange}
                                            value="Inbox"
                                            name="Inbox-Radio-Button"
                                            color="primary"
                                        />
                                    }
                                    label="Inbox"
                                />
                                <FormControlLabel
                                    value="Week"
                                    control={
                                        <Radio
                                            checked={mailbox === 1}
                                            onChange={handleMailBoxChange}
                                            value="Sent"
                                            name="Inbox-Radio-Button"
                                            color="primary"
                                        />
                                    }
                                    label="Sent Mail"
                                    style={{ marginRight: "0" }}
                                />
                            </RadioGroup>
                        </FormControl>
                    </Grid>

                    <Grid item container direction="column" alignItems="center">
                        <Grid item container justify="center">
                            <TableContainer
                                component={Paper}
                                style={{ width: "80%", marginTop: "1em" }}
                            >
                                <Table aria-label="Inbox Messages">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell
                                                style={styles.tableHeaders.from}
                                                align="center"
                                            >
                                                {mailbox === 0 ? "From" : "To"}
                                            </TableCell>
                                            <TableCell
                                                style={styles.tableHeaders.subject}
                                                align="center"
                                            >
                                                Subject
                                            </TableCell>
                                            <TableCell
                                                style={styles.tableHeaders.date}
                                                align="center"
                                            >
                                                Date
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {mail &&
                                            mailbox === 0 &&
                                            mail.map((m, i) => (
                                                <TableRow
                                                    className="pointerHover"
                                                    key={m._id}
                                                    onClick={() => handleClick(m)}
                                                    style={
                                                        i % 2 === 0
                                                            ? styles.tableData.odd
                                                            : styles.tableData.even
                                                    }
                                                >
                                                    <TableCell style={styles.tableData.td}>
                                                        <Typography
                                                            align="center"
                                                            variant="subtitle1"
                                                        >
                                                            {`${m.sender.firstName} ${m.sender.lastName}`}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell style={styles.tableData.td}>
                                                        <Typography
                                                            align="center"
                                                            variant="subtitle1"
                                                        >
                                                            {m.subject}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell style={styles.tableData.td}>
                                                        <Typography
                                                            align="center"
                                                            variant="subtitle1"
                                                        >
                                                            {m.sendTime}
                                                        </Typography>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        {sent &&
                                            mailbox === 1 &&
                                            sent.map((m, i) => (
                                                <TableRow
                                                    className="pointerHover"
                                                    key={m._id}
                                                    onClick={() => handleClick(m)}
                                                    style={
                                                        i % 2 === 0
                                                            ? styles.tableData.odd
                                                            : styles.tableData.even
                                                    }
                                                >
                                                    <TableCell style={styles.tableData.td}>
                                                        <Typography
                                                            align="center"
                                                            variant="subtitle1"
                                                        >
                                                            {`${m.recepient.firstName} ${m.recepient.lastName}`}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell style={styles.tableData.td}>
                                                        <Typography
                                                            align="center"
                                                            variant="subtitle1"
                                                        >
                                                            {m.subject}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell style={styles.tableData.td}>
                                                        <Typography
                                                            align="center"
                                                            variant="subtitle1"
                                                        >
                                                            {m.sendTime}
                                                        </Typography>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
    return <Loading />;
}
