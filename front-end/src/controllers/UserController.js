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
    try {
        const response = await request.get('api/user/' + userID);
        return response.data;
    } catch (ex) {
        console.error(ex);
        return { success: false, msg: ex };
    }
};

export const GetUserID = async () => {
    try {
        const response = await request.get("auth");
        return response.data;
    } catch (err) {
        console.error(err);
        return { success: false, msg: err };
    }
}

export const RegisterUser = async (userData) => {
    try {
        const response = await request.put('register', userData);
        return response.data;
    } catch (ex) {
        console.error(ex);
        return { success: false, msg: ex };
    }
};

export const editUserInfo = async (userData) => {
    try {
        const response = await request.post('api/user', userData);
        return response.data;
    } catch (ex) {
        console.error(ex);
        return { success: false, msg: ex };
    }
};

export const changeAvatar = async (image) => {
    try {
        // Upload files first
        const filesData = new FormData();
        filesData.append('file', image);
        const fileUploadResponse = await request.put('api/file', filesData);
        
        // Update the user's AVATAR property.
        const updateStatus = await editUserInfo({
            avatar: fileUploadResponse.data.file[0].id,
        });
        return updateStatus;
    } catch (ex) {
        console.error(ex);
        return { success: false, msg: ex };
    }
};

export const changePassword = async (userData) => {
    try {
        const response = await request.post('api/user/password', userData);
        return response.data;
    } catch (ex) {
        console.error(ex);
        return { success: false, msg: ex };
    }
};

export const deleteUser = async (userData) => {
    try {
        const response = await request.delete('api/user', {
            data: userData,
        });
        return response.data;
    } catch (ex) {
        console.error(ex);
        return { success: false, msg: ex };
    }
};

export const renderAvatar = async (avatarID) => {
    try {
        // API Call to Stream
    } catch (ex) {
        console.error(ex);
        return false;
    }
};
