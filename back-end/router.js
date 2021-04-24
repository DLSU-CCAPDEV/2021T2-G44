const appRouter = require("express").Router();

// Routes
const AuthController = require('./controllers/AuthController');
const UserController = require("./controllers/UserController");

// Set up Routes

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

module.exports = appRouter;
