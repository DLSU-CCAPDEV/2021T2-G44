const mongoose = require("mongoose");

const InviteSchema = new mongoose.Schema({
    appointmentID: String,
    inviterID: String,
    inviteeID: String,
    inviteTimestamp: Date,
    status: String,
    message: String
});

module.exports = mongoose.model("Invite", InviteSchema);
