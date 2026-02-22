// ============================================
// RSVP FORM VARIABLES
// ============================================
const API_URL = 'https://script.google.com/macros/s/AKfycbzXycD3No47V9K8RYWpEwhamygFKYWKTpoRdDBTdqluqbEj4DH8oPREXKim11K99Dd1/exec';
let currentGroupId = null;
let allGuests = [];
let selectedGuest = null;

// Countdown Timer
function updateCountdown() {
    const weddingDate = new Date('2026-03-07T16:00:00').getTime();
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
        const href = this.getAttribute('href');
        
        // Skip if it's not a hash link (internal navigation)
        if (!href || !href.startsWith('#')) {
            return;
        }
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// RSVP Form handling (old code - can be removed)
const rsvpForm = document.querySelector('.rsvp-form');
if (rsvpForm) {
    rsvpForm.addEventListener('submit', function(e) {
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
}

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
const giftLink = document.querySelector('.gift-link');
if (giftLink) {
    giftLink.addEventListener('click', function(e) {
        e.preventDefault();
        // Replace with actual gift registry URL
        const giftUrl = 'https://www.liverpool.com.mx/mesa-de-regalos';
        window.open(giftUrl, '_blank');
    });
}

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


// ============================================
// RSVP FORM FUNCTIONALITY
// ============================================

// Normalize text for comparison (remove accents, lowercase)
function normalize(text) {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

// Load all guests when RSVP section is visible
async function loadRSVPGuests() {
  try {
    const response = await fetch(`${API_URL}?action=getAllGuests`);
    const data = await response.json();
    allGuests = data.guests;
    setupRSVPAutocomplete();
  } catch(error) {
    console.error('Error loading guests:', error);
  }
}

function setupRSVPAutocomplete() {
  const input = document.getElementById('guestName');
  const suggestionsDiv = document.getElementById('suggestions');
  
  if (!input || !suggestionsDiv) return;
  
  input.addEventListener('input', function() {
    const value = this.value.trim();
    
    if (value.length < 3) {
      suggestionsDiv.style.display = 'none';
      selectedGuest = null;
      return;
    }
    
    const normalized = normalize(value);
    const matches = allGuests.filter(g => normalize(g.nombre_completo).includes(normalized));
    
    if (matches.length === 0) {
      suggestionsDiv.style.display = 'none';
      return;
    }
    
    suggestionsDiv.innerHTML = '';
    matches.forEach(guest => {
      const div = document.createElement('div');
      div.className = 'suggestion-item';
      div.textContent = guest.nombre_completo;
      div.onclick = function() {
        input.value = guest.nombre_completo;
        selectedGuest = guest;
        suggestionsDiv.style.display = 'none';
      };
      suggestionsDiv.appendChild(div);
    });
    
    suggestionsDiv.style.display = 'block';
  });
  
  document.addEventListener('click', function(e) {
    if (e.target !== input && e.target.parentElement !== suggestionsDiv) {
      suggestionsDiv.style.display = 'none';
    }
  });
}

async function selectGuest() {
  const input = document.getElementById('guestName').value.trim();
  const errorDiv = document.getElementById('searchError');
  
  if (!input) {
    errorDiv.textContent = 'Por favor escribe tu nombre';
    errorDiv.classList.remove('hidden');
    return;
  }
  
  if (!selectedGuest) {
    errorDiv.textContent = 'Por favor selecciona un nombre de la lista';
    errorDiv.classList.remove('hidden');
    return;
  }
  
  errorDiv.classList.add('hidden');
  
  try {
    const url = `${API_URL}?action=searchGuest&name=${encodeURIComponent(selectedGuest.nombre_completo)}`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.error) {
      errorDiv.textContent = data.error;
      errorDiv.classList.remove('hidden');
      return;
    }
    
    currentGroupId = data.group_id;
    document.getElementById('guestInfo').textContent = 
      `${data.group_name}\nInvitados: ${data.members.length}`;
    
    document.getElementById('step1').classList.add('hidden');
    document.getElementById('step2').classList.remove('hidden');
  } catch(error) {
    errorDiv.textContent = 'Error de conexión. Intenta de nuevo.';
    errorDiv.classList.remove('hidden');
  }
}

// Flight data
const FLIGHTS = {
  'Jueves 05': [
    'Viva Aerobus VB7434 - AIFA (NLU) 17:15 → 18:15',
    'Aeroméxico AM872 - AIFA (NLU) 21:30 → 22:30',
    'Viva Aerobus VB2102 - Cancún (CUN) 6:00 → 6:50',
    'Viva Aerobus VB2104 - Cancún (CUN) 13:45 → 14:40',
    'Aeroméxico AM854 - CDMX (MEX) 12:00 → 13:04',
    'Viva Aerobus VB1426 - CDMX (MEX) 16:15 → 17:15',
    'Aeroméxico AM858 - CDMX (MEX) 16:00 → 17:05',
    'Aeroméxico AM860 - CDMX (MEX) 19:05 → 20:15',
    'Viva Aerobus VB3044 - Guadalajara (GDL) 6:20 → 7:50',
    'Volaris Y41250 - Guadalajara (GDL) 7:15 → 8:43',
    'Volaris Y41252 - Guadalajara (GDL) 17:20 → 18:48',
    'Viva Aerobus VB3054 - Guadalajara (GDL) 17:45 → 19:15',
    'United Airlines UA1861 - Houston (IAH) 9:31 → 11:49',
    'Viva Aerobus VB9020 - Mérida (MID) 11:45 → 13:10',
    'Viva Aerobus VB4162 - Monterrey (MTY) 6:15 → 7:50',
    'Viva Aerobus VB4168 - Monterrey (MTY) 20:10 → 21:40',
    'Viva Aerobus VB5140 - Tijuana (TIJ) 0:35 → 6:15'
  ],
  'Viernes 06': [
    'Viva Aerobus VB7434 - AIFA (NLU) 17:15 → 18:15',
    'Aeroméxico AM872 - AIFA (NLU) 21:30 → 22:30',
    'Viva Aerobus VB2102 - Cancún (CUN) 6:00 → 6:50',
    'Viva Aerobus VB2104 - Cancún (CUN) 13:45 → 14:40',
    'Aeroméxico AM850 - CDMX (MEX) 6:30 → 7:40',
    'Aeroméxico AM852 - CDMX (MEX) 8:15 → 9:22',
    'Aeroméxico AM854 - CDMX (MEX) 12:00 → 13:04',
    'Viva Aerobus VB1426 - CDMX (MEX) 16:15 → 17:15',
    'Viva Aerobus VB3044 - Guadalajara (GDL) 6:20 → 7:50',
    'Volaris Y41250 - Guadalajara (GDL) 7:15 → 8:43',
    'Viva Aerobus VB9020 - Mérida (MID) 11:45 → 13:10',
    'Viva Aerobus VB4162 - Monterrey (MTY) 6:15 → 7:50',
    'Viva Aerobus VB4168 - Monterrey (MTY) 20:10 → 21:40',
    'Viva Aerobus VB5140 - Tijuana (TIJ) 0:35 → 6:15'
  ],
  'Sabado 07': [
    'Viva Aerobus VB2102 - Cancún (CUN) 6:00 → 6:50',
    'Viva Aerobus VB2104 - Cancún (CUN) 13:45 → 14:40',
    'Aeroméxico AM850 - CDMX (MEX) 6:30 → 7:40',
    'Aeroméxico AM852 - CDMX (MEX) 8:10 → 9:17',
    'Aeroméxico AM854 - CDMX (MEX) 12:00 → 13:04',
    'American Airlines AA4014 - Dallas (DFW) 10:51 → 13:33',
    'Viva Aerobus VB3044 - Guadalajara (GDL) 6:20 → 7:50',
    'Volaris Y41250 - Guadalajara (GDL) 7:15 → 8:43',
    'Viva Aerobus VB9020 - Mérida (MID) 11:45 → 13:10',
    'Viva Aerobus VB4162 - Monterrey (MTY) 6:15 → 7:50',
    'Viva Aerobus VB5140 - Tijuana (TIJ) 0:35 → 6:15'
  ]
};

function handleAsistenciaChange() {
  const asiste = document.getElementById('asiste').value;
  const diaSection = document.getElementById('diaLlegadaSection');
  const llegoSection = document.getElementById('llegoSection');
  const vueloSection = document.getElementById('vueloSection');
  const hospedajeSection = document.getElementById('hospedajeSection');
  
  diaSection.classList.add('hidden');
  llegoSection.classList.add('hidden');
  vueloSection.classList.add('hidden');
  hospedajeSection.classList.add('hidden');
  
  if (asiste === 'No, no puedo asistir =(') {
    return;
  }
  
  if (asiste) {
    diaSection.classList.remove('hidden');
  }
}

function handleDiaLlegadaChange() {
  const dia = document.getElementById('dia_llegada').value;
  const llegoSection = document.getElementById('llegoSection');
  const vueloSection = document.getElementById('vueloSection');
  const hospedajeSection = document.getElementById('hospedajeSection');
  
  llegoSection.classList.add('hidden');
  vueloSection.classList.add('hidden');
  hospedajeSection.classList.add('hidden');
  
  if (dia === 'Vivimos en Veracruz') {
    return;
  }
  
  if (dia === 'Antes del jueves' || dia === 'Jueves 05' || dia === 'Viernes 06' || dia === 'Sabado 07') {
    llegoSection.classList.remove('hidden');
  }
}

function handleLlegoChange() {
  const llego = document.getElementById('llego').value;
  const dia = document.getElementById('dia_llegada').value;
  const vueloSection = document.getElementById('vueloSection');
  const hospedajeSection = document.getElementById('hospedajeSection');
  
  vueloSection.classList.add('hidden');
  hospedajeSection.classList.add('hidden');
  
  if (llego === 'Avion' && (dia === 'Jueves 05' || dia === 'Viernes 06' || dia === 'Sabado 07')) {
    const vueloSelect = document.getElementById('vuelo');
    vueloSelect.innerHTML = '<option value="">Selecciona</option>';
    
    const flights = FLIGHTS[dia] || [];
    flights.forEach(flight => {
      const option = document.createElement('option');
      option.value = flight;
      option.textContent = flight;
      vueloSelect.appendChild(option);
    });
    
    const optionOtro = document.createElement('option');
    optionOtro.value = 'Mi vuelo no aparece';
    optionOtro.textContent = 'Mi vuelo no aparece';
    vueloSelect.appendChild(optionOtro);
    
    vueloSection.classList.remove('hidden');
  }
  
  if (llego) {
    hospedajeSection.classList.remove('hidden');
  }
}

async function submitRSVP() {
  const errorDiv = document.getElementById('submitError');
  errorDiv.classList.add('hidden');
  
  const formData = {
    asiste: document.getElementById('asiste').value,
    dia_llegada: document.getElementById('dia_llegada').value || '',
    llego: document.getElementById('llego').value || '',
    vuelo: document.getElementById('vuelo').value || '',
    hospedaje: document.getElementById('hospedaje').value || ''
  };
  
  if (!formData.asiste) {
    errorDiv.textContent = 'Por favor indica si asistirás';
    errorDiv.classList.remove('hidden');
    return;
  }
  
  try {
    const params = new URLSearchParams({
      action: 'saveConfirmation',
      group_id: currentGroupId,
      asiste: formData.asiste,
      dia_llegada: formData.dia_llegada,
      llego: formData.llego,
      vuelo: formData.vuelo,
      hospedaje: formData.hospedaje
    });
    
    const response = await fetch(`${API_URL}?${params.toString()}`, {
      method: 'GET'
    });
    
    const data = await response.json();
    
    if (data.error) {
      errorDiv.textContent = data.error;
      errorDiv.classList.remove('hidden');
      return;
    }
    
    document.getElementById('pdfLink').href = data.pdf_url;
    document.getElementById('step2').classList.add('hidden');
    document.getElementById('step3').classList.remove('hidden');
  } catch(error) {
    errorDiv.textContent = 'Error al guardar. Intenta de nuevo.';
    errorDiv.classList.remove('hidden');
  }
}

// Load RSVP guests when page loads
if (document.getElementById('guestName')) {
  loadRSVPGuests();
}


// Accordion functionality for transport section
function toggleAccordion(header) {
    const content = header.nextElementSibling;
    const isActive = header.classList.contains('active');
    
    // Close all accordions in the same section
    const allHeaders = header.parentElement.parentElement.querySelectorAll('.accordion-header');
    const allContents = header.parentElement.parentElement.querySelectorAll('.accordion-content');
    
    allHeaders.forEach(h => h.classList.remove('active'));
    allContents.forEach(c => c.classList.remove('active'));
    
    // Toggle current accordion
    if (!isActive) {
        header.classList.add('active');
        content.classList.add('active');
    }
}
