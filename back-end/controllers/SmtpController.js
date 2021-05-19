const nodemailer = require('nodemailer');
require('dotenv').config();

// Prepare Mail Transporter Object
const mailTransporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: String(process.env.NODE_ENV) === 'production',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

module.exports.sendEmail = async (emailData) => {
    console.log(emailData);
    await mailTransporter.sendMail(
        {
            from: 'Sched-It Mailer <no-reply@sched-it-front.herokuapp.com>',
            to: emailData.recipientEmail,
            subject: `${emailData.sender.firstName} ${emailData.sender.lastName} has sent you a message on Sched-It`,
            html: `
                <div class="main" style="font-family: Arial; margin: 0; padding: 0">
                    <img
                        src="https://sched-it-back.herokuapp.com/static/email-top.png"
                        alt="logo"
                        title="logo"
                        style="display: block"
                        width="600px"
                        height="514px"
                    />
                    <div
                        class="emailBanner"
                        style="
                            background-color: #dcdbff;
                            min-height: 300px;
                            width: 600px;
                            margin: 2em 0 2em 0;
                            padding: 0;
                            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
                        "
                    >
                        <p class="standardFont" style="font-size: 14px; display: inline-block; color: black; margin: 1em 1em 0 1em">
                            <strong>From: </strong> ${emailData.recipientEmail}
                        </p>
                        <br />
                        <p class="standardFont" style="font-size: 14px; display: inline-block; color: black; margin: 1em 1em 0 1em">
                            <strong>Subject: </strong> ${emailData.subject}
                        </p>
                        <p class="standardFont" style="font-size: 14px; display: inline-block; color: black; margin: 1em 1em 0 1em">
                            ${emailData.content}
                        </p>
                        <p class="standardFont" style="font-size: 14px; display: inline-block; color: black; margin: 1em 1em 0 1em">
                            This message includes {${emailData.attachments.length}} attachments
                        </p>
                    </div>

                    <img
                        src="https://sched-it-back.herokuapp.com/static/email-bottom.png"
                        alt="logo"
                        title="logo"
                        style="display: block"
                        width="600px"
                        height="195px"
                    />
                </div>



            `,
        },
        (error, result) => {
            if (error) return console.error(`[${new Date().toISOString()}] SMTP Error: ${error}`);
            return console.log(`[${new Date().toISOString()}] SMTP: Sent New Mail Notification: ${result.messageId}`);
        }
    );
};
module.exports.mailTransporter = mailTransporter;
