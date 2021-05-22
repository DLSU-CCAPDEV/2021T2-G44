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
        const response = await request.get('api/invite/count');
        return response.data;
    } catch(ex) {
        return { 
            success: false,
            errors: [{msg: ex}]
        }
    };
};