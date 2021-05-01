const { Aggregate } = require('mongoose');
const EventModel = require('../models/Event');

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
module.exports.createEvent = async (req, res) => {
    const data = req.body;

    // Insert event data
    const event = new EventModel(data);
    try {
        await event.save();
        res.status(201).json({
            success: true,
            eventData: event,
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
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
module.exports.getEvent = async (req, res) => {
    const eventTitle = req.query.title;
    const eventID = req.query.id;

    // Find event by title
    if (eventTitle) {
        try {
            const eData = await EventModel.findOne({ title: eventTitle });
            res.status(200).json({
                success: true,
                eventData: eData,
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

    // Find event by event ID
    if (eventID) {
        try {
            const eData = await EventModel.findOne({ _id: eventID });
            res.status(200).json({
                success: true,
                eventData: eData,
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

    // Return all events if no eventID or evenTitle was specified
    if (eventTitle === undefined && eventID === undefined) {
        try {
            const eData = await EventModel.find({});
            res.status(200).json({
                success: true,
                eventData: eData,
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
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
module.exports.updateEvent = async (req, res) => {
    const eventID = req.params.id;
    const eventData = req.body;

    // Find the event and update document
    try {
        const eData = await EventModel.updateOne({ _id: eventID }, eventData);
        res.status(200).json({
            success: true,
            eventData: eData,
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
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
module.exports.deleteEvent = async (req, res) => {
    const eventID = req.params.id;

    // Find event document and delete
    try {
        const eData = await EventModel.deleteOne({ _id: eventID });
        res.status(200).json({
            success: true,
            eventData: eData,
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
