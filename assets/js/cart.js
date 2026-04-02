document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cartItems');
    const emptyCartContainer = document.getElementById('emptyCart');
    const cartLayout = document.getElementById('cartLayout');

    function renderCart() {
        const cart = JSON.parse(localStorage.getItem('hivemaster_cart')) || [];
        
        if (cart.length === 0) {
            cartLayout.style.display = 'none';
            emptyCartContainer.style.display = 'block';
            return;
        }

        cartLayout.style.display = 'grid';
        emptyCartContainer.style.display = 'none';
        cartItemsContainer.innerHTML = '';

        cart.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td data-label="Product">
                    <div class="cart-item-info">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                        <span class="cart-item-name">${item.name}</span>
                    </div>
                </td>
                <td data-label="Price">$${parseFloat(item.price).toFixed(2)}</td>
                <td data-label="Quantity">
                    <div class="quantity-control">
                        <button class="qty-btn" onclick="updateQty('${item.id}', -1)"><i data-lucide="minus" style="width:14px;"></i></button>
                        <span class="qty-num">${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQty('${item.id}', 1)"><i data-lucide="plus" style="width:14px;"></i></button>
                    </div>
                </td>
                <td data-label="Total">$${(item.price * item.quantity).toFixed(2)}</td>
                <td>
                    <button class="btn-icon" onclick="removeItem('${item.id}')" style="color: #ef4444;"><i data-lucide="trash-2"></i></button>
                </td>
            `;
            cartItemsContainer.appendChild(row);
        });

        if (typeof lucide !== 'undefined') lucide.createIcons();
        updateTotals(cart);
    }

    function updateTotals(cart) {
        const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        const shipping = subtotal > 0 ? 15.00 : 0;
        const tax = subtotal * 0.08;
        const total = subtotal + shipping + tax;

        document.getElementById('subtotalCost').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('shippingCost').textContent = `$${shipping.toFixed(2)}`;
        document.getElementById('taxCost').textContent = `$${tax.toFixed(2)}`;
        document.getElementById('totalCost').textContent = `$${total.toFixed(2)}`;
    }

    window.updateQty = (id, delta) => {
        let cart = JSON.parse(localStorage.getItem('hivemaster_cart')) || [];
        const item = cart.find(i => i.id === id);
        if (item) {
            item.quantity += delta;
            if (item.quantity <= 0) {
                cart = cart.filter(i => i.id !== id);
            }
            localStorage.setItem('hivemaster_cart', JSON.stringify(cart));
            renderCart();
            if (window.updateCartBadge) window.updateCartBadge();
        }
    };

    window.removeItem = (id) => {
        let cart = JSON.parse(localStorage.getItem('hivemaster_cart')) || [];
        cart = cart.filter(i => i.id !== id);
        localStorage.setItem('hivemaster_cart', JSON.stringify(cart));
        renderCart();
        if (window.updateCartBadge) window.updateCartBadge();
    };

    document.getElementById('clearCartBtn').onclick = () => {
        localStorage.removeItem('hivemaster_cart');
        renderCart();
        if (window.updateCartBadge) window.updateCartBadge();
    };

    renderCart();
});
