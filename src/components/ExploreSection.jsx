import React, { useState } from 'react';
import './ExploreSection.css';

const ExploreSection = ({ onLocationClick, onMarkLocation, userProfile }) => {
  const [selectedCategory, setSelectedCategory] = useState('islands');

  const categories = [
    { id: 'islands', name: ' Islands', icon: '🏝️' },
    { id: 'museums', name: ' Museums', icon: '🏛️' },
    { id: 'festivals', name: ' Festivals', icon: '🎭' },
    { id: 'beaches', name: ' Beaches', icon: '🏖️' },
    { id: 'mountains', name: ' Mountains', icon: '⛰️' },
    { id: 'heritage', name: ' Heritage Sites', icon: '🏰' }
  ];

  const exploreData = {
    islands: [
      {
        id: 'boracay',
        name: 'Boracay',
        region: 'Aklan',
        lat: 11.9674,
        lng: 121.9248,
        image: '/assets/images/boracay.jpg',
        description: 'World-famous for its pristine white sand beaches and crystal-clear waters. Boracay offers vibrant nightlife, water sports, and stunning sunsets.',
        highlights: [
          'White Beach - 4km of powdery white sand',
          'Water sports: kiteboarding, parasailing, diving',
          'Vibrant nightlife and beach parties',
          'Island hopping and snorkeling',
          'Stunning sunset views at Station 1'
        ],
        bestTime: 'November to May',
        category: 'islands'
      },
      {
        id: 'palawan',
        name: 'Palawan',
        region: 'Palawan',
        lat: 9.8349,
        lng: 118.7384,
        image: '/assets/images/palawan.jpg',
        description: 'The last frontier of the Philippines, featuring pristine beaches, limestone cliffs, underground rivers, and incredible biodiversity.',
        highlights: [
          'Puerto Princesa Underground River (UNESCO site)',
          'El Nido limestone karsts and lagoons',
          'Coron shipwreck diving',
          'Island hopping adventures',
          'Rich marine biodiversity'
        ],
        bestTime: 'December to May',
        category: 'islands'
      },
      {
        id: 'siargao',
        name: 'Siargao',
        region: 'Surigao del Norte',
        lat: 9.8547,
        lng: 126.0450,
        image: '/assets/images/siargao.jpg',
        description: 'The surfing capital of the Philippines, known for Cloud 9 waves, island life, and laid-back island vibes.',
        highlights: [
          'Cloud 9 - world-class surf break',
          'Island hopping to Naked Island, Daku, Guyam',
          'Sugba Lagoon kayaking',
          'Magpupungko Rock Pools',
          'Relaxed island lifestyle'
        ],
        bestTime: 'March to October',
        category: 'islands'
      },
      {
        id: 'bohol',
        name: 'Bohol',
        region: 'Bohol',
        lat: 9.8500,
        lng: 124.1435,
        image: '/assets/images/bohol.jpg',
        description: 'Famous for the Chocolate Hills, tarsiers, and beautiful beaches. Perfect blend of natural wonders and cultural heritage.',
        highlights: [
          'Chocolate Hills - 1,200+ geological formations',
          'Tarsier sanctuary - world\'s smallest primate',
          'Panglao Island beaches',
          'Loboc River cruise',
          'Historic Baclayon Church'
        ],
        bestTime: 'November to April',
        category: 'islands'
      }
    ],
    museums: [
      {
        id: 'national-museum',
        name: 'National Museum of the Philippines',
        region: 'Manila',
        lat: 14.5831,
        lng: 120.9813,
        image: '/assets/images/national-museum.jpg',
        description: 'The premier cultural institution showcasing Filipino heritage, art, and natural history.',
        highlights: [
          'Juan Luna\'s Spoliarium masterpiece',
          'Natural history exhibits',
          'Anthropology and archaeology collections',
          'Free admission for all',
          'Beautiful neoclassical architecture'
        ],
        bestTime: 'Year-round (Closed Mondays)',
        category: 'museums'
      },
      {
        id: 'ayala-museum',
        name: 'Ayala Museum',
        region: 'Makati',
        lat: 14.5547,
        lng: 121.0244,
        image: '/assets/images/ayala-museum.jpg',
        description: 'Features dioramas of Philippine history, maritime vessels, and contemporary Filipino art.',
        highlights: [
          '60 handcrafted historical dioramas',
          'Gold artifacts collection',
          'Philippine maritime history',
          'Contemporary art galleries',
          'Educational programs and workshops'
        ],
        bestTime: 'Year-round',
        category: 'museums'
      },
      {
        id: 'pinto-art-museum',
        name: 'Pinto Art Museum',
        region: 'Rizal',
        lat: 14.5926,
        lng: 121.1739,
        image: '/assets/images/pinto-museum.jpg',
        description: 'Contemporary art museum set in a Mediterranean-inspired gallery with beautiful gardens.',
        highlights: [
          'Contemporary Filipino art',
          'Six whitewashed galleries',
          'Sculpture garden',
          'Instagram-worthy architecture',
          'Café with mountain views'
        ],
        bestTime: 'Year-round',
        category: 'museums'
      },
      {
        id: 'casa-manila',
        name: 'Casa Manila',
        region: 'Manila',
        lat: 14.5897,
        lng: 120.9745,
        image: '/assets/images/casa-manila.jpg',
        description: 'Recreated colonial mansion showcasing Spanish-Filipino lifestyle during the 19th century.',
        highlights: [
          'Spanish colonial architecture',
          'Period furniture and artifacts',
          'Beautiful courtyard',
          'Located in historic Intramuros',
          'Cultural performances'
        ],
        bestTime: 'Year-round',
        category: 'museums'
      }
    ],
    festivals: [
      {
        id: 'sinulog',
        name: 'Sinulog Festival',
        region: 'Cebu',
        lat: 10.3157,
        lng: 123.8854,
        image: '/assets/images/sinulog.jpg',
        description: 'Grand cultural and religious festival honoring Santo Niño with street dancing, colorful costumes, and grand parades.',
        highlights: [
          'Grand parade with street dancing',
          'Pit Señor! battle cry',
          'Colorful costumes and props',
          'Religious processions',
          'Held every 3rd Sunday of January'
        ],
        bestTime: 'January (3rd Sunday)',
        category: 'festivals'
      },
      {
        id: 'ati-atihan',
        name: 'Ati-Atihan Festival',
        region: 'Aklan',
        lat: 11.7136,
        lng: 122.3658,
        image: '/assets/images/ati-atihan.jpg',
        description: 'The mother of all Philippine festivals, featuring indigenous tribal dances and vibrant street celebrations.',
        highlights: [
          'Tribal dance competitions',
          'Body painting and indigenous costumes',
          'Hala Bira! chant',
          'Street parties and music',
          'Held every 3rd week of January'
        ],
        bestTime: 'January (3rd week)',
        category: 'festivals'
      },
      {
        id: 'masskara',
        name: 'MassKara Festival',
        region: 'Bacolod',
        lat: 10.6770,
        lng: 122.9500,
        image: '/assets/images/masskara.jpg',
        description: 'Festival of smiling masks celebrating the resilient spirit of Bacolod, known as the City of Smiles.',
        highlights: [
          'Colorful smiling masks',
          'Electric Masskara street dance',
          'Cultural shows and concerts',
          'Food festivals',
          'Held every October'
        ],
        bestTime: 'October (3rd week)',
        category: 'festivals'
      },
      {
        id: 'panagbenga',
        name: 'Panagbenga Festival',
        region: 'Baguio',
        lat: 16.4023,
        lng: 120.5960,
        image: '/assets/images/panagbenga.jpg',
        description: 'Baguio\'s flower festival celebrating the blooming season with colorful floats made entirely of flowers.',
        highlights: [
          'Grand float parade with millions of flowers',
          'Street dancing competition',
          'Session Road in Bloom',
          'Garden shows and exhibitions',
          'Held every February'
        ],
        bestTime: 'February',
        category: 'festivals'
      }
    ],
    beaches: [
      {
        id: 'white-beach-boracay',
        name: 'White Beach',
        region: 'Boracay, Aklan',
        lat: 11.9674,
        lng: 121.9248,
        image: '/assets/images/white-beach.jpg',
        description: 'One of the world\'s best beaches with 4km of powdery white sand and crystal-clear turquoise waters.',
        highlights: [
          'Powdery white sand',
          'Crystal-clear turquoise waters',
          'Beachfront restaurants and bars',
          'Water sports activities',
          'Stunning sunsets'
        ],
        bestTime: 'November to May',
        category: 'beaches'
      },
      {
        id: 'nacpan-beach',
        name: 'Nacpan Beach',
        region: 'El Nido, Palawan',
        lat: 11.2588,
        lng: 119.4949,
        image: '/assets/images/nacpan.jpg',
        description: 'A 4km stretch of golden sand beach with coconut palms, known as one of the best beaches in Palawan.',
        highlights: [
          '4km golden sand beach',
          'Coconut palm-lined shore',
          'Less crowded than mainstream spots',
          'Perfect for swimming',
          'Beautiful scenery for photography'
        ],
        bestTime: 'November to May',
        category: 'beaches'
      },
      {
        id: 'puka-beach',
        name: 'Puka Shell Beach',
        region: 'Boracay, Aklan',
        lat: 11.9945,
        lng: 121.9178,
        image: '/assets/images/puka-beach.jpg',
        description: 'Serene beach known for Puka shells, offering a quieter alternative to White Beach.',
        highlights: [
          'Famous Puka shells',
          'Less crowded atmosphere',
          'Clear waters ideal for swimming',
          'Natural and unspoiled setting',
          'Perfect for relaxation'
        ],
        bestTime: 'November to May',
        category: 'beaches'
      },
      {
        id: 'alona-beach',
        name: 'Alona Beach',
        region: 'Panglao, Bohol',
        lat: 9.5305,
        lng: 123.7569,
        image: '/assets/images/alona-beach.jpg',
        description: 'Popular beach destination with white sand, diving spots, and vibrant nightlife.',
        highlights: [
          'White sand beach',
          'Excellent diving and snorkeling',
          'Beachfront restaurants',
          'Nightlife and entertainment',
          'Island hopping tours'
        ],
        bestTime: 'November to April',
        category: 'beaches'
      }
    ],
    mountains: [
      {
        id: 'mt-pulag',
        name: 'Mount Pulag',
        region: 'Benguet',
        lat: 16.5965,
        lng: 120.8895,
        image: '/assets/images/mt-pulag.jpg',
        description: 'The third highest mountain in the Philippines, famous for its sea of clouds and stunning sunrise views.',
        highlights: [
          'Sea of clouds phenomenon',
          'Breathtaking sunrise views',
          'Mossy forest ecosystem',
          'Diverse flora and fauna',
          'Trekking and camping'
        ],
        bestTime: 'November to February',
        category: 'mountains'
      },
      {
        id: 'mt-apo',
        name: 'Mount Apo',
        region: 'Davao',
        lat: 7.0031,
        lng: 125.2731,
        image: '/assets/images/mt-apo.jpg',
        description: 'The Philippines\' highest peak, home to the critically endangered Philippine Eagle.',
        highlights: [
          'Highest peak in the Philippines (2,954m)',
          'Philippine Eagle habitat',
          'Diverse ecosystems',
          'Sulfur vents and hot springs',
          'Challenging trekking routes'
        ],
        bestTime: 'March to May',
        category: 'mountains'
      },
      {
        id: 'mt-pinatubo',
        name: 'Mount Pinatubo',
        region: 'Pampanga',
        lat: 15.1430,
        lng: 120.3520,
        image: '/assets/images/mt-pinatubo.jpg',
        description: 'Active volcano famous for its 1991 eruption and stunning crater lake with turquoise waters.',
        highlights: [
          'Stunning crater lake',
          'Turquoise waters',
          '4x4 adventure ride',
          'Volcanic landscape',
          'Historical significance'
        ],
        bestTime: 'November to May',
        category: 'mountains'
      },
      {
        id: 'mt-batulao',
        name: 'Mount Batulao',
        region: 'Batangas',
        lat: 14.0297,
        lng: 120.9206,
        image: '/assets/images/mt-batulao.jpg',
        description: 'Beginner-friendly mountain with rolling hills and scenic views, perfect for day hikes.',
        highlights: [
          'Beginner-friendly trails',
          'Rolling hills landscape',
          '360-degree summit views',
          'Close to Manila (2-3 hours)',
          'Perfect for day hikes'
        ],
        bestTime: 'November to April',
        category: 'mountains'
      }
    ],
    heritage: [
      {
        id: 'intramuros',
        name: 'Intramuros',
        region: 'Manila',
        lat: 14.5907,
        lng: 120.9735,
        image: '/assets/images/intramuros.jpg',
        description: 'The walled city of Manila, historic center of Spanish colonial rule in the Philippines.',
        highlights: [
          'Spanish colonial architecture',
          'Fort Santiago',
          'San Agustin Church (UNESCO)',
          'Manila Cathedral',
          'Cobblestone streets and walls'
        ],
        bestTime: 'Year-round',
        category: 'heritage'
      },
      {
        id: 'vigan',
        name: 'Vigan Heritage Village',
        region: 'Ilocos Sur',
        lat: 17.5747,
        lng: 120.3869,
        image: '/assets/images/vigan.jpg',
        description: 'UNESCO World Heritage Site showcasing the best-preserved Spanish colonial town in Asia.',
        highlights: [
          'UNESCO World Heritage Site',
          'Cobblestone streets (Calle Crisologo)',
          'Spanish colonial houses',
          'Kalesa (horse carriage) rides',
          'Vigan empanada and longganisa'
        ],
        bestTime: 'Year-round',
        category: 'heritage'
      },
      {
        id: 'rice-terraces',
        name: 'Banaue Rice Terraces',
        region: 'Ifugao',
        lat: 16.9287,
        lng: 121.0537,
        image: '/assets/images/banaue.jpg',
        description: '2,000-year-old terraces carved into mountains by indigenous Ifugao people, UNESCO World Heritage.',
        highlights: [
          'UNESCO World Heritage Site',
          '2,000 years old',
          'Engineering marvel',
          'Indigenous Ifugao culture',
          'Stunning mountain views'
        ],
        bestTime: 'December to May',
        category: 'heritage'
      },
      {
        id: 'baroque-churches',
        name: 'Baroque Churches',
        region: 'Various',
        lat: 14.5995,
        lng: 120.9842,
        image: '/assets/images/baroque-churches.jpg',
        description: 'Four magnificent Spanish-era Baroque churches recognized as UNESCO World Heritage Sites.',
        highlights: [
          'UNESCO World Heritage Sites',
          'San Agustin Church (Manila)',
          'Paoay Church (Ilocos Norte)',
          'Miagao Church (Iloilo)',
          'Santa Maria Church (Ilocos Sur)'
        ],
        bestTime: 'Year-round',
        category: 'heritage'
      }
    ]
  };

  const currentData = exploreData[selectedCategory] || [];

  const isVisited = (locationId) => {
    return userProfile?.beenThere?.includes(locationId) || false;
  };

  const isWishlist = (locationId) => {
    return userProfile?.wantToGo?.includes(locationId) || false;
  };

  return (
    <div className="explore-section">
      <div className="explore-header">
        <h2 className="explore-title">✨ Explore the Philippines</h2>
        <p className="explore-subtitle">
          Discover amazing destinations by category - from pristine islands to cultural festivals
        </p>
      </div>

      {/* Category Tabs */}
      <div className="category-tabs">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`category-tab ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            <span className="category-icon">{cat.icon}</span>
            <span className="category-name">{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="explore-cards-grid">
        {currentData.map(location => (
          <div 
            key={location.id}
            className={`explore-card ${isVisited(location.id) ? 'visited' : ''} ${isWishlist(location.id) ? 'wishlist' : ''}`}
          >
            <div className="card-image-wrapper">
              <img 
                src={location.image} 
                alt={location.name}
                className="card-image"
                onError={(e) => {
                  e.target.src = '/assets/images/philippines-placeholder.jpg';
                }}
              />
            </div>

              <div className="card-content">
                <div className="card-header-with-badges">
                  <h3 className="card-title">{location.name}</h3>
                  <div className="card-badge">
                    {isVisited(location.id) && <span className="badge visited-badge">✓ Visited</span>}
                    {isWishlist(location.id) && <span className="badge wishlist-badge">♡ Wishlist</span>}
                  </div>
                </div>
                <p className="card-region">📍 {location.region}</p>
                <p className="card-description">{location.description}</p>
                
                <div className="card-highlights">
                  <strong>Highlights:</strong>
                  <ul>
                    {location.highlights.slice(0, 3).map((highlight, idx) => (
                      <li key={idx}>{highlight}</li>
                    ))}
                  </ul>
                </div>

                <div className="card-footer">
                  <span className="best-time">
                    <span className="time-icon">📅</span>
                    {location.bestTime}
                  </span>
                  <div className="card-actions">
                    <button 
                      className="action-btn view-details-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onLocationClick(location);
                      }}
                    >
                      View Details
                    </button>
                    <button 
                      className="action-btn mark-been-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onMarkLocation(location, 'been');
                      }}
                    >
                      ✓ Been
                    </button>
                    <button 
                      className="action-btn mark-want-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onMarkLocation(location, 'want');
                      }}
                    >
                      ★ Want
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ExploreSection;
