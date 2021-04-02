import { Route, useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";

import Unauthorized from "./Unauthorized";

export default function ProtectedRoute({ component: Component, ...rest }) {
    // Check if logged in
    const history = useHistory();

    const [cookies] = useCookies(["uid"]);
    const uid = cookies.uid;
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
