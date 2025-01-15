// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute('href'));
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handling
document.getElementById('contact-form')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Disable submit button to prevent double submission
    const submitButton = this.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    
    // Get form data
    const params = {
        name: document.getElementById("name")?.value.trim(),
        email: document.getElementById("email")?.value.trim(),
        subject: document.getElementById("subject")?.value.trim(),
        message: document.getElementById("message")?.value.trim()
    };
    
    // Basic validation
    if (!params.name || !params.email || !params.subject || !params.message) {
        showNotification('Please fill in all fields', 'error');
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(params.email)) {
        showNotification('Please enter a valid email address', 'error');
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
        return;
    }
    
    try {
        // Send email using EmailJS
        await emailjs.send("service_a3cg5uv", "template_pozaxpy", params); // Make sure to replace template_id
        showNotification('Message sent successfully!', 'success');
        this.reset();
    } catch (error) {
        console.error('Failed to send email:', error);
        showNotification('Failed to send message. Please try again later.', 'error');
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
    }
});

// Scroll animation for sections
const observeElements = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.25
    });

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
};

// Create notification system
const showNotification = (message, type) => {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    observeElements();
});
