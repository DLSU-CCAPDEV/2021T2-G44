import request from '../utils/AxiosConfig';

export const addEvent = async (eventData) => {
    const response = await request.put('api/event', eventData);

    if (response.sucess) return true;
    return response.data;
};

export const getEvent = async (eventID, eventTitle) => {
    const response = await request.get('/api/event', {
        params: {
            eid: eventID,
            title: eventTitle,
        },
    });

    if (response.success) return true;
    return response.data;
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
