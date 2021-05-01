import invitesDB from '../placeholderData/invites.json';
import { GetUserData } from '../controllers/UserController';
import { getEvent } from '../controllers/EventController';

export const GetInvites = async (userID, start = 0, end = 10) => {
    // Normally, we have our API call here

    // Get the invites
    const invites = invitesDB.filter((invitation) => invitation.inviteeID === Number(userID));

    // Append the host
    invites.forEach((invitation) => {
        invitation.inviteSentTime = new Date(invitation.inviteSentTime);
        invitation.inviteSentTime = invitation.inviteSentTime.toDateString();

        // Get Host Data
        GetUserData(invitation.hostID)
            .then((host) => (invitation.host = host))
            .catch((err) => console.error(err));

        // Get Event Data
        getEvent(invitation.eventID)
            .then((event) => (invitation.event = event))
            .catch((err) => console.error(err));
    });

    // Slice the return
    return invites.slice(start, end);
};
