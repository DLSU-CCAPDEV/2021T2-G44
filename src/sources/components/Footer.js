import { Grid, Box } from "@material-ui/core";
import logoBlack from "../assets/logoBlack.svg";
import { Link } from "react-router-dom";


export default function Footer(props){
    return (
      <Grid container styles={{ position:"relative", top: "10em", zIndex:"1" }}>
        <Box
          style={{ backgroundColor: "#7868E6", width: "100%", height: "32px" }}
        ></Box>

        <Grid item>
          <Link to="/" href="index.html">
            <img src={logoBlack} className="logo" alt="Website Logo" />
            <div className="logoLine" />
            <h1 id="headerName">Sched-It</h1>
          </Link>
        </Grid>
      </Grid>
    );
}