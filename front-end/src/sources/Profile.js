import "./assets/styles.css";

import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';

// import { Link } from "react-router-dom";

// Component Imports
import { Paper } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import { Typography, Grid, TextField } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { pink } from "@material-ui/core/colors";
import CreateIcon from "@material-ui/icons/Create";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";

import profilePic from "./assets/heheAna.png";

import { getUserData } from "../controllers/UserController";

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

        marginBottom: theme.spacing(2),
        width: "24em",
    },
    profileField: {
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(2),

        marginBottom: theme.spacing(1),
        width: "17em",
    },
    standardSpacer: {
        marginTop: "1em",
        marginBottom: "1em",
    },
    buttonSpacing: {
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    textSpacer: {
        marginLeft: "1em",
        marginTop: "1em",
        marginBottom: "1em",
    },
    stretcher: {
        flexGrow: 1,
    },
}));

export default function Profile() {
    const classes = useStyle();

    // PHASE 1 ONLY: Get user cookie
    const [ cookies ] = useCookies(['uid']);

    // State for User
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        document.title = "Profile - Sched-It";

        // Get user data
        getUserData(cookies.uid)
            .then(data => setUserData(data))
            .catch(err => console.error(err));

    }, [cookies.uid]);

    if(userData)
    {
        console.log(userData);
    }
    
    if(userData)
    {
        return (
            // entire main content page
            <Grid container direction="column" style={{ padding: "4em 0 5em 0" }}>
                <Grid item container direction="row" justify="center" alignItems="stretch">
                    <Grid container direction="row" justify="center" alignItems="stretch">
                        {/* The LeftHand side */}
                        {/* 
                    Todo: 
                    Profile Pic
                    Name
                    Bio
                    Change Bio Button 
                */}
                        <Grid item direction="column" lg={4} className={classes.stretcher}>
                            <Paper variant="elevation" elevation={8} className={classes.profileGrid}>
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
                                            src={userData.avatar || profilePic}
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
    
                                    <Divider variant="middle"></Divider>
    
                                    {/* Name Grid */}
                                    <Grid item container direction="column" alignItems="center">
                                        <Typography
                                            variant="h5"
                                            align="left"
                                            className={classes.standardSpacer}
                                        >
                                            {`${userData.firstName} ${userData.lastName}`}
                                        </Typography>
                                        <TextField
                                            id="firstNameTextBox"
                                            label="Bio"
                                            multiline
                                            value={userData.bio}
                                            className={classes.standardSpacer}
                                            variant="middle"
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            style={{
                                                width: "90%",
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
                        <Grid
                            item
                            container
                            direction="column"
                            lg={8}
                            justify="center"
                            alignItems="stretch"
                        >
                            <Paper className={classes.settingsGrid} variant="elevation" elevation={8}>
                                <Grid item container direction="row" className={classes.textSpacer}>
                                    <Typography variant="h4">Profile Settings</Typography>
                                </Grid>
                                <Grid item container direction="row" alignItems="center">
                                    <TextField
                                        id="firstNameTextBox"
                                        label="First Name"
                                        value={userData.firstName}
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
    
                                <Grid item container direction="row" alignItems="center">
                                    <TextField
                                        id="lastNameTextBox"
                                        label="Last Name"
                                        value={userData.lastName}
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
    
                                <Divider variant="middle"></Divider>
    
                                {/* EMAIL ADDRESS SECTION */}
                                <Grid item container direction="row" className={classes.textSpacer}>
                                    <Typography variant="h4">Email</Typography>
                                </Grid>
                                <Grid item container direction="row" alignItems="center">
                                    <TextField
                                        id="emailTextBox"
                                        label="Address"
                                        value={userData.email}
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
    
                                <Divider variant="middle"></Divider>
    
                                <Grid item container direction="row" className={classes.textSpacer}>
                                    <Typography variant="h4">Password</Typography>
                                </Grid>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.buttonSpacing}
                                >
                                    Change Password
                                </Button>
                                <Divider variant="middle"></Divider>
                                <Grid item container direction="row" className={classes.textSpacer}>
                                    <Typography variant="h4">Delete Account</Typography>
                                </Grid>
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
            </Grid>
        );
    }
    else {
        // Return loading screen here
        return (
            <h1>Loading...</h1>
        );
    }
}
