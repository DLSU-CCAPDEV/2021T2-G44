import "./assets/styles.css";
import { useEffect } from "react";

// Material-UI
import { Grid, Box, Typography, TextField } from "@material-ui/core";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

// Component Imports
import registerCoverImage from "./assets/registerCover.svg";

// Custom Inline CSS
const imageStyles = {
    marginTop: "-8em"
}

const textFieldTheme = createMuiTheme({
    palette: {
        primary: {
            main: "#FFFFFF"
        },
        secondary: {
            main: "#FFFFFF"
        },
        accent: {
            main: "#FFFFFF"
        }
    }
});

export default function Register(props) {
    useEffect(() => {
        document.title = "Register - Sched-It";
    });

    return (
        <Grid container direction="column" style={{ position: "relative", top: "10em" }}>
            <Grid item container direction="row" justify="center" alignItems="center">
                <Grid item>
                    <Box id="registerBox" style={{ position: "relative", right: "4em" }}>
                        <Grid container direction="column" justify="center">
                            <ThemeProvider theme={textFieldTheme}>
                                <h3 className="registerForm">Email</h3>
                                <TextField id="filled-basic" label="Email" variant="filled" />
                                <h3 className="registerForm">Password</h3>
                                <h3 className="registerForm">Confirm Password</h3>
                            </ThemeProvider>
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
