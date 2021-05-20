import request from "../utils/AxiosConfig";

export const getMailCount = async () => {
    // Make API Call
    try {
        const response = await request.get("api/mail/count");
        return response.data;
    } catch (ex) {
        console.error(ex);
        return {
            success: false,
            errors: [{
                msg: ex
            }]
        };
    }
};

export const getInbox = async (start = 0, limit = 15) => {
    // Make API Call
    try {
        const response = await request.get("api/mail/inbox", {
            params: {
                start: start,
                limit: limit
            }
        });

        // Make Date Object
        if(response.data.success) {
            const dataWithDate = response.data.mail.map(m => {
                m.sendTime = new Date(m.sendTime).toLocaleString().toUpperCase();
                return m;
            });
            console.log(dataWithDate);
            return { 
                success: true,
                mail: dataWithDate
            }
        }

        return response.data;
    } catch (ex) {
        console.error(ex);
        return { success: false, errors: [{msg: ex}] };
    }
};

export const getSent = async (start = 0, limit = 15) => {
    // Make API Call
    try {
        const response = await request.get("api/mail/sentbox", {
            params: {
                start: start,
                limit: limit
            }
        });

        // Make Date Object
        if(response.data.success) {
            const dataWithDate = response.data.mail.map(m => {
                m.sendTime = new Date(m.sendTime).toLocaleString().toUpperCase();
                return m;
            });
            console.log(dataWithDate);
            return { 
                success: true,
                mail: dataWithDate
            }
        }

        return response.data;
    } catch (ex) {
        console.error(ex);
        return { success: false, errors: [{msg: ex}] };
    }
};

export const sendMessage = async (userEmail, messageContent) => {
    // Make API Call to Send Message
    try {
        // Upload files first
        const filesData = new FormData();
        messageContent.attachments.forEach(file => {
            filesData.append('file', file);
        });

        const fileUploadResponse = await request.put('api/file', filesData);

        messageContent.attachments = [];
        if(fileUploadResponse.data.success) {
            fileUploadResponse.data.file.forEach(fileData => {
                messageContent.attachments.push(fileData.id);
            });
        } else {
            return fileUploadResponse.data;
        }

        const response = await request.put("api/mail/send/" + userEmail, {
            subject: messageContent.subject,
            content: messageContent.content,
            attachments: messageContent.attachments
        });
        
        return response.data;
    } catch(ex) {
        console.error(ex);
        return { success: false, errors: [{ msg: ex }] };
    }
};

export const toggleRead = async (messageID) => {
    // Make API Call to Toggle Read
    try {
        const response = await request.post("api/mail/toggleRead/" + messageID);
        if(response.status === 200) return true;
        return false;
    } catch(ex) {
        console.error(ex);
        return false;
    }
};

export const streamFile = async (file) => {
    try {
        console.log(file);
        const response = await request.get("api/file/stream/" + file.fileID, {
            responseType: 'blob'
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', file.fileInfo.fileName);
        document.body.appendChild(link);
        link.click();
    } catch(ex) {
        console.error(ex);
        return false;
    }
};