document.getElementById('reportForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const itemType = document.getElementById('itemType').value;
    const description = document.getElementById('description').value;

    // Send data to back-end API
    fetch('/api/report', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ itemType, description })
    })
    .then(response => response.json())
    .then(data => {
        alert('Item reported successfully!');
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

document.getElementById('searchInput').addEventListener('input', function() {
    const query = this.value;

    // Fetch search results from back-end API
    fetch(`/api/search?query=${query}`)
    .then(response => response.json())
    .then(data => {
        const resultsContainer = document.getElementById('searchResults');
        resultsContainer.innerHTML = '';
        data.results.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.itemType}: ${item.description}`;
            resultsContainer.appendChild(li);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
