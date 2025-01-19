document.addEventListener('DOMContentLoaded', function() {
    // Chart.js setup
    const ctx = document.getElementById('tokenomics-chart').getContext('2d');
    const chart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Dev (2.5%)', 'Marketing (5%)', 'Buyers (12.5%)', 'Pumpfun (80%)'],
        datasets: [{
            label: 'Tokenomics Distribution',
            data: [2.5, 5, 80, 12.5],
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


    // Function to initialize the Jupiter Swap Terminal
    const initJupiter = () => {
        const endpoint = "https://misty-thrilling-scion.solana-mainnet.quiknode.pro/cf8404eb59e4ff88ff2ef1904ea16e8de1de0135/";
        const initialOutputMint = "So11111111111111111111111111111111111111112";


        // Validate necessary parameters
        if (!endpoint || !initialOutputMint) {
            console.error('Invalid parameters for Jupiter initialization');
            hideLoadingOverlay();
            return;
        }


        console.log('Starting Jupiter initialization');


        // Initialize Jupiter Swap Terminal
        window.Jupiter.init({
            displayMode: "integrated",
            integratedTargetId: "integrated-terminal",
            endpoint: endpoint,
            strictTokenList: false,
            defaultExplorer: "Solscan",
            formProps: {
                fixedOutputMint: true,
                swapMode: "ExactIn",
                initialOutputMint: initialOutputMint,
                initialSlippageBps: 5,
            },
        })
        .then(() => {
            console.log('Jupiter Terminal initialized successfully');
            hideLoadingOverlay(); // Hide overlay after successful initialization
        })
        .catch(error => {
            console.error('Error initializing Jupiter Terminal:', error);
            hideLoadingOverlay(); // Hide overlay on error
        });
    };


    // Function to hide the loading overlay
    const hideLoadingOverlay = () => {
        const overlay = document.querySelector('.loading-overlay');
        if (overlay) {
            console.log('Hiding loading overlay');
            overlay.style.display = 'none';
        } else {
            console.log('Loading overlay not found');
        }
    };



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


// Fetch token list
async function fetchTokenList() {
    try {
        const response = await fetch('https://api.jup.ag/v1/tokens');
        const data = await response.json();
        return data.tokens; // Adjust based on actual API response
    } catch (error) {
        console.error('Error fetching token list:', error);
    }
}


// Perform a swap
async function performSwap(fromToken, toToken, amount) {
    try {
        const response = await fetch('https://api.jup.ag/v1/swap', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fromToken,
                toToken,
                amount
            })
        });
        const result = await response.json();
        if (result.success) {
            console.log('Swap successful:', result);
        } else {
            console.error('Swap failed:', result.error);
        }
    } catch (error) {
        console.error('Error performing swap:', error);
    }
}


// Initialize Jupiter and set up WebSocket
console.log('DOM fully loaded and parsed');
initJupiter();
setupWebSocket();

// Fetch tokens and populate dropdowns or other UI elements
document.querySelector('#fetch-tokens-button').addEventListener('click', async () => {
const tokens = await fetchTokenList();
console.log('Available tokens:', tokens);
// Populate dropdowns or other UI elements with tokens here
});


// Perform a swap when needed (e.g., on button click or another event)
document.querySelector('#perform-swap-button').addEventListener('click', async () => {
// Example tokens, replace with actual selected tokens
const fromToken = 'exampleFromTokenAddress';
const toToken = 'exampleToTokenAddress';
const amount = 1; // Amount to swap


await performSwap(fromToken, toToken, amount);
});





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


    // Function to copy Solmail address
    function copySolmailAddress() {
        try {
            // Get the Solmail address text
            var solmailAddressText = document.querySelector('.solmail-address').textContent.trim();
           
            // Create a temporary textarea element to hold the address
            var tempTextarea = document.createElement('textarea');
            tempTextarea.value = solmailAddressText;
            document.body.appendChild(tempTextarea);
           
            // Select and copy the Solmail address text
            tempTextarea.select();
            document.execCommand('copy');
           
            // Remove the temporary textarea element
            document.body.removeChild(tempTextarea);


            // Show confirmation message
            showMessage('confirmation-message', 'Solmail address copied to clipboard!');


        } catch (error) {
            // Show error message
            showMessage('error-message', 'Failed to copy Solmail address. Please try again.');
        }
    }


    // Function to show messages
    function showMessage(messageId, messageText) {
        var messageElement = document.getElementById(messageId);
        messageElement.textContent = messageText;
        messageElement.style.display = 'block';
       
        // Hide the message after 3 seconds
        setTimeout(function() {
            messageElement.style.display = 'none';
        }, 3000);
    }


    // Attach event listeners for copying addresses
    document.querySelector('.ca-container .copy-button').addEventListener('click', copyAddress);
    document.querySelector('.solmail-address').nextElementSibling.addEventListener('click', copySolmailAddress);


    // Fetch tokens and populate dropdowns or other UI elements
    document.querySelector('#fetch-tokens-button').addEventListener('click', async () => {
        const tokens = await fetchTokenList();
        console.log('Available tokens:', tokens);
        // Populate dropdowns or other UI elements with tokens here
    });


    // Perform a swap when needed (e.g., on button click or another event)
    document.querySelector('#perform-swap-button').addEventListener('click', async () => {
        // Example tokens, replace with actual selected tokens
        const fromToken = 'exampleFromTokenAddress';
        const toToken = 'exampleToTokenAddress';
        const amount = 1; // Amount to swap


        await performSwap(fromToken, toToken, amount);
    });


    // Function to adjust scroll position
    function adjustScrollPosition(targetId) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            // Adjust the scroll position to account for the header height
            window.scrollTo({
                top: targetElement.offsetTop - document.querySelector('header').offsetHeight,
                behavior: 'smooth'
            });
        }
    }


    // Attach event listeners to your navigation buttons
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default anchor behavior
            const targetId = this.getAttribute('href').substring(1);
            adjustScrollPosition(targetId);
        });
    });
});







