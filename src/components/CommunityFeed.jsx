import React, { useState, useEffect, useRef } from 'react';
import './CommunityFeed.css';

const CommunityFeed = () => {
  const [activeTab, setActiveTab] = useState('posts'); // 'posts' or 'chat'
  const [posts, setPosts] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    description: '',
    image: null,
    imagePreview: null
  });
  const [newMessage, setNewMessage] = useState('');
  const [editingPost, setEditingPost] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);
  const chatEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Mock user data (replace with actual user context)
  const currentUser = {
    id: 1,
    name: 'You',
    avatar: '👤'
  };

  // Load initial data
  useEffect(() => {
    loadPosts();
    loadChatMessages();
  }, []);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (activeTab === 'chat') {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, activeTab]);

  const loadPosts = () => {
    // Mock posts data
    const mockPosts = [
      {
        id: 1,
        userId: 2,
        userName: 'Maria Santos',
        userAvatar: '👩',
        title: 'Amazing sunset at Boracay!',
        description: 'Just witnessed the most beautiful sunset at White Beach. The colors were absolutely breathtaking! 🌅',
        image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        likes: 24,
        comments: []
      },
      {
        id: 2,
        userId: 3,
        userName: 'Juan Dela Cruz',
        userAvatar: '👨',
        title: 'Hiking Mt. Pulag',
        description: 'Reached the summit at dawn! The sea of clouds is real! Worth every step of the climb. 🏔️',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
        likes: 18,
        comments: [
          {
            id: 1,
            userId: 4,
            userName: 'Ana Reyes',
            userAvatar: '👩‍🦰',
            text: 'This looks incredible! How difficult was the hike?',
            timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000)
          }
        ]
      }
    ];
    setPosts(mockPosts);
  };

  const loadChatMessages = () => {
    // Mock chat messages
    const mockMessages = [
      {
        id: 1,
        userId: 2,
        userName: 'Maria Santos',
        userAvatar: '👩',
        text: 'Hey everyone! Planning a trip to Palawan next month. Any recommendations?',
        timestamp: new Date(Date.now() - 30 * 60 * 1000)
      },
      {
        id: 2,
        userId: 3,
        userName: 'Juan Dela Cruz',
        userAvatar: '👨',
        text: 'Definitely visit El Nido! The island hopping tours are amazing.',
        timestamp: new Date(Date.now() - 25 * 60 * 1000)
      }
    ];
    setChatMessages(mockMessages);
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPost({
          ...newPost,
          image: file,
          imagePreview: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreatePost = () => {
    if (!newPost.title.trim()) {
      alert('Please add a title to your post');
      return;
    }

    const post = {
      id: posts.length + 1,
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      title: newPost.title,
      description: newPost.description,
      image: newPost.imagePreview,
      timestamp: new Date(),
      likes: 0,
      comments: []
    };

    setPosts([post, ...posts]);
    setNewPost({ title: '', description: '', image: null, imagePreview: null });
    setShowCreatePost(false);
  };

  const handleUpdatePost = () => {
    setPosts(posts.map(post => 
      post.id === editingPost.id 
        ? { ...post, title: editingPost.title, description: editingPost.description }
        : post
    ));
    setEditingPost(null);
  };

  const handleDeletePost = (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setPosts(posts.filter(post => post.id !== postId));
    }
  };

  const handleLikePost = (postId) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  const handleAddComment = (postId, commentText) => {
    if (!commentText.trim()) return;

    const comment = {
      id: Date.now(),
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      text: commentText,
      timestamp: new Date()
    };

    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, comments: [...post.comments, comment] }
        : post
    ));

    setReplyingTo(null);
  };

  const handleDeleteComment = (postId, commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      setPosts(posts.map(post =>
        post.id === postId
          ? { ...post, comments: post.comments.filter(c => c.id !== commentId) }
          : post
      ));
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: chatMessages.length + 1,
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      text: newMessage,
      timestamp: new Date()
    };

    setChatMessages([...chatMessages, message]);
    setNewMessage('');
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="community-feed">
      <div className="community-header">
        <h1>🌏 Travel Community</h1>
        <p>Share your adventures and connect with fellow travelers</p>
      </div>

      <div className="community-tabs">
        <button 
          className={`tab-button ${activeTab === 'posts' ? 'active' : ''}`}
          onClick={() => setActiveTab('posts')}
        >
          <span className="tab-icon">📝</span>
          Posts
        </button>
        <button 
          className={`tab-button ${activeTab === 'chat' ? 'active' : ''}`}
          onClick={() => setActiveTab('chat')}
        >
          <span className="tab-icon">💬</span>
          Community Chat
        </button>
      </div>

      {activeTab === 'posts' && (
        <div className="posts-section">
          <button 
            className="create-post-btn"
            onClick={() => setShowCreatePost(true)}
          >
            <span>✨</span> Share Your Travel Story
          </button>

          {showCreatePost && (
            <div className="create-post-modal">
              <div className="modal-content">
                <div className="modal-header">
                  <h2>Create New Post</h2>
                  <button 
                    className="close-btn"
                    onClick={() => {
                      setShowCreatePost(false);
                      setNewPost({ title: '', description: '', image: null, imagePreview: null });
                    }}
                  >
                    ✕
                  </button>
                </div>
                <div className="modal-body">
                  <input
                    type="text"
                    placeholder="Give your post a title..."
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    className="post-input"
                  />
                  <textarea
                    placeholder="Share your experience, tips, or recommendations..."
                    value={newPost.description}
                    onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
                    className="post-textarea"
                    rows="4"
                  />
                  
                  {newPost.imagePreview && (
                    <div className="image-preview">
                      <img src={newPost.imagePreview} alt="Preview" />
                      <button 
                        className="remove-image-btn"
                        onClick={() => setNewPost({ ...newPost, image: null, imagePreview: null })}
                      >
                        ✕
                      </button>
                    </div>
                  )}

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageSelect}
                    accept="image/*"
                    style={{ display: 'none' }}
                  />
                  
                  <div className="modal-actions">
                    <button 
                      className="upload-image-btn"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      📷 Add Photo
                    </button>
                    <button 
                      className="submit-post-btn"
                      onClick={handleCreatePost}
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="posts-list">
            {posts.map(post => (
              <PostCard
                key={post.id}
                post={post}
                currentUser={currentUser}
                onLike={handleLikePost}
                onDelete={handleDeletePost}
                onEdit={setEditingPost}
                onAddComment={handleAddComment}
                onDeleteComment={handleDeleteComment}
                formatTimestamp={formatTimestamp}
                editingPost={editingPost}
                onUpdatePost={handleUpdatePost}
                onCancelEdit={() => setEditingPost(null)}
                replyingTo={replyingTo}
                setReplyingTo={setReplyingTo}
              />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'chat' && (
        <div className="chat-section">
          <div className="chat-messages">
            {chatMessages.map(message => (
              <div 
                key={message.id} 
                className={`chat-message ${message.userId === currentUser.id ? 'own-message' : ''}`}
              >
                <div className="message-avatar">{message.userAvatar}</div>
                <div className="message-content">
                  <div className="message-header">
                    <span className="message-user">{message.userName}</span>
                    <span className="message-time">{formatTimestamp(message.timestamp)}</span>
                  </div>
                  <div className="message-text">{message.text}</div>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          
          <div className="chat-input-container">
            <input
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="chat-input"
            />
            <button 
              className="send-message-btn"
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// PostCard Component
const PostCard = ({ 
  post, 
  currentUser, 
  onLike, 
  onDelete, 
  onEdit,
  onAddComment,
  onDeleteComment,
  formatTimestamp,
  editingPost,
  onUpdatePost,
  onCancelEdit,
  replyingTo,
  setReplyingTo
}) => {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');

  const handleSubmitComment = () => {
    onAddComment(post.id, commentText);
    setCommentText('');
  };

  if (editingPost && editingPost.id === post.id) {
    return (
      <div className="post-card editing">
        <div className="post-header">
          <h3>Edit Post</h3>
          <button className="cancel-edit-btn" onClick={onCancelEdit}>✕</button>
        </div>
        <input
          type="text"
          value={editingPost.title}
          onChange={(e) => onEdit({ ...editingPost, title: e.target.value })}
          className="post-input"
        />
        <textarea
          value={editingPost.description}
          onChange={(e) => onEdit({ ...editingPost, description: e.target.value })}
          className="post-textarea"
          rows="4"
        />
        <button className="save-edit-btn" onClick={onUpdatePost}>
          Save Changes
        </button>
      </div>
    );
  }

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="post-user-info">
          <span className="user-avatar">{post.userAvatar}</span>
          <div className="user-details">
            <span className="user-name">{post.userName}</span>
            <span className="post-time">{formatTimestamp(post.timestamp)}</span>
          </div>
        </div>
        {post.userId === currentUser.id && (
          <div className="post-actions">
            <button 
              className="action-btn edit-btn"
              onClick={() => onEdit({ ...post })}
              title="Edit post"
            >
              ✏️
            </button>
            <button 
              className="action-btn delete-btn"
              onClick={() => onDelete(post.id)}
              title="Delete post"
            >
              🗑️
            </button>
          </div>
        )}
      </div>

      <div className="post-content">
        <h3 className="post-title">{post.title}</h3>
        {post.description && <p className="post-description">{post.description}</p>}
        {post.image && (
          <div className="post-image">
            <img src={post.image} alt={post.title} />
          </div>
        )}
      </div>

      <div className="post-footer">
        <button 
          className="post-footer-btn like-btn"
          onClick={() => onLike(post.id)}
        >
          <span className="btn-icon">❤️</span>
          <span className="btn-text">{post.likes} Likes</span>
        </button>
        <button 
          className="post-footer-btn comment-btn"
          onClick={() => setShowComments(!showComments)}
        >
          <span className="btn-icon">💬</span>
          <span className="btn-text">{post.comments.length} Comments</span>
        </button>
        <button className="post-footer-btn share-btn">
          <span className="btn-icon">🔗</span>
          <span className="btn-text">Share</span>
        </button>
      </div>

      {showComments && (
        <div className="comments-section">
          <div className="comments-list">
            {post.comments.map(comment => (
              <div key={comment.id} className="comment">
                <span className="comment-avatar">{comment.userAvatar}</span>
                <div className="comment-content">
                  <div className="comment-header">
                    <span className="comment-user">{comment.userName}</span>
                    <span className="comment-time">{formatTimestamp(comment.timestamp)}</span>
                    {comment.userId === currentUser.id && (
                      <button 
                        className="delete-comment-btn"
                        onClick={() => onDeleteComment(post.id, comment.id)}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                  <p className="comment-text">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="add-comment">
            <input
              type="text"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmitComment()}
              className="comment-input"
            />
            <button 
              className="submit-comment-btn"
              onClick={handleSubmitComment}
              disabled={!commentText.trim()}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityFeed;
