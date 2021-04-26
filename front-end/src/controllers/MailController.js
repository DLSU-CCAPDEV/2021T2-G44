import request from "../utils/AxiosConfig";

import { GetUserData } from "./UserController";

export const getInbox = async (start = 0, end = 50) => {
    // Make API Call
    try {
        const response = await request.get("api/mail/inbox");

        if (response.status === 200) {
            // Add user data for recepient & format dates
            const mailObject = response.data;
            await mailObject.map(async m => {
                m.sender = await GetUserData(m.senderID);
                m.sendTime = new Date(m.sendTime).toLocaleString().toUpperCase();
            });
            return mailObject;
        }
        return false;
    } catch (ex) {
        console.error(ex);
        return false;
    }
};

export const getSent = async (start = 0, end = 50) => {
    // Make API Call
    try {
        const response = await request.get("api/mail/sentbox");

        if (response.status === 200) {
            // Add user data for recepient & format dates
            const mailObject = response.data;
            await mailObject.map(async m => {
                m.recepient = await GetUserData(m.recepientID);
                m.sendTime = new Date(m.sendTime).toLocaleString().toUpperCase();
            });
            return mailObject;
        }
        return false;
    } catch (ex) {
        console.error(ex);
        return false;
    }
};

export const sendMessage = (userEmail, messageContent) => {
    // Normally, this would be an API call to the backend.
    // For phase 1, this function does nothing.
};
