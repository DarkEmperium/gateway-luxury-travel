document.addEventListener("DOMContentLoaded", function() {
    // Select all rating elements
    const ratings = document.querySelectorAll(".rating");
    
    ratings.forEach(rating => {
        for (let i = 0; i < 4; i++) {
            let duplicate = rating.querySelector("#star").cloneNode(true);
            rating.appendChild(duplicate);
        }
    });
});

var loader = document.getElementById("preloader");
window.addEventListener("load", function(){
  loader.style.opacity = 0;
  setTimeout(function() {loader.style.display="none";}, 500); // delay for 0.5 seconds (duration of the fade out animation)
});

// Select all read-more buttons
const readMoreBtns = document.querySelectorAll(".read-more-button");
readMoreBtns.forEach(button => {
    button.addEventListener('click', (e) => {
        const expandText = e.target.closest('.categories-card-details').querySelector('.text');
        const moreContent = expandText.querySelector('.more-content');
        const isExpanded = expandText.classList.contains('show-more');

        if (isExpanded) {
            moreContent.style.height = moreContent.scrollHeight + 'px';
            requestAnimationFrame(() => {
                moreContent.style.height = '0';
            });
            expandText.classList.remove('show-more');
            e.target.innerText = 'View More Info';
        } else {
            moreContent.style.height = '0';
            expandText.classList.add('show-more');
            requestAnimationFrame(() => {
                moreContent.style.height = moreContent.scrollHeight + 'px';
            });
            moreContent.addEventListener('transitionend', () => {
                moreContent.style.height = 'auto';
            }, { once: true });
            e.target.innerText = 'View Less Info';
        }
    });
});

var reviewSwiper = new Swiper(".reviewSwiper", 
{
    slidesPerView: 1,
    grabCursor: true,
    loop: true,

    pagination: 
    {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: 
    {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

});

const yearSpan = document.querySelector('#currentYear');
const currentYear = new Date();
yearSpan.innerHTML = currentYear.getFullYear();

function toggleLoginForm() {
    const loginContainer = document.getElementById('registration');
    
    // Check if the form is visible (opacity = 1)
    if (loginContainer.style.opacity === '1') {
        // Fade out
        loginContainer.style.transition = 'opacity 0.5s ease';
        loginContainer.style.opacity = '0';
        
        // Wait for the fade-out transition to finish before setting display to none
        setTimeout(() => {
            loginContainer.style.display = 'none';
        }, 500); // Match the duration of the fade-out (500ms)
    } else {
        // Show the form (set display to flex) and fade in
        loginContainer.style.display = 'flex';
        loginContainer.style.opacity = '0'; // Start invisible
        loginContainer.style.transition = 'opacity 0.5s ease';

        // Trigger the fade-in after a short delay to allow display to take effect
        setTimeout(() => {
            loginContainer.style.opacity = '1';
        }, 10); // Small delay to trigger transition
    }
}

// Add event listeners to all relevant input fields in both the login and signup forms
const inputFields = document.querySelectorAll('.login-form input[type="text"], .login-form input[type="password"], .signup-form input[type="text"], .signup-form input[type="password"], .signup-form input[type="tel"]');

inputFields.forEach(input => {
    input.addEventListener('input', function() {
        // If the input is empty, clear only the related error message
        const formBox = this.parentElement;
        const errorDisplay = formBox.querySelector('.error-message');

        if (this.value.trim() === '' && errorDisplay) {
            errorDisplay.remove();
            formBox.className = 'form-input-box';
        }
    });
});

//Login form validation
document.querySelector('.login-form form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = event.target[0].value;
    const password = event.target[1].value;
    
    let isValid = true;

    // Validate email
    if (!validateEmail(email)) {
        showError(event.target[0], 'Invalid email format');
        isValid = false;
    } else {
        showSuccess(event.target[0]);
    }

    // Validate password
    if (password.length < 6) {
        showError(event.target[1], 'Invalid password');
        isValid = false;
    } else {
        showSuccess(event.target[1]);
    }

    if (isValid) {
        alert('Login successful!');
        event.target.reset();
    }
});


// Forgot password functionality
document.getElementById('forgotPasswordLink').addEventListener('click', function(event) {
    event.preventDefault();
    
    const email = prompt('Please enter your email address to reset your password:');
    
    if (validateEmail(email)) {
        // Process the password reset (e.g., send email to server for reset)
        alert('Password reset instructions have been sent to your email.');
    } else {
        alert('Please enter a valid email address for password recovery.');
    }
});


// Signup Form Validation
document.querySelector('.signup-form form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = event.target[0].value;
    const email = event.target[1].value;
    const contactNumber = event.target[2].value;
    const password = event.target[3].value;
    const confirmPassword = event.target[4].value;

    let isValid = true;

    // Validate name
    if (name.length < 2) {
        showError(event.target[0], 'Minimum 2 characters required');
        isValid = false;
    } else {
        showSuccess(event.target[0]);
    }

    // Validate email
    if (!validateEmail(email)) {
        showError(event.target[1], 'Invalid email format');
        isValid = false;
    } else {
        showSuccess(event.target[1]);
    }

    // Validate contact number
    if (!validateContactNumber(contactNumber)) {
        showError(event.target[2], 'Invalid contact number');
        isValid = false;
    } else {
        showSuccess(event.target[2]);
    }

    // Validate password
    if (password.length < 6) {
        showError(event.target[3], 'Minimum 6 characters required');
        isValid = false;
    } else {
        showSuccess(event.target[3]);
    }

    // Confirm password
    if (password !== confirmPassword) {
        showError(event.target[4], 'Passwords does not match');
        isValid = false;
    } else {
        showSuccess(event.target[4]);
    }

    if (isValid) {
        alert('Signup successful!');
        event.target.reset();
    }
});

const stars = document.querySelectorAll('.stars-widget input'); 
let rating = 0;
stars.forEach((star, index) => {
    star.addEventListener('click', function() {
        rating = index + 1; 
        stars.forEach(s => s.nextElementSibling.classList.remove('selected'));
        for (let i = 0; i <= index; i++) {
            stars[i].nextElementSibling.classList.add('selected'); 
        }
        document.querySelector('.star-error').textContent = '';
    });
});

// Setup modal for feedback
const modal = document.getElementById('feedbackModal');
const sendFeedbackLink = document.getElementById('sendFeedbackLink');
const closeButton = document.querySelector('.close-button');
const submitFeedback = document.getElementById('submitFeedback');

// Show the modal when the link is clicked
sendFeedbackLink.addEventListener('click', function(event) {
    event.preventDefault();
    modal.style.opacity = '0';  // Start invisible
    modal.style.display = 'block'; 
    setTimeout(function() {
        modal.style.opacity = '1';  // Fade in
    }, 10);
    modal.style.transition = 'opacity 0.5s ease';
});

// Hide the modal when the close button is clicked
closeButton.addEventListener('click', function() {
    modal.style.opacity = '0';  // Start invisible
    modal.style.transition = 'opacity 0.5s ease';
    setTimeout(function() {
        modal.style.display = 'none';
    }, 500);  // Match the transition duration
});

// Hide the modal when clicking outside of the modal content
window.addEventListener('click', function(event) {
    if (event.target == modal) {
        modal.style.opacity = '0';  // Start invisible
        modal.style.transition = 'opacity 0.5s ease';
        setTimeout(function() {
            modal.style.display = 'none';
        }, 500);  // Match the transition duration
    }
});



//Validation for feedback
submitFeedback.addEventListener('click', function() {
    // Clear previous error messages
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => error.remove());

    // Get input values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();


    let isValid = true;

    // Flag to track if any field is empty
    let emptyFields = false;

    // Check if fields are empty
    if (!name || !email || !message || !rating) {
        emptyFields = true;
    }

    // Validate name
    if (name.length < 2) {
        showError(document.getElementById('name'), 'At least 2 characters');
        isValid = false;
    }

    // Validate email
    if (!validateEmail(email)) {
        showError(document.getElementById('email'), 'Invalid email format');
        isValid = false;
    }

    // Validate message
    if (message.length < 10) {
        showError(document.getElementById('message'), 'At least 10 characters');
        isValid = false;
    }

    // Validate rating
     if (!rating) {
        showError(document.querySelector('.star-error'), '\n\nPlease select a rating');
        isValid = false;
    } else {
        showSuccess(document.querySelector('.star-error'));
    }

    // If all validations pass
    if (isValid) {
        alert("Your feedback has been sent!Thank you for your feedback.");
        document.getElementById('feedback-form').reset();

        clearStars();
    }
});

function clearStars() {
    const stars = document.querySelectorAll('.stars i');
    stars.forEach(star => {
        star.classList.remove('selected');
    });
}

// Function to validate the contact form
function validateContactForm() {
    // Get form fields
    const nameField = document.querySelector('#nameContact');
    const emailField = document.querySelector('#emailContact');
    const messageField = document.querySelector('#messageContact');

    // Clear previous errors
    clearErrors();

    let isValid = true;
    let errorMessage = ""; // Store all error messages to show in the alert

    // Validate name: at least 2 characters
    if (nameField.value.trim().length < 2) {
        errorMessage += "Name must be at least 2 characters.\n";
        isValid = false;
    }

    // Validate email: check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailField.value.trim()) {
        errorMessage += "Email is required.\n";
        isValid = false;
    } else if (!emailRegex.test(emailField.value.trim())) {
        errorMessage += "Invalid email format.\n";
        isValid = false;
    }

    // Validate message: at least 10 characters
    if (messageField.value.trim().length < 10) {
        errorMessage += "Message must be at least 10 characters.\n";
        isValid = false;
    }

    // Show the error messages in an alert if any validation fails
    if (!isValid) {
        alert(errorMessage);
    } else {
        // If all fields are valid, show success message
        document.getElementById("success-message").style.display = "block";

        // Optionally, hide the success message after a few seconds
        setTimeout(() => {
            document.getElementById("success-message").style.display = "none";
        }, 4000);
        
       // Clear the form fields manually
        document.getElementById("nameContact").value = '';
        document.getElementById("emailContact").value = '';
        document.getElementById("messageContact").value = '';
    }
}

// Event listener for the submit button
document.getElementById('submit-button').addEventListener('click', function(event) {
    event.preventDefault();
    validateContactForm();  
});

// Clear any previous error messages or styles
function clearErrors() {
    document.getElementById("success-message").style.display = "none";
}



//Function used for all validation
// Validate Email Format
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Validate Contact Number Format (10-12 digits)
function validateContactNumber(contactNumber) {
    const re = /^[0-9]{10,12}$/;
    return re.test(contactNumber);
}

// Show Error Message
function showError(input, message) {
    const formBox = input.parentElement;
    formBox.className = 'form-input-box error';  // Add error class for red warnings
    const errorDisplay = formBox.querySelector('.error-message');
    if (!errorDisplay) {
        const errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.innerText = message;
        formBox.appendChild(errorElement);
    }
}

// Show Success (Clear Error)
function showSuccess(input) {
    const formBox = input.parentElement;
    formBox.className = 'form-input-box success';
    const errorDisplay = formBox.querySelector('.error-message');
    if (errorDisplay) {
        errorDisplay.remove();
    }
}














