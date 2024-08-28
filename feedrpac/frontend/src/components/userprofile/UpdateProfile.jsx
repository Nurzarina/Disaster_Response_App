import { useState } from 'react';
import { useAuth } from '../login/AuthProvider'; // Adjust the path as needed

const UpdateProfile = () => {
    const { user, update } = useAuth();
    const [profileImg, setProfileImg] = useState(user.profileImg);
    const [coverImg, setCoverImg] = useState(user.coverImg);
    const [bio, setBio] = useState(user.bio);
    const [website, setWebsite] = useState(user.website);
    const [location, setLocation] = useState(user.location);

    const handleSave = () => {
        const updatedProfile = {
            _id: user._id,
            profileImg,
            coverImg,
            bio,
            website,
            location
        };
        update(updatedProfile);
    };

    return (
        <div>
            <div>
                <label>Profile Image URL:</label>
                <input type="text" value={profileImg} onChange={(e) => setProfileImg(e.target.value)} />
            </div>
            <div>
                <label>Cover Image URL:</label>
                <input type="text" value={coverImg} onChange={(e) => setCoverImg(e.target.value)} />
            </div>
            <div>
                <label>Bio:</label>
                <textarea value={bio} onChange={(e) => setBio(e.target.value)}></textarea>
            </div>
            <div>
                <label>Website:</label>
                <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} />
            </div>
            <div>
                <label>Location:</label>
                <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
            </div>
            <button onClick={handleSave}>Save Changes</button>
        </div>
    );
};

export default UpdateProfile;
