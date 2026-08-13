import api from "./axios";


export const getMessages = async (receiverId) => {
    const messages = await api.get(`/messages/${receiverId}`)
    return messages;
}

export const sendMessage = async (messageData) => {
    const message = await api.post('/messages/send', messageData)
    return message;
}