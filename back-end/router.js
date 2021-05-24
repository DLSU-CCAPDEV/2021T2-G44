const express = require('express');
const appRouter = express.Router();
const path = require('path');

// Routes
const ValidationController = require('./controllers/ValidationController');
const AuthController = require('./controllers/AuthController');
const UserController = require('./controllers/UserController');
const EventController = require('./controllers/EventController');
const AppointmentController = require('./controllers/AppointmentController');
const MailController = require('./controllers/MailController');
const FileController = require('./controllers/FileController');
const TodoController = require('./controllers/TodoController');
const InvitesController = require('./controllers/InvitesController');

// Set up Routes

// Serve Static Assets
appRouter.use('/static', express.static(path.join(__dirname, 'public-assets')));

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
appRouter.get('/api/searchUser/:name', UserController.searchUserByName);
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
appRouter.get('/api/event/public', EventController.getPublicEvents);
appRouter.put(
  '/api/event',
  ValidationController.validateEventData('createEvent'),
  ValidationController.validateInputs,
  EventController.createEvent
);
appRouter.get('/api/event', EventController.getEvent);
appRouter.post(
  '/api/event',
  ValidationController.validateEventData('updateEvent'),
  ValidationController.validateInputs,
  EventController.updateEvent
);
appRouter.put(
  '/api/event/comment',
  // ValidationController.validateEventData('addComment'),
  // ValidationController.validateInputs,
  EventController.addComment
);
appRouter.delete('/api/event/:id', EventController.deleteEvent);
appRouter.get(
  '/api/countPublicEvents',
  EventController.countPublicEvents
);
appRouter.get(
  '/api/userEvents',
  EventController.getUserEvents
);

// Appointment Operations
appRouter.put(
  '/api/appointment',
  ValidationController.validateAppointmentData('createAppointment'),
  ValidationController.validateInputs,
  AppointmentController.createAppointment
);
appRouter.get('/api/appointment', AppointmentController.getAppointment);
appRouter.post('/api/appointment/:aid', AppointmentController.updateAppointment);
appRouter.delete('/api/appointment/:id', AppointmentController.deleteAppointment);

// Invitation Operations
appRouter.put(
    '/api/invite', 
    ValidationController.validateInvite('create'),
    ValidationController.validateInputs,
    InvitesController.createInvitation
);
appRouter.post(
    '/api/invite/:inviteID',
    ValidationController.validateInvite('update'),
    ValidationController.validateInputs,
    InvitesController.updateInvitation
);
appRouter.get(
    '/api/inviteCount', 
    InvitesController.countInvites
);
appRouter.get(
    '/api/invite',
    InvitesController.getAllInvitations  
);
appRouter.get(
    '/api/invite/:inviteID',
    ValidationController.validateInvite('read'),
    ValidationController.validateInputs,
    InvitesController.getInvitation
);
appRouter.delete(
    '/api/invite/:inviteID',
    ValidationController.validateInvite('delete'),
    ValidationController.validateInputs,
    InvitesController.deleteInvitation 
);
appRouter.post(
    '/api/inviteRespond/:inviteID',
    ValidationController.validateInvite('respond'),
    ValidationController.validateInputs,
    InvitesController.respondInvitation
)

// Mail Operations
appRouter.get('/api/mail/count', MailController.totalMail);
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
appRouter.delete('/api/mail/:mailID', MailController.deleteMail);

// Todo-list Operations
appRouter.get('/api/todo', TodoController.getAllTodo);
appRouter.put(
  '/api/todo',
  ValidationController.validateTodo('create'),
  ValidationController.validateInputs,
  TodoController.addTodo
);
appRouter.post(
  '/api/todo',
  ValidationController.validateTodo('toggleComplete'),
  ValidationController.validateInputs,
  TodoController.toggleCompleted
);
appRouter.delete(
  '/api/todo',
  ValidationController.validateTodo('delete'),
  ValidationController.validateInputs,
  TodoController.deleteTodo
);

// File Operations
appRouter.put('/api/file', FileController.uploadFiles.array('file'), FileController.handleUpload);
appRouter.get('/api/file/:fileID', FileController.getFile);
appRouter.get('/api/file/stream/:fileID', FileController.streamFile);

module.exports = appRouter;
