const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    author: String,
    content: String,
});

const EventSchema = new mongoose.Schema({
    hostID: String,
    title: String,
    allDay: Boolean,
    startDate: Date,
    endDate: Date,
    startTime: Date,
    endTime: Date,
    isPrivate: Boolean,
    numParticipants: Number,
    timeLimit: Number,
    description: String,
    comments: [commentSchema],
});

module.exports = mongoose.model('Event', EventSchema);
