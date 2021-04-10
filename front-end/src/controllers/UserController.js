/*
    For Phase 1, API-calls are abstracted away by simple a JSON-db interface.
*/

// Import mock user data
import userDB from '../placeholderData/users';

export const GetUserData = async (uid) => {
    if (typeof uid === 'undefined' || uid == null) return null;

    const userData = userDB?.find((user) => user.id == uid);

    delete userData.password;

    return userData;
};
