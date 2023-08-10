// Get the "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll('.addtoCart');

// Add click event listener to each button
addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
});

function addToCart(event) {
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



