const { Aggregate } = require('mongoose');
const EventModel = require('../models/Event');
const UserModel = require('../models/User');
const AppointmentModel = require('../models/Appointment');
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
    const eventID = req.query.eid;

    // Find event by title
    if (eventTitle) {
        try {
            // Mongoose Query
            const eData = await EventModel.aggregate([
                {
                    $project: {
                        'title': 1,
                        '_id': 1,
                        'startDate': 1,
                        'endDate': 1,
                        'startTime': 1,
                        'endTime': 1,
                        'allDay': 1,
                        'isPrivate': 1,
                    },
                },
                {
                    $match: {
                        'title': { $regex: '.*' + eventTitle + '.*', $options: 'i' },
                        'isPrivate': { '$eq': false },
                    },
                },
            ]);

            // const processedComments = await Promise.all(
            //     eData.comments.map(async (comment) => {
            //         comment.name = await UserModel.findOne({ _id: comment.author }, ['firstName', 'lastName']);
            //         return comment;
            //     })
            // );

            // eData.comments = processedComments;

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
            const eData = await EventModel.findOne({ _id: eventID }).lean();
            const processedComments = await Promise.all(
                eData.comments.map(async (comment) => {
                    comment.user = await UserModel.findOne({ _id: comment.author }, ['firstName', 'lastName', 'avatar']);
                    return comment;
                })
            );

            eData.comments = processedComments;

            // Get participant count
            const participatingCount = await AppointmentModel.aggregate([
                {
                    $project: {
                        eventID: 1,
                        invitation: 1,
                        participantID: 1
                    }
                },
                { 
                    $match: {
                        $and: [
                            {
                                eventID: { $eq: String(eData._id) },
                            },
                            {
                                invitation: { $eq: '' },
                            },
                            {
                                participantID: { $ne: '' },
                            }
                        ],
                    }
                },
                {
                    $count: "participating"
                }
            ]);
    
            if(participatingCount.length > 0)
                eData.participating = participatingCount[0].participating;
            else
                eData.participating = 0;

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
    const eventID = req.body._id;
    const eventData = req.body;

    // Find the event and update document
    try {
        const eData = await EventModel.updateOne({ _id: eventID }, eventData);
        res.status(200).json({
            success: true,
            eventData: eventData,
        });
        return;
    } catch (err) {
        console.error(`[${new Date().toISOString()}] MongoDB Exception: ${err}`);
        return res.status(500).json({
            success: false,
            errors: [{ msg: err }],
        });
    }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
module.exports.addComment = async (req, res) => {
    const eventID = req.body.eventID;
    const eventData = req.body;

    // Find the event and update document
    try {
        const eData = await EventModel.updateOne({ _id: eventID }, { '$push': { comments: eventData.comments } });
        res.status(200).json({
            success: true,
            eventData: eData,
        });
        return;
    } catch (err) {
        console.error(`[${new Date().toISOString()}] MongoDB Exception: ${err}`);
        return res.status(500).json({
            success: false,
            errors: [{ msg: err }],
        });
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

module.exports.countPublicEvents = async (req, res) => {
    try {
        const publicEventTotal = await EventModel.countDocuments({ isPrivate: false });
        res.status(200).json({
            success: true,
            totalPublicEvents: publicEventTotal,
        });
    } catch (err) {
        console.error(`[${new Date().toISOString()}] MongoDB Exception: ${err}`);
        res.status(500).json({
            success: false,
            errors: [{ msg: err }],
        });
        return;
    }
};

module.exports.getPublicEvents = async (req, res) => {
    const start = Number(req.query.start) || 0;
    const limit = Number(req.query.limit) || 7;
    const eventTitle = req.query.title || '';
    // console.log(eventTitle);

    try {
        // Mongoose Query
        const events = await EventModel.aggregate([
            {
                $project: {
                    'title': 1,
                    '_id': 1,
                    'startDate': 1,
                    'endDate': 1,
                    'startTime': 1,
                    'endTime': 1,
                    'allDay': 1,
                    'isPrivate': 1,
                    'numParticipants': 1
                },
            },
            {
                $match: {
                    'title': { $regex: '.*' + eventTitle + '.*', $options: 'i' },
                    'isPrivate': { '$eq': false },
                    'endDate': { '$gte': new Date() },
                },
            },
            {
                $sort: {
                    startDate: 1,
                },
            },
            { $skip: start },
            { $limit: limit },
        ]);

         const processedEvents = await Promise.all(events.map(async event => {
            const participatingCount = await AppointmentModel.aggregate([
                {
                    $project: {
                        eventID: 1,
                        invitation: 1,
                        participantID: 1
                    }
                },
                { 
                    $match: {
                        $and: [
                            {
                                eventID: { $eq: String(event._id) },
                            },
                            {
                                invitation: { $eq: '' },
                            },
                            {
                                participantID: { $ne: '' },
                            }
                        ],
                    }
                },
                {
                    $count: "participating"
                }
            ]);

            if(participatingCount.length > 0)
                event.participating = participatingCount[0].participating;
            else
                event.participating = 0;
            return event;

         }));

        res.status(200).json({
            success: true,
            events: processedEvents,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            errors: [
                {
                    msg: err,
                },
            ],
        });
    }
};

module.exports.getUserEvents= async (req, res) => {
    const uid = req.session.uid;

    try {
        const appointments = await AppointmentModel.find({ participantID: uid }).lean();

        const eventIDs = [];
        const events = [];
        await Promise.all(appointments.map(async ap => {
            const event = await EventModel.findOne({ _id: ap.eventID }).lean();
            if(eventIDs.indexOf(String(event._id)) === -1) {
                eventIDs.push(String(event._id));
                events.push(event);
            }
        }));

        res.status(200).json({
            success: true,
            events: events,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            errors: [
                {
                    msg: err,
                },
            ],
        });
    }
}

module.exports.countUserEvents = async (req, res) => {
    try {
        const totalUserEvents = await EventModel.countDocuments({ hostID: req.session.uid });
        res.status(200).json({
            success: true,
            totalUserEvents: totalUserEvents,
        });
    } catch (err) {
        console.error(`[${new Date().toISOString()}] MongoDB Exception: ${err}`);
        res.status(500).json({
            success: false,
            errors: [{ msg: err }],
        });
        return;
    }
}

module.exports.getUserOwnedEvents = async (req, res) => {
    const uid = req.session.uid;

    try {
        const events = await EventModel.find({ hostID: uid })
            .sort({startDate: 1})
            .lean();

        res.status(200).json({
            success: true,
            events: events,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            errors: [
                {
                    msg: err,
                },
            ],
        });
    }
}