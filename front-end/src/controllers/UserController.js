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
    
    if(response.status !== 200) {
        return false;
    }
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

export const changeAvatar = async (image) => {
    // Upload files first
    const filesData = new FormData();
    filesData.append('file', image);
    const fileUploadResponse = await request.post('api/file', filesData);
    if(fileUploadResponse.status !== 200) {
        return fileUploadResponse;
    }

    // Update the user's AVATAR property.
    const updateStatus = await editUserInfo({
        avatar: fileUploadResponse.data[0].id
    });
    if(updateStatus.status !== 200) {
        return fileUploadResponse;
    }
    return true;
};

export const changePassword = async (userData) => {
    const response = await request.post('api/user/password', userData);

    if (response.status === 200) return true;
    return response;
};

export const deleteUser = async (userData) => {
    const response = await request.delete('api/user', {
        data: userData
    });

    if (response.status === 200) return true;
    return response;
};

export const renderAvatar = async (avatarID) => {
    try {
        // API Call to Stream
        
    } catch(ex) {
        console.error(ex);
        return false;
    }
};