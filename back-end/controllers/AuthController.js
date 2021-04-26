// Dependencies
const bcrypt = require("bcrypt");

// Import user model
const UserSchema = require("../models/User");

/**
 * This custom middleware checks to see if the user behind the session
 * is logged in via the req.session.uid custom attribute. If this attribute
 * is undefined, the user is not logged in. Otherwise, this is the user's uid.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
module.exports.validateSession = (req, res, next) => {
    // Check if there is a logged-in session
    if (req.session && req.session.uid) {
        next();
    } else res.status(401).send("You are not logged in.");
};

/**
 * This method authenticates the user and adds the uid to the session if log in successful.
 * Otherwise, it returns a 401 Unauthorized to the user.
 * @param {*} req
 * @param {*} res
 */
module.exports.authenticate = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (req.session.uid) {
        res.status(200).send("Already logged in.");
        return;
    }

    // Check for any null data
    if (!(email && password)) {
        res.status(401).send("Missing credentials");
        return;
    }

    // Get the user data
    const userData = await UserSchema.findOne({ email: email });

    if (!userData) {
        res.status(401).send("Invalid Credentials");
    }

    const validated = await bcrypt.compare(password, userData.password);

    if (validated) {
        req.session.uid = userData._id;
        res.status(200).send("Session Logged In");
    } else res.status(401).send("Invalid Password");
};

/**
 * This method destroys the session.
 * @param {*} req
 * @param {*} res
 */
module.exports.logout = async (req, res) => {
    if (req.session.uid) {
        // Delete session
        req.session.destroy();
        res.status(200).send("Logged Out");
    } else {
        res.status(401).send("You are not logged in.");
    }
};

/**
 * This method checks if the user is logged in.
 * @param {*} req
 * @param {*} res
 */
 module.exports.loggedIn = async (req, res) => {
    if (req.session.uid) {
        // Return OK
        res.status(200).json({ uid: req.session.uid });
    } else {
        res.status(401).send("You are not logged in.");
    }
};
