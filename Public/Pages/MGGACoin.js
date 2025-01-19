document.addEventListener('DOMContentLoaded', function() {
    // Chart.js setup
    const ctx = document.getElementById('tokenomics-chart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Dev (2.5%)', 'Marketing (4%)', 'Community bought (18.5%)', 'Unbought Supply (75%)'],
            datasets: [{
                label: 'Tokenomics Distribution',
                data: [2.5, 4, 18.5, 75],
                backgroundColor: [
                    '#5973FE',  // Dark blue
                    '#00BFFF',  // blue
                    '#FFD700',  // golden 
                    '#14F195',  // Green
                ],
                borderColor: '#fff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: '#fff', // Change this to your preferred text color
                        font: {
                            size: 14, // Font size for the legend text
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return `${tooltipItem.label}: ${tooltipItem.raw}%`;
                        }
                    }
                }
            }
        }
    });

    function adjustScrollPosition(targetId) {
        const header = document.querySelector('header');  // Get the header
        const headerHeight = header.offsetHeight;  // Get the height of the sticky header
        const targetElement = document.getElementById(targetId);  // Get the target section

        if (!targetElement) {
            console.log(`Target element with ID ${targetId} not found!`);
            return; // If the target element doesn't exist, exit early
        }

        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;  // Get position of target section

        console.log(`Header height: ${headerHeight}, Target position: ${targetPosition}`);

        // Scroll to the target position, accounting for the sticky header
        window.scrollTo({
            top: targetPosition - headerHeight,  // Adjust the scroll position to account for header height
            behavior: 'smooth'  // Smooth scroll effect
        });
    }

    // Function to copy CA address
    function copyAddress() {
        try {
            // Get the address text
            var addressText = document.querySelector('.ca-address').textContent.trim();
            
            // Create a temporary textarea element to hold the address
            var tempTextarea = document.createElement('textarea');
            tempTextarea.value = addressText;
            document.body.appendChild(tempTextarea);
            
            // Select and copy the address text
            tempTextarea.select();
            document.execCommand('copy');
            
            // Remove the temporary textarea element
            document.body.removeChild(tempTextarea);

            // Show confirmation message
            showMessage('confirmation-message', 'Address copied to clipboard!');
        } catch (error) {
            // Show error message
            showMessage('error-message', 'Failed to copy address. Please try again.');
        }
    }

    // Function to show messages (confirmation or error)
    function showMessage(messageClass, messageText) {
        var messageElement = document.createElement('div');
        messageElement.className = messageClass;
        messageElement.textContent = messageText;
        document.body.appendChild(messageElement);
        
        // Automatically remove the message after 3 seconds
        setTimeout(function() {
            document.body.removeChild(messageElement);
        }, 3000);
    }

    // Function to set up WebSocket connection for monitoring
    const setupWebSocket = () => {
        const ws = new WebSocket('wss://multichain-socket.birdeye.so/solana/socket');

        ws.onopen = () => {
            console.log('WebSocket connection established');
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };
    };

    // Call the WebSocket setup function
    setupWebSocket();
});
