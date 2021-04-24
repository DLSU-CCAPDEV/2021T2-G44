/**
 * AMOGUIS, MADRID, QUEROL
 * CCAPDEV S11
 */

// Dependencies
const express = require("express");
const cors = require("cors");
const router = require("./router.js");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
require("dotenv").config();

// Connect to the MongoDB Server
mongoose.connect(
    process.env.MONGO_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if (err) console.error(err);
        else console.log(`[${new Date().toISOString()}] Connected to MongoDB Server`);
    }
);
mongoose.Promise = global.Promise;

// Instantiate the application
const app = express();

// Set up base middleware

// Cross-Origin Resource Sharing
const corsOptions = {
    origin: true,
    methods: ['GET','POST','PUT','DELETE'],
    allowedHeaders: ['Content-Type','Content-Length'],
    credentials: true,
    optionsSuccessStatus: 200,
}
app.use(cors(corsOptions));

// // CORS  Pre-flight
app.options('*', cors(corsOptions));

// Cookie & JSON Parsers 
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session Authorization & Authentication
const sessionModel = {
    secret: process.env.SESSION_SECRET || "Oh dear, I forgot to change the secret key.",
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: Number(process.env.MAX_COOKIE_AGE) || 1e6,
    },
};
app.use(session(sessionModel));

// Logger
if(Number(process.env.ENABLE_LOGGER) !== 0) {
    app.use((req, res, next) => {
        console.log(
            `[${new Date().toISOString()}] ${req.method} request from uid <${req.session.uid}>: ${
                req.url
            }`
        );
        next();
    });
}

// Link to external router
app.use("/", router);

// Listen
const hostname = process.env.HOSTNAME || "localhost";
const PORT = process.env.PORT || 3000;
app.listen(PORT, hostname, () => {
    console.log(
        `[${new Date().toISOString()}] Sched-It Backend Server started at http://${hostname}:${PORT}`
    );
});
