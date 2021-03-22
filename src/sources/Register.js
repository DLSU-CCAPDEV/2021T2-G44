import './assets/styles.css';
import { Link } from 'react-router-dom';
import { useEffect } from "react";

// Component Imports
import registerCoverImage from './assets/registerCover.svg';

// Custom Styles

const customContentStyles = {
    width: "100%",
    marginTop: "5%",

    /*
    borderWidth: "5px",
    borderColor: "black",
    borderStyle: "solid",
    */

    justifyContent: "center",
    alignItems: "flex-start",
    flexWrap: "nowrap",
    overflow: "auto"
};

const registerBox = {
    marginTop: "2%",
    

    background: "#7868E6",
    borderRadius: "50px",

    color: "white"
};

const inputStyles = {
    width: "80%",
    margin: "0.1%",
};

const registerCover = {
    marginRight: "-24.5%",

    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start"
};

const coverImageStyles = {
    margin: "0",
};

export default function Register(props) {
    useEffect(() => {
        document.title = "Register - Sched-It";
    });

    return (
        <div className="mainContent">
            <div className="contentCenterPiece" style={customContentStyles}>
                <div style={registerBox}>
                    <form name="RegistrationForm" className="colForm" action="">
                        <h3 style={{ marginTop: "10%" }}>Email</h3>
                        <input id="email" type="email" style={inputStyles} required />

                        <h3>Password</h3>
                        <input id="password" type="password" style={inputStyles} required />

                        <h3>Confirm Password</h3>
                        <input id="passwordConfirm" type="password" style={inputStyles} required />

                        <p style={{ marginTop: "5%", marginBottom: "5%" }}>
                            Already have an account? <Link to="/login">Login.</Link>
                        </p>

                        <input
                            type="submit"
                            value="Create Account"
                            className="button"
                            style={{ marginBottom: "10%", background: "#B8B5FF" }}
                        />
                    </form>
                </div>

                <div style={registerCover}>
                    <div style={ { display: "flex", flexDirection: "column", flexWrap: "nowrap", alignItems: "flex-start", marginLeft: "5%"} }>
                        <h1 style={{ fontSize: "64px", margin: "0"}}>Register now</h1>
                        <p style={{ fontSize: "24px", margin: "0" }}>and start bringing people together the right way</p>
                    </div>
                    
                    <img
                        src={registerCoverImage}
                        style={coverImageStyles}
                        alt="Register Page Cover"
                    />
                </div>
            </div>
        </div>
    );

}