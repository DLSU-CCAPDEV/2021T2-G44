// Mongoose Models
const mongoose = require("mongoose");
const UserModel = require("./models/User.js");
const MailModel = require("./models/Mail.js");

// Connect to the MongoDB Server
require("dotenv").config();
mongoose.connect(
    process.env.MONGO_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if (err) console.error(err);
        else
            console.log(
                `[${new Date().toISOString()}] Purge Data Script Connected to MongoDB Server`
            );
    }
);
mongoose.Promise = global.Promise;

// Script Start
console.log("Purging User Data");
UserModel.deleteMany({}).then(() => console.log("Purged all UserData"));


process.exit();