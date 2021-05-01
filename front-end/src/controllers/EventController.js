import request from '../utils/AxiosConfig';

export const addEvent = async (eventData) => {
    const response = await request.put('api/event', eventData);

    if (response.status === 201) return true;
    return response;
};

export const GetEventByID = async () => {};