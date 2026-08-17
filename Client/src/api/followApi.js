import api from "./axios";

export const toggleFollow = async (targetUserId) =>{
    const response = await api.post(`/follow/${targetUserId}`);
    return response.data;
}

export const getFollowers = async(targetUserId)=>{
    const response = await api.get(`/follow/followers/${targetUserId}`);
    return response.data ;
}

export const getFollowing =async(targetUserId)=>{
    const response = await api.get(`/follow/following/${targetUserId}`);
    return response.data ;
}