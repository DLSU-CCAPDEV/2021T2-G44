import request from "../utils/AxiosConfig";

export async function userLogin(emailAddress, password) {
    // Using the given emailAddress and password, login to the API.
    try {
        const reqBody = {
            email: emailAddress,
            password: password,
        };
    
        const response = await request.post("auth", reqBody);
        return response.data;
    } catch(ex) {
        console.error(ex);
        return { success: false, errors: [{msg: ex}]};
    }
}

export async function getUID() {
    try {
        const response = await request.get("auth");
        return response.data;
    } catch(ex) {
        console.error(ex);
        return { success: false, errors: [{msg: ex}]};
    }
}

export async function logout() {
    try {
        const response = await request.delete("auth");
        return response.data;
    } catch (ex) {
        console.error(ex);
        return { success: false, errors: [{msg: ex}]};
    }
}
