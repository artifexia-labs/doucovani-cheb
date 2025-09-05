// --- Инициализация AOS (Animate On Scroll) ---
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        once: true,
        offset: 80, // Запускать анимацию чуть раньше
        duration: 1000,
        easing: 'ease-out-quad',
    });
});

// --- Скрипт для Lightbox (просмотр дипломов) ---
document.addEventListener('DOMContentLoaded', () => {
    const imageClass = '.proof-image';
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    
    const lightboxImg = document.getElementById('lightbox-img');
    const diplomaImages = document.querySelectorAll(imageClass);
    const closeBtn = document.querySelector('.lightbox-close');

    diplomaImages.forEach(image => {
        image.addEventListener('click', () => {
            lightbox.style.display = 'block';
            lightboxImg.src = image.src;
            document.body.style.overflow = 'hidden';
        });
    });

    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    if(closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
});

// --- НОВЫЙ СКРИПТ для FAQ (аккордеон) ---
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const currentlyActive = document.querySelector('.faq-item.active');
            if (currentlyActive && currentlyActive !== item) {
                currentlyActive.classList.remove('active');
            }
            item.classList.toggle('active');
        });
    });
});