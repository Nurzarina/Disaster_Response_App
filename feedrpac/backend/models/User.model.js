import mongoose from 'mongoose';

const missionSchema = new mongoose.Schema({
    missionId: { type: String, required: true },
    status: { type: String, required: true },
    startDate: { type: Date, required: true }
}, { _id: false }); // _id: false to not create a separate _id for each mission object

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    password: { type: String, required: true, minlength: 8 },
    email: { type: String, required: true, unique: true },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }],
    profileImg: { type: String, default: '' },
    coverImg: { type: String, default: '' },
    bio: { type: String, default: '' },
    website: { type: String, default: '' },
    likedPosts:[{type: mongoose.Schema.Types.ObjectId, ref: 'Post', default: []}],
    location: { type: String, default: '' },
    ongoingMission: [missionSchema], // Array of ongoing missions
    prevMission: [missionSchema], // Array of previous missions
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
