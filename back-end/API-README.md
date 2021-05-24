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
    PUT /register
    REQUIRES BODY:
    {
        email: "userEmail@email.com",
        password: "userPassword",
        firstName: "John Joseph",
        lastName: "Doe",

        // Optional Field
        bio: "I am a CS Graduate",
    }
    RETURNS:
    On Success:
    {
        success: true,
        userData: {
            // User Data Inserted (same format as request body)
        }
    }
    On Failure (HTTP 400 OR HTTP 500)
    ```
3. Login Endpoint
    - Use this endpoint to login.
    ```
    POST /auth
    REQUIRES BODY:
    {
        email: "userEmail@email.com",
        password: "userPassword"
    }
     RETURNS:
    On Success:
    {
        success: true,
        msg: "Session Logged In"
    }
    On Failure (HTTP 401 OR HTTP 500)
    ```
4. UserID Query Endpoint
    - Use this endpoint to get the userID of the user that is logged in.
    ```
    GET /auth
    RETURNS:
    On Success:
    {
        success: true,
        uid: "userID"
    }
    On Failure (HTTP 401 OR HTTP 500)
    ```
5. Logout Endpoint
    - Use this endpoint to logout and clear cookie & session data.
    ```
    DELETE /auth
    RETURNS:
    On Success:
    {
        success: true,
        msg: "Logged Out"
    }
    On Failure (HTTP 401 OR HTTP 500)
    ```

### User API Endpoints
These endpoints belong to the UserController and handles dataflow for the User entity.
1. Get Own User Data Endpoint
    - Use this endpoint to get the user data of the currently-logged-in user.
    ```
    GET /api/user
    RETURNS:
    On Success:
    {
        success: true,
        userData: {
            // User data
        }
    }
    On Failure (HTTP 401, 500)
    ```
2. Get User Data Given UserID Endpoint
    - Use this endpoint to get the user data by user ID.
    ```
    GET /api/user/:userID
    RETURNS:
    On Success:
    {
        success: true,
        userData: {
            // User data
        }
    }
    On Failure (HTTP 400, 401, 500)
    ```
3. Edit User Data Endpoint
    - Use this endpoint to update user data. Take note this does not update the user's password.
    ```
    POST /api/user/:userID
    REQUIRES BODY:
    {
        // Updated user data
        // NOTE: Password cannot be updated using this endpoint.
    }
    RETURNS:
    On Success:
    {
        success: true,
        userData: {
            // Updated user data
        }
    }
    On Failure (HTTP 400, 401, 422, 500)
    ```
4. Search User By Name Endpoint
    - Use this endpoint to search for users by name. This uses Regular Expressions to match user data.
    ```
    GET /api/user/search/:searchKeywords
    RETURNS:
    On Success:
    {
        success: true,
        results: [
            {
                uid: "resultUserID1",
                name: "User1 Name"
            },
            {
                uid: "resultUserID2",
                name: "User2 Name"
            }
        ]
    }
    On Failure (HTTP 400, 401, 422, 500)
    ```
5. Change Password Endpoint
    - Use this endpoint to change password.
    ```
    POST /api/user/password
    REQUIRES BODY:
    {
        oldPassword: "User's old password",
        newPassword: "New password"
    }
    On Success:
    {
        success: true
    }
    On Failure (HTTP 400, 401, 422, 500)
    ```
6. Delete Account Endpoint
    - Use this endpoint to completely terminate the currently logged-in user account.
    ```
    DELETE /api/user
    REQUIRES BODY:
    {
        password: "User's current password."
    }
    On Success:
    {
        success: true
    }
    On Failure (HTTP 400, 401, 422, 500)
    ```

### Mail API Endpoints
Thsese endpoints belong to the MailController and handles dataflow and methods for sending, receiving, and reading mail.

### Error Handling
Whenever there is an error with the HTTP request, the following response structure is returned:
```
{
    success: false,
    errors: [
        {
            msg: "Error message 1"
            // Other info here (if applicable)
        },
        {
            msg: "Error message 2"
            // Other info here (if applicable)
        }
    ]
}
```