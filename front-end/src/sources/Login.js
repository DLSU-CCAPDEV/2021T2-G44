import { useState, useEffect } from 'react';
import { useCookies } from "react-cookie";
import { Link, useHistory } from 'react-router-dom';
import "./assets/styles.css";
import loginCover from './assets/loginCover.svg';

// Auth Controller
import { userLogin } from '../controllers/AuthController';

// Cookie Model
import { cookieOptions } from '../models/Cookie';

// Material-UI Imports
import { Grid, Typography, Box, TextField, Fab, withStyles } from "@material-ui/core";

const textFieldTheme = {
    root: {
        background: "#FFFFFF",
        width: "100%",
        margin: "1em",
        marginLeft: "auto",
        borderRadius: "8px",
    },
    input: {
        color: "black",
        fontSize: "24px",
        borderRadius: "8px",
    },
};

const buttonStyles = {
    margin: "1em",
    color: "white",
    marginBottom: "3em",
    
};

function Login(props) {
    useEffect(() => {
        document.title = "Login - Sched-It"
    });

    const classes = props.classes;
    const history = useHistory();

    // Configure State & Handlers
    const [ _, setCookie ] = useCookies('uid');
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    // Change Event Handlers
    const onEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    };

    // Form submit
    const doLogin = async () => {
        const uid = await userLogin(email, password);
        
        // Check if valid ogin or not
        if(uid == null)
        {
            alert("Invalid email address or password. Please try again.");
            return;
        }

        // Set Cookie
        setCookie('uid', uid, cookieOptions);

        // Redirect user to dashboard
        history.push("/dashboard");
    };
    
    return (
        <Grid container direction="column" style={{ padding: "5em 0 8em 0" }}>
            <Grid item container direction="row" justify="center" alignItems="center">
                <Grid item container direction="column" justify="center" alignItems="center" xs={6}>
                    <Grid item>
                        <Typography
                            variant="h2"
                            style={{ fontWeight: "bold", position: "relative", left: "0.40em" }}
                        >
                            Great to Have You Back
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Box className="registerBox">
                            <form onSubmit={doLogin}>
                                <Grid
                                    container
                                    direction="column"
                                    justify="center"
                                    alignItems="center"
                                >
                                    <Grid item>
                                        <TextField
                                            required
                                            label="Email"
                                            variant="filled"
                                            className={classes.root}
                                            type="email"
                                            InputProps={{
                                                className: classes.input,
                                                disableUnderline: true,
                                            }}
                                            style={{ marginTop: "3em" }}
                                            onChange={onEmailChange}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            required
                                            label="Password"
                                            variant="filled"
                                            className={classes.root}
                                            type="password"
                                            InputProps={{
                                                className: classes.input,
                                                disableUnderline: true,
                                            }}
                                            style={{ marginTop: "3em" }}
                                            onChange={onPasswordChange}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Typography
                                            variant="body1"
                                            style={{ color: "white", margin: "0.5em" }}
                                        >
                                            Don't have an account?{" "}
                                            <Link to="/register" style={{ color: "white" }}>
                                                Register
                                            </Link>
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Fab
                                            type="submit"
                                            variant="extended"
                                            size="medium"
                                            color="secondary"
                                            style={buttonStyles}
                                        >
                                            Login
                                        </Fab>
                                    </Grid>
                                </Grid>
                            </form>
                        </Box>
                    </Grid>
                </Grid>

                <Grid item container justify="flex-end" alignItems="flex-end" xs={6}>
                    <img src={loginCover} alt="Login Cover Art" style={{ marginRight: "auto" }} />
                </Grid>
            </Grid>
        </Grid>
    );
}

export default withStyles(textFieldTheme)(Login);