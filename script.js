// Countdown Timer
function updateCountdown() {
    const weddingDate = new Date('2025-03-07T16:00:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

    if (distance < 0) {
        document.getElementById('countdown').innerHTML = "<div class='countdown-item'><span class='countdown-number'>¡Ya es el gran día!</span></div>";
    }
}

// Photo carousel
function initPhotoCarousel() {
    const photos = document.querySelectorAll('.photo');
    let currentPhoto = 0;
    
    setInterval(() => {
        photos[currentPhoto].classList.remove('active');
        currentPhoto = (currentPhoto + 1) % photos.length;
        photos[currentPhoto].classList.add('active');
    }, 5000); // Change photo every 5 seconds
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown();

// Initialize photo carousel
initPhotoCarousel();

// Smooth scrolling for navigation links
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

// RSVP Form handling
document.querySelector('.rsvp-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send the data to a server
    // For now, we'll just show an alert
    alert('¡Gracias por confirmar tu asistencia! Te contactaremos pronto.');
    
    // Reset form
    this.reset();
});

// Add scroll effect to navbar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(248, 247, 243, 0.98)';
    } else {
        navbar.style.background = 'rgba(248, 247, 243, 0.95)';
    }
});

// Add fade-in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Hero section should be visible immediately
document.querySelector('#inicio').style.opacity = '1';
document.querySelector('#inicio').style.transform = 'translateY(0)';

// Add click handlers for recommendation links
document.querySelectorAll('.places a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        // Here you could add functionality to show more details
        // For now, we'll just add a visual feedback
        this.style.background = '#8b7355';
        this.style.color = 'white';
        
        setTimeout(() => {
            this.style.background = '';
            this.style.color = '';
        }, 200);
    });
});

// Add map link functionality
document.querySelectorAll('.map-link').forEach(link => {
    link.addEventListener('click', function(e) {
        // Links already have href and target="_blank" in HTML
        // No need to prevent default or add additional functionality
    });
});

// Add gift registry link functionality
document.querySelector('.gift-link').addEventListener('click', function(e) {
    e.preventDefault();
    // Replace with actual gift registry URL
    const giftUrl = 'https://www.liverpool.com.mx/mesa-de-regalos';
    window.open(giftUrl, '_blank');
});

// Mobile menu toggle (if needed)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('mobile-active');
}

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Form validation
function validateForm() {
    const form = document.querySelector('.rsvp-form');
    const inputs = form.querySelectorAll('input[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            input.style.borderColor = '#8b7355';
        }
    });
    
    return isValid;
}

// Add real-time form validation
document.querySelectorAll('.rsvp-form input, .rsvp-form select').forEach(input => {
    input.addEventListener('blur', function() {
        if (this.hasAttribute('required') && !this.value.trim()) {
            this.style.borderColor = '#e74c3c';
        } else {
            this.style.borderColor = '#8b7355';
        }
    });
});

console.log('Gloria & Salvador Wedding Website Loaded Successfully! 💒');
