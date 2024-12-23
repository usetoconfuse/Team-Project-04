document.getElementById('fetchDataTest').addEventListener('click', function() {
    // Make an HTTP request to the PHP file
    fetch('ManagerDash-Stats/stats-db.php')
        .then(function(response) {
            // Ensure the response is OK and return the JSON data 
            if (!response.ok) { 
                throw new Error('Network response was not ok ' + response.statusText);
            }
            // Convert the response to JSON format
            return response.json();
        })
        .then(function(data) {
            console.log("2: ", data[0].projectCount);
            // Find the container to display the data
            var container = document.getElementById('dataContainer');
            container.innerHTML = ''; // Clear any existing content

            // Loop through the data and create a new element for each item
            data.forEach(function(item) {
                var div = document.createElement('div');
                div.textContent = 'count: ' + item.projectCount;
                container.appendChild(div); // Add the new element to the container
            });
        })
        .catch(function(error) {
            console.error('Error:', error); // Log any errors that occur
        });
});
