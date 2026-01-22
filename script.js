// Premium Scroll Effects
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInLeft 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards';
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.benefit-card, .event-card, .testimonial-card').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
});

// Enhanced Scroll Indicator
const createScrollIndicator = () => {
    const indicator = document.createElement('div');
    indicator.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #1a73e8, #34a853, #ea4335);
        z-index: 9999;
        transition: width 0.2s ease;
    `;
    document.body.appendChild(indicator);
    
    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        indicator.style.width = scrollPercent + '%';
    });
};

createScrollIndicator();

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.style.animation = 'pulse 0.6s ease';
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Enhanced Smooth scrolling
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

// Scroll to events section
function scrollToEvents() {
    const eventsSection = document.getElementById('events');
    eventsSection.scrollIntoView({
        behavior: 'smooth'
    });
    // Add highlight effect
    eventsSection.style.animation = 'glow 2s ease-in-out';
}

// Enhanced FAQ Accordion
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items with animation
    document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem && item.classList.contains('active')) {
            item.style.animation = 'slideUp 0.3s ease reverse';
            setTimeout(() => item.classList.remove('active'), 150);
        }
    });
    
    // Open clicked FAQ item
    if (!isActive) {
        faqItem.classList.add('active');
        faqItem.style.animation = 'slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    }
}

// Premium Payment Modal Functions
let currentEventData = {
    id: null,
    name: '',
    price: 0
};

function openPaymentModal(eventId, eventName, price) {
    currentEventData = {
        id: eventId,
        name: eventName,
        price: price
    };
    
    const modal = document.getElementById('paymentModal');
    
    // Set event name in form
    document.getElementById('eventName').value = eventName;
    document.getElementById('totalPrice').textContent = '₹' + price;
    
    // Show modal with animation
    modal.style.display = 'block';
    modal.style.animation = 'fadeIn 0.3s ease';
    document.body.style.overflow = 'hidden';
    
    // Focus on first input
    setTimeout(() => document.getElementById('fullName').focus(), 300);
}

function closePaymentModal() {
    const modal = document.getElementById('paymentModal');
    modal.style.animation = 'fadeIn 0.3s ease reverse';
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        document.getElementById('registrationForm').reset();
    }, 200);
}

// Enhanced Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('paymentModal');
    if (event.target == modal) {
        closePaymentModal();
    }
});

// Razorpay Payment Processing
function processPayment() {
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const company = document.getElementById('company').value.trim();
    const designation = document.getElementById('designation').value.trim();
    
    // Comprehensive Validation
    if (!fullName || !email || !phone) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    if (!isValidPhone(phone)) {
        showNotification('Please enter a valid 10-digit phone number', 'error');
        return;
    }
    
    // Show processing state
    const btn = document.querySelector('[onclick="processPayment()"]');
    const originalText = btn.textContent;
    btn.textContent = 'Processing...';
    btn.disabled = true;
    btn.style.opacity = '0.7';
    
    // Initialize Razorpay payment
    const options = {
        key: 'rzp_test_S6stJZZImiQSWv',
        amount: currentEventData.price * 100,
        currency: 'INR',
        name: 'Founders Table',
        description: currentEventData.name,
        image: '',
        prefill: {
            name: fullName,
            email: email,
            contact: phone
        },
        notes: {
            event_id: currentEventData.id,
            event_name: currentEventData.name,
            company: company,
            designation: designation
        },
        theme: {
            color: '#1a73e8'
        },
        handler: function (response) {
            handlePaymentSuccess(response, fullName, email, phone, company, designation);
        },
        modal: {
            ondismiss: function() {
                btn.textContent = originalText;
                btn.disabled = false;
                btn.style.opacity = '1';
                showNotification('Payment cancelled. Please try again.', 'info');
            }
        }
    };
    
    const rzp1 = new Razorpay(options);
    
    rzp1.on('payment.failed', function (response) {
        btn.textContent = originalText;
        btn.disabled = false;
        btn.style.opacity = '1';
        handlePaymentError(response.error);
    });
    
    rzp1.open();
}

function handlePaymentSuccess(response, fullName, email, phone, company, designation) {
    console.log('Payment successful:', response);
    
    // Store registration data
    const registrationData = {
        event_id: currentEventData.id,
        event_name: currentEventData.name,
        full_name: fullName,
        email: email,
        phone: phone,
        company: company,
        designation: designation,
        amount: currentEventData.price,
        payment_id: response.razorpay_payment_id,
        order_id: response.razorpay_order_id || '',
        signature: response.razorpay_signature || '',
        registration_date: new Date().toISOString()
    };
    
    // Save to localStorage
    let registrations = JSON.parse(localStorage.getItem('registrations')) || [];
    registrations.push(registrationData);
    localStorage.setItem('registrations', JSON.stringify(registrations));
    
    // Send to Google Sheets
    sendToGoogleSheets(registrationData);
    
    // Show success notification
    showNotification(`Welcome ${fullName}! Registration confirmed! 🎉`, 'success');
    
    // Show detailed success message
    setTimeout(() => {
        alert(`Thank you for registering, ${fullName}!\n\nPayment ID: ${response.razorpay_payment_id}\n\nA confirmation email will be sent to ${email} shortly.`);
        closePaymentModal();
    }, 500);
}

function handlePaymentError(error) {
    console.error('Payment error:', error);
    showNotification(`Payment failed: ${error.description}. Please try again.`, 'error');
}

// Enhanced Form Validation with Real-time Feedback
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[0-9]{10}$/;
    const cleanPhone = phone.replace(/\D/g, '');
    return cleanPhone.length >= 10;
}

function validateField(fieldId, validator, errorMessage) {
    const field = document.getElementById(fieldId);
    const value = field.value.trim();
    
    if (!validator(value)) {
        field.style.borderColor = '#ea4335';
        field.style.boxShadow = '0 0 0 4px rgba(234, 67, 53, 0.15)';
        showNotification(errorMessage, 'error');
        return false;
    } else {
        field.style.borderColor = '#34a853';
        field.style.boxShadow = '0 0 0 4px rgba(52, 168, 83, 0.15)';
        return true;
    }
}

// Real-time validation
document.getElementById('fullName')?.addEventListener('blur', function() {
    if (this.value.trim().length < 2) {
        validateField('fullName', (v) => v.length >= 2, 'Enter a valid name');
    }
});

document.getElementById('email')?.addEventListener('blur', function() {
    validateField('email', isValidEmail, 'Enter a valid email address');
});

document.getElementById('phone')?.addEventListener('blur', function() {
    validateField('phone', isValidPhone, 'Enter a valid 10-digit phone number');
});

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 3000;
        animation: slideInRight 0.4s ease;
        max-width: 300px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    `;
    
    if (type === 'error') {
        notification.style.background = '#ea4335';
    } else if (type === 'success') {
        notification.style.background = '#34a853';
    } else {
        notification.style.background = '#1a73e8';
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.4s ease reverse';
        setTimeout(() => notification.remove(), 400);
    }, 3000);
}

// Optional: Send registration data to backend
async function sendRegistrationToBackend(data) {
    try {
        const response = await fetch('/api/register-event', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (!response.ok) {
            console.error('Backend error:', result);
            return false;
        }
        
        console.log('Registration saved successfully:', result);
        return true;
    } catch (error) {
        console.error('Error sending registration data:', error);
        return false;
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded successfully');
    
    // Add animation to elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInLeft 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe benefit cards
    document.querySelectorAll('.benefit-card').forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });
});

// Add active state to navigation links
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Log all registrations (for testing)
function logRegistrations() {
    const registrations = JSON.parse(localStorage.getItem('registrations')) || [];
    console.log('All Registrations:', registrations);
    return registrations;
}

// Send registration data to Google Sheets
function sendToGoogleSheets(registrationData) {
    // Replace with your Google Apps Script Web App URL
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxolYpoS3XuYC4aBnwQCYmWiLyoSyyRXVCHvFMgyEFFU5vHkNvEB0nC4q148J6D2EIm/exec';
    
    // Check if URL is configured
    if (GOOGLE_SCRIPT_URL.includes('YOUR_SCRIPT_ID')) {
        console.warn('Google Sheets integration not configured. Please add your Google Apps Script URL.');
        console.log('Registration data ready to send:', registrationData);
        return;
    }
    
    // Format data for Google Sheets
    const payload = {
        timestamp: new Date().toLocaleString('en-IN'),
        event_id: registrationData.event_id,
        event_name: registrationData.event_name,
        full_name: registrationData.full_name,
        email: registrationData.email,
        phone: registrationData.phone,
        company: registrationData.company || 'N/A',
        designation: registrationData.designation || 'N/A',
        amount: registrationData.amount,
        payment_id: registrationData.payment_id,
        registration_date: registrationData.registration_date
    };
    
    // Send to Google Sheets via Apps Script
    fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(payload)
    })
    .then(response => {
        console.log('Data sent to Google Sheets successfully');
    })
    .catch(error => {
        console.error('Error sending to Google Sheets:', error);
    });
}