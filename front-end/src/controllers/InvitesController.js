import request from '../utils/AxiosConfig';
import { getEvent } from '../controllers/EventController';

export const getIncomingInvitations = async (start = 0, end = 7) => {
    try {
        const response = await request.get('api/invite', {
            params: {
                start: start,
                limit: end,
                mode: 'incoming'
            }
        });
        return response.data;
    } catch(ex) {
        return { 
            success: false,
            errors: [{msg: ex}]
        }
    };
};

export const getOutgoingInvitations = async (start = 0, end = 7) => {
    try {
        const response = await request.get('api/invite', {
            params: {
                start: start,
                limit: end,
                mode: 'outgoing'
            }
        });
        return response.data;
    } catch(ex) {
        return { 
            success: false,
            errors: [{msg: ex}]
        }
    };
};

export const getInvitationCount = async () => {
    try {
        const response = await request.get('api/inviteCount');
        return response.data;
    } catch(ex) {
        return { 
            success: false,
            errors: [{msg: ex}]
        }
    };
};

export const respondInvitation = async (invitationID, action) => {
    try {
        const response = await request.post('api/inviteRespond', { 
            action: action
        });
        return response.data;
    } catch(ex) {
        return { 
            success: false,
            errors: [{msg: ex}]
        }
    };
};

export const sendInvitation = async (uid, message, appointmentID) => {
    try {
        const response = await request.put('api/invite', { 
            appointmentID: appointmentID,
            inviteeID: uid,
            message: message
        });
        return response.data;
    } catch(ex) {
        return { 
            success: false,
            errors: [{msg: ex}]
        }
    };
};