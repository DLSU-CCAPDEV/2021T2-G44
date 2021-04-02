# SCHED-IT | Front-End

The front-end for this web-application was written with Facebook's **ReactJS UI Library**, mostly making use of **Material-UI** React components from Google. The use of this library makes development of web-pages more dynamic and modular, perfect for the needs of a complex application with UI pop-ups, state-based design, and many more.

## Contents
- [node_modules](#) - This directory is listed under ```.gitignore``` so it is not tracked by git. This folder contains all the project dependencies.
- [public](./public) - This directory contains the static assets used to serve the web-application. ```(E.g. index.html, favicon.ico, etc)```
- [src](./src) - This directory contains the main source JavaScript files that represent the React components that are rendered by index.js.

## Installation & Setup
1. Picking up from the install guide in the main README (npm dependencies should already be installed at this point), we now need to set-up our environment variables. Create a file named ```.env``` and fill in the following information:
    ```
    PORT=
    REACT_APP_BACK-END-API=
    REACT_APP_LOGGEDIN=
    ```
    The ```PORT``` variable will be the port that the React development server will be running on. If this is not set, the React Development server will run on port 3000 by default. The ```BACK-END-API``` variable will be the base host URL that the React application will query to send and receive data. This variable is required with the following form: ```http://domain.com:PORT```. This should be running with SSL for production. For a local development environment, this will only be http instead of https and will be pointing to localhost (127.0.0.1). *For CCAPDEV Phase 1, this variable will not be used in the code*.

## Running the Application
### Development
*Use this guide to run in a development environment.*

**OPTION 1**: Run the React Development Server

    
    npm start
    

**OPTION 2**: Run the ExpressJS Server

    npm run build
    npm run start-express

    // OR

    // If you have nodemon installed:
    npm run build
    npm run start-express-dev
    

### Production
*Use this guide to run in a production environment.*
1. Run the production script:
    ```
    npm run production
    ```

## Things to take note of
1. For Phase 1, user with ID #0 will be logged in by default when using the register page.
2. For Phase 1, a non-httpOnly cookie will be used to track if the user is logged in or not. This cookie will not be used in phase 2 as it will be replaced by an httpOnly cookie from express-session.