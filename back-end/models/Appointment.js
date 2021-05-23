const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  hostID: String,
  participantID: String,
  eventID: String,
  startTime: Date,
  endTime: Date,
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
