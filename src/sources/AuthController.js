import React, { createContext } from "react";

export const AuthContext = createContext();

export const AuthUser = (props) => {
    // Handle auth procedures
    // const [users, setUsers] = useState([
    //     {
    //         id: 0,
    //         name: "Adriel Amoguis",
    //         email: "adriel_amoguis@dlsu.edu.ph",
    //         password: "password1",
    //     },
    //     {
    //         id: 1,
    //         name: "Gian Madrid",
    //         email: "gian_joseph_madrid@dlsu.edu.ph",
    //         password: "password1",
    //     },
    //     {
    //         id: 2,
    //         name: "Lorenzo Querol",
    //         email: "renzo_querol@dlsu.edu.ph",
    //         password: "password1",
    //     },
    // ]);

    return <AuthContext.Provider value={undefined}>{props.children}</AuthContext.Provider>;
};
