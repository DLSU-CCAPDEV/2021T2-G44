import "./assets/styles.css";
import { useEffect } from "react";
import { Link } from 'react-router-dom';

// Material-UI
import { Grid, Box, Typography, TextField, withStyles, Fab } from "@material-ui/core";

// Component Imports
import registerCoverImage from "./assets/registerCover.svg";

// Custom Inline CSS
const imageStyles = {
    marginTop: "-8em"
}

const textFieldTheme = {
    root: {
        background: "#FFFFFF",
        width: "70%",
        margin: "1em"
    },
    input: {
        color: "black",
        fontSize: "24px"
    },
};

const buttonStyles = {
    margin: "1em",
    color: "white",
    marginBottom: "3em"
}

function Register(props) {
    useEffect(() => {
        document.title = "Register - Sched-It";
    });

    const { classes } = props;

    return (
        <Grid container direction="column" style={{ position: "relative", top: "2em" }}>
            <Grid item container direction="row" justify="center" alignItems="center">
                <Grid item>
                    <Box id="registerBox" style={{ position: "relative", right: "4em" }}>
                        <Grid container direction="column" justify="center" alignItems="center">
                            <TextField  
                                label="Email" 
                                variant="filled" 
                                className={classes.root}
                                type="email"
                                InputProps={{
                                    className: classes.input
                                }}
                                style={{marginTop: "3em"}}
                            />
                            <TextField 
                                label="Password" 
                                variant="filled" 
                                className={classes.root}
                                type="password"
                                InputProps={{
                                    className: classes.input
                                }}
                            />
                            <TextField 
                                label="Confirm Password" 
                                variant="filled" 
                                className={classes.root}
                                type="password"
                                InputProps={{
                                    className: classes.input
                                }}
                            />
                            <p style={{color: "white", margin: "0.5em"}}>
                                Already have an accouont? <Link to="/login" style={{color: "white"}}>Login</Link>
                            </p>
                            <Fab
                                variant="extended"
                                size="medium"
                                color="secondary"
                                style={buttonStyles}
                            >Create Account</Fab>
                        </Grid>
                    </Box>
                </Grid>

                <Grid item>
                    <Typography style={{ fontWeight: "700", fontSize: "64px" }} variant="subtitle2">
                        Register now
                    </Typography>
                    <Typography variant="body1" style={{ width: "15em", fontSize: "24px" }}>
                        and start bringing people together the right way
                    </Typography>
                    <img src={registerCoverImage} alt="Register Cover" style={imageStyles} />
                </Grid>
            </Grid>
        </Grid>
    );
}

export default withStyles(textFieldTheme)(Register);