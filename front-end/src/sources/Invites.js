import { useEffect, useState } from 'react';
import { getIncomingInvitations, getOutgoingInvitations } from '../controllers/InvitesController';

import {
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
    const [invitationType, setInvitationType] = useState(0);
    const [incomingPage, setIncomingPage] = useState(0);
    const [outgoingPage, setOutgoingPage] = useState(0);
    const [outgoingInvites, setOutgoingInvites] = useState(null);
    const [incomingInvites, setIncomingInvites] = useState(null);

    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [selectedInvitation, setSelectedInvitation] = useState(null);

    document.title = 'Invitations - Sched-It';

    useEffect(() => {
        // Incoming Invites
        const prepareIncomingInvites = async () => {
            const invitesStatus = await getIncomingInvitations(incomingPage * 7, 7);
            if(!invitesStatus.success) {
                console.log(invitesStatus.errors);
                // Snackbar error logging
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
                <Grid item container direction="column" justify="center" alignItems="flex-start" xs={3}>
                    <Typography variant="h2" color="primary" style={{ fontWeight: 'bold', marginLeft: '1em' }}>
                        My Invites
                    </Typography>
                </Grid>

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
                </Grid>
            </Grid>
        </Grid>
    );
}
