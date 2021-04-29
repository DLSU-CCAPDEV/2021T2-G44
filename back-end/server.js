/**
 * AMOGUIS, MADRID, QUEROL
 * CCAPDEV S11
 */

// Dependencies
const express = require("express");
const compression = require('compression');
const cors = require("cors");
const router = require("./router.js");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mongoose = require("mongoose");
const methodOverride = require('method-override');
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
app.use(compression());

// Set up base middleware

// Cross-Origin Resource Sharing
app.set("trust proxy", 1);
const corsOptions = {
    origin: JSON.parse(process.env.CORS_WHITELIST || '["*"]'),
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
        "Content-Type",
        "Content-Length",
        "Content-Language",
        "Accept",
        "Accept-Language",
        "Accept-Encoding",
        "Referer",
        "User-Agent",
    ],
    credentials: true,
    optionsSuccessStatus: 200,
};

// CORS  Pre-flight
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// Session Authorization & Authentication
app.use(cookieParser());
const sessionModel = {
    secret: process.env.SESSION_SECRET || "Oh dear, I forgot to change the secret key.",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? "none" : "lax",
        httpOnly: true,
        maxAge: Number(process.env.MAX_COOKIE_AGE) || 1e6,
    },
};
app.use(session(sessionModel));

// JSON Parsers 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));

// Logger
if (Number(process.env.ENABLE_LOGGER) !== 0 && process.env.ENABLE_LOGGER) {
    app.use((req, res, next) => {
        console.log(
            `[${new Date().toISOString()}] ${req.method} request from uid <${req.session.uid}> (${
                req.headers.origin
            }) SID: <${req.session.id}>: ${req.url}`
        );
        // console.log(req.headers);
        next();
    });
}

// Link to external router
app.use("/", router);

// Listen
// const hostname = process.env.HOSTNAME || "0.0.0.0";
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`[${new Date().toISOString()}] Sched-It Backend Server started on port ${PORT}`);
    console.log("CORS-Whitelist:");
    console.log(JSON.parse(process.env.CORS_WHITELIST || '["*"]'));
});
