const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    participantID: String,
    eventID: String,
    startTime: Date,
    endTime: Date,
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
