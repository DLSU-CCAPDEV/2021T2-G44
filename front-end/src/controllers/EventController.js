import request from '../utils/AxiosConfig';

export const addEvent = async (eventData) => {
    try {
        const response = await request.put('api/event', eventData);
        return response.data;
    } catch (err) {
        console.error(err);
        return { success: false, msg: err };
    }
};

export const GetEvent = async (eventID, eventTitle) => {
    try {
        const response = await request.get('/api/event', {
            params: {
                eid: eventID,
                title: eventTitle,
            },
        });
        return response.data;
    } catch (err) {
        console.error(err);
        return { success: false, msg: err };
    }
};

export const updateEvent = async (eventData) => {
    try {
        const response = await request.post('api/event', eventData);
        return response.data;
    } catch (err) {
        console.error(err);
        return { success: false, msg: err };
    }
};

export const addComment = async (commentData) => {
    try {
        const response = await request.put('api/event/comment', commentData);
        return response.data;
    } catch (err) {
        console.error(err);
        return { success: false, msg: err };
    }
};

export const getPublicEventCount = async () => {
    try {
        const response = await request.get('api/countPublicEvents');
        return response.data;
    } catch (err) {
        console.error(err);
        return { success: false, msg: err };
    }
};

export const getPublicEvents = async (title = '', start = 0, limit = 7) => {
    try {
        const response = await request.get('api/event/public', {
            params: {
                start: start,
                limit: limit,
                title: title,
            },
        });
        return response.data;
    } catch (err) {
        console.error(err);
        return { success: false, msg: err };
    }
};

export const updateCoverImage = async (eventID, image) => {
    try {
        // Upload files first
        const filesData = new FormData();
        filesData.append('file', image);
        const fileUploadResponse = await request.put('api/file', filesData);

        // Update the Event's coverImage property.
        const updateStatus = await updateEvent({
            _id: eventID,
            coverImage: fileUploadResponse.data.file[0].id,
        });
        return updateStatus;
    } catch (ex) {
        console.error(ex);
        return { success: false, msg: ex };
    }
};

export const getUserEvents = async () => {
    try {
        const response = await request.get('api/getUserOwnedEvents');
        return response.data;
    } catch (err) {
        console.error(err);
        return { success: false, msg: err };
    }
};

export const countUserEvents = async () => {
    try {
        const response = await request.get('api/countUserOwnedEvents');
        return response.data;
    } catch (err) {
        console.error(err);
        return { success: false, msg: err };
    }
};
