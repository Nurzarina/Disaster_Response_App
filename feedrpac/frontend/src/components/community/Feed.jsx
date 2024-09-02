import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FeedItem from './FeedItem';

const Feed = () => {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState(null);



  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && body.trim()) {
      const newItem = {
        id: Date.now(),
        title,
        body,
        image: image ? URL.createObjectURL(image) : null,
        timestamp: new Date().toISOString()
      };
      setItems([newItem, ...items]);
      setTitle('');
      setBody('');
      setImage(null);
    }
  };

  return (
    <div>
      <h1>Feed</h1>
      <div>
        <form onSubmit={handlePostSubmit} style={{ marginBottom: '20px' }}>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Title"
            style={{padding: '5px', marginBottom: '10px' }}
          />
          <br />
          <textarea
            value={body}
            onChange={handleBodyChange}
            placeholder="Body"
            style={{padding: '5px', height: '100px' }}
          />
          <br />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ marginTop: '10px' }}
          />
          <br />
          <button type="submit" style={{ padding: '10px 20px', marginTop: '10px' }}>
            Post
          </button>
        </form>
        {items.map(item => (
          <FeedItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Feed;