const mongoose = require("mongoose");

const InviteSchema = new mongoose.Schema({
    appointmentID: String,
    eventID: String,
    inviterID: String,
    inviteeID: String,
    inviteDate: Date
});

module.exports = mongoose.model("Invite", InviteSchema);
