const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    avatar: String,
    bio: String,
    joinDate: Date,
});

module.exports = mongoose.model("User", UserSchema);
