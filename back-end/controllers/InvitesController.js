const InvitesModel = require("../models/Invite");
const AppointmentModel = require("../models/Appointment");
const EventModel = require("../models/Event");
const UserModel = require("../models/User");

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
module.exports.createInvitation = async (req, res) => {
    const invitationData = req.body;
    invitationData.inviteTimestamp = new Date();

    try {
        const invitationInstance = new InvitesModel(invitationData);
        const saveResult = await invitationInstance.save();

        res.json({ 
            success: true,
            invitation: saveResult
        });

    } catch (err) {
        console.error(err);
        res.json({
            success: false,
            errors: [{ msg: err }]
        })
    }
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
 module.exports.updateInvitation = async (req, res) => {
    const invitationID = req.params.inviteID;
    const invitationData = req.body;

    try {
        const updateResult = await InvitesModel.updateOne({ _id: invitationID }, invitationData);

        res.json({ 
            success: true,
            updatedInvitation: invitationData
        });

    } catch (err) {
        console.error(err);
        res.json({
            success: false,
            errors: [{ msg: err }]
        })
    }
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
 module.exports.getInvitation = async (req, res) => {
    const invitationID = req.params.inviteID;

    try {
        const findResult = await InvitesModel.findOne({ _id: invitationID });

        res.json({ 
            success: true,
            invitation: findResult
        });

    } catch (err) {
        console.error(err);
        res.json({
            success: false,
            errors: [{ msg: err }]
        })
    }
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
 module.exports.getAllInvitations = async (req, res) => {
    const uid = req.session.uid;
    const mode = req.query.mode || 'incoming';
    const start = Number(req.query.start) || 0;
    const limit = Number(req.query.limit) || 7;

    try {
        var findResult = null;
        if(mode === 'incoming')
            findResult = await InvitesModel.find({ inviteeID: uid })
                .sort({datefield: 1})
                .skip(start)
                .limit(limit)
                .lean();
        else
            findResult = await InvitesModel.find({ inviterID: uid })
                .sort({datefield: 1})
                .skip(start)
                .limit(limit)
                .lean();

        // Populate all field information
        const processed = await Promise.all(findResult.map(async invite => {
            // Get Appointment
            invite.appointment = await AppointmentModel.findOne({ _id: invite.appointmentID });
            invite.appointmentID = undefined;

            // Get Event
            invite.event = await EventModel.findOne({ _id: invite.eventID }, ["title"]);
            invite.eventID = undefined;

            // Get Invitee
            invite.invitee = await UserModel.findOne({ _id: invite.inviteeID }, ["firstName","lastName"]);
            invite.inviteeID = undefined;

            // Get Inviter
            invite.inviter = await UserModel.findOne({ _id: invite.inviterID }, ["firstName","lastName"]);
            invite.inviterID = undefined;

            return invite;
        }));

        res.json({ 
            success: true,
            invitations: processed
        });

    } catch (err) {
        console.error(err);
        res.json({
            success: false,
            errors: [{ msg: err }]
        })
    }
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
 module.exports.deleteInvitation = async (req, res) => {
    const invitationID = req.params.inviteID;

    try {
        const deleteStatus = await InvitesModel.deleteOne({ _id: invitationID });

        res.json({ 
            success: true,
            deleteStatus: deleteStatus
        });

    } catch (err) {
        console.error(err);
        res.json({
            success: false,
            errors: [{ msg: err }]
        })
    }
};

module.exports.countInvites = async (req, res) => {
    const uid = req.session.uid;

    try {
        const incomingInvites = await InvitesModel.countDocuments({ inviteeID: uid });
        const outgoingInvites = await InvitesModel.countDocuments({ inviterID: uid });

        res.json({ 
            success: true,
            invitationCount: {
                incoming: incomingInvites,
                outgoing: outgoingInvites
            }
        });

    } catch (err) {
        console.error(err);
        res.json({
            success: false,
            errors: [{ msg: err }]
        })
    }
};