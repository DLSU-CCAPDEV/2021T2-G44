const express = require("express");
const path = require("path");

// Instantiate Express
const app = express();

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
