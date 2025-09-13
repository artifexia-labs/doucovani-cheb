// --- Инициализация AOS (Animate On Scroll) ---
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        once: true,
        offset: 80,
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
            // Добавляем alt текст из кликнутого изображения в lightbox
            lightboxImg.alt = image.alt; 
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

// --- УЛУЧШЕННЫЙ Скрипт для FAQ (аккордеон с ARIA атрибутами) ---
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isExpanded = question.getAttribute('aria-expanded') === 'true';

            // Сначала закрываем все открытые элементы, кроме текущего
            const currentlyActiveItem = document.querySelector('.faq-item.active');
            if (currentlyActiveItem && currentlyActiveItem !== item) {
                currentlyActiveItem.classList.remove('active');
                currentlyActiveItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            }

            // Переключаем текущий элемент
            item.classList.toggle('active');
            question.setAttribute('aria-expanded', !isExpanded);
        });
    });
});


// --- Скрипт для анимированного счетчика очков ---
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200; 

    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const updateCount = () => {
            const count = +counter.innerText;
            const increment = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 15);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        observer.observe(counter);
    });
});

// --- Скрипт для модального окна контактов ---
document.addEventListener('DOMContentLoaded', () => {
    const contactModal = document.getElementById('contactModal');
    if (!contactModal) return;

    const openBtns = document.querySelectorAll('#openContactModal, #openContactModalNav');
    const closeBtn = contactModal.querySelector('.modal-close');

    function openModal(e) {
        e.preventDefault();
        contactModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        contactModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    openBtns.forEach(btn => {
        btn.addEventListener('click', openModal);
    });
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    contactModal.addEventListener('click', (e) => {
        if (e.target === contactModal) {
            closeModal();
        }
    });
});