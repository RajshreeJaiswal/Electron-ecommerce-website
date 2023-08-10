// Get the cart section and the tbody element
const cartSection = document.getElementById('cart');
const cartTableBody = cartSection.querySelector('tbody');
const checkoutButton = document.querySelector('.checkout-button a');

// Load cart items from local storage and populate the table
function loadCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    cartTableBody.innerHTML = '';

    if (cartItems.length === 0) {
        cartTableBody.innerHTML = '<tr><td colspan="6">No items in cart</td></tr>';
        checkoutButton.style.display = 'none'; // Hide checkout button if no items in cart
    } else {
        cartItems.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><button class="remove-item">Remove</button></td>
                <td><img src="${item.image}" alt="${item.name}" /></td>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td><input type="number" class="quantity" value="${item.quantity}" min="1"></td>
                <td class="subtotal">${(parseFloat(item.price.replace('Rs.', '')) * item.quantity).toFixed(2)}</td>
            `;
            cartTableBody.appendChild(row);
        });
        checkoutButton.style.display = ""; // Show checkout button if items in cart
    }
    updateCart(); // Update totals
}

// Update cart items quantity and totals
function updateCart() {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    cartTableBody.innerHTML = '';

    cartItems.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><button class="remove-item">Remove</button></td>
            <td><img src="${item.image}" alt="${item.name}" /></td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td><input type="number" class="quantity" value="${item.quantity}" min="1"></td>
            <td class="subtotal">${(parseFloat(item.price.replace('Rs.', '')) * item.quantity).toFixed(2)}</td>
        `;
        cartTableBody.appendChild(row);
    });

    // Update totals
    const subtotalElements = document.querySelectorAll('.subtotal');
    let total = 0;
    subtotalElements.forEach(subtotalElement => {
        total += parseFloat(subtotalElement.textContent);
    });
    document.getElementById('total').textContent = total.toFixed(2);
}

// Add input change event listener to update quantity and subtotal
cartTableBody.addEventListener('change', event => {
    if (event.target.classList.contains('quantity')) {
        const row = event.target.closest('tr');
        const productName = row.querySelector('td:nth-child(3)').textContent;
        const newQuantity = parseInt(event.target.value);

        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const existingItem = cartItems.find(item => item.name === productName);
        if (existingItem) {
            existingItem.quantity = newQuantity;
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            updateCart();
        }
    }
});

loadCartItems();
updateCart();


// ... (Previous code remains the same)

// Add click event listener to remove buttons
cartTableBody.addEventListener('click', event => {
    if (event.target.classList.contains('remove-item')) {
        const row = event.target.closest('tr');
        const productName = row.querySelector('td:nth-child(3)').textContent;
        
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const updatedCartItems = cartItems.filter(item => item.name !== productName);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

        row.remove();

        updateCart(); // Update totals after removing an item
    }
});

loadCartItems();
updateCart();


// Function to apply coupon code
function applyCouponCode() {
    const couponCodeInput = document.getElementById('couponCode');
    const couponCode = couponCodeInput.value.trim();
    const totalElement = document.getElementById('total');

    if (couponCode === 'Masai20') {
        if (!couponCodeInput.disabled) {
            let total = parseFloat(totalElement.textContent);
            total *= 0.7; // Reduce the total price by 30%
            totalElement.textContent = total.toFixed(2);
            couponCodeInput.disabled = true; // Disable the input field
            couponCodeInput.placeholder = 'Coupon already applied';
            couponCodeInput.value = ''; // Clear the input value
            couponCodeInput.classList.add('coupon-applied'); // Add a class for styling
            alert('Masai20 Coupon applied successfully!');
        } else {
            alert('Coupon code already applied');
        }
    } else {
        alert('Invalid coupon code');
    }
}

// Add click event listener for Apply Coupon button
const applyCouponButton = document.getElementById('applyCoupon');
applyCouponButton.addEventListener('click', applyCouponCode);

