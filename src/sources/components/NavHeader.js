import "../assets/styles.css";
import logo from "../assets/logo.svg";
import { useContext } from 'react';
import { Link } from 'react-router-dom';

// Context Controllers
import { AuthContext } from '../AuthController';

const brandingStyles = {
    flexGrow: "20",
};

const navStyles = {
    flexGrow: "1",

    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "center",
    alignContent: "center",

    marginRight: "2em",
};

const listMargins = {
    padding: "1.5em",
};

export default function NavigationHeader(props) {

    const user = useContext(AuthContext);

    const notLoggedIn = () => {
        return (
            <header id="homeHeader">
                <a className="container" style={brandingStyles} href="index.html">
                    <img src={logo} className="logo" alt="Website Logo" />
                    <div className="logoLine" />
                    <h1 id="headerName">Sched-It</h1>
                </a>

                <nav style={navStyles} className="horizontalList">
                    <ul>
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
            </header>
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
