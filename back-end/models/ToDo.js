const mongoose = require("mongoose");

const ToDoSchema = new mongoose.Schema({
    userID: String,
    title: String,
    completed: Boolean
});

module.exports = mongoose.model("ToDo", ToDoSchema);
