// Memuat JSON dari berkas terpisah
fetch('Portfolio Chatflow.json')
  .then((response) => response.json())
  .then((data) => {
    // Menampilkan data JSON ke elemen HTML dengan ID 'jsonData'
    document.getElementById('jsonData').textContent = JSON.stringify(data, null, 2);
  })
  .catch((error) => console.error('Error loading JSON:', error));
