## BACK-END API DOCUMENTATION

### Non-auth endpoints
These endpoints do not require the user to be signed in:
1. API-Test Endpoint
    - Use this endpoint to test if the API is reachable.
    ```
    GET /test
    ```
2. Register User Endpoint
    - Use this endpoint to create an account. This endpoint might require some sort of security in the future.
    ```
    PUT /register ; requires BODY with fields: email, password, firstName, lastName ; RETURNS 201 or 400 JSON with field "errors"
    ```
3. Login Endpoint
    - Use this endpoint to login.
    ```
    POST /auth ; requires BODY with fields: email, password ; RETURNS 200 or 401
    ```
4. UserID Query Endpoint
    - Use this endpoint to get the userID of the user that is logged in.
    ```
    GET /auth ; RETURNS 200 and BODY with field "uid" or 401
    ```
5. Logout Endpoint
    - Use this endpoint to logout and clear cookie & session data.
    ```
    DELETE /auth ; RETURNS 200 or 401
    ```

### User API Endpoints
These endpoints belong to the UserController and handles dataflow for the User entity.
1. Get Own User Data Endpoint
    - Use this endpoint to get the user data of the currently-logged-in user.
    ```
    GET /api/user ; RETURNS 200 with BODY containing userdata
    ```
2. Get User Data Given UserID Endpoint
    - Use this endpoint to get the user data by user ID.
    ```
    GET /api/user/:userID ; REQUIRES userID parameter ; RETURNS 200 with BODY containing userdata
    ```
3. Edit User Data Endpoint
    - Use this endpoint to update user data. Take note this does not update the user's password.
    ```
    POST /api/user/:userID ; REQUIRES userID parameter ; RETURNS 200 with BODY containing updated userdata or 400 JSON field "errors"
    ```

### Mail API Endpoints
Thsese endpoints belong to the MailController and handles dataflow and methods for sending, receiving, and reading mail.