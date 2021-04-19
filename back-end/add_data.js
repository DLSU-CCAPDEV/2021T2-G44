// Mongoose Models
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
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
                `[${new Date().toISOString()}] Populate Data Script Connected to MongoDB Server`
            );
    }
);
mongoose.Promise = global.Promise;

// Data
const users = [
    {
        email: "adriel_amoguis@dlsu.edu.ph",
        firstName: "Adriel Isaiah",
        lastName: "Amoguis",
        password: "password1",
        bio: "A student from Sir Arren's class.",
        avatar: "https://avatars.githubusercontent.com/u/60635460?v=4",
    },
    {
        email: "renzo_querol@dlsu.edu.ph",
        firstName: "Lorenzo",
        lastName: "Querol",
        password: "password1",
        bio: "A student from Sir Arren's class.",
        avatar: "https://avatars.githubusercontent.com/u/67884418?v=4",
    },
    {
        email: "gian_joseph_madrid@dlsu.edu.ph",
        firstName: "Gian Joseph",
        lastName: "Madrid",
        password: "password1",
        bio: "A student from Sir Arren's class.",
        avatar: "https://avatars.githubusercontent.com/u/73869919?v=4",
    },
    {
        email: "antonio_ipis@dlsu.edu.ph",
        firstName: "Antonio The",
        lastName: "Ipis",
        password: "password1",
        bio: "A student from Sir Arren's class.",
        avatar: null,
    },
    {
        email: "shoobs@dlsu.edu.ph",
        firstName: "Shoobs",
        lastName: "Querol",
        password: "password1",
        bio: "A student from Sir Arren's class.",
        avatar: null,
    },
];

// Script Start
console.log("Adding User Data");
users.forEach((user) => {
    // Hash password
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);
    const userData = new UserModel(user);
    userData.save().then(() => console.log("Added user"));
});

process.exit();