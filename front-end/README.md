# SCHED-IT | Front-End

The front-end for this web-application was written with Facebook's **ReactJS UI Library**, mostly making use of **Material-UI** React components from Google. The use of this library makes development of web-pages more dynamic and modular, perfect for the needs of a complex application with UI pop-ups, state-based design, and many more.

## Contents
- [node_modules](#) - This directory is listed under ```.gitignore``` so it is not tracked by git. This folder contains all the project dependencies.
- [public](./public) - This directory contains the static assets used to serve the web-application. ```(E.g. index.html, favicon.ico, etc)```
- [src](./src) - This directory contains the main source JavaScript files that represent the React components that are rendered by index.js.
- [express-server.js](./express-server.js) - This file contains the express server configuration that will serve the production version of the React application.
- [package.json](./package.json) - This file contains the application's project details, scripts, and dependencies. This was auto-genrated by the npx script, create-react-app.

## Installation & Setup
1. Picking up from the install guide in the main README (npm dependencies should already be installed at this point), we now need to set-up our environment variables. Create a file named ```.env``` and fill in the following information:
    ```
    HOST=                       # [Optional] Use this variable to define a custom hostname to listen on (default 0.0.0.0)
    PORT=                       # [Optional] Use this variable to define a custom port to run on (default 3000)
    REACT_APP_BACK_END_API=     # [Required] Define the base URL or hostname of an instance of a Sched-It back-end API
    ```

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
