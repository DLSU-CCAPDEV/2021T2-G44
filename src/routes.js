import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Route Imports
import NavHeader from "./sources/components/NavHeader";
import Homepage from "./sources/Homepage";
import Register from "./sources/Register";

// Material UI
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

var theme = createMuiTheme({
    palette: {
        primary: {
            main: "#7868E6"
        },
        secondary: {
            main: "#B8B5FF"
        },
        accent : {
            main: "#EDEEF7"
        },
        dark: {
            main: "#212121"
        },
        complement: {
            main: "#E4FBFF"
        }
    }
});

theme = responsiveFontSizes(theme);

export default function Routes(props) {
    return (
            <ThemeProvider theme={theme}>
                <Router>
                    <NavHeader />
                    
                    <Switch>
                        <Route exact path="/" component={Homepage} />
                        <Route path="/register" component={Register} />
                    </Switch>
                </Router>
            </ThemeProvider>
    );
}
