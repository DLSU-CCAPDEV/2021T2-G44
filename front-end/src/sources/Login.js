import { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import "./assets/styles.css";
import loginCover from "./assets/loginCover.svg";

// Auth Controller
import { userLogin } from "../controllers/AuthController";

// Context Provider
import { GlobalContext } from "../controllers/ContextController";

// Components
import Loading from './components/Loading';

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
    const {uid, updateUid} = useContext(GlobalContext);

    useEffect(() => {
        document.title = "Login - Sched-It";
    });

    const classes = props.classes;
    const history = useHistory();

    // Configure State & Handlers
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Change Event Handlers
    const onEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    };

    // Form submit
    const doLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        const loggedIn = await userLogin(email, password);

        // Redirect user to dashboard
        if (loggedIn === true) {
            await updateUid();
            setLoading(false);
            history.push("/my-calendar");
        }
        else {
            alert(loggedIn);
            setLoading(false);
        }
    };

    return (
        <Grid container direction="column" style={{ padding: "5em 0 8em 0" }}>
            <Grid item container direction="row" justify="center" alignItems="center">
                { loading && <Loading loadingText="Logging you in"/> }
                { !loading && 
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
                }

                { !loading &&
                    <Grid item container justify="flex-end" alignItems="flex-end" xs={6}>
                        <img src={loginCover} alt="Login Cover Art" style={{ marginRight: "auto" }} />
                    </Grid>
                }
            </Grid>
        </Grid>
    );
}

export default withStyles(textFieldTheme)(Login);
