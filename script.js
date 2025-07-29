document.addEventListener('DOMContentLoaded', () => {
    const eventsContainer = document.getElementById('events-container');

    if (eventsContainer) {
        eventsContainer.innerHTML = '<p class="text-xl text-gray-400">Loading upcoming events...</p>';

        // In a real application, replace this with a UFC events API endpoint
        // Example: 'https://api.example.com/ufc/events'
        // For demonstration, we're using JSONPlaceholder posts as mock events.
        fetch('https://jsonplaceholder.typicode.com/posts?_limit=6') // Fetch a few posts as mock events
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(events => {
                eventsContainer.innerHTML = ''; // Clear loading message
                if (events.length === 0) {
                    eventsContainer.innerHTML = '<p class="text-xl text-gray-400">No upcoming events found at this time.</p>';
                    return;
                }

                events.forEach(event => {
                    const eventCard = document.createElement('div');
                    eventCard.className = 'bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1';
                    
                    // Using post title as event title and body as description
                    // Placeholder date and location are added for visual context.
                    eventCard.innerHTML = `
                        <h2 class="text-2xl font-semibold text-red-400 mb-3">${event.title}</h2>
                        <p class="text-gray-300 mb-4">${event.body.substring(0, 100)}...</p>
                        <div class="flex justify-between items-center text-sm text-gray-400">
                            <span>Date: Oct 26, 2023</span> <!-- Mock Date -->
                            <span>Location: Las Vegas</span> <!-- Mock Location -->
                        </div>
                        <a href="#" class="inline-block mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300">View Details</a>
                    `;
                    eventsContainer.appendChild(eventCard);
                });
            })
            .catch(error => {
                console.error('Error fetching events:', error);
                eventsContainer.innerHTML = `<p class="text-xl text-red-500">Failed to load events. Please try again later. (${error.message})</p>`;
            });
    }
});
