const slides = [...document.querySelectorAll('.hero-slide')];
const dots = [...document.querySelectorAll('.hero-dot')];
let activeSlide = 0;

function showSlide(index) {
    activeSlide = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
        const isActive = slideIndex === activeSlide;
        slide.classList.toggle('is-active', isActive);
        slide.setAttribute('aria-hidden', String(!isActive));
        dots[slideIndex].classList.toggle('is-active', isActive);
        if (isActive) {
            dots[slideIndex].setAttribute('aria-current', 'true');
        } else {
            dots[slideIndex].removeAttribute('aria-current');
        }
    });
}

showSlide(0);
document.querySelector('.hero-prev').addEventListener('click', () => showSlide(activeSlide - 1));
document.querySelector('.hero-next').addEventListener('click', () => showSlide(activeSlide + 1));
dots.forEach((dot, index) => dot.addEventListener('click', () => showSlide(index)));

document.querySelector('.benefits-next').addEventListener('click', () => {
    const track = document.querySelector('.benefits-track');
    track.scrollBy({ left: track.clientWidth, behavior: 'smooth' });
});

const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') !== 'true';
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    mainNav.classList.toggle('is-open', isOpen);
});

mainNav.addEventListener('click', event => {
    if (event.target.closest('a')) {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Abrir menu');
        mainNav.classList.remove('is-open');
    }
});

document.querySelector('.search-box').addEventListener('submit', event => {
    event.preventDefault();
    const query = event.currentTarget.querySelector('input[name="q"]').value.trim();
    if (!query) return;

    window.location.href = `safety.html?q=${encodeURIComponent(query)}`;
});

document.querySelector('.search-box input').addEventListener('input', event => {
    const query = event.target.value.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    const cards = [...document.querySelectorAll('.product-card')];
    let visibleCards = 0;

    cards.forEach(card => {
        const matches = !query || `${card.dataset.search} ${card.innerText}`.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(query);
        card.hidden = !matches;
        if (matches) visibleCards++;
    });

    document.querySelector('.search-empty').hidden = !query || visibleCards > 0;
});

document.querySelectorAll('.product-card, .product-ad-card').forEach(card => {
    const title = card.querySelector('.product-name, h2')?.textContent.trim() || card.innerText.trim();
    const destination = `safety.html?product=${encodeURIComponent(title)}`;

    if (card instanceof HTMLAnchorElement) {
        card.href = destination;
        card.setAttribute('aria-label', `Ver produto: ${title}`);
    } else {
        card.setAttribute('role', 'link');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', `Ver produto: ${title}`);
    }
});

document.querySelector('main').addEventListener('click', event => {
    const card = event.target.closest('.product-card');
    if (card) {
        const title = card.querySelector('.product-name')?.textContent.trim() || 'Produto';
        window.location.href = `safety.html?product=${encodeURIComponent(title)}`;
    }
});

document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            card.click();
        }
    });
});

document.querySelectorAll('.product-carousel').forEach(carousel => {
    const track = carousel.querySelector('.product-track');
    carousel.querySelector('.product-prev').addEventListener('click', () => {
        track.scrollBy({ left: -Math.max(track.clientWidth * 0.75, 150), behavior: 'smooth' });
    });
    carousel.querySelector('.product-next').addEventListener('click', () => {
        track.scrollBy({ left: Math.max(track.clientWidth * 0.75, 150), behavior: 'smooth' });
    });
});
