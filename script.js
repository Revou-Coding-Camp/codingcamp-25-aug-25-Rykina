// JavaScript for Portfolio Website Form Validation

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const phoneField = document.getElementById('phone');
    const messageField = document.getElementById('message');

    // Validation functions
    function validateName() {
        const name = nameField.value.trim();
        const nameError = document.getElementById('nameError');
        
        if (name.length < 2) {
            nameError.textContent = 'Name must be at least 2 characters long';
            nameError.style.display = 'block';
            return false;
        } else if (!/^[a-zA-Z\s]+$/.test(name)) {
            nameError.textContent = 'Name can only contain letters and spaces';
            nameError.style.display = 'block';
            return false;
        } else {
            nameError.style.display = 'none';
            return true;
        }
    }

    function validateEmail() {
        const email = emailField.value.trim();
        const emailError = document.getElementById('emailError');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email)) {
            emailError.textContent = 'Please enter a valid email address';
            emailError.style.display = 'block';
            return false;
        } else {
            emailError.style.display = 'none';
            return true;
        }
    }

    function validatePhone() {
        const phone = phoneField.value.trim();
        const phoneError = document.getElementById('phoneError');
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        
        if (!phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))) {
            phoneError.textContent = 'Please enter a valid phone number';
            phoneError.style.display = 'block';
            return false;
        } else {
            phoneError.style.display = 'none';
            return true;
        }
    }

    function validateMessage() {
        const message = messageField.value.trim();
        const messageError = document.getElementById('messageError');
        
        if (message.length < 10) {
            messageError.textContent = 'Message must be at least 10 characters long';
            messageError.style.display = 'block';
            return false;
        } else {
            messageError.style.display = 'none';
            return true;
        }
    }

    // Real-time validation
    nameField.addEventListener('blur', validateName);
    emailField.addEventListener('blur', validateEmail);
    phoneField.addEventListener('blur', validatePhone);
    messageField.addEventListener('blur', validateMessage);

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isMessageValid = validateMessage();
        
        if (isNameValid && isEmailValid && isPhoneValid && isMessageValid) {
            // Show success message
            document.getElementById('successMessage').style.display = 'block';
            
            // Reset form
            form.reset();
            
            // Hide success message after 5 seconds
            setTimeout(function() {
                document.getElementById('successMessage').style.display = 'none';
            }, 5000);
            
            // Scroll to success message
            document.getElementById('successMessage').scrollIntoView({
                behavior: 'smooth'
            });
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
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
});