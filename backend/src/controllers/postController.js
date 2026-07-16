import Post from "../models/Post.js";



export const createPost = async (req,res)=>{
    try{
        const {title,content} = req.body;
        if(!title || !content){
            return res.status(400).json({message:"All fields are required"});
        }
        const userId = req.user.id;
        if(!userId){
            return res.status(401).json({message:"Unauthorized"});
        }
        const post = await Post.create({
            user:userId,
            title,
            content
        })
        res.json(
            {
                message:"Post created successfully",
            }
        )
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}


export const getAllPosts = async (req,res)=>{
    try{
        const posts = await Post.find();
        res.json(posts);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}