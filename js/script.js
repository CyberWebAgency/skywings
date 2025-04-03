// Sticky Navigation
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
        navbar.classList.remove('bg-light');
        navbar.classList.add('bg-white');
    } else {
        navbar.classList.remove('navbar-scrolled');
        navbar.classList.add('bg-light');
        navbar.classList.remove('bg-white');
    }
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(navLink => {
                navLink.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Set min date for departure and return date inputs
const today = new Date();
const tomorrowDate = new Date(today);
tomorrowDate.setDate(today.getDate() + 1);

const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const departureDate = document.getElementById('departure-date');
const returnDate = document.getElementById('return-date');

if (departureDate) {
    departureDate.min = formatDate(today);
    departureDate.value = formatDate(today);
}

if (returnDate) {
    returnDate.min = formatDate(tomorrowDate);
    returnDate.value = formatDate(tomorrowDate);
}

// Departure date change event
if (departureDate) {
    departureDate.addEventListener('change', function() {
        const selectedDate = new Date(this.value);
        const nextDay = new Date(selectedDate);
        nextDay.setDate(selectedDate.getDate() + 1);
        
        returnDate.min = formatDate(nextDay);
        
        // If return date is before departure date, update it
        if (new Date(returnDate.value) <= selectedDate) {
            returnDate.value = formatDate(nextDay);
        }
    });
}

// Form submission handling
const searchForm = document.querySelector('#search-form form');
if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const departure = document.getElementById('departure').value;
        const destination = document.getElementById('destination').value;
        const departureDate = document.getElementById('departure-date').value;
        const returnDate = document.getElementById('return-date').value;
        
        alert(`Searching for flights from ${departure} to ${destination} on ${departureDate}${returnDate ? `, returning on ${returnDate}` : ''}`);
        
        // In a real application, this would make an API call or redirect to search results
    });
}

// Animation for destination cards
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.destination-card').forEach(card => {
    observer.observe(card);
});

// Contact form validation and submission
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simple validation
        const name = this.querySelector('input[type="text"]').value.trim();
        const email = this.querySelector('input[type="email"]').value.trim();
        const message = this.querySelector('textarea').value.trim();
        
        if (!name || !email || !message) {
            alert('Please fill out all required fields.');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';
        
        setTimeout(() => {
            alert('Thank you for your message! We will get back to you soon.');
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Send Message';
            this.reset();
        }, 2000);
    });
}

// Newsletter subscription
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value.trim();
        
        if (!email) {
            alert('Please enter your email address.');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
        
        setTimeout(() => {
            alert('Thank you for subscribing to our newsletter!');
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Subscribe';
            this.reset();
        }, 1500);
    });
}

// Initialize current year in the footer copyright
const currentYear = new Date().getFullYear();
const copyrightElement = document.querySelector('.copyright');
if (copyrightElement) {
    copyrightElement.innerHTML = copyrightElement.innerHTML.replace('2023', currentYear);
} 