import request from "../utils/AxiosConfig";

import { GetUserData } from "./UserController";

export const getInbox = async (start = 0, end = 50) => {
    // Make API Call
    try {
        const response = await request.get("api/mail/inbox");

        if (response.status === 200) {
            // Add user data for sender & format dates
            return await Promise.all(response.data.map(async m => new Promise(async (resolve) => {
                m.sender = await GetUserData(m.senderID);
                m.sendTime = new Date(m.sendTime).toLocaleString().toUpperCase();
                return resolve(m);
            })));
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
            return await Promise.all(response.data.map(async m => new Promise(async (resolve) => {
                m.recepient = await GetUserData(m.recepientID);
                m.sendTime = new Date(m.sendTime).toLocaleString().toUpperCase();
                return resolve(m);
            })));
        }
        return false;
    } catch (ex) {
        console.error(ex);
        return false;
    }
};

export const sendMessage = async (userEmail, messageContent) => {
    // Make API Call to Send Message
    try {
        const response = await request.put("api/mail/send/" + userEmail, {
            subject: messageContent.subject,
            content: messageContent.content,
            attachments: messageContent.attachments
        });
    
        if(response.status === 201)
            return true;
        return false;
    } catch(ex) {
        console.error(ex);
        return false;
    }
};

export const toggleRead = async (messageID) => {
    // Make API Call to Toggle Read
    try {
        const response = await request.post("api/mail/toggleRead/" + messageID);
        if(response.status === 200) return true;
        return false;
    } catch(ex) {
        console.error(ex);
        return false;
    }
};