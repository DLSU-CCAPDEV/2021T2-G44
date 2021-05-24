# SCHED-IT | Back-End

The back-end for this web-appication is written in JavaScript using the **Node.js framework**. It runs on an **ExpressJS server**

## Contents
- [node_modules](#) - This directory is listed under ```.gitignore``` so it is not tracked by git. This folder contains all the project dependencies.
- [controllers](./controllers) - This directory houses all the methods that are responsible of responding to HTTP requests and makes queries to the MongoDB database using the defined Mongoose models.
- [models](./models) - This directory houses all Mongoose Schema Models. Instances of these models contain the Mongoose methods to invoke a query to the MongoDB database.
- [package.json](./package.json) - This file contains the application's project details, scripts, and dependencies. This was auto-genrated by the npx script, create-react-app.
- [API-README.md](./API-README.md) - (Deprecated, do not use) This file is the documentation of the available back-end API endpoints.

## Installation & Setup
1. Picking up from the install guide in the main README (npm dependencies should already be installed at this point), we now need to set-up our environment variables. Create a file named ```.env``` and fill in the following information:
    ``` 
    PORT=                   # [Optional] Use this variable to define a custom port to run on (default 3000)
    SESSION_SECRET=         # [Required] Define your session-cookie secret key here
    MAX_COOKIE_AGE=         # [Optional] Define your custom cookie validity age in milliseconds (default 1.21e+9)
    MONGO_URI=              # [Required] Define your MongoDB instance connection string
    ENABLE_LOGGER=          # [Optional] Define a boolean value (0 or 1) to enable or disable the request logger (default 0)
    CORS_WHITELIST=         # [Required] Define a JSON array containing the hostnames of the cors-whitelist i.e. ["http://localhost"]
    SMTP_HOST=              # [Required] Define the SMTP Host For Outgoing Emails
    SMTP_PORT=              # [Required] Define the SMTP Port for Outgoing Emails (default 587)
    SMTP_USER=              # [Required] Define the SMTP User Credentials for Outgoing Emails
    SMTP_PASS=              # [Required] Define the SMTP Password Paired with User Credentials
    NODE_ENV=               # [Optional] Define environment the server is running on [development, production] (default 'development')
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

## Handling Mock-Data (deprecated)
Mock data can be inserted or purged automatically using the following pre-made scripts:
1. Add mock data to the MongoDB instance:
    ```
    npm run populateDB
    ```
2. Purge all data from the MongoDB instance:
    ```
    npm run purgeDB
    ```

## Cross-Origin Resource Sharing (CORS)
This application is configured to handle CORS via a whitelist of allowed hostnames to access the back-end server resources. This whitelist must be defined as a JSON array using the ```CORS_WHITELIST``` environment variable. Only hostnames listed in the whitelist are able to acceess server resources. This is mainly to allow only the React front-end servers.