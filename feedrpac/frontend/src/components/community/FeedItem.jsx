import { useState, useEffect } from 'react';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa'; 
import './FeedItem.css';

const FeedItem = ({ item }) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');

  const fetchComments = async () => {
    try {
      const response = await fetch(`http://localhost:5050/api/posts/${item.id}/comments`);
      if (!response.ok) {
        throw new Error('Error fetching comments');
      }
      const data = await response.json();
      setComments(data);
    } catch (err) {
      console.error('Error fetching comments:', err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      try {
        const response = await fetch(`http://localhost:5050/api/posts/${item.id}/comments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: commentText }),
        });
        if (!response.ok) {
          throw new Error('Error posting comment');
        }
        const data = await response.json();
        setComments([data, ...comments]);
        setCommentText('');
      } catch (err) {
        console.error('Error posting comment:', err);
      }
    }
  };

  const handleVote = async (id, vote) => {
    try {
      const response = await fetch(`http://localhost:5050/api/comments/${id}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ vote }),
      });
      if (!response.ok) {
        throw new Error('Error voting on comment');
      }
      const data = await response.json();
      setComments((prevComments) =>
        prevComments
          .map((comment) => (comment._id === id ? data : comment))
          .sort((a, b) => b.votes - a.votes)
      );
    } catch (err) {
      console.error('Error voting:', err);
    }
  };

  return (
    <div className="feed-item">
      <h2>{item.title}</h2>
      <p>{item.body}</p>
      {item.image && <img src={item.image} alt="Feed" className="small-image" />}
      <br />
      <small>{new Date(item.timestamp).toLocaleString()}</small>

      <div className="comments-section">
        <h3>Comments</h3>
        <form onSubmit={handleCommentSubmit}>
          <input
            type="text"
            value={commentText}
            onChange={handleCommentChange}
            placeholder="Add a comment"
            style={{ padding: '5px', width: '80%' }}
          />
          <button type="submit" style={{ padding: '5px 10px', marginLeft: '5px' }}>
            Submit
          </button>
        </form>
        <ul style={{ listStyleType: 'none', padding: 0, marginTop: '10px' }}>
          {comments.map((comment) => (
            <li
              key={comment._id}
              style={{ borderBottom: '1px solid #eee', padding: '5px 0', display: 'flex', alignItems: 'center' }}
            >
              <p style={{ flex: 1 }}>{comment.text}</p>
              <small style={{ marginRight: '10px' }}>{new Date(comment.timestamp).toLocaleString()}</small>
              <button
                onClick={() => handleVote(comment._id, 1)}
                style={{ padding: '5px', marginLeft: '5px' }}
              >
                <FaThumbsUp />
                <span style={{ marginLeft: '5px' }}>{comment.votes}</span>
              </button>
              <button
                onClick={() => handleVote(comment._id, -1)}
                style={{ padding: '5px', marginLeft: '5px' }}
              >
                <FaThumbsDown />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FeedItem;
