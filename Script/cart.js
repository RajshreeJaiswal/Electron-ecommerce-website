// Get the cart section and the tbody element
const cartSection = document.getElementById("cart");
const cartTableBody = cartSection.querySelector("tbody");

// Load cart items from local storage and populate the table
function loadCartItems() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  cartTableBody.innerHTML = "";

  cartItems.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td><button class="remove-item">Remove</button></td>
            <td><img src="${item.image}" alt="${item.name}" /></td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td><input type="number" class="quantity" value="${
              item.quantity
            }" min="1"></td>
            <td class="subtotal">${(
              parseFloat(item.price.replace("Rs.", "")) * item.quantity
            ).toFixed(2)}</td>
        `;
    cartTableBody.appendChild(row);
  });
}


// Update cart items quantity and totals
// ... (rest of the code remains the same)

// Update cart items quantity and totals
function updateCart() {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  cartTableBody.innerHTML = "";

  cartItems.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td><img src="${item.image}" alt="${item.name}" /></td>
    <td>${item.name}</td>
    <td>${item.price}</td>
    <td><input type="number" class="quantity" value="${item.quantity}" min="1"></td>
    <td class="subtotal">${(parseFloat(item.price.replace("Rs.", "")) * item.quantity).toFixed(2)}</td>
    <td><button class="remove-item">Remove</button></td>
        `;
    cartTableBody.appendChild(row);
  });

  // Update totals
  const subtotalElements = document.querySelectorAll(".subtotal");
  let total = 0;
  subtotalElements.forEach((subtotalElement) => {
    total += parseFloat(subtotalElement.textContent);
  });
  document.getElementById("total").textContent = total.toFixed(2);

  // Save the final total to localStorage
  localStorage.setItem("finalPrice", total.toFixed(2));

  // Logic to hide/show cart contents based on cart items
  const cartContents = document.querySelectorAll(".cart-content");
  const shoppingButton = document.getElementById("shopping-button");
  const rightSection = document.querySelector(".right-section"); // Assuming the class for the right section is "right-section"

  const emptyCartSection = document.querySelector(".empty-cart-button"); // Select the "empty cart" section

    if (cartItems.length === 0) {
        // Hide cart contents, cart total, and discount
        cartContents.forEach(element => {
            element.style.display = "none";
        });
        rightSection.style.display = "none"; // Hide the right section
        shoppingButton.style.display = "";
        emptyCartSection.style.display = "block"; // Show the "empty cart" section
    } else {
        // Show cart contents, cart total, and discount
        cartContents.forEach(element => {
            element.style.display = "block";
        });
        rightSection.style.display = "block"; // Show the right section
        shoppingButton.style.display = "block";
        emptyCartSection.style.display = "none"; // Hide the "empty cart" section
    }
}

// ... (rest of the code remains the same)


// ... (Previous code remains the same)

// Add click event listener to remove buttons
cartTableBody.addEventListener("input", (event) => {
  if (event.target.classList.contains("quantity")) {
      const row = event.target.closest("tr");
      const productName = row.querySelector("td:nth-child(2)").textContent;
      const quantity = parseInt(event.target.value);
      const price = parseFloat(row.querySelector("td:nth-child(3)").textContent.replace("Rs.", ""));
      const subtotalElement = row.querySelector(".subtotal");

      // Update the subtotal for the item
      subtotalElement.textContent = (price * quantity).toFixed(2);

      // Update the item's quantity in local storage
      let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      const itemIndex = cartItems.findIndex(item => item.name === productName);
      if (itemIndex !== -1) {
          cartItems[itemIndex].quantity = quantity;
          localStorage.setItem("cartItems", JSON.stringify(cartItems));
      }

      // Update the cart total
      updateCart();
  }
});

cartTableBody.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-item")) {
    const row = event.target.closest("tr");
    const productName = row.querySelector("td:nth-child(2)").textContent;

    // Remove the item from local storage
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const itemIndex = cartItems.findIndex(item => item.name === productName);
    if (itemIndex !== -1) {
      cartItems.splice(itemIndex, 1);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }

    // Remove the row from the DOM
    row.remove();

    // Update the cart total
    updateCart();
    updateCartCount();
    
  }
});



loadCartItems();
updateCart();
updateCartCount(); 

// alert('Item added to cart!');

const applyCouponButton = document.getElementById("apply-coupon");
const couponCodeInput = document.getElementById("coupon-code");
const totalElement = document.getElementById("total");
const discountElement = document.getElementById("discount");

let couponApplied = false;

applyCouponButton.addEventListener("click", () => {
  if (couponApplied) {
    return; // Coupon already applied, do not apply again
  }

  const couponCode = couponCodeInput.value;
  let total = parseFloat(totalElement.textContent);

  if (couponCode === "Masai30") {
    const discount = total * 0.3; // 30% discount
    total -= discount;

    totalElement.textContent = total.toFixed(2);
    discountElement.textContent = discount.toFixed(2);

    // Save the discounted total to localStorage
    localStorage.setItem("finalPrice", total.toFixed(2));

    couponApplied = true;

    // Disable the coupon input and apply button
    couponCodeInput.disabled = true;
    applyCouponButton.disabled = true;

    alert("Coupon successfully applied!");
  } else {
    alert("Wrong coupon code. Please enter a valid coupon code.");
  }
});



function clearCart() {
    // Clear cart items from local storage
    localStorage.removeItem("cartItems");
    
    // Update the cart UI
    cartTableBody.innerHTML = "";
    document.getElementById("total").textContent = "0.00";
    document.getElementById("discount").textContent = "0.00";
    updateCartCount();
}

// ... (Previous code remains the same)


function updateCartCount() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  console.log("Cart Items:", cartItems); // Debugging
  let totalCount = 0;
  cartItems.forEach(item => {
    if (item.quantity) { // Ensure the item has quantity attribute
      totalCount += item.quantity;
    }
  });
  console.log("Total Count:", totalCount); // Debugging
  document.getElementById('cart-count').textContent = totalCount;
}

window.addEventListener('storage', (event) => {
  if (event.key === 'cartItems') {
      updateCartCount();
  }
});

