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
            const currentlyActiveItem = document.querySelector('.faq-item.active');

            if (currentlyActiveItem && currentlyActiveItem !== item) {
                currentlyActiveItem.classList.remove('active');
                currentlyActiveItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            }

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

// --- GDPR Cookie Consent Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const COOKIE_NAME = 'user_cookie_consent';
    const banner = document.getElementById('cookie-consent-banner');
    const settingsModal = document.getElementById('cookie-settings-modal');

    if (!banner || !settingsModal) return;

    const acceptAllBtn = document.getElementById('cookie-accept-all');
    const rejectAllBtn = document.getElementById('cookie-reject-all');
    const settingsBtn = document.getElementById('cookie-settings');
    const saveSettingsBtn = document.getElementById('cookie-save-settings');
    const closeModalBtn = settingsModal.querySelector('.modal-close');

    const consent = getCookie(COOKIE_NAME);

    if (!consent) {
        setTimeout(() => banner.classList.add('show'), 500);
    } else {
        activateScripts(JSON.parse(consent));
    }

    acceptAllBtn.addEventListener('click', () => {
        const preferences = { necessary: true, analytics: true };
        saveConsent(preferences);
    });

    rejectAllBtn.addEventListener('click', () => {
        const preferences = { necessary: true, analytics: false };
        saveConsent(preferences);
    });

    settingsBtn.addEventListener('click', () => {
        openSettingsModal();
    });

    saveSettingsBtn.addEventListener('click', () => {
        const analyticsCheckbox = settingsModal.querySelector('input[name="analytics"]');
        const preferences = {
            necessary: true,
            analytics: analyticsCheckbox.checked
        };
        saveConsent(preferences);
        closeSettingsModal();
    });

    closeModalBtn.addEventListener('click', closeSettingsModal);
    settingsModal.addEventListener('click', (e) => {
        if (e.target === settingsModal) {
            closeSettingsModal();
        }
    });

    function saveConsent(preferences) {
        setCookie(COOKIE_NAME, JSON.stringify(preferences), 365);
        banner.classList.remove('show');
        activateScripts(preferences);
    }

    function activateScripts(preferences) {
        const scripts = document.querySelectorAll('script[type="text/plain"]');
        scripts.forEach(script => {
            const category = script.getAttribute('data-cookie-category');
            if (preferences[category]) {
                const newScript = document.createElement('script');
                for (let i = 0; i < script.attributes.length; i++) {
                    const attr = script.attributes[i];
                    if (attr.name !== 'type' && attr.name !== 'data-cookie-category') {
                        newScript.setAttribute(attr.name, attr.value);
                    }
                }
                newScript.innerHTML = script.innerHTML;
                script.parentNode.replaceChild(newScript, script);
            }
        });
    }

    function openSettingsModal() {
        const currentConsent = getCookie(COOKIE_NAME) ? JSON.parse(getCookie(COOKIE_NAME)) : { analytics: true };
        const analyticsCheckbox = settingsModal.querySelector('input[name="analytics"]');
        analyticsCheckbox.checked = !!currentConsent.analytics;
        settingsModal.classList.add('active');
    }

    function closeSettingsModal() {
        settingsModal.classList.remove('active');
    }

    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
    }

    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
});

// --- Новый скрипт: Анимация navbar при скролле ---
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});