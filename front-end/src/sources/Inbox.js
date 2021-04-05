import { useEffect, useState } from "react";
import { getInbox } from "../controllers/MailController";

import "./assets/styles.css";

import ViewMessage from "./components/ViewMessage";

// Material-UI
import {
    Grid,
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
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

export default function Inbox(props) {
    // Temp
    const [cookies] = useCookies(["uid"]);

    const [mail, setMail] = useState(null);

    useEffect(() => {
        document.title = "Inbox - Sched-It";
        getInbox(cookies.uid).then((inbox) => setMail(inbox));
    }, []);

    const handleClick = (messageID) => {
        // Render dialog box here
        console.log("Clicked! " + messageID);
        <ViewMessage />;
    };

    return (
        <Grid container direction="column" style={{ padding: "5em 0 8em 0" }}>
            <Grid item container direction="row" justify="center">
                <Grid item container direction="column" alignItems="center">
                    <Grid item alignSelf="flex-start">
                        <Typography variant="h3" style={{ fontWeight: "bold" }}>
                            Inbox
                        </Typography>
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
                                            From
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
                                    {mail &&
                                        mail.map((m, i) => (
                                            <TableRow
                                                key={m.id}
                                                onClick={() => handleClick(m.id)}
                                                style={
                                                    i % 2 == 0
                                                        ? styles.tableData.odd
                                                        : styles.tableData.even
                                                }
                                            >
                                                <TableCell style={styles.tableData.td}>
                                                    <Typography align="center" variant="subtitle1">
                                                        {`${m.sender.firstName} ${m.sender.lastName}`}
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
