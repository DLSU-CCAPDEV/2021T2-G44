import { Route } from "react-router-dom";
import { useContext } from "react";

import Unauthorized from "./Unauthorized";
import { useGlobalStates } from "../../SessionContext";

export default function ProtectedRoute({ component: Component, ...rest }) {
    // Check if logged in
    const user = useGlobalStates()?.activeUser;

    // Non-Protected
    if (!rest.protected && user == null) {
        return (
            <Route {...rest}>
                <Component {...rest} />
            </Route>
        );
    }

    // Protected
    if (user !== null && rest.protected) {
        return (
            <Route {...rest}>
                <Component {...rest} />
            </Route>
        );
    } else {
        return <Unauthorized />;
    }
}
