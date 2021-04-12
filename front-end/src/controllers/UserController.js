/*
    For Phase 1, API-calls are abstracted away by simple a JSON-db interface.
*/

// Import mock user data
import userDB from '../placeholderData/users.json';

export const GetHostsData = async (userEvents) => {
    // console.log(`${userEvents} AWDUHAYUWGDYAWGDUYWAGDuy`);
    let hosts = [];

    userEvents.forEach((event) => {
        hosts.push(userDB.find((user) => user.id === event.hostID));
    });

    const jsonObject = hosts.map(JSON.stringify);

    const uniqueSet = new Set(jsonObject);
    const uniqueArray = Array.from(uniqueSet).map(JSON.parse);

    return uniqueArray;
};

export const GetUserData = async (userID) => {
    // Normally, API call here

    // Get the user data, except the password and access token
    const user = userDB.find((user) => user.id === Number(userID));

    delete user.password;

    return user;
};
