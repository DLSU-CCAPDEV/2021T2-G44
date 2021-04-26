const appRouter = require("express").Router();

// Routes
const AuthController = require('./controllers/AuthController');
const UserController = require("./controllers/UserController");
const MailController = require("./controllers/MailController");

// Set up Routes

// Test Route
appRouter.get("/test", (req, res) => res.status(200).send("Test Successful"));

// AUTH
appRouter.post("/auth", AuthController.authenticate);
appRouter.delete("/auth", AuthController.logout);
appRouter.get("/auth", AuthController.loggedIn);

// Require Logged-In Middleware & Permissions Injection
appRouter.use("/api", AuthController.validateSession);

// User Operations
appRouter.put("/register", UserController.validateUserData('createUser'), UserController.createUser);
appRouter.get("/api/user", UserController.getCurrentUser);
appRouter.get("/api/user/:id", UserController.getUser);
appRouter.post("api/user/:id", UserController.updateUser);
appRouter.post("api/user/password/:id", UserController.changePassword);
appRouter.delete("/api/user/:id", UserController.deleteUser);

// Mail Operations
appRouter.get("/api/mail/inbox", MailController.getInbox);
appRouter.get("/api/mail/sentbox", MailController.getSentBox);
appRouter.get("/api/mail/:mailID", MailController.getMailByID);
appRouter.post("/api/mail/send/:recepientEmail", MailController.validateMailData("send"), MailController.sendMail);

module.exports = appRouter;
