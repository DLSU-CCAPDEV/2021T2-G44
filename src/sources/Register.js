import './assets/styles.css';
import { Link } from 'react-router-dom';

// Component Imports
import registerCoverImage from './assets/registerCover.svg';

// Custom Styles

const customContentStyles = {
    width: "100%", 
    borderWidth: "5px", 
    borderColor: "black", 
    borderStyle: "solid",

    justifyContent: "center",
    alignItems: "center"
}

const registerBox = {
    background: "#7868E6",
    borderRadius: "50px",

    width: "25%",
    marginRight: "10%",

    color: "white",
}

const inputStyles = {
    width: "80%",
    margin: "0.1%"
}

const registerCover = {
    margin: "0",
    position: "static"
}

const coverImageStyles = {
    width: '70%',
    margin: "0",
    float: "right"
}

export default function Register(props) {
    return (
        <div className="mainContent">
            <div className="contentCenterPiece" style={customContentStyles}>
                <div style={registerBox}>
                    <form name="RegistrationForm" className="colForm" action="">
                        <h3 style={ { marginTop: "10%" } }>Email</h3>
                        <input id="email" type="email" style={inputStyles} required />

                        <h3>Password</h3>
                        <input id="password" type="password" style={inputStyles} required />

                        <h3>Confirm Password</h3>
                        <input id="passwordConfirm" type="password" style={inputStyles} required />

                        <p style={ { marginTop: "5%", marginBottom: "5%" } }>Already have an account? <Link to="/login">Login.</Link></p>

                        <input type="submit" value="Create Account" className="button" style={ { marginBottom: "10%", background: "#B8B5FF" } } />
                    </form>
                </div>

                <div style={registerCover}>
                    <div style={{ width: "50%", position: "relative", left: "30%" }}>
                        <h1 style={ { fontSize: "64px", margin: "0" } }>Register now</h1>
                        <p style={ { fontSize: "24px", width: "80%", margin: "0" } }>and start bringing people 
                            together the right way</p>
                    </div>
                    <img src={registerCoverImage} style={coverImageStyles} alt="Register Page Cover" />
                </div>
            </div>
        </div>
    );

}