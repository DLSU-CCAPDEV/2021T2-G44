const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const UserModel = require("../models/User");

/**
 * This controller method creates a user based on the request body.
 * Data validation is done here.
 * @param {*} req
 * @param {*} res
 */
module.exports.createUser = async (req, res) => {
    const validationErrors = validationResult(req);
    const userData = req.body;

    // Return invalid user data if invalid
    if (!validationErrors.isEmpty()) {
        res.status(422).json({ errors: validationErrors.array() });
        return;
    }

    // Check if the email already exists
    const exists = await UserModel.findOne({ email: userData.email });
    if (exists) {
        res.status(400).send("A user with that email already exists.");
        return;
    }

    // Encrypt Password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(userData.password, salt);
    userData.password = passwordHash;

    // Update user data
    const user = new UserModel(userData);
    user.save()
        .then((uData) => {
            uData.password = undefined;
            res.status(201).json(uData);
        })
        .catch((err) => {
            console.error(`[${new Date().toISOString()}] MongoDB Exception: ${err}`);
            res.status(500).send(err);
        });
};

/**
 * This controller method returns the data of the current user logged in.
 * @param {*} req
 * @param {*} res
 */
module.exports.getCurrentUser = async (req, res) => {
    const userID = req.session.uid;

    // Find the user
    const userData = await UserModel.findOne({ _id: userID });

    if (!userData) {
        res.status(404).send("User data not found.");
    } else {
        // Remove password
        userData.password = undefined;
        res.status(200).json(userData);
    }
};

/**
 * This controller method returns the data of a specified user.
 * @param {*} req
 * @param {*} res
 */
module.exports.getUser = async (req, res) => {
    const userID = req.params.id;

    // Find the user
    const userData = await UserModel.findOne({ _id: userID });

    if (!userData) {
        res.status(404).send("User data not found.");
    } else {
        // Remove password
        userData.password = undefined;
        res.status(200).json(userData);
    }
};

/**
 * This controller method updates the 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
module.exports.updateUser = async (req, res) => {
    const userID = req.params.id;
    const userData = req.body;

    // Return invalid user data if invalid
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        res.status(422).json({ errors: validationErrors.array() });
        return;
    }

    // Remove any password updates
    userData.password = undefined;
    delete userData.password;

    // Update user data
    UserModel.updateOne({ _id: userID }, userData)
        .then((uData) => {
            uData.password = undefined;
            res.status(200).json(uData);
        })
        .catch((err) => {
            console.error(`[${new Date().toISOString()}] MongoDB Exception: ${err}`);
            res.status(500).send(err);
        });
};

module.exports.changePassword = async (req, res) => {
    // Return invalid user data if invalid
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        res.status(422).json({ errors: validationErrors.array() });
        return;
    }

    // Initialize
    const userID = req.session.uid;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    try {
        // Check if the old password is correct
        const userData = await UserModel.findOne({ _id: userID });
        const passwordValidation = await bcrypt.compare(oldPassword, userData.password);

        if(!passwordValidation) {
            res.status(401).send("The old password provided is invalid.");
            return;
        }

        // Change password
        const salt = bcrypt.genSaltSync(10);
        const newPasswordHash = bcrypt.hashSync(newPassword, salt);

        await UserModel.updateOne({ _id: userID }, { password: newPasswordHash });
        res.status(200).send("Password updated.");
    } catch(ex) {
        console.error(ex);
        res.status(500).send(ex);
    }
};

module.exports.deleteUser = async (req, res) => {
    // Return invalid user data if invalid
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        res.status(422).json({ errors: validationErrors.array() });
        return;
    }

    // Initialize
    const userID = req.session.uid;
    const password = req.body.password;

    // Validate password
    try {
        // Check if the old password is correct
        const userData = await UserModel.findOne({ _id: userID });
        const passwordValidation = await bcrypt.compare(password, userData.password);

        if(!passwordValidation) {
            res.status(401).send("Invalid password.");
            return;
        }

        // Proceed with the account deletion
        await UserModel.deleteOne({ _id: userID });
        res.status(200).send("Account deleted.");

    } catch(ex) {
        console.error(ex);
        res.status(500).send(ex);
    }
};

/**
 * This method contains the validation options to be used by express-validator.
 * @param {*} method
 * @returns
 */
module.exports.validateUserData = (method) => {
    const passwordValidationOptions = {
        minLength: 8,
        minSymbols: 1,
        minNumbers: 1,
        minLowercase: 2,
        minUppercase: 1,
    };
    switch (method) {
        case "createUser": {
            return [
                body("email", "Missing or Invalid Email Address.").exists().isEmail(),
                body("firstName", "Please provide a first name.").exists(),
                body("lastName", "Please provide a last name.").exists(),
                body("password", "Password is too weak.")
                    .exists()
                    .isStrongPassword(passwordValidationOptions),
                body("bio").optional().isString(),
                body("avatar").optional().isURL(),
            ];
        }
        case "updateUser": {
            return [
                body("email", "Missing or Invalid Email Address.").exists().isEmail(),
                body("firstName", "Please provide a first name.").exists(),
                body("lastName", "Please provide a last name.").exists(),
                body("bio").optional().isString(),
                body("avatar").optional().isURL(),
            ];
        }
        case "changePassword": {
            return [
                body("oldPassword", "Old password is invalid.").exists(),
                body("newPassword", "Password is too weak.")
                    .exists()
                    .isStrongPassword(passwordValidationOptions),
            ];
        }
        case "deleteAccount": {
            return [
                body("password", "Password is invalid.").exists()
            ];
        }
    }
};
