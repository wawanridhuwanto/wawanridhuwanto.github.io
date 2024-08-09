// Memuat JSON dari berkas Portfolio Chatflow.json
fetch('Portfolio Chatflow.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Menampilkan data JSON ke elemen dengan ID 'jsonData'
        const jsonDataElement = document.getElementById('jsonData');
        jsonDataElement.textContent = JSON.stringify(data, null, 2);
    })
    .catch(error => {
        console.error('Error loading JSON:', error);
        document.getElementById('jsonData').textContent = 'Failed to load data.';
    });
