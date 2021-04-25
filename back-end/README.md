# SCHED-IT | Back-End

The back-end for this web-appication is written in JavaScript using the **Node.js framework**. It runs on an **ExpressJS server**

## Contents
- [node_modules](#) - This directory is listed under ```.gitignore``` so it is not tracked by git. This folder contains all the project dependencies.
- [controllers](./controllers) - This directory houses all the methods that are responsible of responding to HTTP requests and makes queries to the MongoDB database using the defined Mongoose models.
- [models](./models) - This directory houses all Mongoose Schema Models. Instances of these models contain the Mongoose methods to invoke a query to the MongoDB database.
- [package.json](./package.json) - This file contains the application's project details, scripts, and dependencies. This was auto-genrated by the npx script, create-react-app.

## Installation & Setup
1. Picking up from the install guide in the main README (npm dependencies should already be installed at this point), we now need to set-up our environment variables. Create a file named ```.env``` and fill in the following information:
    ``` 
    PORT=                   # [Optional] Use this variable to define a custom port to run on (default 3000)
    HOSTNAME=               # [Optional] Use this variable to define a custom hostname to listen on (default 0.0.0.0)
    SESSION_SECRET=         # [Required] Define your session-cookie secret key here
    MAX_COOKIE_AGE=         # [Optional] Define your custom cookie validity age in milliseconds (default 1.21e+9)
    MONGO_URI=              # [Required] Define your MongoDB instance connection string
    ENABLE_LOGGER=          # [Optional] Define a boolean value (0 or 1) to enable or disable the request logger (default 0)
    CORS_WHITELIST=         # [Required] Define a JSON array containing the hostnames of the cors-whitelist i.e. ["http://localhost"]
    ```

## Running the Application
After installing the required dependencies via npm, run the express server:

**OPTION 1:**
```
# Starts using node
npm start
```

**OPTION 2:**
```
# Starts using nodemon (if you have nodemon installed globally)
npm run start-dev
```

## Handling Mock-Data
Mock data can be inserted or purged automatically using the following pre-made scripts:
1. Add mock data to the MongoDB instance:
    ```
    npm run populateDB
    ```
2. Purge all data from the MongoDB instance:
    ```
    npm run purgeDB
    ```