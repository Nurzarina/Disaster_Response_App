import { useState } from 'react';
import Posts from '../utils/common/Posts';
import CreatePost from './CreatePost';
import './PostHomePage.css';

const PostHomePage = () => {
    const [feedType, setFeedType] = useState('forYou');

    return (
        <div className='post-container'>
            <div className='post-header'>
                <div className='nav-tabs'>
                    <a className={`nav-link ${feedType === 'forYou' ? 'active' : ''}`} onClick={() => setFeedType('forYou')}>For you</a>
                    <a className={`nav-link ${feedType === 'following' ? 'active' : ''}`} onClick={() => setFeedType('following')}>Following</a>
                </div>
            </div>
            <CreatePost />
            <Posts feedType={feedType} />
        </div>
    );
};

export default PostHomePage;