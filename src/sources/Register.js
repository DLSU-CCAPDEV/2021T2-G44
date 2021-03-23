import "./assets/styles.css";
import { useEffect, useState } from "react";
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
        margin: "1em",
        borderRadius: "8px"
    },
    input: {
        color: "black",
        fontSize: "24px",
        borderRadius: "8px"
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

    // States
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ passwordConfirm, setPasswordConfirm ] = useState("");

    // Event Handlers
    const onEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const onPasswordConfirmChange = (e) => {
        setPasswordConfirm(e.target.value);
    };

    const { classes } = props;

    return (
        <Grid container direction="column" style={{ position: "relative", top: "2em" }}>
            <Grid item container direction="row" justify="center" alignItems="center">
                <Grid item>
                    <Box id="registerBox" style={{ position: "relative", right: "4em" }}>
                        <form>
                            <Grid container direction="column" justify="center" alignItems="center">
                                <TextField
                                    required
                                    label="Email" 
                                    variant="filled" 
                                    className={classes.root}
                                    type="email"
                                    InputProps={{
                                        className: classes.input,
                                        disableUnderline: true
                                    }}
                                    style={{marginTop: "3em"}}
                                    onChange={onEmailChange}
                                />
                                <TextField 
                                    required
                                    label="Password" 
                                    variant="filled" 
                                    className={classes.root}
                                    type="password"
                                    InputProps={{
                                        className: classes.input,
                                        disableUnderline: true
                                    }}
                                    onChange={onPasswordChange}
                                />
                                <TextField 
                                    required
                                    label="Confirm Password" 
                                    variant="filled" 
                                    className={classes.root}
                                    type="password"
                                    InputProps={{
                                        className: classes.input,
                                        disableUnderline: true
                                    }}
                                    onChange={onPasswordConfirmChange}
                                />
                                <p style={{color: "white", margin: "0.5em"}}>
                                    Already have an account? <Link to="/login" style={{color: "white"}}>Login</Link>
                                </p>
                                <Fab
                                    type="submit"
                                    variant="extended"
                                    size="medium"
                                    color="secondary"
                                    style={buttonStyles}
                                >Create Account</Fab>
                            </Grid>
                        </form> 
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