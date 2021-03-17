import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Route Imports
import NavHeader from "./sources/components/NavHeader";
import Homepage from "./sources/Homepage";

export default function Routes(props) {
    return (
        <React.StrictMode>
            <NavHeader userData={null} />

            <Router>
                <Switch>
                    <Route exact path="/" component={Homepage} />
                </Switch>
            </Router>
        </React.StrictMode>
    );
}
