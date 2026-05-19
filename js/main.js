window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}
);
/*responsive*/
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');
const menuOverlay = document.getElementById('menuOverlay');

menuToggle.addEventListener('click', () => {
    
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    
});

menuOverlay.addEventListener('click', () => {
    
    menuToggle.classList.remove('active');
    navLinks.classList.remove('active');
    menuOverlay.classList.remove('active');
    
});
/*car page filter*/
document.addEventListener("DOMContentLoaded", () => {
    const tabButtons = document.querySelectorAll(".tab-btn");
    const carCards = document.querySelectorAll(".car-card");
    const resultsCount = document.querySelector(".results-count");
    tabButtons.forEach(button => {
        button.addEventListener("click", function() {
            document.querySelector(".tab-btn.active")?.classList.remove("active");
            this.classList.add("active");
            const selectedCategory = this.textContent.trim();
            let visibleCount = 0;
            carCards.forEach(card => {
                const cardCategory = card.getAttribute("data-category");

                if (selectedCategory === "ALL MODELS" || cardCategory === selectedCategory) {
                    card.style.display = "flex";
                    setTimeout(() => {
                        card.style.opacity = "1";
                        card.style.transform = "scale(1)";
                    }, 10);
                    visibleCount++;
                } else {
                    card.style.opacity = "0";
                    card.style.transform = "scale(0.95)";
                    setTimeout(() => {
                        card.style.display = "none";
                    }, 300);
                }
            });
            if (resultsCount) {
                resultsCount.textContent = `SHOWING ${visibleCount} RESULTS`;
            }
        });
    });
    const dropdownButtons = document.querySelectorAll(".dropdown-btn");
    dropdownButtons.forEach(btn => {
        btn.addEventListener("click", function() {
            this.style.transform = "scale(0.96)";
            setTimeout(() => {
                this.style.transform = "none";
            }, 120);
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const dropdowns = document.querySelectorAll(".custom-dropdown");
    const carCards = document.querySelectorAll(".car-card");
    const resultsCount = document.querySelector(".results-count");
    
    let currentBrand = "ALL";
    
    dropdowns.forEach(dropdown => {
        const btn = dropdown.querySelector(".dropdown-btn");
        const btnText = dropdown.querySelector(".btn-text");
        const menuItems = dropdown.querySelectorAll(".dropdown-menu li");
        
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            
            dropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove("show");
                }
            });
            
            dropdown.classList.toggle("show");
        });
        
        menuItems.forEach(item => {
            item.addEventListener("click", function() {
                btnText.textContent = this.textContent;
                dropdown.classList.remove("show");
                
                const selectedValue = this.getAttribute("data-value");
                
                if (dropdown.id === "brandDropdown") {
                    currentBrand = selectedValue;
                }
                
                filterCars();
            });
        });
    });
    
    document.addEventListener("click", () => {
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove("show");
        });
    });
    
    function filterCars() {
        let visibleCount = 0;
        
        carCards.forEach(card => {
            const brand = card.getAttribute("data-brand").toUpperCase();
const match = currentBrand === "ALL" || brand === currentBrand;
            
            if (match) {
                card.style.display = "flex";
                visibleCount++;
            } else {
                card.style.display = "none";
            }
        });
        
        if (resultsCount) {
            resultsCount.textContent = `SHOWING ${visibleCount} RESULTS`;
        }
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const carCards = document.querySelectorAll(".car-card");
    const priceDropdown = document.querySelector("#priceDropdown");
    const priceBtnText = priceDropdown.querySelector(".btn-text");
    const priceItems = priceDropdown.querySelectorAll(".dropdown-menu li");
    const container = document.querySelector(".inventory-grid");
    
    let currentOrder = "HIGH-LOW";
    
    priceItems.forEach(item => {
        item.addEventListener("click", function() {
            currentOrder = this.getAttribute("data-value");
            priceBtnText.textContent = this.textContent;
            
            sortCars();
        });
    });
    
    function sortCars() {
        const cardsArray = Array.from(carCards);
        
        cardsArray.sort((a, b) => {
            const priceA = parseFloat(a.querySelector(".car-price-tag").textContent.replace(/[^0-9]/g, ""));
            const priceB = parseFloat(b.querySelector(".car-price-tag").textContent.replace(/[^0-9]/g, ""));
            
            return currentOrder === "LOW-HIGH" ?
                priceA - priceB :
                priceB - priceA;
        });
        
        cardsArray.forEach(card => {
            container.appendChild(card);
        });
    }
});
/*rent page*/
const carWrapper = document.getElementById('carWrapper');
const carImage = document.getElementById('carImage');

if (carWrapper && carImage) {
    carWrapper.addEventListener('mousemove', (e) => {
        const rect = carWrapper.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const xPercent = (x / rect.width) - 0.5;
        const yPercent = (y / rect.height) - 0.5;
        
        const tiltX = (yPercent * 20).toFixed(2);
        const tiltY = (xPercent * -20).toFixed(2);
        const moveX = (xPercent * 15).toFixed(2);
        const moveY = (yPercent * 15).toFixed(2);
        
        carWrapper.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        carImage.style.transform = `translateX(${moveX}px) translateY(${moveY}px) scale(1.05)`;
    });
    
    carWrapper.addEventListener('mouseleave', () => {
        carWrapper.style.transform = 'rotateX(0deg) rotateY(0deg)';
        carImage.style.transform = 'translateX(0px) translateY(0px) scale(1)';
        carWrapper.style.transition = 'transform 0.5s ease';
        carImage.style.transition = 'transform 0.5s ease';
    });
    
    carWrapper.addEventListener('mouseenter', () => {
        carWrapper.style.transition = 'none';
        carImage.style.transition = 'none';
    });
}
document.querySelectorAll('.rent-card').forEach(card => {
    const durationButtons = card.querySelectorAll('.duration-btn');
    
    durationButtons.forEach(button => {
        button.addEventListener('click', () => {
            card.querySelectorAll('.duration-btn').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    
    const tabButtonsRent = document.querySelectorAll('[id^="rent-tab"]');
    const rentCards = document.querySelectorAll('.rent-card');
    const resultsCountSpan = document.getElementById('currentResultsCount');
    
    function updateCount(count) {
        if (resultsCountSpan) {
            resultsCountSpan.innerText = count;
        }
    }
    
    updateCount(rentCards.length);
    
    tabButtonsRent.forEach(tab => {
        tab.addEventListener('click', () => {
            
            tabButtonsRent.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const filterValue = tab.getAttribute('data-filter');
            let matchingCardsCount = 0;
            
            rentCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all' || filterValue === cardCategory) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInCard 0.5s ease forwards';
                    matchingCardsCount++;
                } else {
                    card.style.animation = 'fadeOutCard 0.3s ease forwards';
                    
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
            
            updateCount(matchingCardsCount);
        });
    });
    
});
document.addEventListener("DOMContentLoaded", () => {
    
    const scrollElements = document.querySelectorAll('.animate-on-scroll');
    const elementObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                
                if (entry.target.classList.contains('feature-card')) {
                    const cards = Array.from(document.querySelectorAll('.feature-card'));
                    const index = cards.indexOf(entry.target);
                    setTimeout(() => {
                        entry.target.classList.add('appear');
                    }, index * 200);
                } else {
                    entry.target.classList.add('appear');
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15 
    });
    scrollElements.forEach(el => elementObserver.observe(el));
});

/*contact page*/
document.addEventListener('DOMContentLoaded', () => {
    const cardNumber = document.getElementById('cardnumber');
    const expiry = document.getElementById('expiry');
    const paymentForm = document.getElementById('payment-form');
    const payButton = document.getElementById('pay-button');
    const btnText = payButton.querySelector('.btn-text');
    const spinner = payButton.querySelector('.spinner');
    
    cardNumber.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        let matches = value.match(/\d{4,16}/g);
        let match = (matches && matches[0]) || '';
        let parts = [];
        
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }
        
        if (parts.length > 0) {
            e.target.value = parts.join(' ');
        } else {
            e.target.value = value;
        }
        
        const cardIcon = document.querySelector('.card-brand-icon');
        
        if (value.startsWith('4')) {
            cardIcon.className = 'fa-brands fa-cc-visa card-brand-icon';
            cardIcon.style.color = '#2563eb';
        } else if (value.startsWith('5')) {
            cardIcon.className = 'fa-brands fa-cc-mastercard card-brand-icon';
            cardIcon.style.color = '#ea580c';
        } else {
            cardIcon.className = 'fa-solid fa-credit-card card-brand-icon';
            cardIcon.style.color = '#94a3b8';
        }
    });
    
    expiry.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        
        if (value.length > 2) {
            e.target.value = value.substring(0, 2) + ' / ' + value.substring(2, 4);
        } else {
            e.target.value = value;
        }
    });
    
    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        payButton.disabled = true;
        btnText.classList.add('hidden');
        spinner.classList.remove('hidden');
        
        setTimeout(() => {
            spinner.classList.add('hidden');
            btnText.textContent = '✓ ORDER CONFIRMED';
            btnText.classList.remove('hidden');
            payButton.style.backgroundColor = '#10b981';
            
            alert('Payment Processed Successfully! Thank you.');
        }, 2200);
    });
});
/*animation*/
const elements = document.querySelectorAll(
    '.fade-left, .fade-right, .zoom'
);

const observer = new IntersectionObserver((entries) => {
    
    entries.forEach((entry) => {
        
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
        
    });
    
});

elements.forEach((el) => observer.observe(el));
/*icons navbar*/
document.addEventListener('DOMContentLoaded', () => {
    const searchTrigger = document.getElementById('search-trigger');
    const searchDropdown = document.getElementById('search-dropdown');
    const searchInput = searchDropdown.querySelector('.search-input');
    
    searchTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        
        searchDropdown.classList.toggle('active');
        
        if (searchDropdown.classList.contains('active')) {
            setTimeout(() => searchInput.focus(), 100);
        }
    });
    
    document.addEventListener('click', (e) => {
        if (!searchTrigger.contains(e.target) && !searchDropdown.contains(e.target)) {
            searchDropdown.classList.remove('active');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const cartTrigger =
        document.getElementById('cartTrigger') ||
        document.querySelector('.cart-btn');
    
    const cartDrawer = document.getElementById('cartDrawer');
    const cartOverlay = document.getElementById('cartOverlay');
    const closeCart = document.getElementById('closeCart');
    
    if (cartTrigger) {
        cartTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            cartDrawer.classList.add('active');
            cartOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    const initCloseCart = () => {
        cartDrawer.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    };
    
    closeCart.addEventListener('click', initCloseCart);
    cartOverlay.addEventListener('click', initCloseCart);
});

document.addEventListener('DOMContentLoaded', () => {
    const profileTrigger = document.getElementById('profileTrigger');
    const profileDropdown = document.getElementById('profileDropdown');
    
    profileTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        
        profileDropdown.classList.toggle('active');
    });
    
    document.addEventListener('click', (e) => {
        if (
            !profileTrigger.contains(e.target) &&
            !profileDropdown.contains(e.target)
        ) {
            profileDropdown.classList.remove('active');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const cartTrigger = document.getElementById('cartTrigger');
    const cartDrawer = document.getElementById('cartDrawer');
    const closeCartBtn = document.getElementById('closeCart');
    const rentButtons = document.querySelectorAll('.rent-now-btn');
    const cartItemsContainer = document.querySelector('.cart-drawer-items');
    const totalPriceElement = document.querySelector('.total-price');
    const durationButtons = document.querySelectorAll('.duration-btn');
    
    let cart = JSON.parse(localStorage.getItem('garageCart')) || [];
    
    updateCartUI();
    
    const openCart = (e) => {
        if (e) e.preventDefault();
        if (cartDrawer) cartDrawer.classList.add('open');
    };
    
    const closeCart = () => {
        if (cartDrawer) cartDrawer.classList.remove('open');
    };
    
    if (cartTrigger) cartTrigger.addEventListener('click', openCart);
    if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
    
    durationButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const optionsContainer = e.target.parentElement;
            optionsContainer.querySelector('.duration-btn.active').classList.remove('active');
            e.target.classList.add('active');
        });
    });
    
    rentButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.rent-card');
            
            const carName = card.querySelector('.car-name').innerText;
            const carSubtitle = card.querySelector('.car-subtitle').innerText;
            const carImg = card.querySelector('.car-thumbnail').src;
            
            const activeDuration = card.querySelector('.duration-btn.active').innerText.toLowerCase();
            
            let carPrice = 0;
            
            if (activeDuration === 'daily') {
                const priceText = card.querySelector('.price-amount').innerText;
                carPrice = parseFloat(priceText.replace('$', '').replace(/,/g, ''));
            } else if (activeDuration === 'weekly') {
                const priceText = card.querySelector('.car-specs .spec-item .spec-value').childNodes[0].textContent;
                carPrice = parseFloat(priceText.replace('$', '').replace(/,/g, ''));
            } else if (activeDuration === 'monthly') {
                const priceText = card.querySelector('.car-specs .spec-item .spec-value').childNodes[0].textContent;
                carPrice = parseFloat(priceText.replace('$', '').replace(/,/g, '')) * 4;
            }
            
            const carItem = {
                id: Date.now(),
                name: carName,
                subtitle: `${carSubtitle} (${activeDuration.toUpperCase()})`,
                price: carPrice,
                img: carImg
            };
            
            cart.push(carItem);
            
            localStorage.setItem('garageCart', JSON.stringify(cart));
            
            updateCartUI();
            openCart();
        });
    });
    
    function updateCartUI() {
        if (!cartItemsContainer) return;
        
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <p class="empty-cart-msg" style="text-align:center; padding:20px; color:#888;" >
                    Your garage is empty
                </p>
            `;
            
            if (totalPriceElement) {
                totalPriceElement.innerText = '$0';
            }
            
            return;
        }
        
        let total = 0;
        
        cart.forEach(item => {
            total += item.price;
            
            const itemHTML = `
                <div class="cart-item" data-id="${item.id}">
                    <div class="cart-item-img">
                        <img src="${item.img}" alt="${item.name}">
                    </div>

                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p class="cart-item-spec">${item.subtitle}</p>
                        <span class="cart-item-price">$${item.price.toLocaleString()}</span>
                    </div>

                    <button class="remove-item-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="18" height="18">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </button>
                </div>
            `;
            
            cartItemsContainer.insertAdjacentHTML('beforeend', itemHTML);
        });
        
        if (totalPriceElement) {
            totalPriceElement.innerText = `$${total.toLocaleString()}`;
        }
        
        addRemoveEvents();
    }
    
    function addRemoveEvents() {
        const removeButtons = document.querySelectorAll('.remove-item-btn');
        
        removeButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const cartItemElement = e.target.closest('.cart-item');
                const itemId = parseInt(cartItemElement.getAttribute('data-id'));
                
                cart = cart.filter(item => item.id !== itemId);
                
                localStorage.setItem('garageCart', JSON.stringify(cart));
                
                updateCartUI();
            });
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const cartTrigger = document.getElementById('cartTrigger');
    const rentButtons = document.querySelectorAll('.rent-now-btn');
    rentButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); 
            if (cartTrigger) {
                cartTrigger.click();
            }
        });
    });
});

const scrollTopBtn = document.getElementById("scrollToTopBtn");

scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth" 
    });
});