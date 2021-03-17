import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Route Imports
import NavHeader from "./sources/components/NavHeader";
import Homepage from "./sources/Homepage";
import Register from "./sources/Register";

export default function Routes(props) {
    return (
            <Router>
                <NavHeader />
                
                <Switch>
                    <Route exact path="/" component={Homepage} />
                    <Route path="/register" component={Register} />
                </Switch>
            </Router>
    );
}
