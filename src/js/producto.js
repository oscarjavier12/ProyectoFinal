document.addEventListener('DOMContentLoaded', function () {
    // Inicializar todos los contenedores de scroll
    const containers = document.querySelectorAll('.container');

    containers.forEach(container => {
        const articles = container.querySelectorAll('article');
        const scrollLeftButton = container.querySelector('.scroll-left');
        const scrollRightButton = container.querySelector('.scroll-right');
        let scrollAmount = 0;
        const articleWidth = 320; // Ancho de cada artículo incluyendo margen

        // Mostrar botones solo si hay elementos ocultos
        function updateButtons() {
            const visibleArticles = Array.from(articles).filter(article =>
                !article.classList.contains('hidden')
            ).length;

            scrollLeftButton.style.display = scrollAmount > 0 ? 'block' : 'none';
            scrollRightButton.style.display =
                scrollAmount < articles.length - Math.floor(container.offsetWidth / articleWidth) ? 'block' : 'none';
        }

        // Scroll a la derecha
        scrollRightButton?.addEventListener('click', () => {
            const maxScroll = articles.length - Math.floor(container.offsetWidth / articleWidth);
            if (scrollAmount < maxScroll) {
                scrollAmount++;
                container.style.transform = `translateX(-${scrollAmount * articleWidth}px)`;
                updateButtons();
            }
        });

        // Scroll a la izquierda
        scrollLeftButton?.addEventListener('click', () => {
            if (scrollAmount > 0) {
                scrollAmount--;
                container.style.transform = `translateX(-${scrollAmount * articleWidth}px)`;
                updateButtons();
            }
        });

        // Mostrar/ocultar artículos según el ancho del contenedor
        function updateVisibleArticles() {
            const containerWidth = container.offsetWidth;
            const visibleCount = Math.floor(containerWidth / articleWidth);

            articles.forEach((article, index) => {
                if (index < visibleCount) {
                    article.classList.remove('hidden');
                } else {
                    article.classList.add('hidden');
                }
            });

            updateButtons();
        }

        // Actualizar al cargar y al cambiar el tamaño de la ventana
        updateVisibleArticles();
        window.addEventListener('resize', updateVisibleArticles);
    });

    // Funcionalidad del carrito
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Animación de confirmación
            const originalText = this.textContent;
            this.textContent = '✓ Agregado';
            this.style.backgroundColor = '#4CAF50';

            setTimeout(() => {
                this.textContent = originalText;
                this.style.backgroundColor = '#4a8f29';
            }, 2000);
        });
    });

    // Funcionalidad de búsqueda
    const searchInput = document.querySelector('.search-filter input');

    searchInput?.addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase();
        const allArticles = document.querySelectorAll('article');

        allArticles.forEach(article => {
            const productName = article.querySelector('h3').textContent.toLowerCase();
            if (productName.includes(searchTerm)) {
                article.style.display = 'block';
            } else {
                article.style.display = 'none';
            }
        });
    });
});