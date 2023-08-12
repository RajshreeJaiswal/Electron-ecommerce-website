document.addEventListener("DOMContentLoaded", () => {
    const addressForm = document.getElementById("addressForm");
    addressForm.addEventListener("submit", event => {
        event.preventDefault();

        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const address = document.getElementById("address").value;
        const apart = document.getElementById("apart").value;
        const city = document.getElementById("city").value;
        const state = document.getElementById("state").value;
        const country = document.getElementById("country").value;
        const zipCode = document.getElementById("zipCode").value;
        const phoneNo = document.getElementById("phoneNo").value;

        alert("Shipping address saved! Proceeding to payment.");
        window.location.href = "payment.html";
    });
});