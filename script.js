document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initRecommendationFilters();
    initContactForm();
    initAnimations();
    initRecommendationsPreview();
});

function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    document.addEventListener('click', function(e) {
        if (hamburger && !hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

function initRecommendationFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const recommendationCards = document.querySelectorAll('.recommendation-card');
    const recommendationCategories = document.querySelectorAll('.recommendation-category');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            if (filter === 'all') {
                recommendationCategories.forEach(category => {
                    category.classList.remove('hidden');
                });
                recommendationCards.forEach(card => {
                    card.classList.remove('hidden');
                });
            } else {
                recommendationCategories.forEach(category => {
                    category.classList.add('hidden');
                });
                
                const targetCategory = document.getElementById(filter + '-section');
                if (targetCategory) {
                    targetCategory.classList.remove('hidden');
                }
                
                recommendationCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    if (cardCategory === filter) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                });
            }
            
            setTimeout(() => {
                initAnimations();
            }, 100);
        });
    });
}

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            if (!formObject.name || !formObject.email || !formObject.subject || !formObject.message) {
                showFormMessage('Please fill in all required fields.', 'error');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formObject.email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            showFormMessage('Sending message...', 'success');
            
            setTimeout(() => {
                showFormMessage('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
                contactForm.reset();
            }, 2000);
        });
    }
}

function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        if (type === 'success') {
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    }
}

function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.feature-card, .recommendation-card, .value-card, .team-member, .faq-item, .contact-item');
    
    animateElements.forEach(element => {
        if (!element.classList.contains('hidden')) {
            element.classList.add('fade-in');
            observer.observe(element);
        }
    });
}

function initRecommendationsPreview() {
    const recommendationsPreview = document.getElementById('recommendationsPreview');
    
    if (recommendationsPreview) {
        const previewData = [
            {
                type: 'beach',
                title: 'Maldives',
                description: 'Crystal-clear waters and overwater bungalows',
                category: 'beach'
            },
            {
                type: 'temple',
                title: 'Angkor Wat, Cambodia',
                description: 'Ancient Khmer architecture and spiritual history',
                category: 'temple'
            },
            {
                type: 'country',
                title: 'Japan',
                description: 'Perfect blend of tradition and modernity',
                category: 'country'
            }
        ];
        
        function renderPreview(data) {
            recommendationsPreview.innerHTML = data.map(item => `
                <div class="preview-card ${item.category}" data-category="${item.category}">
                    <div class="preview-image">
                        <div class="placeholder-image ${item.type}-img">
                            <p>${item.title}</p>
                        </div>
                    </div>
                    <div class="preview-content">
                        <h3>${item.title}</h3>
                        <p>${item.description}</p>
                        <a href="recommendations.html" class="btn btn-primary">Learn More</a>
                    </div>
                </div>
            `).join('');
        }
        
        renderPreview(previewData);
        
        const previewFilterButtons = document.querySelectorAll('.recommendation-filters .filter-btn');
        previewFilterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                const previewCards = document.querySelectorAll('.preview-card');
                
                if (filter === 'all') {
                    previewCards.forEach(card => card.classList.remove('hidden'));
                } else {
                    previewCards.forEach(card => {
                        const cardCategory = card.getAttribute('data-category');
                        if (cardCategory === filter) {
                            card.classList.remove('hidden');
                        } else {
                            card.classList.add('hidden');
                        }
                    });
                }
            });
        });
    }
}

function smoothScrollTo(element) {
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function showLoading(element) {
    if (element) {
        element.innerHTML = '<div class="loading">Loading...</div>';
    }
}

function hideLoading(element, content) {
    if (element) {
        element.innerHTML = content;
    }
}

function saveUserPreference(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.log('Unable to save to localStorage');
    }
}

function getUserPreference(key) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (e) {
        console.log('Unable to read from localStorage');
        return null;
    }
}

function initUserPreferences() {
    const savedTheme = getUserPreference('theme');
    if (savedTheme) {
        document.body.classList.add(savedTheme);
    }
}

const additionalCSS = `
.preview-card {
    background: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    transition: transform 0.3s ease;
    margin-bottom: 2rem;
}

.preview-card:hover {
    transform: translateY(-5px);
}

.preview-image .placeholder-image {
    height: 200px;
}

.preview-content {
    padding: 1.5rem;
}

.preview-content h3 {
    margin-bottom: 0.5rem;
    color: #333;
}

.preview-content p {
    margin-bottom: 1rem;
    color: #666;
}

.loading {
    text-align: center;
    padding: 2rem;
    color: #667eea;
    font-weight: 600;
}

@media screen and (min-width: 768px) {
    #recommendationsPreview {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
    }
    
    .preview-card {
        margin-bottom: 0;
    }
}
`;

const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);
