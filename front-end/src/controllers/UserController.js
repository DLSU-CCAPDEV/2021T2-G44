/*
    For Phase 1, API-calls are abstracted away by simple a JSON-db interface.
*/

// Import mock user data
import userDB from '../placeholderData/users';

export const getUserData = async (userID) => {
    // Normally, API call here

    // Get the user data, except the password and access token
    const user = userDB.find((user) => user.id === userID);
    delete user.password;

    return userData;
};
