// Get the "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll('.addtoCart');

// Add click event listener to each button
addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
});

function addToCart(event) {
    event.preventDefault();
    const product = event.target.closest('.pro');
    const productName = product.querySelector('.data-name').textContent;
    const productPrice = product.querySelector('.data-price').textContent;
    const productImage = product.querySelector('img').src;

    const cartItem = {
        name: productName,
        price: productPrice,
        image: productImage,
        quantity: 1
    };

    // Check if cart data already exists in local storage
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    // Check if the product is already in the cart
    const existingItemIndex = cartItems.findIndex(item => item.name === productName);
    if (existingItemIndex !== -1) {
        cartItems[existingItemIndex].quantity++;
    } else {
        cartItems.push(cartItem);
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    alert('Item added to cart!');
}


// const applyCouponButton = document.getElementById('apply-coupon');
// const couponCodeInput = document.getElementById('coupon-code');
// const totalElement = document.getElementById('total');
// const discountElement = document.getElementById('discount');

// let couponApplied = false;

// applyCouponButton.addEventListener('click', () => {
//     if (couponApplied) {
//         return; // Coupon already applied, do not apply again
//     }

//     const couponCode = couponCodeInput.value;
//     let total = parseFloat(totalElement.textContent);
    
//     if (couponCode === 'Masai30') {
//         const discount = total * 0.3; // 30% discount
//         total -= discount;

//         totalElement.textContent = total.toFixed(2);
//         discountElement.textContent = discount.toFixed(2);

//         couponApplied = true;

//         // Disable the coupon input and apply button
//         couponCodeInput.disabled = true;
//         applyCouponButton.disabled = true;

//         alert('Coupon successfully applied!');
//     } else {
//         alert('Wrong coupon code. Please enter a valid coupon code.');
//     }
// });
