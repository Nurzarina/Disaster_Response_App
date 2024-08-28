import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../lib/utils/GenerateToken.js";

export const signup = async (req, res) => {

    console.log("Received signup data:", req.body);            // To see if the data from FrontEnd is received.

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
    }

    const userExists = await User.findOne({ username });
    if(userExists) {
        return res.status(400).json({ message: "Username already exists" });
    }
    
    const emailExists = await User.findOne({ email });
    if(emailExists) {
        return res.status(400).json({ message: "Email already used" });
    }
    
    if (password.length < 8) {
        return res.status(400).json({ message: "Password must be at least 8 characters long" });
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
        ongoingMission,  // Initialize as empty array or with any default value if needed
        prevMission     // Initialize as empty array or with any default value if needed
    });

    if(newUser) {
        await newUser.save();
        generateTokenAndSetCookie(newUser._id, res);     // Send JWT as a cookie

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
    console.log("Error in signup controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
   }
}

export const login = async (req, res) => {
    try {
        const {username, password } = req.body;
        const user = await User.findOne({ username });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!user || !isPasswordCorrect){
            return res.status(401).json({ message: "Invalid username or password" });
        }

        console.log("Received login data:", req.body);

        generateTokenAndSetCookie(user._id, res);
        res.status(200).json({
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
        })

    } catch (error) {
        console.log("Error in login controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("jwt_token", "", {maxAge: 0})
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
