const InvitesModel = require("../models/Invite");

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
module.exports.createInvitation = async (req, res) => {
    const invitationData = req.body;

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