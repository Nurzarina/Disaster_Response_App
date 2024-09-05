import Post from './Post';
import PostSkeleton from '../skeletons/PostSkeleton';
import { POSTS } from '../../utils/db/dummy';
import { Container, Row } from 'react-bootstrap';

const Posts = ({ feedType }) => {
    const isLoading = false; // Replace with actual loading state from Redux store

    const filteredPosts = feedType === 'forYou' ? POSTS : POSTS.filter(post => post.user.isFollowing);

    return (
        <Container>
            <Row>
                {isLoading && (
                    <div className='flex flex-col justify-center'>
                        <PostSkeleton />
                        <PostSkeleton />
                        <PostSkeleton />
                    </div>
                )}
                {!isLoading && filteredPosts?.length === 0 && <p className='text-center my-4'>No posts in this tab. Switch 👻</p>}
                {!isLoading && filteredPosts && (
                    <div>
                        {filteredPosts.map((post) => (
                            <Post key={post._id} post={post} />
                        ))}
                    </div>
                )}
            </Row>
        </Container>
    );
};

export default Posts;