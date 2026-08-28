document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productItems = document.querySelectorAll('.product-item');
    const lightbox = document.getElementById('product-lightbox');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCatLabel = document.getElementById('lightbox-cat-label');
    const lightboxTitleText = document.getElementById('lightbox-title-text');
    const lightboxDescription = document.getElementById('lightbox-description');

    // 1. Filtering Functionality
    const filterProducts = (category) => {
        productItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            if (category === 'all' || itemCategory === category) {
                // Show item with transition
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 50);
            } else {
                // Hide item
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });

        // Update active class on buttons
        filterButtons.forEach(btn => {
            if (btn.getAttribute('data-filter') === category) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    };

    // Filter Button Click Listeners
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const filterValue = e.target.getAttribute('data-filter');
            filterProducts(filterValue);
        });
    });

    // Handle URL parameters (e.g. products.html?category=bags)
    const checkUrlParams = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const categoryParam = urlParams.get('category');
        if (categoryParam) {
            // Map parameter to filter values
            let filterVal = categoryParam.toLowerCase();
            // Validate mapping
            const validFilters = ['living', 'table', 'kitchen', 'bags'];
            if (validFilters.includes(filterVal)) {
                filterProducts(filterVal);
            }
        }
    };
    checkUrlParams();

    // 2. Lightbox Functionality
    const openLightbox = (item) => {
        const title = item.getAttribute('data-title');
        const desc = item.getAttribute('data-desc');
        const category = item.getAttribute('data-category');
        const img = item.querySelector('.product-item-img img');
        const imgUrl = img ? img.getAttribute('src') : '';

        // Populate content
        if (lightboxImg) {
            lightboxImg.setAttribute('src', imgUrl);
            lightboxImg.setAttribute('alt', title || 'Product Image');
        }
        if (lightboxCatLabel) {
            lightboxCatLabel.textContent = category ? (category.charAt(0).toUpperCase() + category.slice(1)) : '';
        }
        if (lightboxTitleText) {
            lightboxTitleText.textContent = title || '';
        }
        if (lightboxDescription) {
            lightboxDescription.textContent = desc || '';
        }

        // Open modal
        if (lightbox) {
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            setTimeout(() => {
                lightbox.classList.add('open');
            }, 10);
        }
    };

    const closeLightbox = () => {
        if (!lightbox) return;
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
        setTimeout(() => {
            lightbox.style.display = 'none';
        }, 500);
    };

    // Item Click Listeners for Lightbox
    productItems.forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => openLightbox(item));
    });

    // Close Lightbox listeners
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    // Close when clicking outside content container
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Close with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox && lightbox.classList.contains('open')) {
            closeLightbox();
        }
    });
});
