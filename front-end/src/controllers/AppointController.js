import appointDB from '../placeholderData/appointments.json';

export const GetAppointmentsData = async (uid) => {
    if (typeof uid === undefined || uid == null) return null;

    const appointData = appointDB.filter((appoint) => appoint.participantID === uid);
    return appointData;
};
