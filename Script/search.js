const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const resultsList = document.getElementById('results');
let timeoutId;

// Function to fetch data from db.json
async function fetchData() {
  const response = await fetch('db.json');
  const data = await response.json();
  return data.products;
}

// Function to display search results
function displayResults(results) {
  resultsList.innerHTML = '';

  for (const result of results) {
    const li = document.createElement('li');
    li.textContent = result.name;
    resultsList.appendChild(li);
  }
}

// Function to handle search input and debounce
function handleSearch() {
  clearTimeout(timeoutId);
  
  timeoutId = setTimeout(async () => {
    const searchTerm = searchInput.value.toLowerCase();
    const data = await fetchData();
    const filteredResults = data.filter(item => item.name.toLowerCase().includes(searchTerm));
    
    displayResults(filteredResults);
  }, 300); // Adjust the debounce time as needed
}

// Attach event listeners
searchInput.addEventListener('input', handleSearch);
searchButton.addEventListener('click', handleSearch);
