import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProtectedRoute from './sources/components/ProtectedRoute';
import SessionContext from "./SessionContext";

// Route Imports
import NavHeader from "./sources/components/NavHeader";
import Footer from "./sources/components/Footer";
import Homepage from "./sources/Homepage";
import Register from "./sources/Register";
import PageNotFound from "./sources/components/PageNotFound";

// Protected Route Imports
import Dashboard from './sources/UserDashboard';

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
            <SessionContext>
                <Router>
                    <NavHeader {...props} />

                    <Switch>
                        {/* PUBLIC ROUTES */}
                        <ProtectedRoute exact path="/" component={Homepage} protected={false} />
                        <ProtectedRoute path="/register" component={Register} protected={false} />

                        {/* PROTECTED ROUTES */}
                        <ProtectedRoute
                            path="/dashboard"
                            component={Dashboard}
                            {...props}
                            protected={true}
                        />

                        {/* 404 */}
                        <Route component={PageNotFound} />
                    </Switch>

                    <Footer />
                </Router>
            </SessionContext>
        </ThemeProvider>
    );
}
