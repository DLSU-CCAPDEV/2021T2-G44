import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./sources/components/ProtectedRoute";

// Route Imports
import NavHeader from "./sources/components/NavHeader";
import Footer from "./sources/components/Footer";
import Homepage from "./sources/Homepage";
import Register from "./sources/Register";
import Login from "./sources/Login";
import ErrorPage from "./sources/components/ErrorPage";

// Protected Route Imports
import Dashboard from "./sources/UserDashboard";
import MyCalendar from "./sources/MyCalendar";
import Profile from "./sources/Profile";

// Material UI
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

var theme = createMuiTheme({
    palette: {
        primary: {
            main: "#7868E6",
        },
        secondary: {
            main: "#B8B5FF",
        },
        accent: {
            main: "#EDEEF7",
        },
        dark: {
            main: "#212121",
        },
        complement: {
            main: "#E4FBFF",
        },
    },
});

theme = responsiveFontSizes(theme);

export default function Routes(props) {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <NavHeader />

                <Switch>
                    {/* PUBLIC ROUTES */}
                    <ProtectedRoute
                        exact
                        path="/"
                        component={Homepage}
                        protected={false}
                    />
                    <ProtectedRoute
                        path="/register"
                        component={Register}
                        protected={false}
                    />
                    <ProtectedRoute
                        path="/login"
                        component={Login}
                        protected={false}
                    />

                    {/* PROTECTED ROUTES */}
                    <ProtectedRoute
                        path="/dashboard"
                        component={Dashboard}
                        protected={true}
                    />
                    <ProtectedRoute
                        path="/my-calendar"
                        component={MyCalendar}
                        protected={true}
                    />
                    <ProtectedRoute
                        path="/profile"
                        component={Profile}
                        protected={true}
                    />
                    {/* Error */}
                    <Route
                        render={(props) => (
                            <ErrorPage {...props} errorType={404} />
                        )}
                    />
                </Switch>

                <Footer />
            </Router>
        </ThemeProvider>
    );
}
