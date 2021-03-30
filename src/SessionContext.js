import React, { useState, useContext } from "react";

// Controller Imports
import Users from "./placeholderData/Users";

// Main Context
const GlobalStatesContext = React.createContext();

// Return Context
export function useGlobalStates() {
    return useContext(GlobalStatesContext);
}

export default function SessionContext({ children }) {
    // Global States

    // ActiveUser
    const [activeUser, setActiveUser] = useState(null);

    // Auth Methods (async)
    const userLogin = async (userEmail, userPassword) => {
        // Perform verification
        Users.forEach((user) => {
            if (user.email === userEmail && userPassword === user.password) {
                // Set State
                delete user.password;
                setActiveUser(user);
                return;
            }
        });
    };

    const userLogout = () => {
        setActiveUser(null);
    };

    // Compile states
    const globalStates = {};
    globalStates.userAuth = {
        login: userLogin,
        logout: userLogout,
    };
    globalStates.activeUser = activeUser;
    console.log(globalStates);

    // Context Wrapper
    return (
        <GlobalStatesContext.Provider value={globalStates}>{children}</GlobalStatesContext.Provider>
    );
}
