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

export const GetEventByID = async (eventID) => {
    // Normally we would have our API call here

    const event = eventsDB.find((event) => event.id === Number(eventID));

    event.startDate = new Date(event.startDate);
    event.endDate = new Date(event.endDate);
    event.startDate = event.startDate.toDateString();
    event.endDate = event.endDate.toDateString();

    return event;
};