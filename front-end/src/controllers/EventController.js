import eventsDB from '../placeholderData/events.json';

export const getEvent = async (eventID, eventTitle) => {
    const response = await request.get('api/event', {
        params: {
            title: eventTitle,
            eid: eventID,
        },
    });

    if (response.status === 201) return true;
    return response;
};
