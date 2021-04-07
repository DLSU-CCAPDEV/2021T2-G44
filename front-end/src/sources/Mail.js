import { useEffect, useState } from "react";
import { getInbox, getSent } from "../controllers/MailController";

import "./assets/styles.css";

import ViewMessage from "./components/ViewMessage";

// Material-UI
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
    Radio,
} from "@material-ui/core";

// Temporary
import { useCookies } from "react-cookie";

// Custom Styles
const styles = {
    tableHeaders: {
        from: {
            backgroundColor: "#7868E6",
            color: "white",
            width: "40%",
            fontSize: "20px",
        },
        subject: {
            backgroundColor: "#7868E6",
            color: "white",
            width: "50%",
            fontSize: "20px",
        },
        date: {
            backgroundColor: "#7868E6",
            color: "white",
            width: "10%",
            fontSize: "20px",
        },
    },
    tableData: {
        odd: {
            backgroundColor: "#EDEEF7",
        },
        even: {
            backgroundColor: "white",
        },
        td: {
            height: "2em",
        },
    },
};

export default function Mail(props) {
    // Temp
    const [cookies] = useCookies(["uid"]);

    const [mail, setMail] = useState(null);
    const [sent, setSent] = useState(null);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState(null);
    const [mailbox, setMailbox] = useState(0);

    useEffect(() => {
        switch (mailbox) {
            case 0:
                document.title = "Inbox - Sched-It";
                break;
            case 1:
                document.title = "Sent Mail - Sched-It";
        }
    });

    useEffect(() => {
        getInbox(cookies.uid).then((inbox) => setMail(inbox));
        getSent(cookies.uid)
            .then((sentMail) => setSent(sentMail))
            .then(() => console.log(sent));
    }, []);

    const handleClick = (message) => {
        // Render dialog box here
        setDialogMessage(message);
        setDialogOpen(true);
    };

    const handleMailBoxChange = (e) => {
        if (e.target.value === "Inbox") setMailbox(0);
        else setMailbox(1);

        setDialogMessage(null);
    };

    return (
        <Grid container direction="column" style={{ padding: "8em 0 8em 0" }}>
            <ViewMessage
                dialogOpen={dialogOpen}
                setDialogOpen={setDialogOpen}
                message={dialogMessage}
                mailbox={mailbox}
            />
            <Grid item container direction="row" justify="center">
                <Grid item container direction="column" alignItems="center">
                    <Grid item style={{ marginRight: "60em" }}>
                        <Typography variant="h3" style={{ fontWeight: "bold" }}>
                            { mailbox === 0 ? "Inbox" : "Sent Mail"}
                        </Typography>
                        <Radio
                            checked={mailbox === 0}
                            onChange={handleMailBoxChange}
                            value="Inbox"
                            name="Inbox-Radio-Button"
                            color="primary"
                        />
                        Inbox
                        <Radio
                            checked={mailbox === 1}
                            onChange={handleMailBoxChange}
                            value="Sent"
                            name="Inbox-Radio-Button"
                            color="primary"
                        />
                        Sent
                    </Grid>

                    <Grid item>
                        <TableContainer
                            component={Paper}
                            style={{ width: "70em", marginTop: "1em" }}
                        >
                            <Table aria-label="Inbox Messages">
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={styles.tableHeaders.from} align="center">
                                            {mailbox === 0 ? "From" : "To"}
                                        </TableCell>
                                        <TableCell
                                            style={styles.tableHeaders.subject}
                                            align="center"
                                        >
                                            Subject
                                        </TableCell>
                                        <TableCell style={styles.tableHeaders.date} align="center">
                                            Date
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {mail && mailbox === 0 &&
                                        mail.map((m, i) => (
                                            <TableRow
                                                className="pointerHover"
                                                key={m.id}
                                                onClick={() => handleClick(m)}
                                                style={
                                                    i % 2 == 0
                                                        ? styles.tableData.odd
                                                        : styles.tableData.even
                                                }
                                            >
                                                <TableCell style={styles.tableData.td}>
                                                    <Typography align="center" variant="subtitle1">
                                                        {
                                                            `${m.sender.firstName} ${m.sender.lastName}`
                                                        }
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
                                        {sent && mailbox === 1 &&
                                        sent.map((m, i) => (
                                            <TableRow
                                                className="pointerHover"
                                                key={m.id}
                                                onClick={() => handleClick(m)}
                                                style={
                                                    i % 2 == 0
                                                        ? styles.tableData.odd
                                                        : styles.tableData.even
                                                }
                                            >
                                                <TableCell style={styles.tableData.td}>
                                                    <Typography align="center" variant="subtitle1">
                                                    {
                                                            `${m.recepient.firstName} ${m.recepient.lastName}`
                                                        }
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
                </Grid>
            </Grid>
        </Grid>
    );
}
