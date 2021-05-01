const appRouter = require('express').Router();

// Routes
const ValidationController = require('./controllers/ValidationController');
const AuthController = require('./controllers/AuthController');
const UserController = require('./controllers/UserController');
const EventController = require('./controllers/EventController');
const AppointmentController = require('./controllers/AppointmentController');
const MailController = require('./controllers/MailController');
const FileController = require('./controllers/FileController');

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
appRouter.put(
    '/register',
    ValidationController.validateUserData('createUser'),
    ValidationController.validateInputs,
    UserController.createUser
);
appRouter.get('/api/user', UserController.getCurrentUser);
appRouter.get('/api/user/search/:name', UserController.searchUserByName);
appRouter.get('/api/user/:id', UserController.getUser);
appRouter.post(
    '/api/user',
    ValidationController.validateUserData('updateUser'),
    ValidationController.validateInputs,
    UserController.updateUser
);
appRouter.post(
    '/api/user/password',
    ValidationController.validateUserData('changePassword'),
    ValidationController.validateInputs,
    UserController.changePassword
);
appRouter.delete(
    '/api/user',
    ValidationController.validateUserData('deleteAccount'),
    ValidationController.validateInputs,
    UserController.deleteUser
);

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

// Mail Operations
appRouter.get('/api/mail/inbox', MailController.getInbox);
appRouter.get('/api/mail/sentbox', MailController.getSentBox);
appRouter.get('/api/mail/:mailID', MailController.getMailByID);
appRouter.post(
    '/api/mail/toggleRead/:messageID',
    ValidationController.validateMailData('read'),
    ValidationController.validateInputs,
    MailController.toggleRead
);
appRouter.put(
    '/api/mail/send/:recepientEmail',
    ValidationController.validateMailData('send'),
    ValidationController.validateInputs,
    MailController.sendMail
);

// File Operations
appRouter.post('/api/file', FileController.uploadFiles.array('file'), FileController.handleUpload);
appRouter.get('/api/file/:fileID', FileController.getFile);
appRouter.get('/api/file/stream/:fileID', FileController.streamFile);

module.exports = appRouter;
