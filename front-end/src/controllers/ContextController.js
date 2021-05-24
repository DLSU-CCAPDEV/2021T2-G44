import { useState, createContext } from "react";

import { getUID } from "./AuthController";

export const GlobalContext = createContext();

export default function ContextProvider({ children }) {
    const [uid, setUid] = useState(null);

    const updateUid = async () => {
        const userID = await getUID();

        if (!userID.success) {
            setUid(null);
            return;
        }

        setUid(userID.uid);
    };

    return <GlobalContext.Provider value={{ uid, updateUid }}>{children}</GlobalContext.Provider>;
}
