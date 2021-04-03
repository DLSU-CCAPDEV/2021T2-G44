# SCHED-IT | Front-End - src

This directory contains all the JS source files that render the structure and design of the web-application. 

## Contents
- [controllers](./controllers) - This directory contains the client-side controllers that are used to contact the back-end server. For now in phase 1, they do not actually contact the server, but return hard-coded values.
- [models](./models) - This directory will contain Mongoose data models for future contact to the back-end server in the next project phase. For now, it only contains the Cookie model that is temporarily used to manage phase 1 logins.
- [placeholderData](./placeholderData) - This directory contains JSON files of placeholder data for the phase 1 web-application.
- [sources](./sources) - This directory contains the actual React Functional Components that are rendered to the view.
- [index.js](./index.js) - This file contains the main React-DOM and is the insertion point of the project.
- [routes.js](./routes.js) - This file contains all the routing details that the React-Router-DOM. Just like ExpressJS middlewares, the React-Router-DOM allows for conditional rendering of React components. 