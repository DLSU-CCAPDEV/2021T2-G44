const MailModel = require('../models/Mail');
const UserModel = require('../models/User');

const { sendEmail } = require('./SmtpController');

/**
 * This controller method returns the logged in user's inbox based on optional start and end bounds.
 * @param {*} req
 * @param {*} res
 */
module.exports.getInbox = async (req, res) => {
    const userID = req.session.uid;
    const start = Number(req.query.start) || 0;
    const limit = Number(req.query.limit) || 10;

    try {
        const mail = await MailModel.find({ recepientID: userID }).skip(start).limit(limit);
        mail.sort((x, y) => {
            const xDate = new Date(x.sendTime);
            const yDate = new Date(y.sendTime);
            if (xDate === yDate) return 0;
            if (xDate > yDate) return -1;
            if (xDate < yDate) return 1;
        });
        res.status(200).json({
            success: true,
            mail: mail,
        });
    } catch (ex) {
        console.error(ex);
        res.status(500).json({
            success: false,
            errors: [
                {
                    msg: ex,
                },
            ],
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
    const limit = req.params.limit || 10;

    try {
        const mail = await MailModel.find({ senderID: userID }).skip(start).limit(limit);
        mail.sort((x, y) => {
            const xDate = new Date(x.sendTime);
            const yDate = new Date(y.sendTime);
            if (xDate === yDate) return 0;
            if (xDate > yDate) return -1;
            if (xDate < yDate) return 1;
        });
        res.status(200).json({
            success: true,
            mail: mail,
        });
    } catch (ex) {
        console.error(ex);
        res.status(500).json({
            success: false,
            errors: [
                {
                    msg: ex,
                },
            ],
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
                errors: [
                    {
                        msg: 'You are you not the sender or recepient of this mail.',
                    },
                ],
            });
            return;
        }

        // Check if null
        if (!mail) {
            res.status(400).json({
                success: false,
                errors: [
                    {
                        msg: `Mail with ID <${mailID}> not found.`,
                    },
                ],
            });
            return;
        }

        res.status(200).json({
            success: true,
            mail: mail,
        });
    } catch (ex) {
        console.error(ex);
        res.status(500).json({
            success: false,
            errors: [
                {
                    msg: ex,
                },
            ],
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
                errors: [
                    {
                        msg: 'Cannot find recepient with that email address.',
                    },
                ],
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
            mail: mailData,
        });

        // Send email notification to the recepient
        const userData = await UserModel.findOne({ _id: userID });

        sendEmail({
            recipientEmail: recepientData.email,
            subject: mailData.subject,
            content: mailData.content,
            attachments: mailData.attachments,

            sender: {
                firstName: userData.firstName,
                lastName: userData.lastName,
            },
        });

        return;
    } catch (ex) {
        console.error(ex);
        res.status(500).json({
            success: false,
            errors: [
                {
                    msg: ex,
                },
            ],
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
        if (message.recepientID !== userID) {
            res.status(403).json({
                success: false,
                errors: [
                    {
                        msg: 'You are not the recepient of this message.',
                    },
                ],
            });
            return;
        }

        // Toggle message read
        await MailModel.updateOne({ _id: messageID }, { isRead: !message.isRead });
        res.status(200).json({
            success: true,
            msg: 'Read status updated.',
        });
    } catch (ex) {
        res.status(500).json({
            success: false,
            errors: [
                {
                    msg: ex,
                },
            ],
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
                sentbox: sentboxCount,
            },
        });
    } catch (ex) {
        console.error(ex);
        res.status(500).json({
            success: false,
            errors: [{ msg: ex }],
        });
    }
};
