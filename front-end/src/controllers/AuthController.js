import axios from 'axios';

export async function userLogin(emailAddress, password) {
    // Using the given emailAddress and password, login to the API.
    const reqBody = {
        email: emailAddress,
        password: password,
    };
    
    const response = await axios({
        url: `${process.env.REACT_APP_BACK_END_API}/auth`,
        method: 'POST',
        data: reqBody,
        withCredentials: true
    }).catch(err => console.error(err));

    return response.status === 200;
}

export async function getUID() {
    const response = await axios({
        url: `${process.env.REACT_APP_BACK_END_API}/auth`,
        method: 'get',
        withCredentials: true
    });

    if(response.status === 200)
        return response.data.uid;
    return false;
}

export async function logout() {
    try {
        const response = await axios({
            url: `${process.env.REACT_APP_BACK_END_API}/auth`,
            method: 'delete',
            withCredentials: true
        });

        console.log(response);
    } catch   (ex) {
        //console.error(ex);
        return false;
    }
}