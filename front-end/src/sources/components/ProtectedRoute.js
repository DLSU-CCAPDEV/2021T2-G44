import { Route } from "react-router-dom";

import Unauthorized from "./Unauthorized";

// Cookie
import { useCookies } from "react-cookie";

export default function ProtectedRoute({ component: Component, ...rest }) {
    // Check if logged in
    const [cookies] = useCookies(["uid"]);
    const uid = cookies.uid;

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
