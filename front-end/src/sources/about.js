import "./assets/styles.css";

import { useEffect } from "react";
// import { Link } from "react-router-dom";
import Mission from "./assets/mission.svg";
import MeetTheTeam from "./assets/meetTheTeam.svg";
import AdiProfilePicture from "./assets/adi.svg";
import GianProfilePicture from "./assets/gian.svg";
import EnzoProfilePicture from "./assets/enzo.svg";

// Component Imports
import { Typography, Grid } from "@material-ui/core";

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
                    <img src={Mission} alt="Mission" style={{ maxWidth: "90%" }} />
                </Grid>

                <Grid item xs={5}>
                    <Typography variant="h2" style={{ fontWeight: "bold" }}>
                        Mission
                    </Typography>
                    <Typography variant="h4" style={{ position: "relative", top: "1em" }}>
                        Our mission is to provide a scheduling and appointment platform for
                        every-day users and enterprise users alike. Sched-It aims toprovide a
                        streamlined process for time management, setting appointments, and making
                        event agreements, no matter how big or small -- public or private.
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
                    <img src={MeetTheTeam} alt="Meat The Team" style={{ maxWidth: "90%" }} />
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
                    <Typography variant="h5" style={{ position: "relative", top: "1em" }}>
                        I am currently a second year undergraduate student in De La Salle University
                        (DLSU) studying Bachelor of Science in Computer Science with specialization
                        in Software Technology (BS CS-ST). I had my primary education in Holy Child
                        College of Davao (HCCD) and graduated from my secondary education from Davao
                        Christian High School (DCHS) class of 2019 (STEM).
                        <br />
                        <br />
                        My main research interest lies in Natural Language Processing (NLP) and
                        Computer Vision (CV). As of time of writing, I reviewed some research papers
                        on the topics and reading up on machine learning techniques. However, no
                        hands-on work has been made so far. On the other hand, my main development
                        skill set leans more into Full Stack Web Development (esp Back-end), DevOps,
                        & Computer Software Development.
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
                    <Typography variant="h5" style={{ position: "relative", top: "1em" }}>
                        Hi im Gian and i'm a Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit. Sed interdum justo vitae pellentesque tincidunt. Fusce non justo sit
                        amet est laoreet facilisis. Quisque eu ipsum ut elit egestas varius sit amet
                        sollicitudin lacus. Curabitur finibus mauris ac diam venenatis ornare.
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
                    <Typography variant="h5" style={{ position: "relative", top: "1em" }}>
                        Hi im Lorenzo and i'm a Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit. Sed interdum justo vitae pellentesque tincidunt. Fusce non justo sit
                        amet est laoreet facilisis. Quisque eu ipsum ut elit egestas varius sit amet
                        sollicitudin lacus. Curabitur finibus mauris ac diam venenatis ornare.
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}
