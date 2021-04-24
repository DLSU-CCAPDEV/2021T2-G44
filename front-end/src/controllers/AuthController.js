/*
    FOR PHASE 1: Using a mock auth token only.
*/

export async function userLogin(emailAddress, password) {
    // Using the given emailAddress and password, login to the API.
    const reqBody = {
        email: emailAddress,
        password: password,
    };

    try {
        const response = await fetch(`/auth`, {
            method: "POST",
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify(reqBody)
        });

        return response.ok;
    } catch   (ex) {
        console.error(ex);
        return false;
    }
}

export async function getUID() {
    try {
        const response = await fetch(`/auth`, {
            method: "GET",
            credentials: 'include'
        });
        
        if(response.ok) {
            const res = await response.json();
            return res.uid;
        }
        return false;
    } catch   (ex) {
        console.error(ex);
        return false;
    }
}

export async function logout() {
    try {
        const response = await fetch(`/auth`, {
            method: "DELETE",
            credentials: 'include'
        });

        if(response.ok)
            return true;
        return false;
    } catch   (ex) {
        console.error(ex);
        return false;
    }
}