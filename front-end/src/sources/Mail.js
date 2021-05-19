import { useEffect, useState } from 'react';
import { getInbox, getSent, getMailCount } from '../controllers/MailController';

// import './assets/styles.css';

import ViewMessage from './components/ViewMessage';
import SendMessage from './components/SendMessage';
import Loading from './components/Loading';

// Material-UI
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

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import NavigationIcon from '@material-ui/icons/Navigation';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

// ART
import mailBoxArt from './assets/mailBox.svg';
import sentBoxArt from './assets/sentbox.svg';

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
    const [page, setPage] = useState(0);
    const [totalMail, setTotalMail] = useState(0);
    const [snackbar, setSnackbar] = useState(null);

    const [mail, setMail] = useState(null);
    const [sent, setSent] = useState(null);

    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [newMessageDialogOpen, setNewMessageDialogOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState(null);
    const [mailbox, setMailbox] = useState(0);

    switch (mailbox) {
        case 1:
            document.title = 'Sent Mail - Sched-It';
            break;
        default:
            document.title = 'Inbox - Sched-It';
    }

    useEffect(() => {
        const getData = async () => {
            const mailCount = await getMailCount();
            if (!mailCount.success) {
                setSnackbar(mailCount.errors[0].msg);
                setTimeout(() => setSnackbar(null), 5000);
            }
            const inbox = await getInbox(page * 15, 15);
            if (!inbox.success) {
                setSnackbar(inbox.errors[0].msg);
                setTimeout(() => setSnackbar(null), 5000);
            }
            const sentbox = await getSent(page * 15, 15);
            if (!sentbox.success) {
                setSnackbar(sentbox.errors[0].msg);
                setTimeout(() => setSnackbar(null), 5000);
            }
            if (mailCount.success)
                setTotalMail({ inbox: mailCount.mailCount.inbox, sentbox: mailCount.mailCount.sentbox });
            if (inbox.success) setMail(inbox.mail);
            if (sentbox.success) setSent(sentbox.mail);
        };

        getData().catch((ex) => {
            console.error(ex);
            setSnackbar(ex);
            setTimeout(() => setSnackbar(null), 5000);
        });
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

    const handlePreviousPage = () => {
        setMail(null);
        setSent(null);
        if (page !== 0) setPage(page - 1);
    };

    const handleNextPage = () => {
        setMail(null);
        setSent(null);
        setPage(page + 1);
    };

    return (
        <Grid container direction="column" style={{ padding: "8em 0 8em 0" }}>
                <Snackbar
                open={snackbar ? true : false}
                onClose={() => setSnackbar(null)}
                message={snackbar}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                key={"topcenter"}
            />
            {dialogMessage && <ViewMessage
                dialogOpen={viewDialogOpen}
                setDialogOpen={setViewDialogOpen}
                message={dialogMessage}
                mailbox={mailbox}
            />}

            <SendMessage
                dialogOpen={newMessageDialogOpen}
                setDialogOpen={setNewMessageDialogOpen}
            />

            <Grid item container direction="row" justify="center">
                <Grid item container direction="row" xs={2}>
                    <img
                        src={mailbox === 0 ? mailBoxArt : sentBoxArt}
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
                
                { !(mail && sent) && <Loading loadingText="Loading your mail"/> }
                { mail && sent &&
                    <Grid item container direction="column" alignItems="center">
                        <Grid item container justify="center">
                            <TableContainer component={Paper} style={{ width: '80%', marginTop: '1em' }}>
                                <Table aria-label="Inbox Messages">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={styles.tableHeaders.from} align="center">
                                                {mailbox === 0 ? 'From' : 'To'}
                                            </TableCell>
                                            <TableCell style={styles.tableHeaders.subject} align="center">
                                                Subject
                                            </TableCell>
                                            <TableCell style={styles.tableHeaders.date} align="center">
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
                                                    style={i % 2 === 0 ? styles.tableData.odd : styles.tableData.even}
                                                >
                                                    <TableCell style={styles.tableData.td}>
                                                        <Typography
                                                            align="center"
                                                            variant="subtitle1"
                                                            style={{ fontWeight: m.isRead ? '400' : '600' }}
                                                        >
                                                            {`${m.sender.firstName} ${m.sender.lastName}`}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell style={styles.tableData.td}>
                                                        <Typography
                                                            align="center"
                                                            variant="subtitle1"
                                                            style={{ fontWeight: m.isRead ? '400' : '600' }}
                                                        >
                                                            {m.subject}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell style={styles.tableData.td}>
                                                        <Typography
                                                            align="center"
                                                            variant="subtitle1"
                                                            style={{ fontWeight: m.isRead ? '400' : '600' }}
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
                                                    style={i % 2 === 0 ? styles.tableData.odd : styles.tableData.even}
                                                >
                                                    <TableCell style={styles.tableData.td}>
                                                        <Typography align="center" variant="subtitle1">
                                                            {`${m.recepient.firstName} ${m.recepient.lastName}`}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell style={styles.tableData.td}>
                                                        <Typography align="center" variant="subtitle1">
                                                            {m.subject}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell style={styles.tableData.td}>
                                                        <Typography align="center" variant="subtitle1">
                                                            {m.sendTime}
                                                        </Typography>
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
                                onClick={handlePreviousPage}
                                disabled={page === 0}
                            >
                                <ArrowLeftIcon />
                            </Button>
                            <Typography style={{ margin: '0 1em 0 1em' }} variant="h6">
                                Page {page + 1} of{' '}
                                {mailbox === 0
                                    ? Math.floor(1 + totalMail.inbox / 15)
                                    : Math.floor(1 + totalMail.sentbox / 15)}
                            </Typography>
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={handleNextPage}
                                disabled={
                                    mailbox === 0
                                        ? page === Math.floor(totalMail.inbox / 15)
                                        : page === Math.floor(totalMail.sentbox / 15)
                                }
                            >
                                <ArrowRightIcon />
                            </Button>
                        </Grid>
                    </Grid>
                }
            </Grid>
        </Grid>
    );
}
