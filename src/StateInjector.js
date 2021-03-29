import { useState } from "react";
import Routes from "./routes";

// Controller Imports
import Users from "./placeholderData/Users";

export default function StateInjector(props) {
    // Set-Up Global States
    var sessionStates = {};

    // Login System
    const [activeUser, setActiveUser] = useState(null);

    const userLogin = (email, password) => {
        // Replace this with an API call for Phase 2
        Users.forEach((user) => {
            if (user.email === email && user.password === password) {
                delete user.password;
                setActiveUser(user);
                return;
            }
        });
    };

    const userLogout = () => {
        // Clear state
        setActiveUser(null);
    };

    // Build Session States
    sessionStates.userAuth = {
        login: userLogin,
        logout: userLogout,
    };
    sessionStates.activeUser = activeUser;

    return <Routes sessionStates={sessionStates} />;
}
