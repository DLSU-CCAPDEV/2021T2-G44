import request from "../utils/AxiosConfig";

import { GetUserData } from "./UserController";

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

export const getInbox = async (start = 0, limit = 50) => {
    // Make API Call
    try {
        const response = await request.get("api/mail/inbox", {
            params: {
                start: start,
                limit: limit
            }
        });

        if (response.data.success) {
            // Add user data for sender & format dates
            const allMail = await Promise.all(response.data.mail.map(async m => new Promise(async (resolve) => {
                m.sender = (await GetUserData(m.senderID)).userData;
                m.sendTime = new Date(m.sendTime).toLocaleString().toUpperCase();

                // Process attachments
                if (m.attachments.length > 0) {
                    await Promise.all(m.attachments.map(async (attachment, i) => new Promise(async resolve => {
                        const fileInfo = await request.get("api/file/" + attachment);
                        if (!fileInfo.data.success) {
                            m.attachments[i] = { filename: "", fileID: attachment };
                            return resolve();
                        }

                        m.attachments[i] = {
                            filename: fileInfo.data.file.filename,
                            fileID: attachment
                        };
                        return resolve();
                    })));
                }
                return resolve(m);
            })));
            if (allMail)
                return { success: true, mail: allMail };
        }
        return response.data;
    } catch (ex) {
        console.error(ex);
        return { success: false, errors: [{msg: ex}] };
    }
};

export const getSent = async (start = 0, limit = 50) => {
    // Make API Call
    try {
        const response = await request.get("api/mail/sentbox", {
            params: {
                start: start,
                limit: limit,
            },
        });

        if (response.data.success) {
            // Add user data for sender & format dates
            const allMail = await Promise.all(
                response.data.mail.map(
                    async (m) =>
                        new Promise(async (resolve) => {
                            m.recepient = (await GetUserData(m.recepientID)).userData;
                            m.sendTime = new Date(m.sendTime).toLocaleString().toUpperCase();

                            // Process attachments
                            if (m.attachments.length > 0) {
                                await Promise.all(
                                    m.attachments.map(
                                        async (attachment, i) =>
                                            new Promise(async (resolve) => {
                                                const fileInfo = await request.get(
                                                    "api/file/" + attachment
                                                );
                                                if (!fileInfo.data.success) {
                                                    m.attachments[i] = {
                                                        filename: "",
                                                        fileID: attachment,
                                                    };
                                                    return resolve();
                                                }

                                                m.attachments[i] = {
                                                    filename: fileInfo.data.file.filename,
                                                    fileID: attachment,
                                                };
                                                return resolve();
                                            })
                                    )
                                );
                            }
                            return resolve(m);
                        })
                )
            );
            if (allMail) return { success: true, mail: allMail };
        }
        return response.data;
    } catch (ex) {
        console.error(ex);
        return { success: false, errors: [{ msg: ex }] };
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
        link.setAttribute('download', file.filename);
        document.body.appendChild(link);
        link.click();
    } catch(ex) {
        console.error(ex);
        return false;
    }
};