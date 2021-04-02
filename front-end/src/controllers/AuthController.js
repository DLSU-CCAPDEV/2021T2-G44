/*
    FOR PHASE 1: Using a mock auth token only.
*/
// Import Mock Data
import Users from "../placeholderData/users.json";

export async function userLogin(emailAddress, password) {
    /*
        Normally, we do our API call here.
        For now, we shall only use mock access tokens.
    */
    // Look for the email address given
    const userData = Users.find(
        (user) => user.email === emailAddress && user.password === password
    );

    // Check for undefined: return null to the user if undefined
    if (typeof userData === "undefined") return null;

    // Return the user's accessToken
    return userData.id;
}
