const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    hostID: String,
    title: String,
    allDay: Boolean,
    startDate: Date,
    endDate: Date,
    isPrivate: Boolean,
    numParticipants: Number,
    participantIDs: Array,
    appointmentIDs: Array,
    timeLimit: Number,
    description: String,
});

module.exports = mongoose.model('Event', EventSchema);
