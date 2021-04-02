import { Route, useHistory } from "react-router-dom";

import Unauthorized from "./Unauthorized";

export default function ProtectedRoute({ component: Component, ...rest }) {
    // Check if logged in
    const history = useHistory();
    const uid = 0;
    console.log(uid);

    // Protected
    if (!(uid == null || typeof uid === "undefined") && rest.protected) {
        return (
            <Route {...rest}>
                <Component {...rest} />
            </Route>
        );
    } else if (!rest.protected) {
        return <Component {...rest} />;
    } else {
        return <Unauthorized />;
    }
}
