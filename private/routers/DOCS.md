# Routers
This directory is used to delegate and handle endponts request, and continue the request to [routeHandlers](../routeHandlers/).

[index.js](../index.js) needs to import the routers declared inside this directory, and add them to app.use for allowing nestled/grouped endpoints:
```js
app.use('/auth', authRoutes); // Enables: login and signup endpoints.
```

## 1. Router implementation
Following routers needs:
- endpointHandler: Inside [routeHandlers](../routeHandlers/) and ```import {func} from 'specific/endpointHandler.js'```;
- constRouter: Create a new router, append HTTP type, specify endpoint and rounter function that should handle it;
- export constRouter: Create a new router and export it;

Implementation:
```js
import express from 'express';
import { 
    handleEndpoint, 
    handleEndpointPost, 
    handleMoreEndpoints 
} from '../routeHandlers/endpointHandler.js';

const router = express.Router();
router.get('/specific-endpoint', handleEndpoint);
router.post('/specific-endpoint', handleEndpointPost);
router.get(['/more','/than','/one','/endpoint'], handleMoreEndpoints);
export default router;
```

## 2. Endpoints and router logic
Following headers specifies the logic of nestling alongside what endpoints gets enabled.

### 2.1. Page router - [pageRouter.js](./pageRouter.js)
Endpoints within the first order:
- home: [homeHandler.js](../routeHandlers/homeHandler.js);
- about: [aboutHandler.js](../routeHandlers/aboutHandler.js);
- index: [indexHandler.js](../routeHandlers/indexHandler.js);
- post: [postHandler.js](../routeHandlers/postHandler.js);

"post" endpoint even handles query search for specific posts of id: "http://127.0.0.1:3000/post?id=1234".

### 2.2. Auth - [authRouter.js](./authRouter.js)
Endpoints within an authenticating property, such as:
- login: [loginHandler.js](../routeHandlers//auth/loginHandler.js);
- signup: [signupHandler.js](../routeHandlers//auth/signupHandler.js);

Both files includes GET and POST handlers, to fetch HTML data alongside form submission data.

### 2.3. User - [userRouter.js](./userRouter.js)
Endpoints for user and users:
- user: [userHandler.js](../routeHandlers/user/userHandler.js);

Having user being a nestled group it enables scalability as if it's a prefix:
http://127.0.0.1:3000/user/someonesUsername

May potentially change into user?uuid=, or user?username=.