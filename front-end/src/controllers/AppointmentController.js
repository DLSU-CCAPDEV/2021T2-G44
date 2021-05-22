import userController from './UserController';
import request from '../utils/AxiosConfig';

export const createNewAppointment = async (appointmentData) => {
    console.log(appointmentData);
    try {
        const response = await request.put('api/appointment', appointmentData);
        return response.data;
    } catch (err) {
        console.error(err);
        return { success: false, msg: err };
    }
};

export const getUserAppointment = async (userID, appointmentID) => {
    const userDataResponse = await request.get('api/user/' + userID);
    const uid = userDataResponse.body.id;
    const response = await request.get('api/appointment/' + appointmentID);

    if (response.status === 201) return true;

    return response;
};
