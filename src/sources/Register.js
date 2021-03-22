import './assets/styles.css';
import { Link } from 'react-router-dom';
import { useEffect } from "react";

// Material-UI
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

// Component Imports
import registerCoverImage from './assets/registerCover.svg';

// Custom Styles
var theme = createMuiTheme({
    palette: {
        primary: {
            main: "#7868E6",
        },
        secondary: {
            main: "#B8B5FF",
        },
    },
});

export default function Register(props) {
    useEffect(() => {
        document.title = "Register - Sched-It";
    });

    return (
        <div>
            
        </div>
    );
}