// Get the cart section and the tbody element
const cartSection = document.getElementById('cart');
const cartTableBody = cartSection.querySelector('tbody');

// Load cart items from local storage and populate the table
function loadCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

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


const applyCouponButton = document.getElementById('apply-coupon');
const couponCodeInput = document.getElementById('coupon-code');
const totalElement = document.getElementById('total');
const discountElement = document.getElementById('discount');

let couponApplied = false;

applyCouponButton.addEventListener('click', () => {
    if (couponApplied) {
        return; // Coupon already applied, do not apply again
    }

    const couponCode = couponCodeInput.value;
    let total = parseFloat(totalElement.textContent);
    
    if (couponCode === 'Masai30') {
        const discount = total * 0.3; // 30% discount
        total -= discount;

        totalElement.textContent = total.toFixed(2);
        discountElement.textContent = discount.toFixed(2);

        couponApplied = true;

        // Disable the coupon input and apply button
        couponCodeInput.disabled = true;
        applyCouponButton.disabled = true;

        alert('Coupon successfully applied!');
    } else {
        alert('Wrong coupon code. Please enter a valid coupon code.');
    }
});
