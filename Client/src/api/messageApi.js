import api from "./axios";


export const getMessages = async (receiverId) => {
    const messages = await api.get(`/messages/${receiverId}`)
    return messages;
}


export const getConversationUsers = async ()=>{
    const user = await api.get('/messages/conversations');
    return user.data;
}