// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        
        // If href is #top, scroll to top of page
        if (href === '#top') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return;
        }
        
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact button functionality
document.querySelectorAll('.btn-primary, .btn-contact-header').forEach(button => {
    button.addEventListener('click', function() {
        // Scroll to contact section or open contact form
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            contactSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } else {
            alert('Contact functionality - Add your contact form or email here!');
        }
    });
});

// Resume button functionality
document.querySelector('.btn-secondary').addEventListener('click', function() {
    // Add your resume PDF link here
    // window.open('path/to/resume.pdf', '_blank');
    alert('Resume download - Add your resume PDF link here!');
});
