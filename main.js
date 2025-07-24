// main.js

document.addEventListener('DOMContentLoaded', () => {
    // Current Year for Footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (navToggle && mainNav) {
        navToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            navToggle.classList.toggle('active');
            // Toggle ARIA expanded attribute
            const isExpanded = navToggle.classList.contains('active');
            navToggle.setAttribute('aria-expanded', isExpanded);
        });

        // Close nav when a link is clicked (for single-page navigation or after navigating)
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    navToggle.classList.remove('active');
                    navToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    // Testimonial Slider (if exists)
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const prevSlideBtn = document.querySelector('.prev-slide');
    const nextSlideBtn = document.querySelector('.next-slide');
    let currentIndex = 0;

    if (testimonialSlider && prevSlideBtn && nextSlideBtn) {
        const slides = testimonialSlider.querySelectorAll('.testimonial-slide');
        const totalSlides = slides.length;

        const showSlide = (index) => {
            if (index >= totalSlides) {
                currentIndex = 0;
            } else if (index < 0) {
                currentIndex = totalSlides - 1;
            } else {
                currentIndex = index;
            }
            testimonialSlider.style.transform = `translateX(-${currentIndex * 100}%)`;
        };

        prevSlideBtn.addEventListener('click', () => {
            showSlide(currentIndex - 1);
        });

        nextSlideBtn.addEventListener('click', () => {
            showSlide(currentIndex + 1);
        });

        // Auto-slide (optional)
        // setInterval(() => {
        //     showSlide(currentIndex + 1);
        // }, 7000); // Change slide every 7 seconds
    }

    // Simple Scroll Animation (Fade/Slide on scroll)
    const animateOnScroll = () => {
        const animatedElements = document.querySelectorAll('.section-padded, .hero, .cta-strip, .site-footer'); // Elements to observe
        const observerOptions = {
            root: null, // viewport
            rootMargin: '0px',
            threshold: 0.1 // 10% of element visible
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Stop observing once it's visible if it's a one-time animation
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animatedElements.forEach(element => {
            element.classList.add('animated-element'); // Add base class for animation
            observer.observe(element);
        });
    };

    animateOnScroll(); // Initialize scroll animation


    // Contact Form Validation (Basic)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const service = document.getElementById('service-needed');
            const message = document.getElementById('message');

            let isValid = true;

            // Simple validation check
            if (name.value.trim() === '') {
                alert('Please enter your name.');
                name.focus();
                isValid = false;
            } else if (email.value.trim() === '' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
                alert('Please enter a valid email address.');
                email.focus();
                isValid = false;
            } else if (service.value === '') {
                alert('Please select a service.');
                service.focus();
                isValid = false;
            } else if (message.value.trim() === '') {
                alert('Please enter your message.');
                message.focus();
                isValid = false;
            }

            if (!isValid) {
                event.preventDefault(); // Stop form submission if validation fails
            } else {
                // Here you would typically send data via AJAX or let the form submit to Formspree/Netlify
                // For a static site, Formspree/Netlify will handle the actual submission from the 'action' attribute.
                // alert('Form submitted successfully (Note: This is a static site demo; actual submission handled by backend service configured in HTML).');
                // You might prevent default here if you want to show a custom success message via JS
                // event.preventDefault();
            }
        });
        // Pre-fill service dropdown if coming from a CTA button
        const urlParams = new URLSearchParams(window.location.search);
        const serviceParam = urlParams.get('service');
        if (serviceParam) {
            const serviceSelect = document.getElementById('service-needed');
            if (serviceSelect) {
                // Map the parameter to the option value
                let selectedValue = '';
                if (serviceParam === 'audit') {
                    selectedValue = 'Remote Audit';
                } else if (serviceParam === 'consult') {
                    selectedValue = 'General Inquiry'; // Or a more specific 'Network Consulting' depending on desired flow
                }
                // Attempt to set the selected value
                if (selectedValue && Array.from(serviceSelect.options).some(option => option.value === selectedValue)) {
                    serviceSelect.value = selectedValue;
                }
            }
        }
    }
});