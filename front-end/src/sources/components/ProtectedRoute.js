import { Route } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

import ErrorPage from "./ErrorPage";

import { GlobalContext } from "../../controllers/ContextController";

export default function ProtectedRoute({ component: Component, ...rest }) {
    // Check if logged in
    const { uid, updateUid } = useContext(GlobalContext);

    // Protected
    if (uid && rest.protected) {
        return (
            <Route {...rest}>
                <Component {...rest} />
            </Route>
        );
    } else if (!rest.protected) {
        return <Component {...rest} />;
    } else {
        return <ErrorPage errorType={401} />;
    }
}
