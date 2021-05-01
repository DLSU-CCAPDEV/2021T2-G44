const mongoose = require("mongoose");

const ToDoSchema = new mongoose.Schema({
    userID: String,
    title: String,
    complete: Boolean
});

module.exports = mongoose.model("ToDo", ToDoSchema);
