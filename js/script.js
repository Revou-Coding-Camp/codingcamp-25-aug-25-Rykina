// JavaScript for Portfolio Website Form Validation and Welcome Feature

document.addEventListener('DOMContentLoaded', function() {
    // Welcome feature elements
    const welcomeMessage = document.getElementById('welcomeMessage');
    const nameInputContainer = document.getElementById('nameInputContainer');
    const visitorNameInput = document.getElementById('visitorName');
    const welcomeBtn = document.getElementById('welcomeBtn');
    
    // Form elements
    const form = document.getElementById('contactForm');
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const phoneField = document.getElementById('phone');
    const messageField = document.getElementById('message');

    // Check if visitor name is already stored
    const storedName = sessionStorage.getItem('visitorName');
    if (storedName) {
        showPersonalizedWelcome(storedName);
    }

    // Welcome button functionality
    welcomeBtn.addEventListener('click', function() {
        const visitorName = visitorNameInput.value.trim();
        if (visitorName.length >= 2 && /^[a-zA-Z\s]+$/.test(visitorName)) {
            // Store name in sessionStorage for this session
            sessionStorage.setItem('visitorName', visitorName);
            showPersonalizedWelcome(visitorName);
        } else {
            alert('Please enter a valid name (at least 2 characters, letters only)');
            visitorNameInput.focus();
        }
    });

    // Enter key support for name input
    visitorNameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            welcomeBtn.click();
        }
    });

    function showPersonalizedWelcome(name) {
        const currentHour = new Date().getHours();
        let greeting = 'Hello';
        
        if (currentHour < 12) {
            greeting = 'Good Morning';
        } else if (currentHour < 18) {
            greeting = 'Good Afternoon';
        } else {
            greeting = 'Good Evening';
        }

        // Update welcome message with animation
        welcomeMessage.innerHTML = `${greeting}, ${name}! 🎉<br><span style="font-size: 1.5rem;">Welcome to TechCorp Solutions</span>`;
        welcomeMessage.classList.add('personalized-welcome');
        
        // Hide name input container with fade out
        nameInputContainer.style.transition = 'opacity 0.5s ease-out';
        nameInputContainer.style.opacity = '0';
        
        setTimeout(function() {
            nameInputContainer.style.display = 'none';
        }, 500);

        // Add a reset button for demo purposes
        setTimeout(function() {
            const resetBtn = document.createElement('button');
            resetBtn.textContent = 'Change Name';
            resetBtn.className = 'welcome-button';
            resetBtn.style.marginTop = '1rem';
            resetBtn.addEventListener('click', function() {
                resetWelcome();
            });
            welcomeMessage.appendChild(resetBtn);
        }, 1000);
    }

    function resetWelcome() {
        sessionStorage.removeItem('visitorName');
        welcomeMessage.innerHTML = 'Welcome to TechCorp Solutions';
        welcomeMessage.classList.remove('personalized-welcome');
        nameInputContainer.style.display = 'block';
        nameInputContainer.style.opacity = '1';
        visitorNameInput.value = '';
        visitorNameInput.focus();
    }

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

    // Form submission with value display
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isMessageValid = validateMessage();
        
        if (isNameValid && isEmailValid && isPhoneValid && isMessageValid) {
            // Get form values
            const formData = {
                name: nameField.value.trim(),
                email: emailField.value.trim(),
                phone: phoneField.value.trim(),
                message: messageField.value.trim(),
                timestamp: new Date().toLocaleString()
            };
            
            // Display submitted values
            document.getElementById('displayName').textContent = formData.name;
            document.getElementById('displayEmail').textContent = formData.email;
            document.getElementById('displayPhone').textContent = formData.phone;
            document.getElementById('displayMessage').textContent = formData.message;
            document.getElementById('displayTime').textContent = formData.timestamp;
            
            // Hide form and show submitted values
            form.style.display = 'none';
            document.getElementById('submittedValues').style.display = 'block';
            document.getElementById('successMessage').style.display = 'none';
            
            // Scroll to submitted values
            document.getElementById('submittedValues').scrollIntoView({
                behavior: 'smooth'
            });
            
            // Store in sessionStorage for demo purposes
            sessionStorage.setItem('lastSubmission', JSON.stringify(formData));
        }
    });

    // Global function to reset form
    window.resetForm = function() {
        form.style.display = 'block';
        document.getElementById('submittedValues').style.display = 'none';
        form.reset();
        
        // Hide all error messages
        document.querySelectorAll('.error').forEach(error => {
            error.style.display = 'none';
        });
        
        // Focus on first field
        nameField.focus();
        
        // Scroll to form
        form.scrollIntoView({
            behavior: 'smooth'
        });
    };

    // Update navigation smooth scrolling to include profile
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