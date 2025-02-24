document.addEventListener("DOMContentLoaded", function () {
    function fetchLogs() {
        fetch('/logs/all')
            .then(response => response.text())
            .then(data => {
                document.getElementById('logs').innerHTML = data;
            })
            .catch(error => console.error('Error fetching logs:', error));
    }

    // Fetch logs initially
    fetchLogs();

    // Set interval to fetch logs every 5 seconds
    setInterval(fetchLogs, 5000);
});


document.addEventListener("DOMContentLoaded", function () {
    const refreshButton = document.getElementById('refresh-logs');
    const clearButton = document.getElementById('clear-logs');

    // Function to fetch logs
    function fetchLogs() {
        fetch('/logs/all')
            .then(response => response.text())
            .then(data => {
                document.getElementById('logs').innerHTML = data;
            })
            .catch(error => console.error('Error fetching logs:', error));
    }

    // Refresh logs
    if (refreshButton) {
        refreshButton.addEventListener('click', function () {
            fetchLogs();
        });
    }

    // Clear logs
    if (clearButton) {
        clearButton.addEventListener('click', function () {
            fetch('/clear_logs', { method: 'POST' })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        fetchLogs();
                    }
                })
                .catch(error => console.error('Error clearing logs:', error));
        });
    }

    // Fetch logs initially
    fetchLogs();

    // Set interval to fetch logs every 5 seconds
    setInterval(fetchLogs, 5000);
});