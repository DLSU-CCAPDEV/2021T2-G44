const AppointmentModel = require('../models/Appointment');

/**
 * Creates a new appointment.
 * @param {*} req
 * @param {*} res
 * @returns
 */
module.exports.createAppointment = async (req, res) => {
    const appointmentData = req.body;

    // Insert appointment data
    const appointment = new AppointmentModel(appointmentData);
    try {
        const saveStatus = await appointment.save();
        res.status(201).json({
            success: true,
            appointment: saveStatus,
        });
        return;
    } catch (err) {
        console.error(`[${new Date().toISOString()}] MongoDB Exception: ${err}`);
        res.status(500).json({
            success: false,
            errors: [{ msg: err }],
        });
        return;
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
    const userID = req.query.uid || '';
    const appointmentID = req.query.aid || '';
    const eventID = req.query.eid || '';
    const appointmentDate = req.query.date || '';

    // Find specific appointment via date
    if (appointmentDate && eventID) {
        try {
            const aData = await AppointmentModel.find({ eventID: eventID, startTime: appointmentDate });
            res.status(200).json({
                success: true,
                appointments: aData,
            });
            return;
        } catch (err) {
            console.error(`[${new Date().toISOString()}] MongoDB Exception: ${err}`);
            res.status(500).json({
                success: false,
                errors: [{ msg: err }],
            });
            return;
        }
    }

    // Find event appointments
    if (eventID) {
        try {
            const aData = await AppointmentModel.find({ eventID: eventID });
            res.status(200).json({
                success: true,
                appointments: aData,
            });
            return;
        } catch (err) {
            console.error(`[${new Date().toISOString()}] MongoDB Exception: ${err}`);
            res.status(500).json({
                success: false,
                errors: [{ msg: err }],
            });
            return;
        }
    }

    // Find current user's appointments
    if (userID) {
        try {
            const aData = await AppointmentModel.find({ participantID: userID });
            res.status(200).json({
                success: true,
                appointments: aData,
            });
            return;
        } catch (err) {
            console.error(`[${new Date().toISOString()}] MongoDB Exception: ${err}`);
            res.status(500).json({
                success: false,
                errors: [{ msg: err }],
            });
            return;
        }
    }

    // Find all current user's appointments
    if (userID && !appointmentID) {
        try {
            const aData = await AppointmentModel.find({ participantID: userID });
            res.status(200).json({
                success: true,
                appointments: aData,
            });
            return;
        } catch (err) {
            console.error(`[${new Date().toISOString()}] MongoDB Exception: ${err}`);
            res.status(500).json({
                success: false,
                errors: [{ msg: err }],
            });
            return;
        }
    }

    // If userID is undefined
    return res.status(400).json({
        success: false,
        errors: [{ msg: 'UserID is undefined.' }],
    });
};

/**
 * Updates an appointment regarding its participantID or start/end time.
 * Appointment ID is a required parameter.
 * @param {*} req
 * @param {*} res
 * @returns
 */
module.exports.updateAppointment = async (req, res) => {
    const appointmentID = req.query.aid;
    const appointmentData = req.body;

    // Update appointment data
    if (appointmentID) {
        try {
            const aData = await AppointmentModel.updateOne({ _id: appointmentID }, appointmentData);
            res.status(200).json({
                success: true,
                appointment: aData,
            });
            return;
        } catch (err) {
            console.error(`[${new Date().toISOString()}] MongoDB Exception: ${err}`);
            res.status(500).json({
                success: false,
                errors: [{ msg: err }],
            });
            return;
        }
    }

    // If appointmentID is undefined
    return res.status(400).json({
        success: false,
        errors: [{ msg: 'appointmentID is undefined.' }],
    });
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

    // delete a current users's specified appointment
    if (userID && appointmentID) {
        try {
            const aData = await AppointmentModel.deleteOne({ _id: appointmentID });
            res.status(200).json({ success: true, aData: aData });
            return;
        } catch (err) {
            console.error(`[${new Date().toISOString()}] MongoDB Exception: ${err}`);
            res.status(500).json({
                success: false,
                errors: [{ msg: err }],
            });
            return;
        }
    }

    // delete all current user's appointments
    if (userID && !appointmentID) {
        try {
            const aData = await AppointmentModel.deleteMany({ participantID: userID });
            res.status(200).json({ success: true, aData: aData });
            return;
        } catch (err) {
            console.error(`[${new Date().toISOString()}] MongoDB Exception: ${err}`);
            res.status(500).json({
                success: false,
                errors: [{ msg: err }],
            });
            return;
        }
    }

    // If userID is undefined
    return res.status(400).json({
        success: false,
        errors: [{ msg: 'UserID is undefined.' }],
    });
};
