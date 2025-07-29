// Main JavaScript functionality for Virtual Tutor AI

class VirtualTutorApp {
    constructor() {
        this.currentAvatar = 'alex';
        this.avatarData = {
            alex: {
                name: 'Alex',
                specialty: 'Mathematics & Science Expert',
                greeting: "Hello! I'm Alex, your AI tutor. I specialize in Mathematics and Science. What would you like to learn today?",
                responses: [
                    "Great question! Let me break down this mathematical concept step by step.",
                    "I can help you understand this scientific principle. Here's how it works:",
                    "That's an excellent math problem! Let me guide you through the solution:",
                    "Science can be fascinating! Let me explain this concept in simple terms:",
                    "Mathematics is all about patterns. Let me show you the pattern here:"
                ]
            },
            sarah: {
                name: 'Sarah',
                specialty: 'Language & Literature Specialist',
                greeting: "Hi there! I'm Sarah, your language and literature tutor. I'm here to help you with writing, reading, and language skills!",
                responses: [
                    "That's a wonderful question about literature! Let me help you analyze this text:",
                    "Language learning is exciting! Here's how we can improve your skills:",
                    "Great writing question! Let me guide you through proper grammar and style:",
                    "Literature analysis can be fun! Let me show you different perspectives:",
                    "Excellent language inquiry! Here's how to express that more effectively:"
                ]
            },
            mike: {
                name: 'Mike',
                specialty: 'Programming & Technology Guru',
                greeting: "Hey! I'm Mike, your programming and technology tutor. Ready to dive into the world of coding and tech?",
                responses: [
                    "Awesome coding question! Let me walk you through this programming concept:",
                    "Technology is amazing! Here's how this system works:",
                    "Great programming challenge! Let me help you debug this step by step:",
                    "That's a solid tech question! Let me explain the underlying principles:",
                    "Coding can be fun! Here's a clean way to implement that solution:"
                ]
            },
            emma: {
                name: 'Emma',
                specialty: 'History & Social Studies Expert',
                greeting: "Hello! I'm Emma, your history and social studies tutor. Let's explore the fascinating world of human civilization together!",
                responses: [
                    "Fascinating historical question! Let me provide some context about that era:",
                    "History is full of interesting stories! Here's what happened during that time:",
                    "Great question about society! Let me explain the social dynamics:",
                    "That's an important historical event! Here's how it shaped our world:",
                    "Social studies helps us understand people! Let me break down this concept:"
                ]
            }
        };
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupCourseFiltering();
        this.setupChatBot();
        this.setupAvatarSelection();
        this.setupPricingToggle();
        this.setupScrollAnimations();
        this.setupVideoPlayer();
        this.setupContactForm();
    }

    // Navigation functionality
    setupNavigation() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Mobile menu toggle
        navToggle?.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Smooth scrolling for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }

                // Update active state
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');

                // Close mobile menu
                navMenu.classList.remove('active');
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            }
        });
    }

    // Course filtering functionality
    setupCourseFiltering() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const courseCards = document.querySelectorAll('.course-card');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                
                // Update active filter button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Filter courses
                courseCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeInUp 0.5s ease-out';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });

        // Course card hover effects
        courseCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(-4px)';
            });
        });
    }

    // Avatar selection functionality
    setupAvatarSelection() {
        const avatarOptions = document.querySelectorAll('.avatar-option');
        
        avatarOptions.forEach(option => {
            option.addEventListener('click', () => {
                const avatarId = option.getAttribute('data-avatar');
                this.switchAvatar(avatarId);
                
                // Update active state
                avatarOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
            });
        });
    }

    switchAvatar(avatarId) {
        this.currentAvatar = avatarId;
        const avatarData = this.avatarData[avatarId];
        
        // Update chat header
        const currentAvatarDisplay = document.querySelector('.current-avatar-display');
        const tutorName = document.querySelector('.tutor-name');
        
        if (currentAvatarDisplay && tutorName) {
            currentAvatarDisplay.className = `current-avatar-display ${avatarId}-avatar`;
            tutorName.textContent = avatarData.name;
        }
        
        // Clear chat and add new greeting
        const chatMessages = document.getElementById('chat-messages');
        if (chatMessages) {
            chatMessages.innerHTML = '';
            this.addChatMessage(avatarData.greeting, 'ai');
        }
    }

    // Chat bot functionality
    setupChatBot() {
        const chatInput = document.getElementById('chat-input');
        const sendButton = document.getElementById('send-message');

        const sendMessage = () => {
            const message = chatInput.value.trim();
            if (!message) return;

            // Add user message
            this.addChatMessage(message, 'user');
            chatInput.value = '';

            // Simulate typing indicator
            setTimeout(() => {
                this.addTypingIndicator();
                
                // Add AI response after delay
                setTimeout(() => {
                    this.removeTypingIndicator();
                    const currentAvatarData = this.avatarData[this.currentAvatar];
                    const randomResponse = currentAvatarData.responses[Math.floor(Math.random() * currentAvatarData.responses.length)];
                    this.addChatMessage(randomResponse, 'ai');
                }, 2000);
            }, 500);
        };

        sendButton?.addEventListener('click', sendMessage);
        
        chatInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });

        // Auto-focus input when section is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    chatInput?.focus();
                }
            });
        });

        const aiTutorSection = document.getElementById('ai-tutor');
        if (aiTutorSection) {
            observer.observe(aiTutorSection);
        }
    }

    addChatMessage(content, sender) {
        const chatMessages = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const currentAvatarData = this.avatarData[this.currentAvatar];
        
        // Get the appropriate avatar class and content
        const avatarClass = sender === 'ai' ? `${this.currentAvatar}-avatar` : 'user-avatar';
        const avatarContent = sender === 'ai' ? this.getAvatarSVG(this.currentAvatar) : 'You';
        
        messageDiv.innerHTML = `
            <div class="message-avatar ${avatarClass}">
                ${sender === 'ai' ? avatarContent : avatarContent}
            </div>
            <div class="message-content">
                <p>${content}</p>
                <span class="message-time">${time}</span>
            </div>
        `;

        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Add fade-in animation
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            messageDiv.style.transition = 'all 0.3s ease';
            messageDiv.style.opacity = '1';
            messageDiv.style.transform = 'translateY(0)';
        }, 100);
    }

    getAvatarSVG(avatarId) {
        const svgMap = {
            alex: `<svg viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4" fill="currentColor"/>
                <path d="M20 21C20 16.5817 16.4183 13 12 13C7.58172 13 4 16.5817 4 21" stroke="currentColor" stroke-width="2"/>
            </svg>`,
            sarah: `<svg viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4" fill="currentColor"/>
                <path d="M20 21C20 16.5817 16.4183 13 12 13C7.58172 13 4 16.5817 4 21" stroke="currentColor" stroke-width="2"/>
                <path d="M8 6C8 6 10 4 12 4C14 4 16 6 16 6" stroke="currentColor" stroke-width="1"/>
            </svg>`,
            mike: `<svg viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4" fill="currentColor"/>
                <path d="M20 21C20 16.5817 16.4183 13 12 13C7.58172 13 4 16.5817 4 21" stroke="currentColor" stroke-width="2"/>
                <rect x="10" y="6" width="4" height="2" fill="white"/>
            </svg>`,
            emma: `<svg viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4" fill="currentColor"/>
                <path d="M20 21C20 16.5817 16.4183 13 12 13C7.58172 13 4 16.5817 4 21" stroke="currentColor" stroke-width="2"/>
                <circle cx="10" cy="7" r="1" fill="white"/>
                <circle cx="14" cy="7" r="1" fill="white"/>
                <path d="M10 10C10 10 11 11 12 11C13 11 14 10 14 10" stroke="white" stroke-width="1"/>
            </svg>`
        };
        return svgMap[avatarId] || svgMap.alex;
    }

    addTypingIndicator() {
        const chatMessages = document.getElementById('chat-messages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message ai-message typing-indicator';
        
        const currentAvatarData = this.avatarData[this.currentAvatar];
        const avatarSVG = this.getAvatarSVG(this.currentAvatar);
        
        typingDiv.innerHTML = `
            <div class="message-avatar ${this.currentAvatar}-avatar">
                ${avatarSVG}
            </div>
            <div class="message-content">
                <p>
                    <span class="typing-dots">
                        <span>.</span><span>.</span><span>.</span>
                    </span>
                </p>
            </div>
        `;

        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Add typing animation
        const dots = typingDiv.querySelectorAll('.typing-dots span');
        dots.forEach((dot, index) => {
            dot.style.animation = `typingDot 1.4s infinite ${index * 0.2}s`;
        });
    }

    removeTypingIndicator() {
        const typingIndicator = document.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    // Pricing toggle functionality
    setupPricingToggle() {
        const pricingToggle = document.getElementById('pricing-toggle');
        const monthlyPrices = document.querySelectorAll('.monthly-price');
        const yearlyPrices = document.querySelectorAll('.yearly-price');

        pricingToggle?.addEventListener('change', () => {
            if (pricingToggle.checked) {
                // Show yearly prices
                monthlyPrices.forEach(price => price.style.display = 'none');
                yearlyPrices.forEach(price => price.style.display = 'inline');
            } else {
                // Show monthly prices
                monthlyPrices.forEach(price => price.style.display = 'inline');
                yearlyPrices.forEach(price => price.style.display = 'none');
            }
        });

        // Pricing card interactions
        const pricingCards = document.querySelectorAll('.pricing-card');
        pricingCards.forEach(card => {
            const button = card.querySelector('.btn-pricing');
            
            button?.addEventListener('click', () => {
                // Simulate payment process
                this.showPaymentModal(card);
            });
        });
    }

    showPaymentModal(pricingCard) {
        const planName = pricingCard.querySelector('h3').textContent;
        const price = pricingCard.querySelector('.amount:not([style*="display: none"])').textContent;
        
        // Create modal overlay
        const modalOverlay = document.createElement('div');
        modalOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        // Create modal content
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: white;
            padding: 2rem;
            border-radius: 1rem;
            max-width: 400px;
            width: 90%;
            text-align: center;
            transform: scale(0.9);
            transition: transform 0.3s ease;
        `;

        modalContent.innerHTML = `
            <h3 style="margin-bottom: 1rem; color: var(--neutral-900);">Payment Demo</h3>
            <p style="margin-bottom: 1.5rem; color: var(--neutral-600);">
                You selected the <strong>${planName}</strong> plan for <strong>$${price}/month</strong>
            </p>
            <p style="margin-bottom: 2rem; color: var(--neutral-500); font-size: 0.875rem;">
                This is a demo. No actual payment will be processed.
            </p>
            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button class="btn-outline" onclick="this.closest('.modal-overlay').remove()">
                    Cancel
                </button>
                <button class="btn-primary" onclick="this.showSuccess()">
                    Continue Demo
                </button>
            </div>
        `;

        modalOverlay.className = 'modal-overlay';
        modalOverlay.appendChild(modalContent);
        document.body.appendChild(modalOverlay);

        // Animate modal in
        setTimeout(() => {
            modalOverlay.style.opacity = '1';
            modalContent.style.transform = 'scale(1)';
        }, 10);

        // Add success handler
        const continueBtn = modalContent.querySelector('.btn-primary');
        continueBtn.onclick = () => {
            modalContent.innerHTML = `
                <div style="color: var(--accent-500); margin-bottom: 1rem;">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" style="margin: 0 auto;">
                        <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2"/>
                    </svg>
                </div>
                <h3 style="margin-bottom: 1rem; color: var(--neutral-900);">Demo Complete!</h3>
                <p style="margin-bottom: 2rem; color: var(--neutral-600);">
                    In a real scenario, you would now have access to the ${planName} plan.
                </p>
                <button class="btn-primary" onclick="this.closest('.modal-overlay').remove()">
                    Close
                </button>
            `;
        };
    }

    // Contact form functionality
    setupContactForm() {
        const contactForm = document.getElementById('contact-form');
        
        contactForm?.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Simulate form submission
            const submitBtn = contactForm.querySelector('.btn-form');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.textContent = 'Message Sent!';
                submitBtn.style.background = 'var(--accent-500)';
                
                // Reset form
                contactForm.reset();
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 2000);
            }, 1500);
        });
    }

    // Scroll animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animatedElements = document.querySelectorAll(
            '.feature-card, .course-card, .pricing-card, .ai-feature, .contact-item, .avatar-option'
        );

        animatedElements.forEach(el => observer.observe(el));
    }

    // Video player functionality
    setupVideoPlayer() {
        const videoPlaceholder = document.querySelector('.video-placeholder');
        const playButton = document.querySelector('.play-button');

        videoPlaceholder?.addEventListener('click', () => {
            // Simulate video playback
            const overlay = videoPlaceholder.querySelector('.video-overlay');
            playButton.style.transform = 'scale(1.2)';
            
            setTimeout(() => {
                playButton.style.transform = 'scale(1)';
                overlay.innerHTML = `
                    <h3>Video Playing...</h3>
                    <p>This would be your actual video content</p>
                `;
            }, 200);

            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                pointer-events: none;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                width: 100px;
                height: 100px;
                left: 50%;
                top: 50%;
                margin-left: -50px;
                margin-top: -50px;
            `;

            videoPlaceholder.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }
}

// CSS animations for typing dots and ripple effect
const additionalStyles = `
@keyframes typingDot {
    0%, 60%, 100% { opacity: 0.3; }
    30% { opacity: 1; }
}

@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

.typing-dots {
    display: inline-block;
}

.typing-dots span {
    opacity: 0.3;
    display: inline-block;
    margin: 0 1px;
}

.user-avatar {
    background: var(--neutral-600);
    color: white;
    font-size: 0.75rem;
    font-weight: var(--font-weight-semibold);
}
`;

// Add additional styles to the document
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new VirtualTutorApp();
});

// Additional utility functions
function debounce(func, wait) {
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

// Smooth scroll polyfill for older browsers
function smoothScrollTo(element) {
    const start = window.pageYOffset;
    const target = element.offsetTop - 80; // Account for fixed navbar
    const distance = target - start;
    const duration = 800;
    let startTime = null;

    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const ease = 0.5 - Math.cos(progress * Math.PI) / 2;
        
        window.scrollTo(0, start + distance * ease);
        
        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }

    requestAnimationFrame(step);
}

// Performance optimization: Lazy load images
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VirtualTutorApp;
}