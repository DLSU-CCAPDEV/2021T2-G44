import "./assets/styles.css";
import profilePic from "./assets/heheAna.png";

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Paper } from "@material-ui/core";
import { Avatar } from "@material-ui/core";

// Component Imports
import { Fab, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { CenterFocusStrong } from "@material-ui/icons";

const useStyle = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        position: "relative",
        marginTop: "4em",
    },
    profileGrid: {
        backgroundColor: theme.palette.accent.main,
        marginLeft: "2em",
        marginTop: "1em",
    },
    settingsGrid: {
        backgroundColor: theme.palette.accent.main,
    },
    profileShowcase: {
        height: "15em",
        width: "15em",

        // display: flex,
        // alignSelf: Center,
    },
}));

export default function Profile() {
    const classes = useStyle();
    useEffect(() => {
        document.title = "Profile - Sched-It";
    });

    // Processing to check if user is logged in or not.
    // If logged in, redirect to the dashboard.

    return (
        // entire main content page
        <Grid container direction="row">
            {/* The LeftHand side */}
            {/* 
                Todo: 
                Profile Pic
                Name
                Bio
                Change Bio Button 
            */}
            <Grid item direction="column">
                <Paper
                    className={classes.profileGrid}
                    variant="elevation"
                    elevation={5}
                >
                    <Grid>
                        <Avatar
                            alt="profilePicture"
                            src={profilePic}
                            className={classes.profileShowcase}
                        />
                        <Typography variant="h5">Johnny AppleSmith</Typography>
                    </Grid>
                </Paper>
            </Grid>

            {/* The RightHand side */}
            {/* 
                Todo: 
                Profile Details
                    FirstName TextBox / Change Button
                    Last Name TextBox / Change Button
                DIVIDING LINE_____________________________
                Email Address
                    Current Email TextBox / Change Button
                DIVIDING LINE_____________________________
                Password
                    Change Password Button
                DIVIDING LINE_____________________________
                Delete Account
                    Delete Account Button
            */}
            <Grid item direction="column">
                <Paper>SETTINGS PAPER</Paper>
            </Grid>
        </Grid>
    );
}
