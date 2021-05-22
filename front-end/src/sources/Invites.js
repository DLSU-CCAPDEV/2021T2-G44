import { useEffect, useState } from 'react';
import { getIncomingInvitations, getOutgoingInvitations, getInvitationCount } from '../controllers/InvitesController';

import {
    Button,
    Grid,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio
} from '@material-ui/core';

import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import ViewInvite from './components/ViewInvite';
import Loading from './components/Loading';

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

export default function Invites(props) {
    const [totalInvites, setTotalInvites] = useState({ incoming: 0, outgoing: 0 });
    const [invitationType, setInvitationType] = useState(0);
    const [incomingPage, setIncomingPage] = useState(0);
    const [outgoingPage, setOutgoingPage] = useState(0);
    const [outgoingInvites, setOutgoingInvites] = useState(null);
    const [incomingInvites, setIncomingInvites] = useState(null);

    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [selectedInvitation, setSelectedInvitation] = useState(null);

    document.title = 'Invitations - Sched-It';

    useEffect(() => {
        // Count Invitations
        const countInvitations = async () => {
            const countStatus = await getInvitationCount();
            if(!countStatus.success) {
                console.log(countStatus.errors);
                // Snackbar error logging
                return;
            }
            setTotalInvites(countStatus.invitationCount);
        };

        countInvitations().catch(err => {
            console.error(err);
            // Snackbar error display
        });
    }, []);

    useEffect(() => {
        // Incoming Invites
        const prepareIncomingInvites = async () => {
            const invitesStatus = await getIncomingInvitations(incomingPage * 7, 7);
            if(!invitesStatus.success) {
                console.log(invitesStatus.errors);
                // Snackbar error logging
                return;
            }
            setIncomingInvites(invitesStatus.invitations);
        };

        prepareIncomingInvites().catch(err => {
            console.error(err);
            // Snackbar error display
        });
    }, [incomingPage]);

    useEffect(() => {
        // Outgoing Invites
        const prepareOutgoingInvites = async () => {
            const invitesStatus = await getOutgoingInvitations(outgoingPage * 7, 7);
            if(!invitesStatus.success) {
                console.log(invitesStatus.errors);
                // Snackbar error logging
                return;
            }
            setOutgoingInvites(invitesStatus.invitations);
        };

        prepareOutgoingInvites().catch(err => {
            console.error(err);
            // Snackbar error display
        });
    }, [outgoingPage]);

    const handleClick = (invitation) => {
        setSelectedInvitation(invitation);
        setViewDialogOpen(true);
    };

    return (
        <Grid container direction="column" style={{ padding: '8em 0 8em 0' }}>
            <ViewInvite
                dialogOpen={viewDialogOpen}
                setDialogOpen={setViewDialogOpen}
                selectedInvitation={selectedInvitation}
            />

            <Grid item container direction="row" justify="center">
                <Grid item container direction="row" xs={2}>
                    <img src={mailBoxArt} alt="My Appointments Art" style={{ height: '200px' }} />
                </Grid>

                {/** Mail Title */}
                <Grid item container direction="column" justify="center" alignItems="flex-start" xs={5}>
                    <Typography variant="h2" color="primary" style={{ fontWeight: 'bold', marginLeft: '1em' }}>
                        My Invites
                    </Typography>
                </Grid>

                <Grid 
                    item
                    container
                    direction="row"
                    alignItems="flex-end"
                    justify="flex-end"
                    xs={2}
                >
                    <FormControl component="fieldset">
                            <FormLabel component="legend" style={{ textAlign: "right" }}>
                                Invite Type
                            </FormLabel>
                            <RadioGroup aria-label="invites View" name="invitesView" row>
                                <FormControlLabel
                                    value="Month"
                                    control={
                                        <Radio
                                            checked={invitationType === 0}
                                            onChange={() => setInvitationType(0)}
                                            value="Incoming"
                                            name="Incoming-Invites-Radio-Button"
                                            color="primary"
                                        />
                                    }
                                    label="Incoming"
                                />
                                <FormControlLabel
                                    value="Week"
                                    control={
                                        <Radio
                                            checked={invitationType === 1}
                                            onChange={() => setInvitationType(1)}
                                            value="Outgoing"
                                            name="Outgoing-Invites-Radio-Button"
                                            color="primary"
                                        />
                                    }
                                    label="Outgoing"
                                    style={{ marginRight: "0" }}
                                />
                            </RadioGroup>
                        </FormControl>
                </Grid>

                <Grid item container direction="column" alignItems="center">
                    <Grid item container justify="center">
                            {!incomingInvites && invitationType === 0 && <Loading loadingText="Loading Incoming Invitations" />}
                            {!outgoingInvites && invitationType === 1 && <Loading loadingText="Loading Outgoing Invitations" />}
                        <TableContainer component={Paper} style={{ width: '80%', marginTop: '1em' }}>
                            <Table aria-label="Inbox Messages">
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={styles.tableHeaders.from} align="center">
                                            { invitationType === 0 ? "From" : "To" }
                                        </TableCell>
                                        <TableCell style={styles.tableHeaders.subject} align="center">
                                            Event
                                        </TableCell>
                                        <TableCell style={styles.tableHeaders.date} align="center">
                                            Invite Date
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {incomingInvites &&
                                        invitationType === 0 &&
                                        incomingInvites.map((m, i) => (
                                            <TableRow
                                                className="pointerHover"
                                                key={m._id}
                                                onClick={() => handleClick(m)}
                                                style={i % 2 === 0 ? styles.tableData.odd : styles.tableData.even}
                                            >
                                                <TableCell style={styles.tableData.td}>
                                                    <Typography align="center" variant="subtitle1">
                                                        {`${m.inviter.firstName} ${m.inviter.lastName}`}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell style={styles.tableData.td}>
                                                    <Typography align="center" variant="subtitle1">
                                                        {m.event.title}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell style={styles.tableData.td}>
                                                    <Typography align="center" variant="subtitle1">
                                                        {new Date(m.inviteTimestamp).toLocaleString()}
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    {outgoingInvites &&
                                        invitationType === 1 &&
                                        outgoingInvites.map((m, i) => (
                                            <TableRow
                                                className="pointerHover"
                                                key={m._id}
                                                onClick={() => handleClick(m)}
                                                style={i % 2 === 0 ? styles.tableData.odd : styles.tableData.even}
                                            >
                                                <TableCell style={styles.tableData.td}>
                                                    <Typography align="center" variant="subtitle1">
                                                        {`${m.invitee.firstName} ${m.invitee.lastName}`}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell style={styles.tableData.td}>
                                                    <Typography align="center" variant="subtitle1">
                                                        {m.event.title}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell style={styles.tableData.td}>
                                                    <Typography align="center" variant="subtitle1">
                                                        {new Date(m.inviteTimestamp).toLocaleString()}
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
                            onClick={() => setIncomingPage(incomingPage - 1)}
                            disabled={invitationType === 0 ? incomingPage === 0 : outgoingPage === 0}
                        >
                            <ArrowLeftIcon />
                        </Button>
                        <Typography style={{ margin: '0 1em 0 1em' }} variant="h6">
                            Page {(invitationType === 0 ? incomingPage : outgoingPage) + 1} of{' '}
                            {invitationType === 0
                                    ? Math.floor(1 + totalInvites.incoming / 7)
                                    : Math.floor(1 + totalInvites.outgoing / 7)}
                        </Typography>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => setIncomingPage(incomingPage + 1)}
                            disabled={
                                invitationType === 0
                                    ? incomingPage === Math.floor(totalInvites.incoming / 15)
                                    : outgoingPage === Math.floor(totalInvites.outgoing / 15)
                            }
                        >
                            <ArrowRightIcon />
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
