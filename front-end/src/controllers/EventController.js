import request from '../utils/AxiosConfig';

export const getEvent = async (eventID, eventTitle) => {
    const response = await request.get('api/event', {
        params: {
            title: eventTitle,
            eid: eventID,
        },
    });

    if (response.success) return true;
    return response;
};
