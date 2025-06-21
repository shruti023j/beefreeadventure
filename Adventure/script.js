if (window.screen.width <= 1130) {
    function removeall() {
        $(".cir_border").css("border", "none");
    }

    $(".cir_border").on("click", function () {
        removeall();
        $(this).css({
            "border": "2px solid whitesmoke",
            "border-radius": "20px"
        });
    });
}

// Navbar Hover Effect
$("#about").on("mouseover", function () {
    introAboutLogoTransition();
});

// Light/Dark Mode Toggle
document.addEventListener("DOMContentLoaded", () => {
    const checkbox = document.getElementById("checkbox");

    function introAboutLogoTransition() {
        if (typeof $ !== "undefined") {
            $("#about-quad").css({
                top: "70%",
                opacity: "1",
            });
        } else {
            console.error("jQuery is not loaded.");
        }
    }

    function checkDarkMode() {
        if (localStorage.getItem("tourism_website_darkmode") === "true") {
            document.body.classList.add("dark");
            if (checkbox) checkbox.checked = true;
        }
    }
    checkDarkMode();

    if (checkbox) {
        checkbox.addEventListener("change", () => {
            document.body.classList.toggle("dark");
            localStorage.setItem(
                "tourism_website_darkmode",
                document.body.classList.contains("dark")
            );
        });
    } else {
        console.error("Checkbox element not found.");
    }
});

// Scroll-to-Top Button
let mybutton = document.getElementById("upbtn");

window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (mybutton) { // Ensuring mybutton exists before modifying
        if (
            document.body.scrollTop > 20 ||
            document.documentElement.scrollTop > 20
        ) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    }
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// Update Navbar While Scrolling
function updateNav() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links li a");

    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();

        if (window.screen.width <= 425) {
            if (rect.top <= 1300 && navLinks[index]) {
                navLinks.forEach(navLink => navLink.classList.remove("active"));
                navLinks[index].classList.add("active");
            }
        } else if (window.screen.width >= 425 && window.screen.width <= 768) {
            if (rect.top <= 1250 && navLinks[index]) {
                navLinks.forEach(navLink => navLink.classList.remove("active"));
                navLinks[index].classList.add("active");
            }
        } else {
            if (rect.top <= 1000 && navLinks[index]) {
                navLinks.forEach(navLink => navLink.classList.remove("active"));
                navLinks[index].classList.add("active");
            }
        }
    });
}

// Enhanced scroll animations
function animateOnScroll() {
    const cards = document.querySelectorAll('.feature-card, .testimonial-card, .tour-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out';
            }
        });
    });

    cards.forEach(card => observer.observe(card));
}

// Form validation
function validateForm() {
    const form = document.querySelector('.cform');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const remarks = document.getElementById('remarks').value;

            if (!name || !email || !remarks) {
                alert('Please fill in all required fields.');
                return;
            }

            if (!isValidEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            form.reset();
        });
    }
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Smooth tour item interactions
function enhanceTourItems() {
    const tourItems = document.querySelectorAll('.tour-item');
    tourItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px) scale(1.02)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
        });
    });
}

// Interactive Map functionality
function initializeMap() {
    const mapPoints = document.querySelectorAll('.map-point');
    mapPoints.forEach(point => {
        point.addEventListener('click', function() {
            const location = this.dataset.location;
            alert(`Learn more about ${location} adventures! Contact us for detailed information.`);
        });
    });
}

// Live Chat functionality
function initializeChat() {
    const chatLauncher = document.getElementById('chatLauncher');
    const chatWidget = document.getElementById('chatWidget');
    const chatToggle = document.getElementById('chatToggle');
    const chatInput = document.getElementById('chatInput');
    const sendChat = document.getElementById('sendChat');
    const chatBody = document.getElementById('chatBody');

    const botResponses = [
        "I'd be happy to help you plan your adventure! What type of experience are you looking for?",
        "Our most popular adventures are the Himalayan trek and African safari. Would you like details about either?",
        "We offer adventures for all skill levels. Are you a beginner, intermediate, or experienced adventurer?",
        "Our guides have years of experience and safety is our top priority. What questions do you have?",
        "I can help you with booking, pricing, or general information. What would you like to know?"
    ];

    function showChat() {
        chatWidget.style.display = 'flex';
        chatLauncher.style.display = 'none';
    }

    function hideChat() {
        chatWidget.style.display = 'none';
        chatLauncher.style.display = 'flex';
    }

    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            // Add user message
            const userMessage = document.createElement('div');
            userMessage.className = 'chat-message user-message';
            userMessage.innerHTML = `<p>${message}</p>`;
            chatBody.appendChild(userMessage);

            // Clear input
            chatInput.value = '';

            // Add bot response after delay
            setTimeout(() => {
                const botMessage = document.createElement('div');
                botMessage.className = 'chat-message bot-message';
                const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
                botMessage.innerHTML = `<p>${randomResponse}</p>`;
                chatBody.appendChild(botMessage);
                chatBody.scrollTop = chatBody.scrollHeight;
            }, 1000);

            chatBody.scrollTop = chatBody.scrollHeight;
        }
    }

    if (chatLauncher) chatLauncher.addEventListener('click', showChat);
    if (chatToggle) chatToggle.addEventListener('click', hideChat);
    if (sendChat) sendChat.addEventListener('click', sendMessage);
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
}

// Adventure Calculator functionality
function initializeCalculator() {
    const destination = document.getElementById('destination');
    const people = document.getElementById('people');
    const duration = document.getElementById('duration');
    const durationValue = document.getElementById('durationValue');
    const levelButtons = document.querySelectorAll('.level-btn');

    const prices = {
        himalayas: 2499,
        amazon: 1899,
        safari: 3299,
        arctic: 4999
    };

    function updateCalculation() {
        if (!destination || !people || !duration) return;

        const basePrice = prices[destination.value] || 2499;
        const numPeople = parseInt(people.value) || 1;
        const days = parseInt(duration.value) || 7;
        const selectedLevel = document.querySelector('.level-btn.active')?.dataset.level || 'beginner';

        // Calculate adjustments
        let durationMultiplier = days / 7; // Base 7 days
        let levelMultiplier = selectedLevel === 'expert' ? 1.2 : selectedLevel === 'intermediate' ? 1.1 : 1;

        const adjustedBasePrice = Math.round(basePrice * levelMultiplier);
        const groupPrice = adjustedBasePrice * numPeople;
        const durationAdjustment = Math.round((durationMultiplier - 1) * adjustedBasePrice * numPeople);
        const totalPrice = groupPrice + durationAdjustment;

        // Update UI
        document.getElementById('basePrice').textContent = `$${adjustedBasePrice.toLocaleString()}`;
        document.getElementById('groupSize').textContent = numPeople;
        document.getElementById('groupPrice').textContent = `$${groupPrice.toLocaleString()}`;
        document.getElementById('durationPrice').textContent = durationAdjustment >= 0 ? `+$${durationAdjustment.toLocaleString()}` : `-$${Math.abs(durationAdjustment).toLocaleString()}`;
        document.getElementById('totalPrice').textContent = `$${totalPrice.toLocaleString()}`;

        if (durationValue) {
            durationValue.textContent = `${days} days`;
        }
    }

    // Event listeners
    if (destination) destination.addEventListener('change', updateCalculation);
    if (people) people.addEventListener('input', updateCalculation);
    if (duration) {
        duration.addEventListener('input', updateCalculation);
        duration.addEventListener('input', function() {
            if (durationValue) {
                durationValue.textContent = `${this.value} days`;
            }
        });
    }

    levelButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            levelButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            updateCalculation();
        });
    });

    // Initial calculation
    updateCalculation();
}

// Photo Gallery filtering
function initializeGallery() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;

            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Filter items
            galleryItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.6s ease-out';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Adventure Quiz functionality
function initializeQuiz() {
    const questions = document.querySelectorAll('.quiz-question');
    const result = document.getElementById('quizResult');
    let currentQuestion = 1;
    let answers = {};

    const adventures = {
        himalayas: {
            title: "Himalayan Mountain Trek",
            description: "Perfect for mountain lovers who enjoy hiking and challenging terrains. Experience breathtaking views and test your limits.",
            price: "$2,499",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
        },
        amazon: {
            title: "Amazon Rainforest Adventure",
            description: "Ideal for wildlife enthusiasts and nature photographers. Explore the world's largest rainforest ecosystem.",
            price: "$1,899",
            image: "https://images.unsplash.com/photo-1518109268916-cfcc8e5cd6ba?w=400&h=300&fit=crop"
        },
        safari: {
            title: "African Safari Experience",
            description: "Perfect for wildlife photography and those seeking unique animal encounters in their natural habitat.",
            price: "$3,299",
            image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&h=300&fit=crop"
        },
        arctic: {
            title: "Arctic Expedition",
            description: "For extreme adventurers seeking unique landscapes and extraordinary wildlife in pristine environments.",
            price: "$4,999",
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
        }
    };

    function determineAdventure() {
        // Simple algorithm to determine best adventure based on answers
        const { q1, q2, q3 } = answers;

        if (q1 === 'mountains' && q2 === 'hiking') return adventures.himalayas;
        if (q1 === 'forest' && q2 === 'wildlife') return adventures.amazon;
        if (q2 === 'wildlife' && q1 !== 'forest') return adventures.safari;
        if (q2 === 'extreme' || q1 === 'desert') return adventures.arctic;

        // Default fallback
        return adventures.himalayas;
    }

    function showResult() {
        const adventure = determineAdventure();

        document.getElementById('resultTitle').textContent = adventure.title;
        document.getElementById('resultDescription').textContent = adventure.description;
        document.getElementById('resultPrice').textContent = adventure.price;
        document.getElementById('resultImage').src = adventure.image;

        questions.forEach(q => q.classList.remove('active'));
        result.classList.add('active');
    }

    function nextQuestion() {
        if (currentQuestion < 3) {
            questions.forEach(q => q.classList.remove('active'));
            questions[currentQuestion].classList.add('active');
            currentQuestion++;
        } else {
            showResult();
        }
    }

    // Add event listeners to quiz options
    document.querySelectorAll('.quiz-option').forEach(option => {
        option.addEventListener('click', function() {
            const questionNum = this.closest('.quiz-question').dataset.question;
            answers[`q${questionNum}`] = this.dataset.answer;

            // Visual feedback
            this.style.background = '#fc036b';
            this.style.color = 'white';

            setTimeout(() => {
                nextQuestion();
            }, 500);
        });
    });
}

// Newsletter subscription
function initializeNewsletter() {
    const subscribeBtn = document.getElementById('subscribeBtn');
    const emailInput = document.getElementById('newsletterEmail');

    if (subscribeBtn && emailInput) {
        subscribeBtn.addEventListener('click', function() {
            const email = emailInput.value.trim();
            if (email && isValidEmail(email)) {
                alert('Thank you for subscribing! You\'ll receive our latest adventure updates.');
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });

        emailInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                subscribeBtn.click();
            }
        });
    }
}

// Enhanced scroll animations with intersection observer
function enhancedAnimateOnScroll() {
    const animatedElements = document.querySelectorAll('.feature-card, .testimonial-card, .tour-item, .gallery-item, .blog-card, .quiz-container, .calc-inputs, .calc-result');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'all 0.8s ease-out';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
}

// Progress indicator for long pages
function initializeProgressIndicator() {
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0;
        height: 3px;
        background: linear-gradient(90deg, #fc036b, #ff6b9d);
        z-index: 9999;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);

    // Update progress on scroll
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// VR Tours functionality
function initializeVRTours() {
    const vrCards = document.querySelectorAll('.vr-card');

    vrCards.forEach(card => {
        card.addEventListener('click', function() {
            const destination = this.dataset.destination;
            launchVRExperience(destination);
        });
    });
}

function launchVRExperience(destination) {
    // Simulate VR tour launch
    const vrModal = document.createElement('div');
    vrModal.className = 'vr-modal';
    vrModal.innerHTML = `
        <div class="vr-content">
            <div class="vr-header">
                <h3>🥽 Virtual Reality Tour</h3>
                <button class="vr-close">×</button>
            </div>
            <div class="vr-viewer">
                <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop" alt="VR View">
                <div class="vr-controls">
                    <button class="vr-control">👁️ Look Around</button>
                    <button class="vr-control">🎧 Audio Guide</button>
                    <button class="vr-control">📱 Share Experience</button>
                </div>
            </div>
            <p>Experience ${destination} like never before! Use your VR headset or mouse to explore.</p>
        </div>
    `;

    document.body.appendChild(vrModal);

    // Close VR modal
    vrModal.querySelector('.vr-close').addEventListener('click', () => {
        document.body.removeChild(vrModal);
    });

    setTimeout(() => {
        vrModal.style.opacity = '1';
    }, 100);
}

// Weather Widget functionality
function initializeWeather() {
    const weatherCards = document.querySelectorAll('.weather-card');

    // Simulate real-time weather updates
    setInterval(() => {
        weatherCards.forEach(card => {
            const tempElement = card.querySelector('.weather-temp');
            const currentTemp = parseInt(tempElement.textContent);
            const variation = Math.floor(Math.random() * 6) - 3; // -3 to +3
            const newTemp = currentTemp + variation;
            tempElement.textContent = `${newTemp}°C`;
        });
    }, 30000); // Update every 30 seconds
}

// Advanced Booking System
function initializeBookingSystem() {
    let currentStep = 1;
    const totalSteps = 4;
    let bookingData = {};

    const steps = document.querySelectorAll('.step');
    const bookingSteps = document.querySelectorAll('.booking-step');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    // Adventure selection
    const adventureOptions = document.querySelectorAll('.adventure-option');
    adventureOptions.forEach(option => {
        option.addEventListener('click', function() {
            adventureOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            bookingData.adventure = this.dataset.adventure;
        });
    });

    // Navigation
    nextBtn.addEventListener('click', () => {
        if (currentStep < totalSteps) {
            currentStep++;
            updateBookingStep();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            updateBookingStep();
        }
    });

    function updateBookingStep() {
        // Update step indicators
        steps.forEach((step, index) => {
            step.classList.toggle('active', index + 1 === currentStep);
        });

        // Update content
        bookingSteps.forEach((step, index) => {
            step.classList.toggle('active', index + 1 === currentStep);
        });

        // Update navigation buttons
        prevBtn.disabled = currentStep === 1;
        nextBtn.textContent = currentStep === totalSteps ? 'Complete Booking' : 'Next';

        if (currentStep === totalSteps) {
            updateBookingSummary();
        }
    }

    function updateBookingSummary() {
        // Update booking summary in final step
        const selectedPackage = document.querySelector('.adventure-option.selected');
        if (selectedPackage) {
            document.getElementById('selectedPackage').textContent = selectedPackage.querySelector('h4').textContent;
            document.getElementById('totalAmount').textContent = selectedPackage.querySelector('.price').textContent;
        }
    }
}

// Video Testimonials
function initializeVideoPlayer() {
    const videoCards = document.querySelectorAll('.video-card');

    videoCards.forEach(card => {
        card.addEventListener('click', function() {
            const videoId = this.dataset.video;
            playVideo(videoId);
        });
    });
}

function playVideo(videoId) {
    const videoModal = document.createElement('div');
    videoModal.className = 'video-modal';
    videoModal.innerHTML = `
        <div class="video-player">
            <div class="video-header">
                <h3>Adventure Story</h3>
                <button class="video-close">×</button>
            </div>
            <div class="video-content">
                <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop" alt="Video">
                <div class="video-overlay">
                    <div class="video-play-btn">▶️</div>
                    <div class="video-title">Adventure Experience</div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(videoModal);

    videoModal.querySelector('.video-close').addEventListener('click', () => {
        document.body.removeChild(videoModal);
    });
}

// Live Stats Counter Animation
function initializeLiveStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const activityFeed = document.querySelector('.activity-feed');

    // Animate counting
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => observer.observe(stat));

    function animateCounter(element) {
        const target = parseInt(element.dataset.target);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }

            if (element.dataset.target.includes('.')) {
                element.textContent = current.toFixed(1);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    }

    // Simulate real-time activity updates
    const activities = [
        "Alex from Canada booked Arctic Expedition",
        "Sarah completed Himalayan Trek successfully",
        "Mike spotted rare wildlife in Amazon",
        "Emma reached Kilimanjaro summit",
        "Team Brazil started Safari adventure",
        "Lisa shared amazing photos from trek",
        "David joined mountaineering course",
        "Anna completed diving certification"
    ];

    setInterval(() => {
        const randomActivity = activities[Math.floor(Math.random() * activities.length)];
        const newActivity = document.createElement('div');
        newActivity.className = 'activity-item';
        newActivity.innerHTML = `
            <span class="activity-time">now</span>
            <span class="activity-text">${randomActivity}</span>
        `;

        activityFeed.insertBefore(newActivity, activityFeed.firstChild);

        // Remove old activities (keep only 3)
        while (activityFeed.children.length > 3) {
            activityFeed.removeChild(activityFeed.lastChild);
        }

        // Update timestamps
        updateActivityTimestamps();
    }, 10000); // New activity every 10 seconds
}

function updateActivityTimestamps() {
    const timeElements = document.querySelectorAll('.activity-time');
    timeElements.forEach((time, index) => {
        if (index === 0) {
            time.textContent = 'now';
        } else if (index === 1) {
            time.textContent = '5 min ago';
        } else {
            time.textContent = `${(index + 1) * 5} min ago`;
        }
    });
}

// Social Media Integration
function initializeSocialFeatures() {
    const socialPosts = document.querySelectorAll('.social-post');
    const shareBtn = document.querySelector('.social-btn');

    // Animate post interactions
    socialPosts.forEach(post => {
        const stats = post.querySelectorAll('.post-stats span');

        post.addEventListener('click', () => {
            stats.forEach(stat => {
                const currentCount = parseInt(stat.textContent.match(/\d+/)[0]);
                const newCount = currentCount + Math.floor(Math.random() * 5) + 1;
                stat.textContent = stat.textContent.replace(/\d+/, newCount);
            });
        });
    });

    // Share adventure functionality
    if (shareBtn) {
        shareBtn.addEventListener('click', () => {
            const shareModal = document.createElement('div');
            shareModal.className = 'share-modal';
            shareModal.innerHTML = `
                <div class="share-content">
                    <h3>Share Your Adventure</h3>
                    <div class="share-options">
                        <button class="share-option">📷 Instagram</button>
                        <button class="share-option">📘 Facebook</button>
                        <button class="share-option">🐦 Twitter</button>
                        <button class="share-option">💼 LinkedIn</button>
                    </div>
                    <textarea placeholder="Tell the world about your adventure..."></textarea>
                    <div class="share-actions">
                        <button class="cancel-share">Cancel</button>
                        <button class="post-share">Post</button>
                    </div>
                </div>
            `;

            document.body.appendChild(shareModal);

            shareModal.querySelector('.cancel-share').addEventListener('click', () => {
                document.body.removeChild(shareModal);
            });

            shareModal.querySelector('.post-share').addEventListener('click', () => {
                alert('Your adventure story has been shared!');
                document.body.removeChild(shareModal);
            });
        });
    }
}

// Advanced notification system
function initializeNotifications() {
    // Show welcome notification
    setTimeout(() => {
        showNotification('🎯 Welcome to Adventure! Explore our virtual tours and interactive features.', 'info');
    }, 2000);

    // Random adventure tips
    const tips = [
        '🏔️ Pro tip: Book early for better group discounts!',
        '📸 Don\'t forget to bring extra batteries for your camera',
        '🎒 Pack light but smart - check our packing guides',
        '🌟 Join our community for exclusive adventure updates'
    ];

    setInterval(() => {
        const randomTip = tips[Math.floor(Math.random() * tips.length)];
        showNotification(randomTip, 'tip');
    }, 45000); // Show tip every 45 seconds
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">×</button>
        </div>
    `;

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            document.body.removeChild(notification);
        }
    }, 5000);

    // Manual close
    notification.querySelector('.notification-close').addEventListener('click', () => {
        document.body.removeChild(notification);
    });
}

// Fix the introAboutLogoTransition function
function introAboutLogoTransition() {
    if (typeof $ !== "undefined") {
        $("#about-quad").css({
            top: "70%",
            opacity: "1",
        });
    } else {
        console.error("jQuery is not loaded.");
    }
}

// Enhanced Navbar functionality
function initializeNavbar() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links a');

    // Dynamic navbar background on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.4)';
            navbar.style.backdropFilter = 'saturate(180%) blur(25px)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.15)';
            navbar.style.backdropFilter = 'saturate(180%) blur(20px)';
        }
    });

    // Smooth scrolling for nav links
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

                // Update active nav item
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });
}

// Interactive Header Stats Counter
function initializeHeaderStats() {
    const statNumbers = document.querySelectorAll('.header-content .stat-number');
    let statsAnimated = false;

    function animateStats() {
        if (statsAnimated) return;
        statsAnimated = true;

        statNumbers.forEach(stat => {
            const target = parseInt(stat.dataset.target);
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current).toLocaleString();
            }, 16);
        });
    }

    // Trigger animation when header is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(animateStats, 3000); // Start after title animations
            }
        });
    }, { threshold: 0.5 });

    const header = document.querySelector('#home');
    if (header) observer.observe(header);
}

// Dynamic Quote Changer
function initializeDynamicQuote() {
    const quotes = [
        "Explore the colourful World",
        "Adventure Awaits You",
        "Discover Hidden Treasures",
        "Chase Your Dreams",
        "Create Unforgettable Memories",
        "Push Your Boundaries",
        "Find Your Wild Side"
    ];

    const quoteElement = document.getElementById('quote');
    let currentQuoteIndex = 0;

    function changeQuote() {
        if (!quoteElement) return;

        quoteElement.style.opacity = '0';
        quoteElement.style.transform = 'translateY(-20px)';

        setTimeout(() => {
            currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
            quoteElement.textContent = quotes[currentQuoteIndex];
            quoteElement.style.opacity = '1';
            quoteElement.style.transform = 'translateY(0)';
        }, 300);
    }

    // Change quote every 4 seconds
    setInterval(changeQuote, 4000);
}

// Interactive Floating Elements
function initializeFloatingElements() {
    const floatingIcons = document.querySelectorAll('.floating-icon');

    floatingIcons.forEach((icon, index) => {
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.5) rotate(15deg)';
            icon.style.textShadow = '0 8px 16px rgba(252, 3, 107, 0.5)';
        });

        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1) rotate(0deg)';
            icon.style.textShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
        });

        // Random movement
        setInterval(() => {
            const randomX = Math.random() * 10 - 5;
            const randomY = Math.random() * 10 - 5;
            icon.style.transform += ` translate(${randomX}px, ${randomY}px)`;
        }, 3000 + index * 1000);
    });
}

// Enhanced Button Interactions
function initializeButtonEffects() {
    const buttons = document.querySelectorAll('.ctn');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', (e) => {
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            button.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });

        button.addEventListener('click', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const clickEffect = document.createElement('span');
            clickEffect.className = 'click-effect';
            clickEffect.style.left = x + 'px';
            clickEffect.style.top = y + 'px';
            button.appendChild(clickEffect);

            setTimeout(() => {
                clickEffect.remove();
            }, 400);
        });
    });
}

// Initialize all features
document.addEventListener('DOMContentLoaded', function() {
    // Original functions
    animateOnScroll();
    validateForm();
    enhanceTourItems();

    // New interactive features
    initializeMap();
    initializeChat();
    initializeCalculator();
    initializeGallery();
    initializeQuiz();
    initializeNewsletter();
    enhancedAnimateOnScroll();
    initializeProgressIndicator();

    // Advanced features
    initializeVRTours();
    initializeWeather();
    initializeBookingSystem();
    initializeVideoPlayer();
    initializeLiveStats();
    initializeSocialFeatures();
    initializeNotifications();

    // Initialize scrolling captions
    initializeScrollingCaptions();

    // Initialize navbar and header stats
    initializeNavbar();
    initializeHeaderStats();
    initializeDynamicQuote();
    initializeFloatingElements();
    initializeButtonEffects();

    console.log('All interactive features initialized successfully!');
});

window.addEventListener("scroll", updateNav);