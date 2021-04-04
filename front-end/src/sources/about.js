import "./assets/styles.css";

import { useEffect } from "react";
// import { Link } from "react-router-dom";
import Mission from "./assets/mission.svg";
import MeetTheTeam from "./assets/meetTheTeam.svg";
import AdiProfilePicture from "./assets/adi.svg";
import GianProfilePicture from "./assets/gian.svg";
import EnzoProfilePicture from "./assets/enzo.svg";

// Component Imports
import { Fab, Typography, Grid } from "@material-ui/core";

export default function Homepage() {
    useEffect(() => {
        document.title = "About - Sched-It";
    });

    return (
        <Grid container direction="column">
            {/* MISSION */}
            <Grid
                item
                container
                direction="row"
                justify="center"
                alignItems="center"
                style={{
                    paddingTop: "12em",
                    paddingBottom: "12em",
                    backgroundColor: "#EDEEF7",
                }}
            >
                <Grid item xs={4}>
                    <img
                        src={Mission}
                        alt="Mission"
                        style={{ maxWidth: "90%" }}
                    />
                </Grid>

                <Grid item xs={5}>
                    <Typography variant="h2" style={{ fontWeight: "bold" }}>
                        Mission
                    </Typography>
                    <Typography
                        variant="h4"
                        style={{ position: "relative", top: "1em" }}
                    >
                        Our mission was to create a Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit. Sed interdum justo vitae
                        pellentesque tincidunt. Fusce non justo sit amet est
                        laoreet facilisis. Quisque eu ipsum ut elit egestas
                        varius sit amet sollicitudin lacus. Curabitur finibus
                        mauris ac diam venenatis ornare.
                    </Typography>
                </Grid>
            </Grid>
            {/* MEET THE TEAM */}
            <Grid
                item
                container
                direction="row"
                justify="center"
                alignItems="center"
                style={{
                    paddingTop: "12em",
                    paddingBottom: "12em",
                }}
            >
                <Grid item xs={4}>
                    <img
                        src={MeetTheTeam}
                        alt="Meat The Team"
                        style={{ maxWidth: "90%" }}
                    />
                </Grid>

                <Grid item xs={3}>
                    <Typography variant="h2" style={{ fontWeight: "bold" }}>
                        Meet The Team
                    </Typography>
                </Grid>
            </Grid>
            {/* ADI */}
            <Grid
                item
                container
                direction="row"
                justify="center"
                alignItems="center"
                style={{
                    paddingTop: "8em",
                    paddingBottom: "8em",
                    backgroundColor: "#EDEEF7",
                }}
            >
                <Grid item xs={4}>
                    <img
                        src={AdiProfilePicture}
                        alt="Adriel Amoguis"
                        style={{
                            maxWidth: "75%",
                            maxHeight: "75%",
                            objectFit: "cover",
                            borderRadius: "50%",
                        }}
                    />
                </Grid>

                <Grid item xs={5}>
                    <Typography variant="h3" style={{ fontWeight: "bold" }}>
                        Amoguis, Adriel Isaiah
                    </Typography>
                    <Typography
                        variant="h5"
                        style={{ position: "relative", top: "1em" }}
                    >
                        Hi im Adi and i'm a Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit. Sed interdum justo vitae
                        pellentesque tincidunt. Fusce non justo sit amet est
                        laoreet facilisis. Quisque eu ipsum ut elit egestas
                        varius sit amet sollicitudin lacus. Curabitur finibus
                        mauris ac diam venenatis ornare.
                    </Typography>
                </Grid>
            </Grid>
            {/* Gian */}
            <Grid
                item
                container
                direction="row"
                justify="center"
                alignItems="center"
                style={{
                    paddingTop: "8em",
                    paddingBottom: "8em",
                    // backgroundColor: "#EDEEF7",
                }}
            >
                <Grid item xs={4}>
                    <img
                        src={GianProfilePicture}
                        alt="Gian Madrid"
                        style={{
                            maxWidth: "75%",
                            maxHeight: "75%",
                            objectFit: "cover",
                            borderRadius: "50%",
                        }}
                    />
                </Grid>

                <Grid item xs={5}>
                    <Typography variant="h3" style={{ fontWeight: "bold" }}>
                        Madrid, Gian Joseph
                    </Typography>
                    <Typography
                        variant="h5"
                        style={{ position: "relative", top: "1em" }}
                    >
                        Hi im Gian and i'm a Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit. Sed interdum justo vitae
                        pellentesque tincidunt. Fusce non justo sit amet est
                        laoreet facilisis. Quisque eu ipsum ut elit egestas
                        varius sit amet sollicitudin lacus. Curabitur finibus
                        mauris ac diam venenatis ornare.
                    </Typography>
                </Grid>
            </Grid>
            {/* Enzo */}
            <Grid
                item
                container
                direction="row"
                justify="center"
                alignItems="center"
                style={{
                    paddingTop: "8em",
                    paddingBottom: "8em",
                    backgroundColor: "#EDEEF7",
                }}
            >
                <Grid item xs={4}>
                    <img
                        src={EnzoProfilePicture}
                        alt="LorenzoQuerol"
                        style={{
                            maxWidth: "75%",
                            maxHeight: "75%",
                            objectFit: "cover",
                            borderRadius: "50%",
                        }}
                    />
                </Grid>

                <Grid item xs={5}>
                    <Typography variant="h3" style={{ fontWeight: "bold" }}>
                        Querol, Lorenzo
                    </Typography>
                    <Typography
                        variant="h5"
                        style={{ position: "relative", top: "1em" }}
                    >
                        Hi im Lorenzo and i'm a Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit. Sed interdum justo vitae
                        pellentesque tincidunt. Fusce non justo sit amet est
                        laoreet facilisis. Quisque eu ipsum ut elit egestas
                        varius sit amet sollicitudin lacus. Curabitur finibus
                        mauris ac diam venenatis ornare.
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}
