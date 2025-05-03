

// Productos en el carrusel
const productContainers = document.querySelectorAll('.eco-products-container');

productContainers.forEach(container => {
    const track = container.querySelector('.eco-products-track');
    const leftBtn = container.querySelector('.eco-scroll-left');
    const rightBtn = container.querySelector('.eco-scroll-right');
    const productCards = container.querySelectorAll('.eco-product-card');

    if (!track || !leftBtn || !rightBtn || productCards.length === 0) return;

    const cardWidth = productCards[0].offsetWidth + 24; // Including gap
    let scrollPosition = 0;
    const maxScroll = track.scrollWidth - container.offsetWidth;

    // mostrar u ocultar botones de desplazamiento
    function updateButtons() {
        leftBtn.style.display = scrollPosition <= 0 ? 'none' : 'flex';
        rightBtn.style.display = scrollPosition >= maxScroll ? 'none' : 'flex';
    }

    // Scroll left
    leftBtn.addEventListener('click', () => {
        scrollPosition -= cardWidth * 2;
        if (scrollPosition < 0) scrollPosition = 0;
        track.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
        setTimeout(updateButtons, 300);
    });

    // Scroll right
    rightBtn.addEventListener('click', () => {
        scrollPosition += cardWidth * 2;
        if (scrollPosition > maxScroll) scrollPosition = maxScroll;
        track.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
        setTimeout(updateButtons, 300);
    });

    // Initialize buttons
    updateButtons();

    // Handle track scroll
    track.addEventListener('scroll', () => {
        scrollPosition = track.scrollLeft;
        updateButtons();
    });
});

const searchInput = document.querySelector('.eco-search-input');
const searchSubmit = document.querySelector('.eco-search-submit');
const productCards = document.querySelectorAll('.eco-product-card');

function performSearch() {
    const searchTerm = searchInput.value.toLowerCase();

    productCards.forEach(card => {
        const productName = card.querySelector('h3').textContent.toLowerCase();
        card.style.display = productName.includes(searchTerm) ? 'block' : 'none';
    });
}

searchInput?.addEventListener('input', performSearch);
searchSubmit?.addEventListener('click', performSearch);

// filtrado por categoría
const selectedCategory = document.querySelector('.eco-category-select');
const categoryFilter = document.querySelector('.eco-category-filter');

categoryFilter?.addEventListener('change', function () {
    const selectedCategory = this.value;
    if (!selectedCategory) return;
    alert(`Filtrando por categoría: ${this.options[this.selectedIndex].text}`);
});
