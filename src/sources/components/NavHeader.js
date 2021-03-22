import "../assets/styles.css";
import logo from "../assets/logo.svg";
import { useContext } from 'react';
import { Link } from 'react-router-dom';

// Material UI
import { Grid } from '@material-ui/core';

// Context Controllers
import { AuthContext } from '../AuthController';

const barStyles = {
    filter: "drop-shadow(0px 5px 4px rgba(0, 0, 0, 0.25))"
}

const brandingStyles = {
    flexGrow: "20",
};

const navStyles = {
    marginRight: "2em",
    marginTop: "0",
};

const listMargins = {
    padding: "1.5em",
};

export default function NavigationHeader(props) {

    const user = useContext(AuthContext);

    const notLoggedIn = () => {
        return (
            <Grid container id="homeHeader" direction="row" justify="space-between" style={barStyles}>
                <Grid item>
                    <Link to="/" className="container" style={brandingStyles} href="index.html">
                        <img src={logo} className="logo" alt="Website Logo" />
                        <div className="logoLine" />
                        <h1 id="headerName">Sched-It</h1>
                    </Link>
                </Grid>

                <Grid item>
                    <nav style={navStyles} className="horizontalList">
                        <ul style={{     marginTop: 0     }}>
                            <li className="navItem" style={listMargins}>
                                <Link to="/">Home</Link>
                            </li>
                            <li className="navItem" style={listMargins}>
                                <Link to="/about">About</Link>
                            </li>

                            <li className="navItem" style={listMargins}>
                                <Link to="/register">Register</Link>
                            </li>
                            <li className="navItem" style={listMargins}>
                                <Link to="/login">Login</Link>
                            </li>
                        </ul>
                    </nav>
                </Grid>
            </Grid>
        );
    };

    const loggedIn = () => {
        return <p></p>;
    };

    if (user !== undefined) {
        return loggedIn();
    } else {
        return notLoggedIn();
    }
}
