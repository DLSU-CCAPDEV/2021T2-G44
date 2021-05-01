const express = require("express");
const path = require("path");
require("dotenv").config();

// Instantiate Express
const app = express();

// Force requests to use https in production
app.set("trust proxy", 1);
app.use((req, res, next) => {
    if(String(process.env.NODE_ENV) === 'production' && !req.secure)
        return res.redirect("https://" + req.headers.host + req.url);
    next();
})

// Setup Middlewares to Point to Static Site
app.use(express.static(path.join(__dirname, "build")));
app.get("*", (req, res) => {
    res.sendFile("index.html", { root: path.join(__dirname, "build") });
});

// Start server
const PORT = process.env.PORT || 80;

app.listen(PORT, () => {
    console.log(`Express Server started on port ${PORT}.\nReactJS Application started.`);
});
