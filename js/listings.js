// Listings carousel and property management for NestHouse

class ListingsManager {
    constructor() {
        this.currentSlide = 0;
        this.listings = [];
        this.init();
    }

    init() {
        this.generateListings();
        this.renderListings();
        this.setupCarousel();
        this.setupFilters();
        this.setupSearch();
    }

    generateListings() {
        // Mock data for featured listings
        this.listings = [
            {
                id: 1,
                title: 'Modern Eco Villa',
                location: 'Kyiv, Ukraine',
                price: 450000,
                image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
                features: ['4 Beds', '3 Baths', 'Solar Panels', 'Garden'],
                rating: 4.9,
                isEcoFriendly: true,
                questPoints: 150,
                type: 'villa',
                yearBuilt: 2022,
                sqft: 2800,
                description: 'Stunning modern villa with sustainable features and smart home technology.',
                amenities: ['Swimming Pool', 'Home Theater', 'Wine Cellar', 'Gym'],
                virtualTour: true
            },
            {
                id: 2,
                title: 'Urban Loft Apartment',
                location: 'Lviv, Ukraine',
                price: 280000,
                image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
                features: ['2 Beds', '2 Baths', 'City View', 'Gym'],
                rating: 4.7,
                isEcoFriendly: false,
                questPoints: 120,
                type: 'apartment',
                yearBuilt: 2020,
                sqft: 1200,
                description: 'Stylish loft in the heart of the city with panoramic views.',
                amenities: ['Rooftop Terrace', 'Concierge', 'Parking', 'Storage'],
                virtualTour: true
            },
            {
                id: 3,
                title: 'Countryside Cottage',
                location: 'Carpathians, Ukraine',
                price: 180000,
                image: 'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800',
                features: ['3 Beds', '2 Baths', 'Fireplace', 'Lake View'],
                rating: 4.8,
                isEcoFriendly: true,
                questPoints: 100,
                type: 'cottage',
                yearBuilt: 2019,
                sqft: 1800,
                description: 'Charming cottage surrounded by nature with breathtaking lake views.',
                amenities: ['Private Dock', 'Fire Pit', 'Hiking Trails', 'Organic Garden'],
                virtualTour: true
            },
            {
                id: 4,
                title: 'Smart City Home',
                location: 'Odesa, Ukraine',
                price: 320000,
                image: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800',
                features: ['3 Beds', '2 Baths', 'Smart Home', 'Terrace'],
                rating: 4.6,
                isEcoFriendly: false,
                questPoints: 130,
                type: 'house',
                yearBuilt: 2021,
                sqft: 2200,
                description: 'Contemporary home with cutting-edge smart technology.',
                amenities: ['Smart Security', 'Voice Control', 'Energy Monitoring', 'EV Charging'],
                virtualTour: true
            },
            {
                id: 5,
                title: 'Luxury Penthouse',
                location: 'Kharkiv, Ukraine',
                price: 650000,
                image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800',
                features: ['4 Beds', '4 Baths', 'Skyline View', 'Private Elevator'],
                rating: 4.9,
                isEcoFriendly: false,
                questPoints: 200,
                type: 'penthouse',
                yearBuilt: 2023,
                sqft: 3500,
                description: 'Exclusive penthouse with unparalleled luxury and city views.',
                amenities: ['Private Terrace', 'Jacuzzi', 'Butler Service', 'Helipad Access'],
                virtualTour: true
            },
            {
                id: 6,
                title: 'Sustainable Townhouse',
                location: 'Dnipro, Ukraine',
                price: 220000,
                image: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=800',
                features: ['3 Beds', '2.5 Baths', 'Green Roof', 'Rainwater System'],
                rating: 4.7,
                isEcoFriendly: true,
                questPoints: 140,
                type: 'townhouse',
                yearBuilt: 2021,
                sqft: 1900,
                description: 'Eco-friendly townhouse with innovative sustainability features.',
                amenities: ['Community Garden', 'Bike Storage', 'Composting', 'Solar Panels'],
                virtualTour: true
            }
        ];
    }

    renderListings() {
        const carousel = document.getElementById('listings-carousel');
        const dots = document.getElementById('carousel-dots');
        
        if (!carousel || !dots) return;

        // Clear existing content
        carousel.innerHTML = '';
        dots.innerHTML = '';

        // Render listing cards
        this.listings.forEach((listing, index) => {
            const card = this.createListingCard(listing, index);
            carousel.appendChild(card);

            // Create dot for navigation
            const dot = document.createElement('div');
            dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => this.goToSlide(index));
            dots.appendChild(dot);
        });
    }

    createListingCard(listing, index) {
        const card = document.createElement('div');
        card.className = 'listing-card';
        card.style.display = index === 0 ? 'block' : 'none';
        
        card.innerHTML = `
            <div class="listing-image-container">
                <img src="${listing.image}" alt="${listing.title}" class="listing-image">
                <div class="listing-badges">
                    ${listing.isEcoFriendly ? '<div class="badge badge-eco"><i class="fas fa-leaf"></i> Eco</div>' : ''}
                    <div class="badge badge-quest"><i class="fas fa-trophy"></i> ${listing.questPoints}pts</div>
                </div>
                <button class="vr-tour-btn" onclick="listingsManager.startVRTour(${listing.id})">
                    <i class="fas fa-cube"></i> VR Tour
                </button>
            </div>
            <div class="listing-content">
                <div class="listing-header">
                    <h3 class="listing-title">${listing.title}</h3>
                    <div class="listing-rating">
                        <i class="fas fa-star"></i>
                        <span>${listing.rating}</span>
                    </div>
                </div>
                <div class="listing-location">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${listing.location}</span>
                </div>
                <div class="listing-price">$${listing.price.toLocaleString()}</div>
                <div class="listing-features">
                    ${listing.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
                </div>
                <div class="listing-details">
                    <div class="detail-item">
                        <i class="fas fa-calendar"></i>
                        <span>Built ${listing.yearBuilt}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-expand-arrows-alt"></i>
                        <span>${listing.sqft.toLocaleString()} sqft</span>
                    </div>
                </div>
                <p class="listing-description">${listing.description}</p>
                <div class="listing-amenities">
                    <h4>Amenities:</h4>
                    <div class="amenities-list">
                        ${listing.amenities.map(amenity => `<span class="amenity-tag">${amenity}</span>`).join('')}
                    </div>
                </div>
                <div class="listing-actions">
                    <button class="listing-action" onclick="listingsManager.viewDetails(${listing.id})">
                        <i class="fas fa-eye"></i> View Details
                    </button>
                    <button class="listing-action secondary" onclick="listingsManager.addToFavorites(${listing.id})">
                        <i class="fas fa-heart"></i> Save
                    </button>
                    <button class="listing-action secondary" onclick="listingsManager.shareProperty(${listing.id})">
                        <i class="fas fa-share"></i> Share
                    </button>
                </div>
            </div>
        `;

        // Add hover effects
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });

        return card;
    }

    setupCarousel() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');

        prevBtn?.addEventListener('click', () => this.previousSlide());
        nextBtn?.addEventListener('click', () => this.nextSlide());

        // Auto-play carousel
        this.startAutoPlay();

        // Pause auto-play on hover
        const carousel = document.getElementById('listings-carousel');
        carousel?.addEventListener('mouseenter', () => this.pauseAutoPlay());
        carousel?.addEventListener('mouseleave', () => this.startAutoPlay());

        // Touch/swipe support
        this.setupTouchControls();
    }

    goToSlide(index) {
        const cards = document.querySelectorAll('.listing-card');
        const dots = document.querySelectorAll('.carousel-dot');

        // Hide all cards
        cards.forEach(card => card.style.display = 'none');
        dots.forEach(dot => dot.classList.remove('active'));

        // Show target card
        if (cards[index]) {
            cards[index].style.display = 'block';
            dots[index]?.classList.add('active');
            this.currentSlide = index;
        }
    }

    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.listings.length;
        this.goToSlide(nextIndex);
    }

    previousSlide() {
        const prevIndex = (this.currentSlide - 1 + this.listings.length) % this.listings.length;
        this.goToSlide(prevIndex);
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }

    pauseAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
    }

    setupTouchControls() {
        const carousel = document.getElementById('listings-carousel');
        if (!carousel) return;

        let startX = 0;
        let endX = 0;

        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        carousel.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            const diff = startX - endX;

            if (Math.abs(diff) > 50) { // Minimum swipe distance
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.previousSlide();
                }
            }
        });
    }

    setupFilters() {
        // Create filter controls
        const filtersContainer = document.createElement('div');
        filtersContainer.className = 'listings-filters';
        filtersContainer.innerHTML = `
            <div class="filter-group">
                <label for="price-range">Price Range:</label>
                <select id="price-range">
                    <option value="">All Prices</option>
                    <option value="0-200000">Under $200K</option>
                    <option value="200000-400000">$200K - $400K</option>
                    <option value="400000-600000">$400K - $600K</option>
                    <option value="600000+">$600K+</option>
                </select>
            </div>
            <div class="filter-group">
                <label for="property-type">Type:</label>
                <select id="property-type">
                    <option value="">All Types</option>
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="villa">Villa</option>
                    <option value="cottage">Cottage</option>
                    <option value="penthouse">Penthouse</option>
                    <option value="townhouse">Townhouse</option>
                </select>
            </div>
            <div class="filter-group">
                <label>
                    <input type="checkbox" id="eco-friendly"> Eco-Friendly Only
                </label>
            </div>
            <button id="apply-filters" class="btn btn-primary">Apply Filters</button>
        `;

        // Insert filters before carousel
        const listingsSection = document.getElementById('listings');
        const carousel = document.getElementById('listings-carousel');
        listingsSection?.insertBefore(filtersContainer, carousel);

        // Setup filter event listeners
        document.getElementById('apply-filters')?.addEventListener('click', () => {
            this.applyFilters();
        });
    }

    setupSearch() {
        // Create search bar
        const searchContainer = document.createElement('div');
        searchContainer.className = 'listings-search';
        searchContainer.innerHTML = `
            <div class="search-bar">
                <input type="text" id="property-search" placeholder="Search properties...">
                <button id="search-btn" class="btn btn-primary">
                    <i class="fas fa-search"></i>
                </button>
            </div>
        `;

        // Insert search before filters
        const filtersContainer = document.querySelector('.listings-filters');
        filtersContainer?.parentNode.insertBefore(searchContainer, filtersContainer);

        // Setup search functionality
        const searchInput = document.getElementById('property-search');
        const searchBtn = document.getElementById('search-btn');

        searchBtn?.addEventListener('click', () => this.performSearch());
        searchInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.performSearch();
            }
        });

        // Real-time search
        searchInput?.addEventListener('input', this.debounce(() => {
            this.performSearch();
        }, 300));
    }

    applyFilters() {
        const priceRange = document.getElementById('price-range')?.value;
        const propertyType = document.getElementById('property-type')?.value;
        const ecoFriendly = document.getElementById('eco-friendly')?.checked;

        let filteredListings = [...this.listings];

        // Apply price filter
        if (priceRange) {
            if (priceRange === '600000+') {
                filteredListings = filteredListings.filter(listing => listing.price >= 600000);
            } else {
                const [min, max] = priceRange.split('-').map(Number);
                filteredListings = filteredListings.filter(listing => 
                    listing.price >= min && listing.price <= max
                );
            }
        }

        // Apply type filter
        if (propertyType) {
            filteredListings = filteredListings.filter(listing => 
                listing.type === propertyType
            );
        }

        // Apply eco-friendly filter
        if (ecoFriendly) {
            filteredListings = filteredListings.filter(listing => listing.isEcoFriendly);
        }

        this.displayFilteredListings(filteredListings);
    }

    performSearch() {
        const searchTerm = document.getElementById('property-search')?.value.toLowerCase();
        if (!searchTerm) {
            this.renderListings();
            return;
        }

        const filteredListings = this.listings.filter(listing => 
            listing.title.toLowerCase().includes(searchTerm) ||
            listing.location.toLowerCase().includes(searchTerm) ||
            listing.description.toLowerCase().includes(searchTerm) ||
            listing.features.some(feature => feature.toLowerCase().includes(searchTerm)) ||
            listing.amenities.some(amenity => amenity.toLowerCase().includes(searchTerm))
        );

        this.displayFilteredListings(filteredListings);
    }

    displayFilteredListings(filteredListings) {
        // Update listings array temporarily
        const originalListings = [...this.listings];
        this.listings = filteredListings;
        
        // Re-render with filtered results
        this.renderListings();
        this.currentSlide = 0;
        
        // Show results count
        this.showResultsCount(filteredListings.length);
        
        // Restore original listings after a delay (for demo purposes)
        setTimeout(() => {
            this.listings = originalListings;
        }, 10000);
    }

    showResultsCount(count) {
        // Remove existing results message
        const existingMessage = document.querySelector('.results-message');
        existingMessage?.remove();

        // Create new results message
        const message = document.createElement('div');
        message.className = 'results-message';
        message.innerHTML = `
            <p>Found ${count} propert${count === 1 ? 'y' : 'ies'} matching your criteria</p>
            <button onclick="listingsManager.clearFilters()" class="btn btn-outline">Clear Filters</button>
        `;

        // Insert message
        const carousel = document.getElementById('listings-carousel');
        carousel?.parentNode.insertBefore(message, carousel);
    }

    clearFilters() {
        // Reset form controls
        document.getElementById('price-range').value = '';
        document.getElementById('property-type').value = '';
        document.getElementById('eco-friendly').checked = false;
        document.getElementById('property-search').value = '';

        // Remove results message
        const resultsMessage = document.querySelector('.results-message');
        resultsMessage?.remove();

        // Re-render all listings
        this.renderListings();
        this.currentSlide = 0;
    }

    // Property interaction methods
    startVRTour(listingId) {
        const listing = this.listings.find(l => l.id === listingId);
        if (!listing) return;

        // Show VR modal with property-specific content
        const modal = document.getElementById('vr-modal');
        const modalContent = modal?.querySelector('.vr-demo-container');
        
        if (modalContent) {
            modalContent.innerHTML = `
                <h3>VR Tour: ${listing.title}</h3>
                <div class="vr-viewer">
                    <img src="${listing.image}" alt="${listing.title}" class="vr-image">
                    <div class="vr-controls">
                        <button class="vr-btn tooltip" data-tooltip="Fullscreen"><i class="fas fa-expand"></i></button>
                        <button class="vr-btn tooltip" data-tooltip="Audio"><i class="fas fa-volume-up"></i></button>
                        <button class="vr-btn tooltip" data-tooltip="Info"><i class="fas fa-info"></i></button>
                        <button class="vr-btn tooltip" data-tooltip="Measurements"><i class="fas fa-ruler"></i></button>
                    </div>
                    <div class="vr-hotspots">
                        <div class="hotspot" style="top: 30%; left: 20%;" data-info="Living Room"></div>
                        <div class="hotspot" style="top: 60%; left: 70%;" data-info="Kitchen"></div>
                        <div class="hotspot" style="top: 40%; left: 80%;" data-info="Bedroom"></div>
                    </div>
                </div>
                <div class="vr-info">
                    <p>Experience this ${listing.type} in immersive 360° virtual reality!</p>
                    <div class="vr-stats">
                        <span><i class="fas fa-eye"></i> 1,234 views</span>
                        <span><i class="fas fa-clock"></i> 5 min tour</span>
                        <span><i class="fas fa-star"></i> ${listing.rating} rating</span>
                    </div>
                </div>
            `;
            
            modal.style.display = 'block';
            
            // Add quest points for VR tour
            this.addQuestPoints(10, 'VR Tour Completed');
        }
    }

    viewDetails(listingId) {
        const listing = this.listings.find(l => l.id === listingId);
        if (!listing) return;

        // Create detailed view modal
        const detailModal = document.createElement('div');
        detailModal.className = 'modal property-detail-modal';
        detailModal.innerHTML = `
            <div class="modal-content large">
                <span class="modal-close">&times;</span>
                <div class="property-detail">
                    <div class="property-gallery">
                        <img src="${listing.image}" alt="${listing.title}" class="main-image">
                        <div class="gallery-thumbnails">
                            <img src="${listing.image}" alt="View 1" class="thumbnail active">
                            <img src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=200" alt="View 2" class="thumbnail">
                            <img src="https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=200" alt="View 3" class="thumbnail">
                        </div>
                    </div>
                    <div class="property-info">
                        <h2>${listing.title}</h2>
                        <div class="property-meta">
                            <span class="price">$${listing.price.toLocaleString()}</span>
                            <span class="rating"><i class="fas fa-star"></i> ${listing.rating}</span>
                        </div>
                        <p class="location"><i class="fas fa-map-marker-alt"></i> ${listing.location}</p>
                        <p class="description">${listing.description}</p>
                        
                        <div class="property-features">
                            <h3>Features</h3>
                            <div class="features-grid">
                                ${listing.features.map(feature => `<div class="feature-item">${feature}</div>`).join('')}
                            </div>
                        </div>
                        
                        <div class="property-amenities">
                            <h3>Amenities</h3>
                            <div class="amenities-grid">
                                ${listing.amenities.map(amenity => `<div class="amenity-item"><i class="fas fa-check"></i> ${amenity}</div>`).join('')}
                            </div>
                        </div>
                        
                        <div class="property-actions">
                            <button class="btn btn-primary" onclick="listingsManager.scheduleViewing(${listing.id})">
                                <i class="fas fa-calendar"></i> Schedule Viewing
                            </button>
                            <button class="btn btn-secondary" onclick="listingsManager.startVRTour(${listing.id})">
                                <i class="fas fa-cube"></i> VR Tour
                            </button>
                            <button class="btn btn-outline" onclick="listingsManager.contactAgent(${listing.id})">
                                <i class="fas fa-phone"></i> Contact Agent
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(detailModal);
        detailModal.style.display = 'block';

        // Setup close functionality
        const closeBtn = detailModal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => {
            detailModal.remove();
        });

        detailModal.addEventListener('click', (e) => {
            if (e.target === detailModal) {
                detailModal.remove();
            }
        });
    }

    addToFavorites(listingId) {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        
        if (!favorites.includes(listingId)) {
            favorites.push(listingId);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            this.showNotification('Property added to favorites!', 'success');
            this.addQuestPoints(5, 'Property Saved');
        } else {
            this.showNotification('Property already in favorites!', 'info');
        }
    }

    shareProperty(listingId) {
        const listing = this.listings.find(l => l.id === listingId);
        if (!listing) return;

        if (navigator.share) {
            navigator.share({
                title: listing.title,
                text: listing.description,
                url: window.location.href + `#property-${listingId}`
            });
        } else {
            // Fallback: copy to clipboard
            const shareUrl = window.location.href + `#property-${listingId}`;
            navigator.clipboard.writeText(shareUrl).then(() => {
                this.showNotification('Property link copied to clipboard!', 'success');
            });
        }
        
        this.addQuestPoints(3, 'Property Shared');
    }

    scheduleViewing(listingId) {
        // Create scheduling modal
        const scheduleModal = document.createElement('div');
        scheduleModal.className = 'modal schedule-modal';
        scheduleModal.innerHTML = `
            <div class="modal-content">
                <span class="modal-close">&times;</span>
                <h3>Schedule Property Viewing</h3>
                <form class="schedule-form">
                    <div class="form-group">
                        <label for="viewing-date">Preferred Date:</label>
                        <input type="date" id="viewing-date" required>
                    </div>
                    <div class="form-group">
                        <label for="viewing-time">Preferred Time:</label>
                        <select id="viewing-time" required>
                            <option value="">Select Time</option>
                            <option value="09:00">9:00 AM</option>
                            <option value="10:00">10:00 AM</option>
                            <option value="11:00">11:00 AM</option>
                            <option value="14:00">2:00 PM</option>
                            <option value="15:00">3:00 PM</option>
                            <option value="16:00">4:00 PM</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="contact-phone">Phone Number:</label>
                        <input type="tel" id="contact-phone" required>
                    </div>
                    <div class="form-group">
                        <label for="viewing-notes">Additional Notes:</label>
                        <textarea id="viewing-notes" rows="3"></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Schedule Viewing</button>
                </form>
            </div>
        `;

        document.body.appendChild(scheduleModal);
        scheduleModal.style.display = 'block';

        // Setup form submission
        const form = scheduleModal.querySelector('.schedule-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.showNotification('Viewing scheduled successfully!', 'success');
            this.addQuestPoints(15, 'Viewing Scheduled');
            scheduleModal.remove();
        });

        // Setup close functionality
        const closeBtn = scheduleModal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => scheduleModal.remove());
    }

    contactAgent(listingId) {
        // Simulate contacting agent
        this.showNotification('Connecting you with the property agent...', 'info');
        
        setTimeout(() => {
            this.showNotification('Agent will contact you within 24 hours!', 'success');
            this.addQuestPoints(10, 'Agent Contacted');
        }, 2000);
    }

    addQuestPoints(points, action) {
        const currentPoints = parseInt(localStorage.getItem('questPoints') || '0');
        const newPoints = currentPoints + points;
        localStorage.setItem('questPoints', newPoints.toString());
        
        // Show points notification
        this.showQuestNotification(points, action);
    }

    showQuestNotification(points, action) {
        const notification = document.createElement('div');
        notification.className = 'quest-notification';
        notification.innerHTML = `
            <div class="quest-content">
                <i class="fas fa-trophy"></i>
                <div class="quest-text">
                    <strong>+${points} Quest Points!</strong>
                    <span>${action}</span>
                </div>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, var(--primary-color), var(--success-color));
            color: white;
            padding: 1rem;
            border-radius: 0.5rem;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            z-index: 2000;
            animation: slideInFromRight 0.5s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideInFromRight 0.5s ease-out reverse';
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'times' : 'info'}"></i>
            ${message}
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--${type === 'success' ? 'success' : type === 'error' ? 'error' : 'secondary'}-color);
            color: white;
            padding: 1rem 2rem;
            border-radius: 0.5rem;
            z-index: 2000;
            animation: slideInFromTop 0.5s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideInFromTop 0.5s ease-out reverse';
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }

    // Utility method
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Initialize listings manager
let listingsManager;
document.addEventListener('DOMContentLoaded', () => {
    listingsManager = new ListingsManager();
});

// Export for global access
window.listingsManager = listingsManager;