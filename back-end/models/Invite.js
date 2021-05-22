const mongoose = require("mongoose");

const InviteSchema = new mongoose.Schema({
    appointmentID: String,
    eventID: String,
    inviterID: String,
    inviteeID: String
});

module.exports = mongoose.model("Invite", InviteSchema);
