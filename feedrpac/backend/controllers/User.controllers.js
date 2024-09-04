// Import Packages
import bcrypt from "bcryptjs";
import {v2 as cloudinary} from 'cloudinary';

// Import Models
import User from "../models/User.model.js";
import Notification from "../models/Notifications.model.js";

// Fix for event emitter memory leak warning (https://github.com/nodejs/node/issues/6
import events from 'events';
events.EventEmitter.defaultMaxListeners = 20; 

export const getProfileByUsername = async (req, res) => {
    const { username } = req.params;

    try {
        const user = await User.findOne({ username }).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.log("Error in getProfileByUsername controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }


};

export const followUnfollowUser = async (req, res) => {
    try {
        const {id} = req.params;
        const userToModify = await User.findById(id);
        const currentUser = await User.findById(req.user._id);

        if (id === req.user._id.toString()) {
            return res.status(400).json({ error: "You can't follow yourself" });
        }
        if (!userToModify || !currentUser) {
            return res.status(404).json({ error: "User not found" });
        }
        const isFollowing = currentUser.following.includes(id);

             if (isFollowing) {
            // Unfollow the user
            await User.findByIdAndUpdate(id, { $pull:{followers: req.user._id}})
            await User.findByIdAndUpdate(req.user._id, { $pull:{following: id}})
            
            // To-do: Return USER ID
            res.status(200).json({ message: "Unfollowed successfully" }); // Todo return id of user

        } else {
                
            // Follow the user
            await User.findByIdAndUpdate(id, { $push:{followers: req.user._id}})
            await User.findByIdAndUpdate(req.user._id, { $push:{following: id}})
            
            const newNotification = new Notification({
                type: "follow",
                from: req.user._id,
                to: userToModify._id
            });
            await newNotification.save();
            // To-do: Return USER ID
            res.status(200).json({ message: "Followed successfully" }); // Todo return id of user
        }
    } catch (error) {
        console.log("Error in followUnfollowUser controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getSuggestedProfiles = async (req, res) => {

    try {
        const userId = req.user._id;

        const followedUsers = await User.findById(userId).select("following");

        const users = await User.aggregate([
            {
                $match: {
                    _id: { $ne: userId },
                },
            },
            { $sample: {size: 10}},
                    
        ]);

        const filteredUsers = users.filter((user) => !followedUsers.following.includes(user._id));
        const suggestedProfiles = filteredUsers.slice(0, 4); 

        suggestedProfiles.forEach((user) => (user.password = null));
        res.status(200).json(suggestedProfiles);
    } catch (error) {
        
    }
};

export const updateUserProfile = async (req, res) => {
    const { username, currentPassword,newPassword, fullName, email, bio, website } = req.body;
    let { profileImg, coverImg } = req.body;

    const userId = req.user._id;

    try {
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        if ((!newPassword && currentPassword) || (!currentPassword && newPassword)) {
            return res.status(400).json({ error: "Please provide both current password and new password." });
        }
        if (currentPassword && newPassword) {
            const isMatch = bcrypt.compare(currentPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({ error: "Current password is incorrect." });
            }
            if (newPassword.length < 8) {
                return res.status(400).json({ error: "Password must be at least 8 characters long." });
            }

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword, salt);
        }
        if (profileImg) {
            if (user.profileImg){
                await cloudinary.uploader.destroy(user.profileImg.split("/").pop().split(".")[0]);  // Delete old img if exists
            }
            const uploadedResponse = await cloudinary.uploader.upload(profileImg)
            profileImg.url = uploadedResponse.secure_url;
        }   

        if (coverImg) {
            if (user.coverImg){
                await cloudinary.uploader.destroy(user.coverImg.split("/").pop().split(".")[0]);  // Delete old img if exists  
            }
            const uploadedResponse = await cloudinary.uploader.upload(coverImg)
            coverImg.url = uploadedResponse.secure_url;
        }

        // Todo: Make this more efficient by deleting multiple images in a single request if possible.  
        // Todo: Add error handling for deletion failures.  
        // Todo: Consider implementing a more robust image deletion system.  
        // Todo: Consider using a queue or a message broker for handling large image deletion requests.  
        // Todo: Consider implementing a CDN for serving images.  
        // Todo: Consider implementing a caching mechanism to improve performance.  
        // Todo: Consider implementing rate limiting to prevent abuse.  
        // Todo: Consider implementing a backup mechanism to ensure data integrity in case of image deletion failures.  
        // Todo: Consider implementing a logging mechanism to track image deletion failures.  
        // Todo: Consider implementing a monitoring system to track image deletion failures and take corrective actions.  
        // Todo: Consider implementing a backup mechanism to ensure data integrity in case

        user.fullName = fullName || user.fullName;
        user.email = email || user.email;
        user.username = username || user.username;
        user.bio = bio || user.bio;
        user.website = website || user.website;
        user.profileImg = profileImg || user.profileImg;
        user.coverImg = coverImg || user.coverImg;

        user = await user.save();
        user.password = null; // Hide password 
        return res.status(200).json(user);

    } catch (error) {
        console.log("Error in updateUserProfile controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
        
    }

};

export const getUserSidebar = async (req, res) => {

    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password");

        res.status(200).json(filteredUsers);  
        
    } catch (error) {
        console.log("Error in getUserSidebar controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }

};

export const addReportToOngoingMission = async (req, res) => {

};