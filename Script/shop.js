// Debounce function
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

// Function to perform the search and display results
function performSearch(query) {
    // Simulate fetching data from db.json
    fetch('db.json')
        .then(response => response.json())
        .then(data => {
            const resultsContainer = document.getElementById('results');
            resultsContainer.innerHTML = ''; // Clear previous results

            const matchingItems = data.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));

            if (matchingItems.length > 0) {
                matchingItems.forEach(item => {
                    const itemDiv = document.createElement('div');
                    itemDiv.textContent = item.name;
                    resultsContainer.appendChild(itemDiv);
                });
            } else {
                resultsContainer.textContent = 'No results found.';
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

// Debounced version of the search function
const debouncedSearch = debounce(performSearch, 300); // Adjust the debounce delay as needed

// Attach event listener to the search input
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', function () {
    const query = this.value;
    debouncedSearch(query);
});
