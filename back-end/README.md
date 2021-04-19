# SCHED-IT | Back-End

The back-end for this web-appication is written in JavaScript using the **Node.js framework**. It runs on an **ExpressJS server**

## Contents
- [node_modules](#) - This directory is listed under ```.gitignore``` so it is not tracked by git. This folder contains all the project dependencies.
- [package.json](./package.json) - This file contains the application's project details, scripts, and dependencies. This was auto-genrated by the npx script, create-react-app.

## Installation & Setup
1. Picking up from the install guide in the main README (npm dependencies should already be installed at this point), we now need to set-up our environment variables. Create a file named ```.env``` and fill in the following information:
    ```
    PORT=
    HOSTNAME=
    SESSION_SECRET=
    MAX_COOKIE_AGE=
    MONGO_URI=
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