document.addEventListener('DOMContentLoaded', () => {
    const checkoutItemsContainer = document.getElementById('checkoutItems');
    const successOverlay = document.getElementById('successOverlay');
    const placeOrderBtn = document.getElementById('placeOrderBtn');

    function renderSummary() {
        const cart = JSON.parse(localStorage.getItem('hivemaster_cart')) || [];
        
        if (cart.length === 0) {
            window.location.href = 'shop.html';
            return;
        }

        checkoutItemsContainer.innerHTML = '';
        let subtotal = 0;

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            
            const div = document.createElement('div');
            div.className = 'summary-item';
            div.style.marginBottom = '0.5rem';
            div.innerHTML = `
                <span>${item.name} x ${item.quantity}</span>
                <span>$${itemTotal.toFixed(2)}</span>
            `;
            checkoutItemsContainer.appendChild(div);
        });

        const shipping = 15.00;
        const tax = subtotal * 0.08;
        const total = subtotal + shipping + tax;

        document.getElementById('checkoutSubtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('checkoutShipping').textContent = `$${shipping.toFixed(2)}`;
        document.getElementById('checkoutTax').textContent = `$${tax.toFixed(2)}`;
        document.getElementById('checkoutTotal').textContent = `$${total.toFixed(2)}`;
    }

    placeOrderBtn.addEventListener('click', () => {
        // Mock validation/processing
        placeOrderBtn.disabled = true;
        placeOrderBtn.innerHTML = '<i data-lucide="loader-2" class="animate-spin"></i> Processing...';
        if (typeof lucide !== 'undefined') lucide.createIcons();

        setTimeout(() => {
            // Clear cart
            localStorage.removeItem('hivemaster_cart');
            if (window.updateCartBadge) window.updateCartBadge();
            
            // Show Success Overlay
            successOverlay.style.display = 'flex';
            if (typeof lucide !== 'undefined') lucide.createIcons();
            
            // Re-render summary (will redirect if cart empty but we show success instead)
        }, 2000);
    });

    renderSummary();
});
