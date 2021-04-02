import "./assets/styles.css";
import profilePic from "./assets/heheAna.png";

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Paper } from "@material-ui/core";
import { Avatar } from "@material-ui/core";

// Component Imports
import { Fab, Typography, Grid, TextField } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { pink } from "@material-ui/core/colors";
import CreateIcon from "@material-ui/icons/Create";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";

// colored Delete Button
const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(pink["A400"]),
        backgroundColor: pink["A400"],
        "&:hover": {
            backgroundColor: pink[700],
        },
    },
}))(Button);

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
        marginRight: "1em",

        display: "flex",
    },
    settingsGrid: {
        backgroundColor: theme.palette.accent.main,
        marginLeft: "1em",
        marginTop: "1em",
        marginRight: "2em",
    },
    profileShowcase: {
        height: "15em",
        width: "15em",

        // display: flex,
        // alignSelf: Center,
    },
    emailField: {
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(2),
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        width: "24em",
    },
    profileField: {
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(2),
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        width: "16em",
    },
    standardSpacer: {
        marginTop: "1em",
        marginBottom: "1em",
    },
    buttonSpacing: {
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(2),
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
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
        <Grid container direction="column" alignItems="center">
            <Grid container direction="row">
                {/* The LeftHand side */}
                {/* 
                Todo: 
                Profile Pic
                Name
                Bio
                Change Bio Button 
            */}
                <Grid item direction="column" lg={4}>
                    <Paper
                        variant="elevation"
                        elevation={8}
                        className={classes.profileGrid}
                    >
                        {/* Grid Inside Paper */}
                        <Grid container direction="column">
                            {/* Picture Grid */}
                            <Grid
                                item
                                container
                                direction="column"
                                alignItems="center"
                                className={classes.standardSpacer}
                            >
                                <Avatar
                                    alt="profilePicture"
                                    src={profilePic}
                                    className={classes.profileShowcase}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.standardSpacer}
                                    startIcon={<PhotoCameraIcon />}
                                >
                                    Change Profile Picture
                                </Button>
                            </Grid>

                            <Divider></Divider>

                            {/* Name Grid */}
                            <Grid
                                item
                                container
                                direction="column"
                                alignItems="center"
                            >
                                <Typography
                                    variant="h5"
                                    align="left"
                                    className={classes.standardSpacer}
                                >
                                    Johnny AppleSmith
                                </Typography>
                                <TextField
                                    id="firstNameTextBox"
                                    label="Bio"
                                    multiline
                                    defaultValue="Hello my name is Johnny Johnny Yes Papa eating sugar no papa telling lies no papa open your mouth hahaha"
                                    className={classes.standardSpacer}
                                    style={{ width: "90%" }}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    size="small"
                                    variant="outlined"
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.standardSpacer}
                                    startIcon={<CreateIcon />}
                                >
                                    Change Bio
                                </Button>
                            </Grid>
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
                <Grid item direction="column" lg={8}>
                    <Paper
                        className={classes.settingsGrid}
                        variant="elevation"
                        elevation={8}
                    >
                        <Typography variant="h4">Profile Settings</Typography>
                        <Grid
                            item
                            container
                            direction="row"
                            alignItems="center"
                        >
                            <TextField
                                id="firstNameTextBox"
                                label="First Name"
                                defaultValue="Johnny"
                                InputProps={{
                                    readOnly: true,
                                }}
                                className={classes.profileField}
                                size="small"
                                variant="filled"
                            />
                            <Button variant="contained" color="primary">
                                Change
                            </Button>
                        </Grid>

                        <Grid
                            item
                            container
                            direction="row"
                            alignItems="center"
                        >
                            <TextField
                                id="lastNameTextBox"
                                label="Last Name"
                                defaultValue="AppleSmith"
                                InputProps={{
                                    readOnly: true,
                                }}
                                className={classes.profileField}
                                size="small"
                                variant="filled"
                            />
                            <Button variant="contained" color="primary">
                                Change
                            </Button>
                        </Grid>

                        <Divider></Divider>

                        {/* EMAIL ADDRESS SECTION */}
                        <Typography variant="h4">Email</Typography>
                        <Grid
                            item
                            container
                            direction="row"
                            alignItems="center"
                        >
                            <TextField
                                id="emailTextBox"
                                label="Address"
                                defaultValue="johnnyapplesmith@gmail.com"
                                className={classes.emailField}
                                InputProps={{
                                    readOnly: true,
                                }}
                                size="small"
                                variant="filled"
                            />
                            <Button variant="contained" color="primary">
                                Change
                            </Button>
                        </Grid>

                        <Divider></Divider>

                        <Typography variant="h4">Password</Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.buttonSpacing}
                        >
                            Change Password
                        </Button>
                        <Divider></Divider>
                        <Typography variant="h4">Delete Account</Typography>
                        <ColorButton
                            variant="contained"
                            color="primary"
                            className={classes.margin}
                            className={classes.buttonSpacing}
                            startIcon={<DeleteIcon />}
                        >
                            Delete
                        </ColorButton>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    );
}
