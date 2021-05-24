import { GetUserID } from './UserController';
import request from '../utils/AxiosConfig';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

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

export const CheckForOverlap = async (startTime, endTime, eventID) => {
    try {
        const response = await request.get('api/appointment', { params: { eid: eventID } });
        var aData = response.data.appointments;
        var isOverlapping = false;

        var C = moment(startTime);
        var D = moment(endTime);
        var range2 = moment.range(C, D);

        aData.forEach((appointment) => {
            var A = moment(appointment.startTime);
            var B = moment(appointment.endTime);

            var range1 = moment.range(A, B);
            if (range1.overlaps(range2) === true) {
                isOverlapping = true;
            }
        });

        if (isOverlapping) {
            return { success: false, msg: 'Set appointment time is overlapping with another appointment!' };
        } else {
            return response.data;
        }
    } catch (err) {
        console.error(err);
        return { success: false, msg: err };
    }
};
