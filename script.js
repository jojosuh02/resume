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

// Contact modal
const contactModal = document.getElementById('contact-modal');
function openContactModal() {
    if (contactModal) {
        contactModal.classList.add('contact-modal--open');
        contactModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }
}
function closeContactModal() {
    if (contactModal) {
        contactModal.classList.remove('contact-modal--open');
        contactModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
}
document.querySelectorAll('.btn-primary, .btn-contact-header').forEach(button => {
    button.addEventListener('click', openContactModal);
});
if (contactModal) {
    contactModal.querySelector('.contact-modal-close')?.addEventListener('click', closeContactModal);
    contactModal.querySelector('.contact-modal-overlay')?.addEventListener('click', closeContactModal);
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && contactModal.classList.contains('contact-modal--open')) {
            closeContactModal();
        }
    });
}

// Resume button functionality
document.querySelector('.btn-secondary')?.addEventListener('click', function() {
    window.open('Resume.pdf', '_blank');
});

// Stats count-up animation when section comes into view
function animateValue(el, start, end, duration, suffix) {
    const startTime = performance.now();
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out so it slows down near the end
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (end - start) * easeOut);
        el.textContent = current + suffix;
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            el.textContent = end + suffix;
        }
    }
    requestAnimationFrame(update);
}

const statsSection = document.getElementById('stats-section');
if (statsSection) {
    const statNumbers = statsSection.querySelectorAll('.stat-number[data-target]');
    let hasAnimated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                const duration = 2200; // ms
                statNumbers.forEach((el) => {
                    const target = parseInt(el.getAttribute('data-target'), 10);
                    const suffix = el.getAttribute('data-suffix') || '';
                    animateValue(el, 0, target, duration, suffix);
                });
            }
        });
    }, { threshold: 0.3 });

    observer.observe(statsSection);
}

// Soul Surfer slideshow (case study page)
const soulSurferSlideshow = document.querySelector('.soul-surfer-slideshow .slideshow');
if (soulSurferSlideshow) {
    const viewport = soulSurferSlideshow.querySelector('.slideshow-viewport');
    const track = soulSurferSlideshow.querySelector('.slideshow-track');
    const slides = soulSurferSlideshow.querySelectorAll('.slideshow-slide');
    const prevBtn = soulSurferSlideshow.querySelector('.slideshow-prev');
    const nextBtn = soulSurferSlideshow.querySelector('.slideshow-next');
    const totalSlides = slides.length;
    let currentIndex = 0;

    function goToSlide(index) {
        currentIndex = (index + totalSlides) % totalSlides;
        const offsetPercent = (100 / totalSlides) * currentIndex;
        track.style.transform = `translateX(-${offsetPercent}%)`;
    }

    prevBtn?.addEventListener('click', () => goToSlide(currentIndex - 1));
    nextBtn?.addEventListener('click', () => goToSlide(currentIndex + 1));
    goToSlide(0);
}
