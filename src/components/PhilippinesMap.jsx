import React, { useEffect, useRef, useState } from 'react';
import './PhilippinesMap.css';
import philippinesData from '../data/philippines_locations.json';

const PhilippinesMap = ({ onLocationClick, userProfile }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Load Leaflet CSS
    const leafletCSS = document.createElement('link');
    leafletCSS.rel = 'stylesheet';
    leafletCSS.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    leafletCSS.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
    leafletCSS.crossOrigin = '';
    document.head.appendChild(leafletCSS);

    // Load Leaflet JS
    const leafletJS = document.createElement('script');
    leafletJS.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    leafletJS.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
    leafletJS.crossOrigin = '';
    
    leafletJS.onload = () => {
      setMapLoaded(true);
    };
    
    document.body.appendChild(leafletJS);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (!mapLoaded || !window.L || mapInstanceRef.current) return;

    // Initialize map centered on the Philippines
    const map = window.L.map(mapRef.current).setView([12.8797, 121.7740], 6);

    // Add OpenStreetMap tiles
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    mapInstanceRef.current = map;

    // Add click handler for map - allows clicking anywhere!
    map.on('click', async (e) => {
      const { lat, lng } = e.latlng;
      
      // Use reverse geocoding to get location info
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10`
        );
        const data = await response.json();
        
        console.log('Full Nominatim data:', data); // Debug: see what we get
        
        // Extract comprehensive location information
        const address = data.address || {};
        
        // Build location name with priority order (most specific to least specific)
        const locationName = data.name || 
                            address.tourism ||
                            address.village || 
                            address.town || 
                            address.city || 
                            address.municipality ||
                            address.suburb ||
                            address.neighbourhood ||
                            address.hamlet ||
                            address.county ||
                            address.state_district ||
                            data.display_name?.split(',')[0] ||
                            'Discovered Location';
        
        // Get region/province
        const region = address.state || 
                      address.province || 
                      address.region ||
                      'Philippines';
        
        // Build detailed description
        let description = `You've discovered ${locationName}`;
        if (address.city && address.city !== locationName) {
          description += ` in ${address.city}`;
        }
        if (region !== 'Philippines') {
          description += `, ${region}`;
        }
        description += '! ';
        
        // Add context based on what type of place it is
        if (address.tourism) {
          description += `This is a ${address.tourism} destination. `;
        } else if (address.amenity) {
          description += `This area features ${address.amenity} facilities. `;
        } else if (data.type === 'city' || data.type === 'town') {
          description += `This is a ${data.type} area. `;
        }
        
        description += `Click 'Ask AI' to discover local attractions, culture, food, and travel tips for this specific location!`;
        
        // Build dynamic highlights based on actual location data
        const highlights = [];
        
        // Add specific features if available
        if (address.tourism) highlights.push(`${address.tourism} destination`);
        if (address.amenity) highlights.push(`${address.amenity} available`);
        if (address.city && address.city !== locationName) highlights.push(`Part of ${address.city}`);
        if (region && region !== 'Philippines') highlights.push(`${region} region`);
        
        // Add generic helpful options
        highlights.push('Local culture and traditions');
        highlights.push('Nearby attractions');
        highlights.push('Regional cuisine and specialties');
        highlights.push('Best time to visit');
        highlights.push('Travel tips and recommendations');
        
        // If it's a natural feature
        if (data.class === 'natural' || address.natural) {
          highlights.push('Natural scenery and beauty');
        }
        
        // Create a custom location object from the clicked area
        const clickedLocation = {
          id: `custom-${Date.now()}`,
          name: locationName,
          region: region,
          lat: lat,
          lng: lng,
          description: description,
          highlights: highlights.slice(0, 6), // Limit to 6 highlights
          image: '/assets/images/philippines-placeholder.jpg',
          isCustom: true,
          fullAddress: data.display_name, // Keep full address for AI context
          locationType: data.type || data.class || 'location'
        };
        
        // Add a temporary marker
        const tempIcon = window.L.divIcon({
          className: 'custom-marker',
          html: `
            <div style="
              background-color: #8b5cf6;
              width: 30px;
              height: 30px;
              border-radius: 50%;
              border: 3px solid white;
              box-shadow: 0 2px 5px rgba(0,0,0,0.3);
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 16px;
              cursor: pointer;
              animation: pulse 1s ease-in-out infinite;
            ">
              🔍
            </div>
            <style>
              @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
              }
            </style>
          `,
          iconSize: [30, 30],
          iconAnchor: [15, 15],
        });
        
        const tempMarker = window.L.marker([lat, lng], { icon: tempIcon })
          .addTo(map)
          .bindPopup(`
            <div style="text-align: center;">
              <h3 style="margin: 0 0 5px 0; color: #1f2937;">📍 ${clickedLocation.name}</h3>
              <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 0.875rem;">${clickedLocation.region}</p>
              <p style="margin: 0; color: #8b5cf6; font-size: 0.75rem;">Click to explore this area!</p>
            </div>
          `)
          .openPopup();
        
        // When clicked, open the location modal
        tempMarker.on('click', () => {
          onLocationClick(clickedLocation);
          // Remove temp marker after a delay
          setTimeout(() => tempMarker.remove(), 500);
        });
        
        // Auto-remove after 10 seconds if not clicked
        setTimeout(() => {
          if (map.hasLayer(tempMarker)) {
            tempMarker.remove();
          }
        }, 10000);
        
      } catch (error) {
        console.error('Error fetching location info:', error);
        
        // Fallback if geocoding fails - use coordinates
        const basicLocation = {
          id: `custom-${Date.now()}`,
          name: `Location at ${lat.toFixed(4)}°N, ${lng.toFixed(4)}°E`,
          region: 'Philippines',
          lat: lat,
          lng: lng,
          description: `You've clicked on coordinates ${lat.toFixed(4)}°N, ${lng.toFixed(4)}°E in the Philippines. While we couldn't fetch specific details, you can still ask the AI about this area to discover nearby attractions, culture, and travel information!`,
          highlights: [
            'Philippine destination',
            'Local culture and heritage',
            'Regional attractions',
            'Travel recommendations',
            'Ask AI for detailed information'
          ],
          image: '/assets/images/philippines-placeholder.jpg',
          isCustom: true,
          fullAddress: `${lat.toFixed(6)}, ${lng.toFixed(6)}`
        };
        
        onLocationClick(basicLocation);
      }
    });

    // Add markers for each predefined location
    philippinesData.locations.forEach((location) => {
      const color = getLocationColor(location.id);
      
      // Create custom icon
      const icon = window.L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="
            background-color: ${color};
            width: 35px;
            height: 35px;
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 2px 5px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            cursor: pointer;
            transition: transform 0.2s;
          "
          onmouseover="this.style.transform='scale(1.2)'"
          onmouseout="this.style.transform='scale(1)'">
            📍
          </div>
        `,
        iconSize: [35, 35],
        iconAnchor: [17.5, 17.5],
      });

      const marker = window.L.marker([location.lat, location.lng], { icon })
        .addTo(map)
        .bindPopup(`
          <div style="text-align: center;">
            <h3 style="margin: 0 0 5px 0; color: #1f2937;">⭐ ${location.name}</h3>
            <p style="margin: 0; color: #6b7280; font-size: 0.875rem;">${location.region}</p>
          </div>
        `)
        .on('click', () => {
          onLocationClick(location);
        });

      markersRef.current[location.id] = marker;
    });

  }, [mapLoaded, onLocationClick]);

  // Update marker colors when user profile changes
  useEffect(() => {
    if (!mapInstanceRef.current || !window.L) return;

    philippinesData.locations.forEach((location) => {
      const marker = markersRef.current[location.id];
      if (marker) {
        const color = getLocationColor(location.id);
        
        const icon = window.L.divIcon({
          className: 'custom-marker',
          html: `
            <div style="
              background-color: ${color};
              width: 30px;
              height: 30px;
              border-radius: 50%;
              border: 3px solid white;
              box-shadow: 0 2px 5px rgba(0,0,0,0.3);
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 16px;
              cursor: pointer;
            ">
              📍
            </div>
          `,
          iconSize: [30, 30],
          iconAnchor: [15, 15],
        });
        
        marker.setIcon(icon);
      }
    });
  }, [userProfile]);

  const getLocationColor = (locationId) => {
    if (userProfile.beenThere.includes(locationId)) {
      return '#10b981'; // Green - Been there
    } else if (userProfile.wantToGo.includes(locationId)) {
      return '#f59e0b'; // Orange - Want to go
    }
    return '#3b82f6'; // Blue - Default
  };

  return (
    <div className="map-container">
      <div className="map-header">
        <h2 className="map-title">🗺️ Explore the Philippines</h2>
        <p className="map-instruction">
          <strong>💡 Tip:</strong> Click anywhere on the map to discover that area! 
          Or click the colored markers (⭐) for featured destinations.
        </p>
      </div>
      
      <div className="map-legend">
        <div className="legend-item">
          <span className="legend-color" style={{ background: '#3b82f6' }}>📍</span>
          <span>Unvisited</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ background: '#10b981' }}>📍</span>
          <span>Been There</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ background: '#f59e0b' }}>📍</span>
          <span>Want to Go</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ background: '#8b5cf6' }}>🔍</span>
          <span>Exploring</span>
        </div>
      </div>

      <div 
        ref={mapRef} 
        className="leaflet-map"
        style={{ height: '600px', width: '100%', borderRadius: '8px', cursor: 'pointer' }}
      >
        {!mapLoaded && (
          <div className="map-loading">
            <p>🗺️ Loading interactive map of the Philippines...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhilippinesMap;
