const mongoose = require("mongoose");

const MailSchema = new mongoose.Schema({
    senderID: String,
    recepientID: String,
    sendTime: Date,
    subject: String,
    content: String,
    attachments: Array,
});

module.exports = mongoose.model("Mail", MailSchema);
