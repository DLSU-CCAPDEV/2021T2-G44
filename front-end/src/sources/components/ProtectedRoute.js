import { Route } from "react-router-dom";
import { useEffect, useState } from 'react';

import ErrorPage from "./ErrorPage";

import { getUID } from '../../controllers/AuthController';

export default function ProtectedRoute({ component: Component, ...rest }) {
    // Check if logged in
    const [logged, setLogged] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUID()
            .then(res => {
                if(res) setLogged(true);
            })
            .catch(err => console.error(err));
        setLoading(false);
    }, []);

    if(!loading) {
        // Protected
        if (logged && rest.protected) {
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
    else return <h1>Loading...</h1>;
}
