document.addEventListener('DOMContentLoaded', () => {
    const addToCartBtns = document.querySelectorAll('.add-to-cart');

    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = btn.getAttribute('data-id');
            const name = btn.getAttribute('data-name');
            const price = parseFloat(btn.getAttribute('data-price'));
            const image = btn.getAttribute('data-img');

            addItemToCart({ id, name, price, image, quantity: 1 });
            
            // Visual feedback
            const originalIcon = btn.innerHTML;
            btn.innerHTML = '<i data-lucide="check"></i>';
            btn.classList.add('btn-success');
            if (typeof lucide !== 'undefined') lucide.createIcons();
            
            setTimeout(() => {
                btn.innerHTML = originalIcon;
                btn.classList.remove('btn-success');
                if (typeof lucide !== 'undefined') lucide.createIcons();
            }, 1000);
        });
    });

    function addItemToCart(product) {
        let cart = JSON.parse(localStorage.getItem('hivemaster_cart')) || [];
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push(product);
        }

        localStorage.setItem('hivemaster_cart', JSON.stringify(cart));
        if (window.updateCartBadge) window.updateCartBadge();
    }
});
