// Import the Placeholder File
import mailDB from "../placeholderData/mail";

import { getUserData } from "../controllers/UserController";

export const getInbox = async (uid, start = 0, end = 50) => {
    // Normally, we make an API call here.

    // For Phase 1:
    const allMail = mailDB.filter((mail) => mail.recepientID === Number(uid));

    // Get sender details
    const selected = allMail.slice(start, end);

    selected.map(async (mail) => {
        // Get the sender details
        mail.sender = await getUserData(mail.senderID);

        // Parse the time
        const date = new Date(mail.sendTime);
        const now = new Date();

        if (
            date.getDate() === now.getDate() &&
            date.getMonth() === now.getMonth() &&
            date.getFullYear() === now.getFullYear()
        ) {
            // Parse as time
            mail.sendTime = `Today ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        }
        // Parse as datetime
        else mail.sendTime = date.toDateString();
    });

    // Sort by date

    return selected;
};

export const getSent = async (uid, start = 0, end = 50) => {
    // Normally, we make an API call here.

    // For Phase 1:
    const allMail = mailDB.filter((mail) => mail.senderID === Number(uid));

    // Get sender details
    const selected = allMail.slice(start, end);

    selected.map(async (mail) => {
        // Get the sender details
        mail.recepient = await getUserData(mail.recepientID);

        // Parse the time
        const date = new Date(mail.sendTime);
        const now = new Date();

        if (
            date.getDate() === now.getDate() &&
            date.getMonth() === now.getMonth() &&
            date.getFullYear() === now.getFullYear()
        ) {
            // Parse as time
            mail.sendTime = `Today ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        }
        // Parse as datetime
        else mail.sendTime = date.toDateString();
    });

    // Sort by date

    return selected;
};