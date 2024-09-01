import Notification from '../models/Notifications.model.js';
import User from '../models/User.model.js';
import Post from '../models/Post.model.js';

export const createPost = async (req, res) => {

    try {
        const {text} = req.body;
        let {img} = req.body;
        const userId = req.user._id.toString();

        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }

        if (!user && !img) {
            return res.status(400).json({message: "Image or text are required"});
        }

        if (img) {
            const uploadedImg = await cloudinary.uploader.upload(img);
            img = uploadedImg.secure_url;
        }

        const newPost = new Post(
            {
                user: userId,
                text,
                img,
            });

        await newPost.save();
        return res.status(201).json(newPost);

    } catch (error) {
        console.log("Error in createPost controller: ", error.message);
        res.status(500).json({message: "Internal server error"});
    }
};

export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({message: "Post not found"});
        }

        if (post.user.toString()!== req.user._id.toString()) {
            return res.status(401).json({error: "You are not authorized to delete this post"});
        } 

        if (post.img) {
            const imgId = post.img.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(imgId);
        }

        await Post.findByIdAndDelete(req.params.id);
        return res.status(200).json({message: "Post deleted successfully"});

    } catch (error) {
        console.log("Error in deletePost controller: ", error.message);
        res.status(500).json({message: "Internal server error"});
    }
};

export const commentOnPost = async (req, res) => {
    try {
        const {text} = req.body;
        const postId = req.params.id;
        const userId = req.user._id;

        if (!text) {
            return res.status(400).json({message: "Comment text is required"});
        }

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({message: "Post not found"});
        }

        const comment = {user: userId, text};
        post.comments.push(comment);
        await post.save();

        res.status(200).json(post);



    } catch (error) {
        console.log("Error in commentOnPost controller: ", error.message);
        res.status(500).json({message: "Internal server error"});
        
    }
};

export const likeUnlikePost = async (req, res) => {
    try {
        const userId = req.user._id;
        const {id:postId} = req.params;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({message: "Post not found"});
        }

        const userLikedPost = post.likes.includes(userId);

        if (userLikedPost) {
            //unlike post
            await Post.updateOne({_id:postId}, {$pull: {likes: userId}});
            await User.updateOne({_id: userId}, {$pull: {likedPosts: postId}});
            res.status(200).json({message: "Post unliked successfully"});

        } else {
            //like post
            post.likes.push(userId);
            await User.updateOne({_id: userId}, {$push: {likedPosts: postId}});
            await post.save();

            const notification = new Notification({
                from: userId,
                to: post.user,
                type: "like"
            });

            await notification.save();
            res.status(200).json({message: "Post liked successfully"});
        }




    } catch (error) {
        console.log("Error in likeUnlikePost controller: ", error.message);
        res.status(500).json({message: "Internal server error"});
        
    }
};

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({createdAt: -1}).populate({
            path: "user",
            select: "-password"
        })
        .populate({
            path: "comments.user",
            select: "-password"
        });
        
        
        if (posts.length === 0) {
            return res.status(200).json({message: "No posts found"});
        }
        
        res.status(200).json(posts);

    } catch (error) {
        console.log("Error in getAllPosts controller: ", error.message);
        res.status(500).json({message: "Internal server error"});
        
    }
};

export const getLikedPosts = async (req, res) => {
    const userId = req.params.id;

    try {
    
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({error: "User not found"});
        }

        const likedPosts = await Post.find({_id: {$in: user.likedPosts}}).populate({
            path: "user",
            select: "-password"
        })
        .populate({
            path: "comments.user",
            select: "-password"
        });

        res.status(200).json(likedPosts);


    } catch (error) {
        console.log("Error in getLikedPosts controller: ", error.message);
        res.status(500).json({message: "Internal server error"});
        
    }
};

export const getFollowingPosts = async (req, res) => {
    
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({error: "User not found"});
        }
        const following = user.following;

        const feedPosts = await Post.find({user: {$in: following}}).sort({createdAt: -1})
        .populate({
            path: "user",
            select: "-password"
        })
        .populate({
            path: "comments.user",
            select: "-password"
        });

        res.status(200).json(feedPosts);
        

    } catch (error) {
        console.log("Error in getFollowingPosts controller: ", error.message);
        res.status(500).json({message: "Internal server error"});
        
    }
};

export const getUserPosts = async (req, res) => {
    try {
       const {username } = req.params;
       const user = await User.findOne({username}).select("-password");
       if (!user) {
           return res.status(404).json({error: "User not found"});
       }

       const posts = await Post.find({user: user._id}).sort({createdAt: -1}).populate({
           path: "user",
           select: "-password"
       })
       .populate({
           path: "comments.user",
           select: "-password"
       });

       res.status(200).json(posts);




    } catch (error) {
        console.log("Error in getUserPosts controller: ", error.message);
        res.status(500).json({message: "Internal server error"});
        
    }
};