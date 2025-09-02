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
    // В новой версии сайта класс .diploma-image заменен на .proof-image
    const imageClass = '.proof-image';

    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return; // Проверка на случай, если элемента нет
    
    const lightboxImg = document.getElementById('lightbox-img');
    const diplomaImages = document.querySelectorAll(imageClass);
    const closeBtn = document.querySelector('.lightbox-close');

    diplomaImages.forEach(image => {
        image.addEventListener('click', () => {
            lightbox.style.display = 'block';
            lightboxImg.src = image.src;
            document.body.style.overflow = 'hidden'; // Запретить скролл фона
        });
    });

    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto'; // Разрешить скролл фона
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