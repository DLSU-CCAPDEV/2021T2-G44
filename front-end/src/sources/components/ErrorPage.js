import "../assets/styles.css";

import { useEffect } from "react";
// import { Link } from "react-router-dom";

import error400 from "../assets/error400.svg";
import error401 from "../assets/error401.svg";
import error403 from "../assets/error403.svg";
import error404 from "../assets/error404.svg";
import error500 from "../assets/error500.svg";

import { Typography, Grid } from "@material-ui/core";
export default function ErrorPage(props) {
    useEffect(() => {
        document.title = "Error - Sched-It";
    });

    if (props.errorType === 400) {
        return (
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                style={{ position: "relative", top: "4em" }}
            >
                <Grid item xs={5}>
                    <img
                        src={error400}
                        alt="error400"
                        style={{ maxWidth: "90%" }}
                    />
                </Grid>

                <Grid item xs={5}>
                    <Typography variant="h2" style={{ fontWeight: "bold" }}>
                        Whoops something went wrong <br />
                    </Typography>
                    <Typography variant="h3">
                        Can you try doing that again?
                    </Typography>
                    <Typography variant="h4">
                        Error 400: <br />
                        Bad Request
                    </Typography>
                    <Typography>{props.errorMessage}</Typography>
                </Grid>
            </Grid>
        );
    } else if (props.errorType === 401) {
        return (
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                style={{ position: "relative", top: "4em" }}
            >
                <Grid item xs={6}>
                    <img
                        src={error401}
                        alt="error401"
                        style={{ maxWidth: "90%" }}
                    />
                </Grid>

                <Grid item xs={4}>
                    <Typography variant="h2" style={{ fontWeight: "bold" }}>
                        We can’t let you do that right now. <br />
                        Try logging in again!
                    </Typography>
                    <Typography variant="h4">
                        Error 401: <br />
                        Unauthorized
                    </Typography>
                </Grid>
            </Grid>
        );
    } else if (props.errorType === 403) {
        return (
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                style={{ position: "relative", top: "4em" }}
            >
                <Grid item xs={6}>
                    <img
                        src={error403}
                        alt="error403"
                        style={{ maxWidth: "90%" }}
                    />
                </Grid>

                <Grid item xs={4}>
                    <Typography variant="h2" style={{ fontWeight: "bold" }}>
                        Whoops you’re not allowed over here
                    </Typography>
                    <Typography variant="h4">
                        Error 403: <br />
                        Forbidden access request
                    </Typography>
                </Grid>
            </Grid>
        );
    } else if (props.errorType === 404) {
        return (
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                style={{ position: "relative", top: "4em" }}
            >
                <Grid item xs={6}>
                    <img
                        src={error404}
                        alt="error404"
                        style={{ maxWidth: "90%" }}
                    />
                </Grid>

                <Grid item xs={4}>
                    <Typography variant="h2" style={{ fontWeight: "bold" }}>
                        Can’t seem to find what you’re looking for
                    </Typography>
                    <Typography variant="h4">
                        Error 404: <br />
                        Page not Found
                    </Typography>
                </Grid>
            </Grid>
        );
    } else if (props.errorType === 500) {
        return (
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                style={{ position: "relative", top: "4em" }}
            >
                <Grid item xs={6}>
                    <img
                        src={error500}
                        alt="error500"
                        style={{ maxWidth: "90%" }}
                    />
                </Grid>

                <Grid item xs={4}>
                    <Typography variant="h2" style={{ fontWeight: "bold" }}>
                        Whoops something went wrong on our end, we’re fixing it!
                    </Typography>
                    <Typography variant="h4">
                        Error 500: <br />
                        Internal Server Error
                    </Typography>
                    <Typography>{props.errorMessage}</Typography>
                </Grid>
            </Grid>
        );
    }
}
