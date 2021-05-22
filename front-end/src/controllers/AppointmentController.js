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
  try {
  } catch (err) {
    console.error(err);
    return { success: false, msg: err };
  }
  const userDataResponse = await request.get('api/user/' + userID);
  const uid = userDataResponse.body.id;
  const response = await request.get('api/appointment/' + appointmentID);

  if (response.status === 201) return true;

  return response;
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
