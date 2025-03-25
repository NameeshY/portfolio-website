/**
 * CS Student Portfolio - Contact Form JavaScript
 * Handles form submission and validation
 */

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const successMessage = formStatus?.querySelector('.success-message');
    const errorMessage = formStatus?.querySelector('.error-message');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Basic form validation
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            
            if (!name || !email || !subject || !message) {
                return; // If elements don't exist, don't proceed
            }

            // Check if all fields are filled
            if (!name.value || !email.value || !subject.value || !message.value) {
                showError('Please fill in all fields');
                return;
            }

            // Email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email.value)) {
                showError('Please enter a valid email address');
                return;
            }

            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

            try {
                // In a real implementation, you would send the form data to a backend
                // For this demo, we'll simulate a successful submission after a delay
                await simulateFormSubmission({
                    name: name.value,
                    email: email.value,
                    subject: subject.value,
                    message: message.value
                });

                // Show success message
                showSuccess('Your message has been sent successfully!');
                
                // Reset the form
                contactForm.reset();
            } catch (error) {
                // Show error message
                showError(error.message || 'Something went wrong. Please try again.');
            } finally {
                // Restore button state
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        });
    }

    // Function to show success message
    function showSuccess(message) {
        if (successMessage && errorMessage && formStatus) {
            formStatus.classList.remove('hidden');
            successMessage.style.display = 'flex';
            errorMessage.style.display = 'none';
            
            if (message) {
                successMessage.querySelector('p').textContent = message;
            }

            // Hide message after 5 seconds
            setTimeout(() => {
                formStatus.classList.add('hidden');
            }, 5000);
        }
    }

    // Function to show error message
    function showError(message) {
        if (successMessage && errorMessage && formStatus) {
            formStatus.classList.remove('hidden');
            successMessage.style.display = 'none';
            errorMessage.style.display = 'flex';
            
            if (message) {
                errorMessage.querySelector('p').textContent = message;
            }

            // Hide message after 5 seconds
            setTimeout(() => {
                formStatus.classList.add('hidden');
            }, 5000);
        }
    }

    // Function to simulate form submission (replace with actual API call)
    function simulateFormSubmission(data) {
        return new Promise((resolve, reject) => {
            console.log('Form data:', data);
            
            // Simulate server delay and response
            setTimeout(() => {
                // Simulate 90% success rate
                const success = Math.random() < 0.9;
                
                if (success) {
                    resolve({ success: true, message: 'Message sent successfully!' });
                } else {
                    reject(new Error('Network error. Please try again.'));
                }
            }, 2000);
        });
    }
});
