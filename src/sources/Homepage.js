import './assets/styles.css';
import cover from './assets/cover.svg';
import home_calendar from './assets/home_calendar.svg';
import home_phone from './assets/home_phone.svg';

import { useEffect } from "react";
import { Link } from "react-router-dom";

// Component Imports
import { Fab, Typography, Grid } from "@material-ui/core";


const mainHeaderStyles = {
  "fontFamily": "Roboto",
  "fontStyle": "normal",
  "fontWeight": "bold",
  "fontSize": "36px",
  "lineHeight": "42px",

  "color": "#38302E"
}

const imageStyles = {
  maxWidth:"100%"
}

export default function Homepage() {

  useEffect(() => {
      document.title = "Home - Sched-It";
  });

  // Processing to check if user is logged in or not.
  // If logged in, redirect to the dashboard.

  return (
    <Grid
      container
      direction="column"
      style={{ position: "relative", top: "10em" }}
    >
      <Grid
        item
        container
        direction="row"
        justify="center"
        style={{ paddingBottom: "10em" }}
      >
        <Grid
          item
          style={{ alignSelf: "center", position: "relative", bottom: "2em" }}
        >
          <h1 style={mainHeaderStyles}>Sched-It</h1>
          <p style={{ fontSize: "24px" }}>
            A place to organize everything in time
          </p>
          <Fab
            variant="extended"
            size="large"
            color="primary"
            component={Link}
            to={"/about"}
          >
            <Typography variant="h6">Learn More</Typography>
          </Fab>
        </Grid>

        <Grid item>
          <img src={cover} alt="Cover" />
        </Grid>
      </Grid>

      {/* PURPLE PART */}
      <Grid
        item
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{
          backgroundColor: "#EDEEF7",
          paddingBottom: "10em",
          paddingTop: "10em",
        }}
      >
        <Grid item lg={4}>
          <img style={imageStyles} src={home_calendar} alt="home_calendar" />
        </Grid>
        <Grid
          item
          lg={5}
          style={{ alignSelf: "center", position: "relative", left: "10em" }}
        >
          <h1 style={mainHeaderStyles}>Easily Organize</h1>
          <p style={{ fontSize: "24px", maxWidth: "25em" }}>
            Clean, Clear, and simple to navigate interface when organizing your
            events
          </p>
        </Grid>
      </Grid>
      {/* BOTTOM WHITE PART */}
      <Grid
        item
        container
        direction="row"
        justify="center"
        style={{ paddingBottom: "10em", paddingTop: "10em" }}
      >
        <Grid item lg={5} style={{ alignSelf: "center", position: "relative" }}>
          <h1 style={mainHeaderStyles}>Easily keep track</h1>
          <p style={{ fontSize: "24px", maxWidth: "20em" }}>
            Your tasks easy to view, easy to create, easy to collaborate
          </p>
        </Grid>

        <Grid item lg={4}>
          <img style={imageStyles} src={home_phone} alt="home_phone" />
        </Grid>
      </Grid>

      
    </Grid>
  );
}