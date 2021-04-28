import request from '../utils/AxiosConfig';

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

export const GetUserData = async (userID = '') => {
    const response = await request.get('api/user/' + userID);
    return response.data;
};

export const RegisterUser = async (userData) => {
    const response = await request.put('register', userData);

    if (response.status === 201) return true;
    return response;
};

export const editUserInfo = async (userData) => {
    const response = await request.post('api/user', userData);

    if (response.status === 200) return true;
    return response;
};

export const changePassword = async (userData) => {
    const response = await request.post('api/user/password', userData);

    if (response.status === 200) return true;
    return response;
};

export const deleteUser = async (userData) => {
    const response = await request.delete('api/user', userData);

    if (response.status === 200) return true;
    return response;
};
