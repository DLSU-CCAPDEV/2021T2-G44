const { body, validationResult } = require('express-validator');
const AppointmentModel = require('../models/Appointment');

/**
 * Creates a new appointment.
 * @param {*} req
 * @param {*} res
 * @returns
 */
module.exports.createAppointment = async (req, res) => {
    const validationErrors = validationResult(req);
    const appointmentData = req.body;

    // Return invalid appointment data if invalid
    if (!validationErrors.isEmpty()) {
        res.status(422).json({ errors: validationErrors.array() });
        return;
    }

    // Insert appointment data
    const appointment = new AppointmentModel(appointmentData);
    try {
        await appointment.save();
        res.status(201).json(appointment);
        return;
    } catch (err) {
        console.error(`[${new Date().toISOString()}] MongoDB Exception: ${err}`);
        res.status(500).send(err);
    }
};

/**
 * Gets appointment data from current user.
 * An appointment ID may be specified to find one appointment.
 * User ID is a required parameter.
 * @param {*} req
 * @param {*} res
 */
module.exports.getAppointment = async (req, res) => {
    const validationErrors = validationResult(req);
    const userID = req.params.id;
    const appointmentID = req.query.aid;

    // Return invalid get request data if invalid
    if (!validationErrors.isEmpty()) {
        res.status(422).json({ errors: validationErrors.array() });
        return;
    }

    // Find current user's specific appointment
    if (userID && appointmentID) {
        try {
            const aData = await AppointmentModel.find({ participantID: userID });
            res.status(200).json(aData);
            return;
        } catch (err) {
            console.error(`[${new Date().toISOString()}] MongoDB Exception: ${err}`);
            res.status(404).send(err);
        }
    }

    // Find all current user's appointments
    if (userID && !appointmentID) {
        try {
            const aData = await AppointmentModel.find({ participantID: userID });
            res.status(200).json(aData);
            return;
        } catch (err) {
            console.error(`[${new Date().toISOString()}] MongoDB Exception: ${err}`);
            res.status(404).send(err);
        }
    }

    // If userID is undefined
    return res.status(400).send('UserID is undefined.');
};

/**
 * Updates an appointment regarding its participantID or start/end time.
 * Appointment ID is a required parameter.
 * @param {*} req
 * @param {*} res
 * @returns
 */
module.exports.updateAppointment = async (req, res) => {
    const validationErrors = validationResult(req);
    const appointmentID = req.params.id;
    const appointmentData = req.body;

    // Return invalid appointment data if invalid
    if (!validationErrors.isEmpty()) {
        res.status(422).json({ errors: validationErrors.array() });
        return;
    }

    // Update appointment data
    if (appointmentID) {
        try {
            const aData = await AppointmentModel.updateOne({ _id: appointmentID }, appointmentData);
            res.status(200).json(aData);
            return;
        } catch (err) {
            console.error(`[${new Date().toISOString()}] MongoDB Exception: ${err}`);
            res.status(500).send(err);
        }
    }

    // If appointmentID is undefined
    return res.status(400).send('appointmentID is undefined.');
};

/**
 * Delete an appointment from the current user.
 * If an appointment ID is specified, it will only delete that appointment.
 * If an appointment ID is not specified, it will delete all current user's appointments.
 * User ID is a required parameter.
 * @param {*} req
 * @param {*} res
 * @returns
 */
module.exports.deleteAppointment = async (req, res) => {
    const userID = req.params.id;
    const appointmentID = req.query.aid;

    // Return invalid appointment data if invalid
    if (!validationErrors.isEmpty()) {
        res.status(422).json({ errors: validationErrors.array() });
        return;
    }

    // delete a current users's specified appointment
    if (userID && appointmentID) {
        try {
            const aData = await AppointmentModel.deleteOne({ _id: appointmentID });
            res.status(200).json(aData);
            return;
        } catch (err) {
            console.error(`[${new Date().toISOString()}] MongoDB Exception: ${err}`);
            res.status(500).send(err);
        }
    }

    // delete all current user's appointments
    if (userID && !appointmentID) {
        try {
            const aData = await AppointmentModel.deleteMany({ participantID: userID });
            res.status(200).json(aData);
            return;
        } catch (err) {
            console.error(`[${new Date().toISOString()}] MongoDB Exception: ${err}`);
            res.status(500).send(err);
        }
    }

    // If userID is undefined
    return res.status(400).send('UserID is undefined.');
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
