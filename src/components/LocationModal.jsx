import React from 'react';
import './LocationModal.css';

const LocationModal = ({ location, onClose, onMarkBeen, onMarkWant, onAskAI }) => {
  if (!location) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        
        <div className="modal-header">
          <h2>{location.name}</h2>
          <div className="region-badge">{location.region}</div>
        </div>

        <div className="modal-body">
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
