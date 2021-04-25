import request from "../utils/AxiosConfig";

export async function userLogin(emailAddress, password) {
    // Using the given emailAddress and password, login to the API.
    const reqBody = {
        email: emailAddress,
        password: password,
    };

    const response = await request.post("auth", reqBody);

    return response.status === 200;
}

export async function getUID() {
    const response = await request.get("auth");

    if (response.status === 200) return response.data.uid;
    return false;
}

export async function logout() {
    try {
        const response = await request.delete("auth");
    } catch (ex) {
        //console.error(ex);
        return false;
    }
}
