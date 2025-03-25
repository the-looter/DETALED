
function recordUserVisit() {
    const visits = JSON.parse(localStorage.getItem('websiteVisits') || '[]');
    
    visits.push({
        date: new Date().toISOString(),
        page: 'main-website',
        user: 'guest-' + Math.random().toString(36).substr(2, 9) // Generate random user ID
    });
    
    localStorage.setItem('websiteVisits', JSON.stringify(visits));
    }
    
    // Call this when the page loads
    document.addEventListener('DOMContentLoaded', recordUserVisit);
    
    
    // Search functionality
    document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-container input');
    const searchButton = document.querySelector('.search-container button');
    
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        performSearch();
    }
    });
    
    function performSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    if (searchTerm === '') return;
    
    // Get all product cards
    const productCards = document.querySelectorAll('.product-card');
    let resultsFound = false;
    
    // Handle splash screen and loading
    document.addEventListener('DOMContentLoaded', () => {
        const splashScreen = document.querySelector('.splash-screen');
        
        // Hide splash screen after animations complete
        setTimeout(() => {
            splashScreen.style.opacity = '0';
            splashScreen.style.transition = 'opacity 0.5s ease-out';
            
            setTimeout(() => {
                splashScreen.style.display = 'none';
            }, 500);
        }, 2500); // Adjust timing as needed
    });
    
    // Hide all products initially
    productCards.forEach(card => {
        card.style.display = 'none';
    });
    
    // Show products that match the search term
    productCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = 'block';
            resultsFound = true;
            
            // Highlight the matching text
            highlightText(card.querySelector('h3'), searchTerm);
            highlightText(card.querySelector('p'), searchTerm);
        }
    });
    
    // Show message if no results found
    let messageElement = document.getElementById('searchMessage');
    if (!messageElement) {
        messageElement = document.createElement('p');
        messageElement.id = 'searchMessage';
        messageElement.style.textAlign = 'center';
        messageElement.style.margin = '2rem 0';
        messageElement.style.fontSize = '1.2rem';
        document.querySelector('main').prepend(messageElement);
    }
    
    if (!resultsFound) {
        messageElement.textContent = `No results found for "${searchTerm}". Please try a different search term.`;
        messageElement.style.display = 'block';
    } else {
        messageElement.style.display = 'none';
        // Scroll to the first result
        window.scrollTo({
            top: document.querySelector('.product-card[style="display: block;"]').offsetTop - 100,
            behavior: 'smooth'
        });
    }
    }
    
    function highlightText(element, searchTerm) {
    const originalText = element.textContent;
    const lowerText = originalText.toLowerCase();
    const index = lowerText.indexOf(searchTerm);
    
    if (index >= 0) {
        const beforeMatch = originalText.substring(0, index);
        const match = originalText.substring(index, index + searchTerm.length);
        const afterMatch = originalText.substring(index + searchTerm.length);
        
        element.innerHTML = beforeMatch + 
                           '<span style="background-color: #fef08a; color: #000;">' + 
                           match + 
                           '</span>' + 
                           afterMatch;
    }
    }
    
    // Add clear search functionality
    const clearSearch = document.createElement('button');
    clearSearch.textContent = 'Clear';
    clearSearch.style.display = 'none';
    clearSearch.style.marginLeft = '10px';
    clearSearch.style.padding = '0 1rem';
    clearSearch.style.backgroundColor = '#64748b';
    clearSearch.style.color = 'white';
    clearSearch.style.border = 'none';
    clearSearch.style.borderRadius = '4px';
    clearSearch.style.cursor = 'pointer';
    
    searchInput.parentNode.appendChild(clearSearch);
    
    clearSearch.addEventListener('click', function() {
    searchInput.value = '';
    document.querySelectorAll('.product-card').forEach(card => {
        card.style.display = 'block';
        
        // Remove highlighting
        const title = card.querySelector('h3');
        const description = card.querySelector('p');
        title.innerHTML = title.textContent;
        description.innerHTML = description.textContent;
    });
    
    const messageElement = document.getElementById('searchMessage');
    if (messageElement) {
        messageElement.style.display = 'none';
    }
    
    clearSearch.style.display = 'none';
    });
    
    searchInput.addEventListener('input', function() {
    if (this.value) {
        clearSearch.style.display = 'block';
    } else {
        clearSearch.style.display = 'none';
    }
    });
    });
    const applyFilterBtn = document.getElementById('apply-filter');
    const resetFilterBtn = document.getElementById('reset-filter');
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');
    
    if (applyFilterBtn && resetFilterBtn) {
        applyFilterBtn.addEventListener('click', applyFilters);
        resetFilterBtn.addEventListener('click', resetFilters);
    }
    
    function applyFilters() {
        const selectedCategory = categoryFilter.value;
        const selectedPrice = priceFilter.value;
        
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const priceText = card.querySelector('.price').textContent;
            // Fix price parsing by removing ₹ symbol and commas
            const price = parseFloat(priceText.replace('₹', '').replace(/,/g, ''));
            const budgetTag = card.querySelector('.budget-tag')?.textContent.toLowerCase() || '';
            
            // Category filtering
            let categoryMatch = selectedCategory === 'all';
            if (selectedCategory === 'gaming' && (title.includes('gaming') || title.includes('rog') || title.includes('alienware'))) {
                categoryMatch = true;
            } else if (selectedCategory === 'ultrabook' && (title.includes('xps') || title.includes('macbook') || title.includes('thinkpad x1'))) {
                categoryMatch = true;
            } else if (selectedCategory === 'budget' && (title.includes('aspire') || title.includes('ideapad') || budgetTag.includes('budget'))) {
                categoryMatch = true;
            } else if (selectedCategory === 'business' && (title.includes('thinkpad') || title.includes('latitude') || title.includes('elitebook'))) {
                categoryMatch = true;
            }
            
            // Fix price range comparison
            let priceMatch = selectedPrice === 'all';
            if (selectedPrice === 'budget' && price >= 0 && price < 30000) {
                priceMatch = true;
            } else if (selectedPrice === 'mid' && price >= 30000 && price < 60000) {
                priceMatch = true;
            } else if (selectedPrice === 'high' && price >= 60000 && price < 100000) {
                priceMatch = true;
            } else if (selectedPrice === 'premium' && price >= 100000) {
                priceMatch = true;
            }
            
            card.style.display = (categoryMatch && priceMatch) ? 'block' : 'none';
        });
        
        // Update filter message
        let messageElement = document.getElementById('filterMessage');
        if (!messageElement) {
            messageElement = document.createElement('p');
            messageElement.id = 'filterMessage';
            messageElement.style.textAlign = 'center';
            messageElement.style.margin = '1rem 0';
            messageElement.style.padding = '0.5rem';
            messageElement.style.backgroundColor = '#e0f2fe';
            messageElement.style.borderRadius = '4px';
            document.querySelector('.filter-container').after(messageElement);
        }
        
        const visibleProducts = document.querySelectorAll('.product-card[style="display: block;"]').length;
        messageElement.textContent = `Showing ${visibleProducts} products`;
        messageElement.style.display = 'block';
    }
    
    function resetFilters() {
        // Reset filter selections
        categoryFilter.value = 'all';
        priceFilter.value = 'all';
        
        // Show all products
        document.querySelectorAll('.product-card').forEach(card => {
            card.style.display = 'block';
        });
        
        // Hide filter message
        const messageElement = document.getElementById('filterMessage');
        if (messageElement) {
            messageElement.style.display = 'none';
        }
    }
        document.addEventListener('DOMContentLoaded', () => {
            const splashScreen = document.querySelector('.splash-screen');
            const progressBar = document.querySelector('.splash-progress-bar');
            
            // Simulate loading progress
            let progress = 0;
            const loadingInterval = setInterval(() => {
                progress += 1;
                if (progressBar) progressBar.style.width = `${progress}%`;
                
                if (progress >= 100) {
                    clearInterval(loadingInterval);
                    setTimeout(() => {
                        splashScreen.classList.add('fade-out');
                        setTimeout(() => {
                            splashScreen.style.display = 'none';
                        }, 500);
                    }, 500);
                }
            }, 20);
        });
        
        // Add animation indices to cards
        document.querySelectorAll('.product-card, .category-card, .review-card, .blog-card').forEach((card, index) => {
            card.style.setProperty('--card-index', index);
        });
        
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '50px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Unobserve after animation
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe all sections that should animate on scroll
        document.querySelectorAll('.fade-in-section').forEach((element) => {
            observer.observe(element);
        });
        
        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Page transition effect
        window.addEventListener('beforeunload', () => {
            document.body.classList.add('fade-out');
        });