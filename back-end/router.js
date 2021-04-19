const appRouter = require("express").Router();

// Routes
const AuthController = require('./controllers/AuthController');

// Set up Routes

// AUTH
appRouter.post("/auth", AuthController.authenticate);
appRouter.delete("/auth", AuthController.logout);

// Require Logged-In Middleware
appRouter.use("/api", AuthController.validateSession);

module.exports = appRouter;
