const productsPerPage = 10;
const productList = document.getElementById("product1");
const paginationSection = document.getElementById("pagination");

async function fetchProducts() {
    const response = await fetch("http://localhost:3000/products");
    const data = await response.json();
    return data;
}

async function showPage(pageNumber) {
    const products = await fetchProducts();
    const startIndex = (pageNumber - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;

    productList.innerHTML = ""; // Clear previous content

    const productsToShow = products.slice(startIndex, endIndex);

    productsToShow.forEach(product => {
        const productItem = document.createElement("div");
        productItem.className = "pro-container";
        productItem.innerHTML = `
            <div class="pro">
                <img src="${product.image}" alt="${product.name}" />
                <div class="des">
                    <span>Camera</span>
                    <h5>${product.name}</h5>
                    <div class="start">
                        ${generateStars(product.rating)}
                    </div>
                    <h4>Rs.${product.price}</h4>
                </div>
                <a href="#"><i class="fa-solid fa-cart-shopping cart"></i></a>
            </div>
        `;
        productList.appendChild(productItem);
    });
}

function generateStars(rating) {
    const starIcons = Array.from({ length: 5 }, (_, index) => {
        const isActive = index < rating;
        return `<i class="fas fa-star${isActive ? "" : "-empty"}"></i>`;
    });
    return starIcons.join("");
}

async function createPaginationLinks() {
    const products = await fetchProducts();
    const numPages = Math.ceil(products.length / productsPerPage);

    for (let i = 1; i <= numPages; i++) {
        const link = document.createElement("a");
        link.href = "#";
        link.textContent = i;
        link.addEventListener("click", function () {
            showPage(i);
        });
        paginationSection.appendChild(link);
    }
}

showPage(1);
createPaginationLinks();
