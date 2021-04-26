const { body, validationResult, param } = require("express-validator");
const MailModel = require("../models/Mail");
const UserModel = require("../models/User");

/**
 * This controller method returns the logged in user's inbox based on optional start and end bounds.
 * @param {*} req
 * @param {*} res
 */
module.exports.getInbox = async (req, res) => {
    const userID = req.session.uid;
    const start = req.params.start || 0;
    const limit = req.params.limit || 10;

    try {
        const mail = await MailModel.find({ recepientID: userID })
            .skip(start)
            .limit(start + limit);
        res.json(mail);
    } catch (ex) {
        console.error(ex);
        res.status(500).send(ex);
    }
};

/**
 * This controller method returns the logged in user's sentbox based on optional start and end bounds.
 * @param {*} req
 * @param {*} res
 */
module.exports.getSentBox = async (req, res) => {
    const userID = req.session.uid;
    const start = req.params.start || 0;
    const limit = req.params.limit || 10;

    try {
        const mail = await MailModel.find({ senderID: userID })
            .skip(start)
            .limit(start + limit);
        res.json(mail);
    } catch (ex) {
        console.error(ex);
        res.status(500).send(ex);
    }
};

/**
 * This controller method returns a mail instance by ID.
 * @param {*} req
 * @param {*} res
 * @returns
 */
module.exports.getMailByID = async (req, res) => {
    const userID = req.session.uid;
    const mailID = req.params.mailID;

    try {
        const mail = await MailModel.findOne({ _id: mailID });

        // Check if the user is either a sender or recepient
        if (mail.senderID !== userID && mail.recepientID !== userID) {
            res.status(403).send("You are you not the sender or recepient of this mail.");
            return;
        }

        // Check if null
        if (!mail) {
            res.status(404).send(`Mail with ID <${mailID}> not found.`);
            return;
        }

        res.status(200).send(mail);
    } catch (ex) {
        console.error(ex);
        res.status(500).send(ex);
    }
};

module.exports.sendMail = async (req, res) => {
    const userID = req.session.uid;
    const recepientEmail = req.params.recepientEmail;
    const mailData = req.body;

    console.log(recepientEmail);

    try {
        // Get recepient user ID
        const recepientData = await UserModel.findOne({ email: recepientEmail });

        // Check if recepient exists
        if (!recepientData) {
            res.status(400).send("Cannot find recepient with that email address.");
            return;
        }

        // Commit the mail
        mailData.senderID = userID;
        mailData.recepientID = recepientData._id;
        mailData.sendTime = new Date();

        const mailInstance = MailModel(mailData);
        mailInstance.save();

        res.status(201).send("Mail sent.");
        return;
    } catch (ex) {
        console.error(ex);
        res.status(500).send(ex);
    }
};

/**
 * This method contains the validation options to be used by express-validator.
 * @param {*} method
 * @returns
 */
module.exports.validateMailData = (method) => {
    switch (method) {
        case "send": {
            return [
                param("recepientEmail", "Missing recepient email.").exists().isEmail(),
                body("subject", "Missing subject.").exists().isEmail(),
                body("content", "Missing content.").exists().isString(),
                body("attachments", "Please provide a last name.").isArray(),
            ];
        }
    }
};
