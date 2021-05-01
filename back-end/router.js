const appRouter = require('express').Router();

// Routes
const AuthController = require('./controllers/AuthController');
const UserController = require('./controllers/UserController');
const EventController = require('./controllers/EventController');
const AppointmentController = require('./controllers/AppointmentController');

// Set up Routes

// Test Route
appRouter.get('/test', (req, res) => res.status(200).send('Test Successful'));

// AUTH
appRouter.post('/auth', AuthController.authenticate);
appRouter.delete('/auth', AuthController.logout);
appRouter.get('/auth', AuthController.loggedIn);

// Require Logged-In Middleware & Permissions Injection
appRouter.use('/api', AuthController.validateSession);

// User Operations
appRouter.put('/register', UserController.validateUserData('createUser'), UserController.createUser);
appRouter.get('/api/user', UserController.getCurrentUser);
appRouter.get('/api/user/:id', UserController.getUser);
appRouter.post('api/user/:id', UserController.updateUser);
appRouter.post('api/user/password/:id', UserController.changePassword);
appRouter.delete('/api/user/:id', UserController.deleteUser);

// Event Operations
appRouter.put('/api/event', EventController.validateEventData('createEvent'), EventController.createEvent);
appRouter.get('/api/event', EventController.getEvent);
appRouter.post('/api/event/:id', EventController.validateEventData('updateEvent'), EventController.updateEvent);
appRouter.delete('/api/event/:id', EventController.deleteEvent);

// Appointment Operations
appRouter.put(
    '/api/appointment',
    AppointmentController.validateAppointmentData('createAppointment'),
    AppointmentController.createAppointment
);
appRouter.get('/api/appointment/:id', AppointmentController.getAppointment);
appRouter.post('/api/appointment/:aid', AppointmentController.updateAppointment);
appRouter.delete('/api/appointment/:id', AppointmentController.deleteAppointment);

module.exports = appRouter;
