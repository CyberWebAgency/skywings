// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        offset: 100
    });

    // Handle preloader immediately
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        // Force hide preloader after a short delay
        setTimeout(function() {
            preloader.classList.add('preloader-hide');
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 1000);
        }, 1500);
    }

    // Header Scroll Effect
    const header = document.querySelector('header');
    const scrollThreshold = 100;
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scrolled');
            return;
        }
        
        if (currentScroll > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu after clicking if it's open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        });
    });

    // Form Validation with Improved Visual Feedback
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        // Add validation styles on form submission
        form.addEventListener('submit', function(e) {
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
                
                // Add visual feedback for invalid fields
                const invalidFields = form.querySelectorAll(':invalid');
                invalidFields.forEach(field => {
                    field.classList.add('is-invalid');
                    // Add shake animation to invalid fields
                    field.classList.add('animate__animated', 'animate__shakeX');
                    
                    // Remove animation class after it completes
                    setTimeout(() => {
                        field.classList.remove('animate__animated', 'animate__shakeX');
                    }, 1000);
                });
            }
            
            form.classList.add('was-validated');
        });
        
        // Remove invalid styling once user starts typing in a field
        const formInputs = form.querySelectorAll('input, textarea, select');
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.classList.remove('is-invalid');
            });
            
            input.addEventListener('input', function() {
                if (this.checkValidity()) {
                    this.classList.remove('is-invalid');
                    this.classList.add('is-valid');
                }
            });
        });
    });

    // Initialize datepicker for form elements
    const dateInputs = document.querySelectorAll('[data-toggle="datepicker"]');
    dateInputs.forEach(input => {
        $(input).datepicker({
            format: 'mm/dd/yyyy',
            autoclose: true,
            todayHighlight: true,
            startDate: new Date()
        });
    });

    // Initialize Package Carousel using Swiper
    const packageSwiper = new Swiper('.package-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 30,
            }
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
    });

    // Add animation to service icons
    const serviceBoxes = document.querySelectorAll('.single-service-box');
    serviceBoxes.forEach(box => {
        box.addEventListener('mouseenter', function() {
            const img = this.querySelector('.service-img img');
            if (img) {
                img.classList.add('animate__animated', 'animate__pulse');
            }
        });
        
        box.addEventListener('mouseleave', function() {
            const img = this.querySelector('.service-img img');
            if (img) {
                img.classList.remove('animate__animated', 'animate__pulse');
            }
        });
    });

    // Add animation to CTA buttons
    const ctaButtons = document.querySelectorAll('.about-view');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.classList.add('animate__animated', 'animate__pulse');
        });
        
        button.addEventListener('mouseleave', function() {
            this.classList.remove('animate__animated', 'animate__pulse');
        });
    });

    // Fix for Bootstrap 5 tab functionality with older HTML structure
    const tabLinks = document.querySelectorAll('.nav-tabs a');
    tabLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all tabs and panes
            document.querySelectorAll('.nav-tabs li').forEach(tab => tab.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(pane => {
                pane.classList.remove('active');
                pane.classList.remove('show');
            });
            
            // Add active class to clicked tab
            this.parentElement.classList.add('active');
            
            // Show corresponding tab content
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.classList.add('active');
                target.classList.add('show');
                target.classList.add('in');
            }
        });
    });

    // Initialize image filtering in Gallery
    if (typeof Filterizr !== 'undefined') {
        const filterizr = new Filterizr('.filtr-container', {
            controlsSelector: '.filtr-control',
            gutterPixels: 20,
            layout: 'sameWidth'
        });
    }

    // Lazy load images for better performance
    const lazyImages = document.querySelectorAll('[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // Add parallax effect to sections with parallax class
    const parallaxElements = document.querySelectorAll('.parallax');
    parallaxElements.forEach(element => {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            const elementOffset = element.offsetTop;
            const distance = (elementOffset - scrollPosition) * 0.5;
            
            element.style.backgroundPosition = `center ${distance}px`;
        });
    });

    // Add counter animation for statistics
    const countElements = document.querySelectorAll('.count-number');
    
    // Use Intersection Observer to start counting when element is visible
    if (countElements.length > 0) {
        const options = {
            threshold: 0.5
        };
        
        const countObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const countTo = parseInt(element.getAttribute('data-count'));
                    
                    $({ countNum: 0 }).animate({
                        countNum: countTo
                    }, {
                        duration: 2000,
                        easing: 'linear',
                        step: function() {
                            element.textContent = Math.floor(this.countNum);
                        },
                        complete: function() {
                            element.textContent = this.countNum;
                        }
                    });
                    
                    observer.unobserve(element);
                }
            });
        }, options);
        
        countElements.forEach(element => {
            countObserver.observe(element);
        });
    }
}); 