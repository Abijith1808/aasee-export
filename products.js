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
    const specComposition = document.getElementById('spec-composition');
    const specDimensions = document.getElementById('spec-dimensions');
    const specFinishing = document.getElementById('spec-finishing');

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
        const fabric = item.getAttribute('data-fabric');
        const size = item.getAttribute('data-size');
        const finish = item.getAttribute('data-finish');
        const category = item.getAttribute('data-category');
        const imgUrl = item.querySelector('.product-item-img img').getAttribute('src');

        // Populate content
        lightboxImg.setAttribute('src', imgUrl);
        lightboxImg.setAttribute('alt', title);
        lightboxCatLabel.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        lightboxTitleText.textContent = title;
        lightboxDescription.textContent = desc;
        specComposition.textContent = fabric;
        specDimensions.textContent = size;
        specFinishing.textContent = finish;

        // Open modal
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            lightbox.classList.add('open');
        }, 10);
    };

    const closeLightbox = () => {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
        setTimeout(() => {
            lightbox.style.display = 'none';
        }, 500); // Match transition duration
    };

    // Item Click Listeners for Lightbox
    productItems.forEach(item => {
        // Clicking image opens lightbox
        const imgWrapper = item.querySelector('.product-item-img');
        if (imgWrapper) {
            imgWrapper.addEventListener('click', () => openLightbox(item));
        }

        // Clicking details button opens lightbox
        const specBtn = item.querySelector('.product-spec-btn');
        if (specBtn) {
            specBtn.addEventListener('click', () => openLightbox(item));
        }
    });

    // Close Lightbox listeners
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    // Close when clicking outside content container
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('open')) {
            closeLightbox();
        }
    });
});
