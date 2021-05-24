import { GetUserID } from './UserController';
import request from '../utils/AxiosConfig';

export const createNewAppointment = async (appointmentData) => {
    try {
        const response = await request.put('api/appointment', appointmentData);
        return response.data;
    } catch (err) {
        console.error(err);
        return { success: false, msg: err };
    }
};

export const GetUserAppointments = async () => {
    try {
        const userResponse = await GetUserID();
        const uid = userResponse.uid;

        const response = await request.get('api/appointment', { params: { uid: uid } });
        return response.data;
    } catch (err) {
        console.error(err);
        return { success: false, msg: err };
    }
};

export const GetAppointmentByDate = async (eventID, date) => {
    try {
        const response = await request.get('api/appointment', { params: { eid: eventID, date: date } });
        return response.data;
    } catch (err) {
        console.error(err);
        return { success: false, msg: err };
    }
};

export const GetEventAppointments = async (eventID) => {
    try {
        const response = await request.get('api/appointment', { params: { eid: eventID } });
        return response.data;
    } catch (err) {
        console.error(err);
        return { success: false, msg: err };
    }
};

export const UpdateAppointment = async (appointmentID, appointmentData) => {
    try {
        const response = await request.post('api/appointment', appointmentData, { params: { aid: appointmentID } });
        return response.data;
    } catch (err) {
        console.error(err);
        return { success: false, msg: err };
    }
};
