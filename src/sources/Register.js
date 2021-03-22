import "./assets/styles.css";
import { useEffect } from "react";

// Material-UI
import { Grid } from "@material-ui/core";

// Component Imports
import registerCoverImage from "./assets/registerCover.svg";

export default function Register(props) {
    useEffect(() => {
        document.title = "Register - Sched-It";
    });

    return <Grid container direction="column" style={{ position: "relative", top: "10em" }}></Grid>;
}
