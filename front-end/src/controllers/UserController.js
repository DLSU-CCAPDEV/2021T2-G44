/*
    For Phase 1, API-calls are abstracted away by simple a JSON-db interface.
*/

// Import mock user data
const userDB = require("../placeholderData/users.json");

module.exports.getUserData = async (accessToken, userID) => {
    // Normally, API call here

    // Check for valid accessToken
    // For phase 1, we shall abstract the permissions middleware system.
    if (typeof userDB.find((user) => user.accessToken === accessToken) === "undefined") {
        // Invalid access token, return null
        return null;
    }

    // Get the user data, except the password and access token
    const user = userDB.find((user) => user.id === userID);
    delete user.password;
    delete user.accessToken;

    return user;
};
