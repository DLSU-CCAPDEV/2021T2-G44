import eventsDB from '../placeholderData/events.json';

export const GetEventsData = async (eventID) => {
    if (typeof eventID === undefined || eventID == null) return null;

    const eventsData = eventsDB.find((event) => event.id == eventID);

    return eventsData;
};
