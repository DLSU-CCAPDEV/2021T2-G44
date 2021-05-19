const MailModel = require("../models/Mail");
const UserModel = require("../models/User");

const { mailTransporter } = require("./SmtpController");

/**
 * This controller method returns the logged in user's inbox based on optional start and end bounds.
 * @param {*} req
 * @param {*} res
 */
module.exports.getInbox = async (req, res) => {
    const userID = req.session.uid;
    const start = Number(req.query.start) || 0;
    const limit = Number(req.query.limit) || 15;

    try {
        // Fetch Mail Data
        const mail = await MailModel.find({ recepientID: userID })
            .sort({ _id: -1 })
            .skip(start)
            .limit(limit)
            .lean();

        // Fetch Sender Data
        const processedMail = await Promise.all(mail.map(m => new Promise(async resolve => {
            m.sender = await UserModel.findOne({ _id: m.senderID }, ["email","firstName","lastName","avatar"]);
            m.recepient = await UserModel.findOne({ _id: m.recepientID }, ["email","firstName","lastName","avatar"]);
            m.senderID = undefined;
            m.recepientID = undefined;
            return resolve(m);
        })));

        res.status(200).json({
            success: true,
            mail: processedMail
        });
    } catch (ex) {
        console.error(ex);
        res.status(500).json({
            success: false,
            errors: [{
                msg: ex
            }]
        });
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
    const limit = req.params.limit || 15;

    try {
        // Fetch Mail Data
        const mail = await MailModel.find({ senderID: userID })
            .sort({ _id: -1 })
            .skip(start)
            .limit(limit)
            .lean();

        // Fetch Sender Data
        const processedMail = await Promise.all(mail.map(m => new Promise(async resolve => {
            m.sender = await UserModel.findOne({ _id: m.senderID }, ["email","firstName","lastName","avatar"]);
            m.recepient = await UserModel.findOne({ _id: m.recepientID }, ["email","firstName","lastName","avatar"]);
            m.senderID = undefined;
            m.recepientID = undefined;
            return resolve(m);
        })));

        res.status(200).json({
            success: true,
            mail: processedMail
        });
    } catch (ex) {
        console.error(ex);
        res.status(500).json({
            success: false,
            errors: [{
                msg: ex
            }]
        });
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
            res.status(403).json({
                success: false,
                errors: [{
                    msg: "You are you not the sender or recepient of this mail."
                }]
            });
            return;
        }

        // Check if null
        if (!mail) {
            res.status(400).json({
                success: false,
                errors: [{
                    msg: `Mail with ID <${mailID}> not found.`
                }]
            });
            return;
        }

        res.status(200).json({
            success: true,
            mail: mail
        });
    } catch (ex) {
        console.error(ex);
        res.status(500).json({
            success: false,
            errors: [{
                msg: ex
            }]
        });
    }
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
module.exports.sendMail = async (req, res) => {
    const userID = req.session.uid;
    const recepientEmail = req.params.recepientEmail;
    const mailData = req.body;

    try {
        // Get recepient user ID
        const recepientData = await UserModel.findOne({ email: recepientEmail });

        // Check if recepient exists
        if (!recepientData) {
            res.status(400).json({
                success: false,
                errors: [{
                    msg: "Cannot find recepient with that email address."
                }]
            });
            return;
        }

        // Commit the mail
        mailData.senderID = userID;
        mailData.recepientID = recepientData._id;
        mailData.sendTime = new Date();

        const mailInstance = MailModel(mailData);
        mailInstance.save();

        res.status(201).json({
            success: true,
            mail: mailData
        });

        // Send email notification to the recepient
        const userData = await UserModel.findOne({ _id: userID });
        await mailTransporter.sendMail({
            from: "Sched-It Mailer <no-reply@sched-it-front.herokuapp.com>",
            to: recepientData.email,
            subject: `${userData.firstName} ${userData.lastName} has sent you a message on Sched-It`,
            html: `
                <h2>${mailData.subject}</h2>
                <hr />
                <p>${mailData.content}</p>
                <br />
                <p>${mailData.attachments.length} attachments.</p>
                <hr />
                <a href="https://sched-it-front.herokuapp.com/mail">View on Sched-It</a>
                <br />
                <img src="https://sched-it-front.herokuapp.com/footer.svg" />
            `
        }, (error, result) => {
            if(error) return console.error(`[${new Date().toISOString()}] SMTP Error: ${error}`);
            return console.log(`[${new Date().toISOString()}] SMTP: Sent New Mail Notification: ${result.messageId}`);
        });

        return;
    } catch (ex) {
        console.error(ex);
        res.status(500).json({
            success: false,
            errors: [{
                msg: ex
            }]
        });
    }
};

module.exports.toggleRead = async (req, res) => {
    // Get the message ID
    const messageID = req.params.messageID;
    const userID = req.session.uid;

    try {
        // Get the message
        const message = await MailModel.findOne({ _id: messageID });

        // User must be the recepient of this message
        if(message.recepientID !== userID) {
            res.status(403).json({
                success: false,
                errors: [{
                    msg: "You are not the recepient of this message."
                }]
            });
            return;
        }

        // Toggle message read
        await MailModel.updateOne({ _id: messageID }, { isRead: !(message.isRead) });
        res.status(200).json({
            success: true,
            msg: "Read status updated."
        });
    } catch(ex) {
        res.status(500).json({
            success: false,
            errors: [{
                msg: ex
            }]
        });
    }
};

module.exports.totalMail = async (req, res) => {
    const userID = req.session.uid;

    try {
        const inboxCount = await MailModel.countDocuments({ recepientID: userID });
        const sentboxCount = await MailModel.countDocuments({ senderID: userID });

        res.status(200).json({
            success: true,
            mailCount: {
                inbox: inboxCount,
                sentbox: sentboxCount
            }
        })
    } catch(ex) {
        console.error(ex);
        res.status(500).json({
            success: false,
            errors: [{ msg: ex }]
        })
    }
};