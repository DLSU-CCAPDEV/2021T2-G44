const bcrypt = require('bcrypt');
const UserModel = require('../models/User');

/**
 * This controller method creates a user based on the request body.
 * Data validation is done here.
 * @param {*} req
 * @param {*} res
 */
module.exports.createUser = async (req, res) => {
    const userData = req.body;

    // Check if the email already exists
    const exists = await UserModel.findOne({ email: userData.email });
    if (exists) {
        res.status(400).json({
            success: false,
            errors: [
                {
                    msg: 'A user with that email already exists.',
                },
            ],
        });
        return;
    }

    // Encrypt Password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(userData.password, salt);
    userData.password = passwordHash;

    // Case the names properly
    userData.firstName = titleCase(userData.firstName);
    userData.lastName = titleCase(userData.lastName);

    // Save user data
    const user = new UserModel(userData);
    user.save()
        .then((uData) => {
            uData.password = undefined;
            res.status(201).json({
                success: true,
                userData: userData,
            });
        })
        .catch((err) => {
            console.error(`[${new Date().toISOString()}] MongoDB Exception: ${err}`);
            res.status(500).json({
                success: false,
                errors: [
                    {
                        msg: err,
                    },
                ],
            });
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
        res.status(400).json({
            success: false,
            errors: [
                {
                    msg: 'User not found.',
                },
            ],
        });
    } else {
        // Remove password
        userData.password = undefined;
        res.status(200).json({
            success: true,
            userData: userData,
        });
    }
};

/**
 * This controller method returns the data of a specified user.
 * @param {*} req
 * @param {*} res
 */
module.exports.getUser = async (req, res) => {
    const userID = req.params.id;

    try {
        // Find the user
        const userData = await UserModel.findOne({ _id: userID });

        if (!userData) {
            res.status(404).json({
                success: false,
                errors: [
                    {
                        msg: 'User not found.',
                    },
                ],
            });
        } else {
            // Remove password
            userData.password = undefined;
            res.status(200).json({
                success: true,
                userData: userData,
            });
        }
    } catch (ex) {
        console.error(ex);
        res.status(500).json({
            success: false,
            errors: [{ msg: ex }],
        });
    }
};

/**
 * This controller method updates the
 * @param {*} req
 * @param {*} res
 * @returns
 */
module.exports.updateUser = async (req, res) => {
    const userID = req.session.uid;
    const userData = req.body;

    // Remove any password updates
    userData.password = undefined;
    delete userData.password;

    // Case the names properly (if there are)
    if (userData.firstName) userData.firstName = titleCase(userData.firstName);
    if (userData.lastName) userData.lastName = titleCase(userData.lastName);

    // Update user data
    UserModel.updateOne({ _id: userID }, userData)
        .then((uData) => {
            userData.password = undefined;
            res.status(200).json({
                success: true,
                userData: userData,
            });
        })
        .catch((err) => {
            console.error(`[${new Date().toISOString()}] MongoDB Exception: ${err}`);
            res.status(500).json({
                success: false,
                errors: [
                    {
                        msg: err,
                    },
                ],
            });
        });
};

module.exports.changePassword = async (req, res) => {
    // Initialize
    const userID = req.session.uid;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    try {
        // Check if the old password is correct
        const userData = await UserModel.findOne({ _id: userID });
        const passwordValidation = await bcrypt.compare(oldPassword, userData.password);

        if (!passwordValidation) {
            res.status(401).json({
                success: false,
                errors: [
                    {
                        msg: 'The old password provided is invalid.',
                    },
                ],
            });
            return;
        }

        // Change password
        const salt = bcrypt.genSaltSync(10);
        const newPasswordHash = bcrypt.hashSync(newPassword, salt);

        await UserModel.updateOne({ _id: userID }, { password: newPasswordHash });
        res.status(200).json({
            success: true,
        });
    } catch (ex) {
        console.error(ex);
        res.status(500).json({
            success: false,
            errors: [{ msg: ex }],
        });
    }
};

module.exports.deleteUser = async (req, res) => {
    // Initialize
    const userID = req.session.uid;
    const password = req.body.password;

    // Validate password
    try {
        // Check if the old password is correct
        const userData = await UserModel.findOne({ _id: userID });
        const passwordValidation = await bcrypt.compare(password, userData.password);

        if (!passwordValidation) {
            res.status(401).json({
                success: false,
                errors: [
                    {
                        msg: 'The password provided is invalid.',
                    },
                ],
            });
            return;
        }

        // Proceed with the account deletion
        await UserModel.deleteOne({ _id: userID });
        req.session.destroy();
        res.status(200).json({ success: true });
    } catch (ex) {
        console.error(ex);
        res.status(500).json({
            success: false,
            errors: [{ msg: ex }],
        });
    }
};

/**
 * This controller method searches a user by name.
 * @param {*} req
 * @param {*} res
 * @returns
 */
module.exports.searchUserByName = async (req, res) => {
    // Get the query parameters
    const name = req.params.name;

    if(name === null || name === '' || typeof name === 'undefined') {
        res.status(200).json({
            success: true,
            results: [],
        });
        return;
    }

    try {
        var result = [];
        // Check for email
        if(name.indexOf('@') != -1) {
            const emailresult = await UserModel.findOne({ email: name }, { 'name': { $concat: ['$firstName', ' ', '$lastName'] } });
            if(emailresult) result.push(emailresult);
        } else {
            // Mongoose Query
            result = await UserModel.aggregate([
                { $project: { 'name': { $concat: ['$firstName', ' ', '$lastName'] } } },
                { $match: { 'name': { $regex: '.*' + name + '.*', $options: 'i' } } },
            ]);
        }

        if (!result) {
            res.status(200).json({
                success: true,
                results: [],
            });
        }

        res.status(200).json({
            success: true,
            results: result,
        });
    } catch (ex) {
        console.error(ex);
        res.status(500).json({
            success: false,
            errors: [{ msg: ex }],
        });
    }
};

// Helper Methods

/**
 * This function properly cases a string as a title.
 * The first letter of each word will be capitalized.
 * @param {*} string
 */
const titleCase = (string) => {
    const tokens = string.toLowerCase().split(' ');
    for (let i = 0; i < tokens.length; i++) {
        tokens[i] = tokens[i].charAt(0).toUpperCase() + tokens[i].substring(1);
    }
    return tokens.join(' ');
};
