import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../lib/utils/GenerateToken.js";

export const signup = async (req, res) => {

    console.log("Received signup data in BackEnd:", req.body);            // To see if the data from FrontEnd is received.

    try {
        const {
            username,
            fullName,
            password,
            email,
            profileImg = '',
            coverImg = '',
            bio = '',
            website = '',
            location = '',
            ongoingMission = [],  // Initialize as empty array or with any default value if needed
            prevMission = []      // Initialize as empty array or with any default value if needed

        } = req.body;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
            console.log("Invalid email format");
        }

        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(400).json({ message: "Username already exists" });
            console.log("Username already exists");
        }

        const emailExists = await User.findOne({ email });
        if (emailExists) {
            return res.status(400).json({ message: "Email already used" });
            console.log("Email already used");
        }

        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long" });
            console.log("Password must be at least 8 characters long");
        }

        //Password hashing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            email,
            profileImg,
            coverImg,
            bio,
            website,
            location,
            ongoingMission,     // Initialize as empty array or with any default value if needed
            prevMission         // Initialize as empty array or with any default value if needed
        });

        if (newUser) {
            await newUser.save();
            generateTokenAndSetCookie(newUser._id, res);     // JWT is being sent as a cookie, and user information is sent as a JSON response.
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                email: newUser.email,
                followers: newUser.followers,
                following: newUser.following,
                profileImg: newUser.profileImg,
                coverImg: newUser.coverImg,
                bio: newUser.bio,
                website: newUser.website,
                location: newUser.location,
                ongoingMission: newUser.ongoingMission,
                prevMission: newUser.prevMission

            });

        } else {
            res.status(400).json({ message: "Error creating user" });
        }



    } catch (error) {
        console.log("Error in signup controller: ", error.message);         // Debugging: Display error detail for signup controller.
        res.status(500).json({ error: "Internal server error" });
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
        
        if (!user || !isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        console.log("Received login data:", req.body);          // Debugging: login data received from FrontEnd.
        console.log('User found:', user);                       // Debugging: Before sending the response.
        console.log('Response being sent:', {
            user: {                                             // Debugging: You can add more detail as you see fit. I only put 3 because these are all I need.
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });

        generateTokenAndSetCookie(user._id, res);           // Generate JWT token and set it as a cookie
        res.status(200).json({                              // Return user data (this is important for your frontend to receive user info)
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            email: user.email,
            followers: user.followers,
            following: user.following,
            profileImg: user.profileImg,
            coverImg: user.coverImg,
            bio: user.bio,
            website: user.website,
            location: user.location,
            ongoingMission: user.ongoingMission,
            prevMission: user.prevMission
        });

    } catch (error) {
        console.log("Error in login controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("jwt_token", "", { 
            maxAge: 0, 
            httpOnly: true, 
            sameSite: process.env.NODE_ENV === 'development' ? 'lax' : 'none', // Adjust for development and production
            secure: process.env.NODE_ENV !== 'development' 
        });
        res.status(200).json({ message: "Logged out successfully" });
        console.log("User has successfully logged out.");
    } catch (error) {

        console.log("Error in logout controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });

    }
}

export const getMe = async (req, res) => {

    try {
        const user = await User.findById(req.user._id).select("-password");
        res.status(200).json(user);

    } catch (error) {
        console.log("Error in getMe controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });

    }
}
export const update = async (req, res) => {
    try {
        const { _id, fullName, profileImg, coverImg, bio, website, location } = req.body;

        if (!_id) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const user = await User.findById(_id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }


        if (fullName) user.fullName = fullName;
        if (profileImg) user.profileImg = profileImg;
        if (coverImg) user.coverImg = coverImg;
        if (bio) user.bio = bio;
        if (website) user.website = website;
        if (location) user.location = location;

        const updated = await user.save();

        res.status(200).json({
            _id: updated._id,
            fullName: updated.fullName,
            profileImg: updated.profileImg,
            coverImg: updated.coverImg,
            bio: updated.bio,
            website: updated.website,
            location: updated.location,
        });

    } catch (error) {
        console.log("Error in update controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};



