import React, { useState } from 'react';
import './LocationModal.css';

const LocationModal = ({ location, onClose, onMarkBeen, onMarkWant, onAskAI }) => {
  const [showCommunity, setShowCommunity] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [communityMessages, setCommunityMessages] = useState([]);
  const [messageLikes, setMessageLikes] = useState({});

  if (!location) return null;

  // Community insights data for each location
  const communityInsights = {
    manila: [
      { id: 1, user: 'Sean', avatar: '👨', message: 'Just visited Intramuros! The historical tours are amazing. Don\'t miss the sunset at Manila Bay - absolutely breathtaking! 🌅', time: '2 hours ago', likes: 12 },
      { id: 2, user: 'Jason', avatar: '🧔', message: 'Pro tip: Try the street food in Binondo! Authentic Chinese-Filipino fusion. The Lumpia and Siopao are to die for! 🍜', time: '5 hours ago', likes: 8 },
      { id: 3, user: 'Maria', avatar: '👩', message: 'Solo female traveler here! Manila is safe if you stick to main areas. BGC and Makati are very modern and tourist-friendly. Grab is your best friend! 🚗', time: '1 day ago', likes: 15 },
      { id: 4, user: 'Carlos', avatar: '👨‍💼', message: 'The National Museum is FREE and world-class! Spend at least half a day there. Also, Rizal Park at night is magical. ✨', time: '2 days ago', likes: 10 }
    ],
    cebu: [
      { id: 1, user: 'Jason', avatar: '🧔', message: 'The lechon here is UNREAL! Try CNT Lechon or Zubuchon. Best pork I\'ve ever had. Also, Sinulog Festival in January is a must-see! 🎉', time: '3 hours ago', likes: 20 },
      { id: 2, user: 'Sean', avatar: '👨', message: 'Went island hopping to Moalboal - saw sardine run and sea turtles! Book through local operators for better prices. Kawasan Falls is stunning! 🏝️', time: '6 hours ago', likes: 18 },
      { id: 3, user: 'Elena', avatar: '👩‍🦰', message: 'Magellan\'s Cross and Basilica del Santo Niño are free to visit. The history is incredible! Don\'t forget to try Cebu\'s dried mangoes - perfect pasalubong! 🥭', time: '1 day ago', likes: 14 },
      { id: 4, user: 'Mike', avatar: '🧑', message: 'For budget travelers: Stay in Fuente Osmeña area, lots of cheap hostels and restaurants. Jeepney rides are cheap but download maps offline! 🗺️', time: '3 days ago', likes: 9 }
    ],
    davao: [
      { id: 1, user: 'Sean', avatar: '👨', message: 'The Philippine Eagle Center blew my mind! Seeing these majestic birds up close is surreal. They\'re HUGE! Conservation fee is worth it. 🦅', time: '4 hours ago', likes: 25 },
      { id: 2, user: 'Anna', avatar: '👩', message: 'Tried durian for the first time at Magsaysay Park! Love it or hate it, but you MUST try it here. Also got fresh pomelo - so sweet! 🍈', time: '7 hours ago', likes: 11 },
      { id: 3, user: 'Jason', avatar: '🧔', message: 'Davao is SO clean and safe! You can walk around at night. Visited Eden Nature Park - perfect for families. The skyride has amazing views! 🌲', time: '2 days ago', likes: 16 },
      { id: 4, user: 'Rico', avatar: '🧑‍🦱', message: 'Climbed Mount Apo! 2-day trek, challenging but WORTH IT. Hire a local guide - they know the best routes and keep you safe. 🏔️', time: '4 days ago', likes: 22 }
    ],
    boracay: [
      { id: 1, user: 'Jason', avatar: '🧔', message: 'White Beach at Station 2 is paradise! Sand is like powder. Book sunset sailing - ₱2,500 for a group, includes drinks. Best experience ever! ⛵', time: '1 hour ago', likes: 30 },
      { id: 2, user: 'Sean', avatar: '👨', message: 'Tried helmet diving - you can walk underwater! Also did parasailing and island hopping. Book activities early morning for best rates. 🤿', time: '5 hours ago', likes: 24 },
      { id: 3, user: 'Sophie', avatar: '👩‍🦱', message: 'Puka Beach is less crowded than White Beach! Perfect for peaceful mornings. Station 1 has the finest sand. D\'Mall for shopping and food! 🛍️', time: '1 day ago', likes: 19 },
      { id: 4, user: 'Jake', avatar: '🧑', message: 'Budget tip: Stay in Station 3, way cheaper! Party at Epic nightclub if you\'re into that. Fire dancers at night are FREE entertainment! 🔥', time: '2 days ago', likes: 15 }
    ],
    palawan: [
      { id: 1, user: 'Sean', avatar: '👨', message: 'El Nido is BREATHTAKING! Did Tour A and C - Secret Lagoon and Hidden Beach are incredible. Kayaking through limestone cliffs is magical! 🛶', time: '2 hours ago', likes: 35 },
      { id: 2, user: 'Jason', avatar: '🧔', message: 'Book island hopping early! Tours fill up fast in peak season. Tour A is best for first-timers. Big Lagoon and Small Lagoon are must-sees! 🏝️', time: '6 hours ago', likes: 28 },
      { id: 3, user: 'Emma', avatar: '👩', message: 'Nacpan Beach is a hidden gem - 4km of pristine sand, barely any tourists! Rent a motorbike to get there. Las Cabanas beach for sunset! 🌅', time: '1 day ago', likes: 21 },
      { id: 4, user: 'Diego', avatar: '🧑‍🦰', message: 'Underground River in Puerto Princesa is world heritage! Book 2 days advance. The cave formations are insane. Bring a waterproof phone case! 📸', time: '3 days ago', likes: 26 }
    ],
    baguio: [
      { id: 1, user: 'Jason', avatar: '🧔', message: 'The weather is PERFECT! 15-20°C even in summer. Bring a jacket! Mines View Park has great strawberries and mountain views. 🍓', time: '3 hours ago', likes: 18 },
      { id: 2, user: 'Sean', avatar: '👨', message: 'Burnham Park boat rides are fun! Session Road for shopping and ukay-ukay finds. Good Shepherd for pasalubong - their ube jam is famous! 🫙', time: '8 hours ago', likes: 14 },
      { id: 3, user: 'Lily', avatar: '👩', message: 'Tam-Awan Village showcases Cordillera culture beautifully. Also visited Botanical Garden and Bell Church. The whole city is Instagram-worthy! 📷', time: '1 day ago', likes: 16 },
      { id: 4, user: 'Mark', avatar: '🧑', message: 'Traffic is CRAZY on weekends! Visit weekdays if possible. Try strawberry taho and fresh vegetables at the market. Affordable accommodations everywhere! 🚗', time: '2 days ago', likes: 12 }
    ],
    vigan: [
      { id: 1, user: 'Sean', avatar: '👨', message: 'Calle Crisologo at night is like time travel! Cobblestone streets, Spanish houses, kalesa rides - pure magic. No cars allowed, so peaceful! 🐴', time: '4 hours ago', likes: 22 },
      { id: 2, user: 'Jason', avatar: '🧔', message: 'Vigan empanada is LEGENDARY! Orange shell, filled with veggies and egg. Also tried bagnet and longganisa - Ilocano food is underrated! 🥟', time: '7 hours ago', likes: 19 },
      { id: 3, user: 'Rosa', avatar: '👩', message: 'Stayed at a heritage hotel - felt like Spanish colonial times! Crisologo Museum and Bantay Bell Tower are must-visits. The architecture is preserved perfectly! 🏛️', time: '2 days ago', likes: 15 },
      { id: 4, user: 'Luis', avatar: '🧑', message: 'Don\'t miss Baluarte Zoo (FREE!) and pottery-making at Pagburnayan. Buy authentic Vigan jars as souvenirs. Very affordable place to visit! 🏺', time: '3 days ago', likes: 13 }
    ],
    siargao: [
      { id: 1, user: 'Jason', avatar: '🧔', message: 'Cloud 9 boardwalk is iconic! Watched surfers catch massive waves. Even if you don\'t surf, the vibe here is incredible. Sunset sessions! 🏄', time: '2 hours ago', likes: 28 },
      { id: 2, user: 'Sean', avatar: '👨', message: 'Took a surf lesson at Cloud 9 - stood up on my first day! ₱500 for 2 hours with board rental. Instructors are patient and friendly! 🌊', time: '5 hours ago', likes: 24 },
      { id: 3, user: 'Mia', avatar: '👩', message: 'Sugba Lagoon is a MUST! Crystal clear water, floating cottages, cliff jumping. Book a boat tour - ₱1,500 per person, includes lunch. Heaven! 🛥️', time: '1 day ago', likes: 31 },
      { id: 4, user: 'Alex', avatar: '🧑', message: 'Island hopping to Naked Island, Daku, and Guyam! Pack snacks and water. Rent a motorbike to explore - roads are good. Laid-back island life! 🏝️', time: '2 days ago', likes: 20 }
    ],
    'chocolate-hills': [
      { id: 1, user: 'Sean', avatar: '👨', message: 'The hills are STUNNING! Over 1,200 of them! Best viewed from the observation deck. Visit during dry season when they turn chocolate brown! 🍫', time: '3 hours ago', likes: 26 },
      { id: 2, user: 'Jason', avatar: '🧔', message: 'Combined this with Tarsier Sanctuary - saw the world\'s smallest primates! They\'re nocturnal but so cute. Loboc River cruise for lunch is relaxing! 🐵', time: '6 hours ago', likes: 22 },
      { id: 3, user: 'Nina', avatar: '👩', message: 'Did ATV tour around the hills - super fun! Panglao beaches are just 2 hours away. Bohol is packed with attractions, plan at least 3 days! 🏍️', time: '1 day ago', likes: 18 },
      { id: 4, user: 'Tom', avatar: '🧑', message: 'Baclayon Church and Blood Compact Shrine are nearby. The geological formation is unique in the world! Entrance fee is minimal. Worth the trip! ⛰️', time: '3 days ago', likes: 14 }
    ],
    mayon: [
      { id: 1, user: 'Jason', avatar: '🧔', message: 'The perfect cone shape is unreal! Did ATV tour around Mayon - thrilling ride through lava trails. Cagsawa Ruins with Mayon backdrop is iconic! 🌋', time: '4 hours ago', likes: 24 },
      { id: 2, user: 'Sean', avatar: '👨', message: 'Tried authentic Bicol Express and laing - SO SPICY but delicious! The food here is incredible. Pili nuts as pasalubang are unique! 🌶️', time: '7 hours ago', likes: 19 },
      { id: 3, user: 'Isabella', avatar: '👩', message: 'Climbed to Mayon\'s base camp - challenging but manageable. The view of Albay province from up there is spectacular. Hire certified guides! 🥾', time: '2 days ago', likes: 21 },
      { id: 4, user: 'Rafael', avatar: '🧑', message: 'Legazpi is underrated! Whale shark watching in Donsol is nearby. The city is clean and organized. Sumlang Lake has perfect Mayon reflection! 📷', time: '3 days ago', likes: 17 }
    ]
  };

  const currentCommunity = communityInsights[location.id] || [];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: Date.now(),
        user: 'You',
        avatar: '😊',
        message: newMessage,
        time: 'Just now',
        likes: 0,
        isOwn: true
      };
      setCommunityMessages([...communityMessages, newMsg]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleLike = (messageId) => {
    setMessageLikes(prev => ({
      ...prev,
      [messageId]: (prev[messageId] || 0) + 1
    }));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        
        <div className="modal-header">
          <h2>{location.name}</h2>
          <div className="region-badge">{location.region}</div>
        </div>

        {/* Tab Navigation */}
        <div className="modal-tabs">
          <button 
            className={`tab-button ${!showCommunity ? 'active' : ''}`}
            onClick={() => setShowCommunity(false)}
          >
            📍 Information
          </button>
          <button 
            className={`tab-button ${showCommunity ? 'active' : ''}`}
            onClick={() => setShowCommunity(true)}
          >
            💬 Community Chat
            <span className="tab-badge">{currentCommunity.length + communityMessages.length}</span>
          </button>
        </div>

        <div className="modal-body">
          {/* Information Tab */}
          {!showCommunity && (
            <div className="info-section">
              <div className="location-image">
                <img 
                  src={location.image || '/assets/images/philippines-placeholder.jpg'} 
                  alt={location.name}
                  onError={(e) => {
                    e.target.src = '/assets/images/philippines-placeholder.jpg';
                  }}
                />
              </div>

              <p className="location-description">
                {location.description || 'Discover this beautiful location in the Philippines!'}
              </p>

              {location.highlights && (
                <div className="highlights">
                  <h4>✨ Highlights:</h4>
                  <ul>
                    {location.highlights.map((highlight, index) => (
                      <li key={index}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Community Chat Tab */}
          {showCommunity && (
            <div className="community-section">
              <div className="community-messages">
                {currentCommunity.map((msg) => {
                  const messageKey = `${location.id}-${msg.id}`;
                  const currentLikes = messageLikes[messageKey] !== undefined 
                    ? msg.likes + messageLikes[messageKey]
                    : msg.likes;
                  
                  return (
                    <div key={msg.id} className="community-message">
                      <div className="message-avatar">{msg.avatar}</div>
                      <div className="message-content">
                        <div className="message-header">
                          <span className="message-user">{msg.user}</span>
                          <span className="message-time">{msg.time}</span>
                        </div>
                        <p className="message-text">{msg.message}</p>
                        <div className="message-footer">
                          <button 
                            className="message-like"
                            onClick={() => handleLike(messageKey)}
                          >
                            <span>👍</span> {currentLikes}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {communityMessages.map((msg, index) => (
                  <div key={index} className={`community-message ${msg.user === 'You' ? 'own-message' : ''}`}>
                    <div className="message-avatar">{msg.avatar}</div>
                    <div className="message-content">
                      <div className="message-header">
                        <span className="message-user">{msg.user}</span>
                        <span className="message-time">{msg.time}</span>
                      </div>
                      <p className="message-text">{msg.message}</p>
                      <div className="message-footer">
                        <button 
                          className="message-like"
                          onClick={() => handleLike(`${msg.id || index}`)}
                        >
                          <span>👍</span> {messageLikes[`${msg.id || index}`] || msg.likes || 0}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="community-input">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Share your experience..."
                  className="message-input"
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="send-button"
                >
                  Send
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="modal-actions">
          <button onClick={onMarkBeen} className="btn btn-success">
            ✅ Been There
          </button>
          <button onClick={onMarkWant} className="btn btn-warning">
            ⭐ Want to Go
          </button>
          <button onClick={onAskAI} className="btn btn-primary">
            🤖 Ask AI
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;
