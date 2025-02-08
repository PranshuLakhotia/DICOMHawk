document.addEventListener("DOMContentLoaded", function () {
    function fetchLogs() {
        fetch('/logs/simplified')
            .then(response => response.json())
            .then(logs => {
                const tbody = document.querySelector("#logs-table tbody");
                tbody.innerHTML = ''; // Clear existing logs

                // Group logs by session_id
                const groupedLogs = logs.reduce((acc, log) => {
                    const sessionId = log.session_id || 'N/A';
                    if (!acc[sessionId]) {
                        acc[sessionId] = [];
                    }
                    acc[sessionId].push(log);
                    return acc;
                }, {});

                // Display grouped logs
                for (const [sessionId, sessionLogs] of Object.entries(groupedLogs)) {
                    // Create a row for the session_id
                    const sessionRow = document.createElement("tr");
                    const sessionCell = document.createElement("td");
                    sessionCell.textContent = `Session ID: ${sessionId}`;
                    sessionCell.colSpan = 12;
                    sessionCell.style.fontWeight = 'bold';
                    sessionRow.appendChild(sessionCell);
                    tbody.appendChild(sessionRow);

                    sessionLogs.forEach(log => {
                        const row = document.createElement("tr");

                        const idCell = document.createElement("td");
                        idCell.textContent = log.ID || "N/A";
                        row.appendChild(idCell);

                        const ipCell = document.createElement("td");
                        ipCell.textContent = log.IP || "N/A";
                        row.appendChild(ipCell);

                        const portCell = document.createElement("td");
                        portCell.textContent = log.Port || "N/A";
                        row.appendChild(portCell);

                        const versionCell = document.createElement("td");
                        versionCell.textContent = log.Version || "N/A";
                        row.appendChild(versionCell);

                        const commandCell = document.createElement("td");
                        commandCell.textContent = log.Command || "N/A";
                        row.appendChild(commandCell);

                        const typeCell = document.createElement("td");
                        typeCell.textContent = log.Type || "N/A";
                        row.appendChild(typeCell);

                        const termCell = document.createElement("td");
                        termCell.textContent = log.Term || "N/A";
                        row.appendChild(termCell);

                        const matchesCell = document.createElement("td");
                        matchesCell.textContent = log.Matches || "N/A";
                        row.appendChild(matchesCell);

                        const statusCell = document.createElement("td");
                        statusCell.textContent = log.Status || "N/A";
                        row.appendChild(statusCell);

                        const levelCell = document.createElement("td");
                        levelCell.textContent = log.level || "N/A";
                        row.appendChild(levelCell);

                        const msgCell = document.createElement("td");
                        msgCell.textContent = log.msg || "N/A";
                        row.appendChild(msgCell);

                        const timeCell = document.createElement("td");
                        timeCell.textContent = log.timestamp || "N/A";
                        row.appendChild(timeCell);

                        tbody.appendChild(row);
                    });
                }
            })
            .catch(error => console.error('Error fetching simplified logs:', error));
    }

    // Fetch logs initially
    fetchLogs();

    // Set interval to fetch logs every 5 seconds
    setInterval(fetchLogs, 5000);
});

document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById('theme-toggle');

    if (themeToggle) {
        // Load saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggle.innerHTML = '<span class="icon">☀️</span> Toggle Light Mode';
        }

        // Add event listener to the button
        themeToggle.addEventListener('click', function () {
            document.body.classList.toggle('dark-mode');
            const isDarkMode = document.body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
            themeToggle.innerHTML = isDarkMode ? '<span class="icon">☀️</span> Toggle Light Mode' : '<span class="icon">🌙</span> Toggle Dark Mode';
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    // Session ID Search Functionality
    const searchButton = document.getElementById('search-button');
    const sessionIdInput = document.getElementById('session-id-search');
    
    searchButton.addEventListener('click', function() {
        const searchTerm = sessionIdInput.value.trim().toLowerCase();
        const rows = document.querySelectorAll("#logs-table tbody tr");
        let hasMatches = false;

        rows.forEach(row => {
            const sessionCell = row.querySelector("td:nth-child(1)"); // Adjust index if needed
            if (sessionCell) {
                const sessionId = sessionCell.textContent.toLowerCase();
                if (sessionId.includes(searchTerm)) {
                    row.style.display = "";
                    row.classList.add('highlight-match');
                    hasMatches = true;
                } else {
                    row.style.display = "none";
                    row.classList.remove('highlight-match');
                }
            }
        });

        if (!hasMatches && searchTerm) {
            showToast('No matching sessions found!', 'warning');
        }
    });

    // Clear Search
    sessionIdInput.addEventListener('input', function(e) {
        if (e.target.value === '') {
            document.querySelectorAll("#logs-table tbody tr").forEach(row => {
                row.style.display = "";
                row.classList.remove('highlight-match');
            });
        }
    });
});

// Toast Notification System
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}


