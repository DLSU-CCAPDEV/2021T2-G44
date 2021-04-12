import eventsDB from '../placeholderData/events.json';

export const GetSingleEvent = async (appointment) => {
    const event = eventsDB.find((event) => event.id == appointment.eventID);
    return event;
};

export const GetEventsData = async (userAppointments) => {
    if (typeof userAppointments === 'undefined' || userAppointments == null) return null;

    let eventsData = [];

    userAppointments.forEach((appointment) => {
        eventsData.push(eventsDB.find((event) => event.id === appointment.eventID));
    });

    return eventsData;
};
