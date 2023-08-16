document.addEventListener("DOMContentLoaded", () => {
    const addressForm = document.getElementById("addressForm");
    addressForm.addEventListener("submit", event => {
        event.preventDefault();

        const formData = {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            address: document.getElementById("address").value,
            apart: document.getElementById("apart").value,
            city: document.getElementById("city").value,
            state: document.getElementById("state").value,
            country: document.getElementById("country").value,
            zipCode: document.getElementById("zipCode").value,
            phoneNo: document.getElementById("phoneNo").value
        };

        // Store the form data in localStorage
        localStorage.setItem('deliveryAddress', JSON.stringify(formData));

        alert("Shipping address saved! Proceeding to payment.");
        window.location.href = "payment.html";
    });
});
