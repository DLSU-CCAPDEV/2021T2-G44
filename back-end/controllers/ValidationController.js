const { body, param, validationResult } = require('express-validator');

module.exports.validateInputs = (req, res, next) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        res.status(422).json({
            success: false,
            errors: validationErrors.array(),
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
                body(
                    'password',
                    'Password is too weak. Password must be at least 8 characters long, ' +
                        'contains at least one symbol, at least one number, at least two lowercase letters, and at least one uppercase letter.'
                )
                    .exists()
                    .isStrongPassword(passwordValidationOptions),
                body('bio').optional().isString(),
                body('avatar').optional().isURL(),
            ];
        }
        case 'searchUser': {
            return [param('name', 'Please enter query name.').exists().isString()];
        }
        case 'updateUser': {
            return [
                body('email', 'Missing or Invalid Email Address.').optional().isEmail(),
                body('firstName', 'Please provide a first name.').optional().isString(),
                body('lastName', 'Please provide a last name.').optional().isString(),
                body('bio').optional().isString(),
                body('avatar').optional().isURL(),
            ];
        }
        case 'changePassword': {
            return [
                body('oldPassword', 'Old password is invalid.').exists(),
                body(
                    'newPassword',
                    'Password is too weak. Password must be at least 8 characters long, ' +
                        'contains at least one symbol, at least one number, at least two lowercase letters, and at least one uppercase letter.'
                )
                    .exists()
                    .isStrongPassword(passwordValidationOptions),
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
        case 'send': {
            return [
                param('recepientEmail', 'Missing recepient email.').exists().isEmail(),
                body('subject', 'Missing subject.').exists().isString(),
                body('content', 'Missing content.').exists().isString(),
                body('attachments', 'Invalid attachments.').optional().isArray(),
            ];
        }
        case 'read': {
            return [param('messageID', 'Missing message ID.').exists().isString()];
        }
    }
};

/**
 *
 * @param {*} method
 * @returns
 */
module.exports.validateEventData = (method) => {
    switch (method) {
        case 'createEvent': {
            return [
                body('title', 'Please provide a title.').exists(),
                body('numParticipants', 'Please provide a valid number.')
                    .exists()
                    .isInt()
                    .custom((value) => {
                        return value > 0;
                    }),
                body('timeLimit', 'Please provide a valid number.')
                    .exists()
                    .isInt()
                    .custom((value) => {
                        return value >= 300 && value <= 28800;
                    }),
                body('endDate').custom((value, { req }) => {
                    if (new Date(value) <= new Date(req.body.startDate)) {
                        throw new Error('End Date must be after Start Date.');
                    }
                    return true;
                }),
                body('startDate', 'Start Date must be after the current date.').isAfter(new Date().toString()),
            ];
    }
        case 'updateEvent': {
            return [
                body('title', 'Please provide a title.').exists(),
                body('numParticipants', 'Please provide a valid number for number of participants!')
                    .exists()
                    .isInt()
                    .custom((value) => {
                        return value > 0;
                    }),
                body('timeLimit', 'Time limit must be between 5 minutes and 480 minutes!')
                    .exists()
                    .isInt()
                    .custom((value) => {
                        return value >= 5 && value <= 480;
                    }),
                body('endDate').custom((value, { req }) => {
                    if (new Date(value) <= new Date(req.body.startDate)) {
                        throw new Error('End Date must be after Start Date!');
                    }
                    return true;
                }),
                body('startDate', 'Start Date must be after the current date!').isAfter(new Date().toString()),
            ];
        }
        // case 'addComment': {
        //     return true;
        // }
    }
};

/**
 *
 * @param {*} method
 * @returns
 */
module.exports.validateAppointmentData = (method) => {
    switch (method) {
        case 'createAppointment': {
            return [
                body('endTime').custom((value, { req }) => {
                    if (new Date(value) <= new Date(req.body.startTime)) {
                        throw new Error('End Time must be after Start Time.');
                    }
                    return true;
                }),
            ];
        }
        case 'updateAppointment': {
            return [
                body('endTime').custom((value, { req }) => {
                    if (new Date(value) <= new Date(req.body.startTime)) {
                        throw new Error('End Time must be after Start Time.');
                    }
                    return true;
                }),
            ];
        }
    }
};
