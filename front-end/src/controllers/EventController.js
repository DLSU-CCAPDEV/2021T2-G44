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

export const getEvent = async (eventID, eventTitle) => {
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
