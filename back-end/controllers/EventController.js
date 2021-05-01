const { body, validationResult } = require('express-validator');
const { Aggregate } = require('mongoose');
const EventModel = require('../models/Event');

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
module.exports.createEvent = async (req, res) => {
    const validationErrors = validationResult(req);
    const data = req.body;

    // Return invalid event data if invalid
    if (!validationErrors.isEmpty()) {
        res.status(422).json({ errors: validationErrors.array() });
        return;
    }

    // Insert event data
    const event = new EventModel(data);
    try {
        await event.save();
        res.status(201).json(data);
        return;
    } catch (err) {
        console.error(`[${new Date().toISOString()}] MongoDB Exception: ${err}`);
        res.status(500).send(err);
    }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
module.exports.getEvent = async (req, res) => {
    const validationErrors = validationResult(req);
    const eventTitle = req.query.title;
    const eventID = req.query.eid;

    // Return invalid event data if invalid
    if (!validationErrors.isEmpty()) {
        res.status(400).json({ errors: validationErrors.array() });
        return;
    }

    // Find event by title
    if (eventTitle) {
        try {
            const eData = await EventModel.findOne({ title: eventTitle });
            res.status(200).json(eData);
            return;
        } catch (err) {
            console.error(`[${new Date().toISOString()}] MongoDB Exception: ${err}`);
            res.status(404).send(err);
        }
    }

    // Find event by event ID
    if (eventID) {
        try {
            const eData = await EventModel.findOne({ _id: eventID });
            res.status(200).json(eData);
            return;
        } catch (err) {
            console.error(`[${new Date().toISOString()}] MongoDB Exception: ${err}`);
            res.status(404).send(err);
        }
    }

    // Return all events if no eventID or evenTitle was specified
    if (eventTitle === undefined && eventID === undefined) {
        try {
            const eData = await EventModel.find({});
            res.status(200).json(eData);
            return;
        } catch (err) {
            console.error(`[${new Date().toISOString()}] MongoDB Exception: ${err}`);
            res.status(404).send(err);
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
    const validationErrors = validationResult(req);
    const eventID = req.params.id;
    const eventData = req.body;

    // Return invalid event data if invalid
    if (!validationErrors.isEmpty()) {
        res.status(400).json({ errors: validationErrors.array() });
        return;
    }

    // Find the event and update document
    try {
        const eData = await EventModel.updateOne({ _id: eventID }, eventData);
        res.status(200).json(eData);
        return;
    } catch (err) {
        console.error(`[${new Date().toISOString()}] MongoDB Exception: ${err}`);
        res.status(500).send(err);
    }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
module.exports.deleteEvent = async (req, res) => {
    const validationErrors = validationResult(req);
    const eventID = req.params.id;

    // Return invalid event data if invalid
    if (!validationErrors.isEmpty()) {
        res.status(400).json({ errors: validationErrors.array() });
        return;
    }

    // Find event document and delete
    try {
        const eData = await EventModel.deleteOne({ _id: eventID });
        res.status(200).json(eData);
        return;
    } catch (err) {
        console.error(`[${new Date().toISOString()}] MongoDB Exception: ${err}`);
        res.status(500).send(err);
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
    }
};
