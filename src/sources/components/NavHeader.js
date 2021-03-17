import "../assets/styles.css";
import logo from "../assets/logo.svg";

const brandingStyles = {
    flexGrow: "20",
};

const navStyles = {
    flexGrow: "1",

    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-around",
    alignContent: "center",

    marginRight: "2em",
};

const listMargins = {
    padding: "1.5em",
};

export default function NavigationHeader(props) {
    const notLoggedIn = () => {
        return (
            <header className="homeHeader">
                <a className="container" style={brandingStyles} href="index.html">
                    <img src={logo} className="logo" alt="Website Logo" />
                    <div className="logoLine" />
                    <h1 id="headerName">Sched-It</h1>
                </a>

                <nav style={navStyles} className="horizontalList">
                    <ul>
                        <li className="navItem" style={listMargins}>
                            <a href="register.html">Register</a>
                        </li>
                        <li className="navItem" style={listMargins}>
                            <a href="login.html">Login</a>
                        </li>
                    </ul>

                    <ul>
                        <li className="navItem" style={listMargins}>
                            <a href="index.html">Home</a>
                        </li>
                        <li className="navItem" style={listMargins}>
                            <a href="about.html">About</a>
                        </li>
                    </ul>
                </nav>
            </header>
        );
    };

    const loggedIn = () => {
        return <p></p>;
    };

    if (props.userData !== null) {
        return loggedIn();
    } else {
        return notLoggedIn();
    }
}
