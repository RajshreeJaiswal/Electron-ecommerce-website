function displayDeliveryAddress() {
    const deliveryData = JSON.parse(localStorage.getItem('deliveryAddress'));
    if (deliveryData) {
        const addressBox = document.getElementById('deliveryAddressBox');

        // Join first name and last name with a space in between
        const fullName = `${deliveryData.firstName} ${deliveryData.lastName}`;
        const pName = document.createElement('p');
        pName.textContent = `Name: ${fullName}`;
        addressBox.appendChild(pName);

        // Join address details into one line
        const fullAddress = `${deliveryData.address}, ${deliveryData.apart}, ${deliveryData.city}, ${deliveryData.state}, ${deliveryData.country}, ZIP: ${deliveryData.zipCode}, Phone: ${deliveryData.phoneNo}`;
        const pAddress = document.createElement('p');
        pAddress.textContent = `Address: ${fullAddress}`;
        addressBox.appendChild(pAddress);
    }
    // Clear the localStorage item after using it
    localStorage.removeItem('deliveryAddress');
}



displayDeliveryAddress();



let price = parseInt(localStorage.getItem("finalPrice")) * 100;  // Convert to paise

var options = {
    "key": "rzp_test_Clt5wblQaSDNVI",
    "amount": price, // Amount is now in paise
    "currency": "INR",
    "name": "Electron",
    "description": "Test Payment",
    "image": "https://freevector-images.s3.amazonaws.com/uploads/vector/preview/36682/36682.png",
    "handler": function (response) {
       

    

        const successURL = `success.html?payment_id=${response.razorpay_payment_id}&order_id=${response.razorpay_order_id}&signature=${response.razorpay_signature}`;

        window.location.href = successURL;

        setTimeout(() => {
            clearCart();
        }, 1000);
    }
};
var rzp1 = new Razorpay(options);

document.getElementById('rzp-button1').onclick = function(e) {
    rzp1.open();
    e.preventDefault();
};
