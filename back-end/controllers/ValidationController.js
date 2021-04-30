const { body, param, validationResult } = require('express-validator');

module.exports.validateInputs = (req, res, next) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        res.status(422).json({ 
            success: false,
            errors: validationErrors.array() 
        });
        return;
    }
    next();
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
        case 'createUser': {
            return [
                body('email', 'Missing or Invalid Email Address.').exists().isEmail(),
                body('firstName', 'Please provide a first name.').exists(),
                body('lastName', 'Please provide a last name.').exists(),
                body('password', 'Password is too weak.').exists().isStrongPassword(passwordValidationOptions),
                body('bio').optional().isString(),
                body('avatar').optional().isURL(),
            ];
        }
        case 'searchUser': {
            return [
                param('name','Please enter query name.').exists().isString()
            ];
        }
        case 'updateUser': {
            return [
                body("email", "Missing or Invalid Email Address.").optional().isEmail(),
                body("firstName", "Please provide a first name.").optional().isString(),
                body("lastName", "Please provide a last name.").optional().isString(),
                body("bio").optional().isString(),
                body("avatar").optional().isURL(),
            ];
        }
        case 'changePassword': {
            return [
                body('oldPassword', 'Old password is invalid.').exists(),
                body('newPassword', 'Password is too weak.').exists().isStrongPassword(passwordValidationOptions),
            ];
        }
        case 'deleteAccount': {
            return [body('password', 'Password is invalid.').exists().isString()];
        }
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
                body("subject", "Missing subject.").exists().isString(),
                body("content", "Missing content.").exists().isString(),
                body("attachments", "Invalid attachments.").optional().isArray(),
            ];
        }
        case "read": {
            return [
                param("messageID", "Missing message ID.").exists().isString()
            ];
        }
    }
};
