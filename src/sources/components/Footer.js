import { Grid, Box, Typography } from "@material-ui/core";
import logoBlack from "../assets/logoBlack.svg";
import { Link } from "react-router-dom";

const copyrightStyle = {
  fontStyle: "normal",
  fontWeight: "bold",
  fontSize: "18px",
  lineHeight: "21px",

  marginLeft: "1em",
  marginTop: "-1em"
}

export default function Footer(props){
    return (
        <Grid container>
            <Box
                style={{
                    backgroundColor: "#7868E6",
                    width: "100%",
                    height: "32px",
                    marginTop: "8em",
                }}
            ></Box>

            <Grid item container direction="column" justify="flex-start" alignItems="flex-start">
                <Link to="/" style={ { margin: "1em" } }>
                    <img src={logoBlack} className="footerLogo" alt="Website Logo" />
                    <div className="logoLine" />
                    <h1 id="headerName">Sched-It</h1>
                </Link>
                <p style={copyrightStyle}>
                  © AGLET 2021
                </p>
            </Grid>
        </Grid>
    );
}