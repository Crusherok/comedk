document.addEventListener('DOMContentLoaded', function() {
    // Function to generate a random number between min and max
    function getRandomCount(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Example additional places
    const additionalPlaces = [
        {
            name: 'Shri Krishna Temple Udupi',
            description: 'A beautiful place with high crowd count.',
            image: 'images/place-a.webp' // Update with actual image path
        },
        {
            name: 'Malpe Sea Walk',
            description: 'A serene place with low crowd count.',
            image: 'images/place-b.jpg' // Update with actual image path
        },
        {
            name: 'Kapu Beach and Lighthouse',
            description: 'A moderate place with a balanced crowd count.',
            image: 'images/place-c.jpeg' // Update with actual image path
        },
        {
            name: 'Coin Museum CorpBank',
            description: 'A lively place with high crowd count.',
            image: 'images/place-d.jpg' // Update with actual image path
        },
        {
            name: 'Kollur Sri Mookambika Temple',
            description: 'A quiet place with low crowd count.',
            image: 'images/place-e.webp' // Update with actual image path
        },
        {
            name: 'Clifside Waterfall',
            description: 'A popular place with a moderate crowd count.',
            image: 'images/place-f.jpg' // Update with actual image path
        }
    ];

    // Function to generate random crowd status based on crowd count
    function getCrowdStatus(crowdCount) {
        if (crowdCount >= 700) return 'High';
        if (crowdCount >= 400) return 'Moderate';
        return 'Low';
    }

    // Function to create HTML for each additional place
    function createPlaceHTML(place) {
        const crowdCountNumber = getRandomCount(50, 800); // Generate a number up to 800
        const crowdStatus = getCrowdStatus(crowdCountNumber);

        // Determine feedback message based on crowd count number
        let feedbackMessage = crowdCountNumber >= 600
            ? "We recommend you to check out other available destinations."
            : "Enjoy your visit!";
        
        return `
            <div class="available-place-item ${crowdStatus.toLowerCase()}">
                <img src="${place.image}" alt="${place.name}" />
                <h4>${place.name}</h4>
                <p>${place.description}</p>
                <p class="feedback">${feedbackMessage}</p>
            </div>
        `;
    }

    // Populate the more-places section with place data
    const morePlaces = document.getElementById('more-places');
    const morePlacesButton = document.getElementById('more-places-button');
    const placesHTML = additionalPlaces.map(createPlaceHTML).join('');
    morePlaces.querySelector('.available-places-list').innerHTML = placesHTML;

    morePlacesButton.addEventListener('click', function() {
        if (morePlaces.style.display === 'none' || morePlaces.style.display === '') {
            morePlaces.style.display = 'block';
            morePlacesButton.textContent = 'See Less Places';
        } else {
            morePlaces.style.display = 'none';
            morePlacesButton.textContent = 'See More Places';
        }
    });

    // Update tourist counts for popular destinations
    function updateTouristCounts() {
        const destinationItems = document.querySelectorAll('.destination-item');
        destinationItems.forEach(item => {
            const count = getRandomCount(50, 900);
            let feedbackParagraph = item.querySelector('.feedback');
            if (!feedbackParagraph) {
                feedbackParagraph = document.createElement('p');
                feedbackParagraph.className = 'feedback';
                item.appendChild(feedbackParagraph);
            } else {
                feedbackParagraph.textContent = '';
            }
            feedbackParagraph.textContent = `Tourist Count: ${count}`;
            if (count >= 800) {
                feedbackParagraph.className = 'feedback crowded';
                feedbackParagraph.textContent += " (Crowded: Consider other destinations!)";
            } else {
                feedbackParagraph.className = 'feedback available';
                feedbackParagraph.textContent += " (Available: Enjoy your visit!)";
            }
        });
    }

    // Update crowd counts for additional places
    function updateCrowdCounts() {
        const availablePlaceItems = morePlaces.querySelectorAll('.available-place-item');
        availablePlaceItems.forEach(item => {
            const count = getRandomCount(50, 700);
            let feedbackParagraph = item.querySelector('.feedback');
            if (!feedbackParagraph) {
                feedbackParagraph = document.createElement('p');
                feedbackParagraph.className = 'feedback';
                item.appendChild(feedbackParagraph);
            } else {
                feedbackParagraph.textContent = '';
            }
            feedbackParagraph.textContent = `Crowd Count: (${count})`;
            if (count >= 600) {
                feedbackParagraph.className = 'feedback crowded';
                feedbackParagraph.textContent += " (Crowded: Check other destinations!)";
            } else {
                feedbackParagraph.className = 'feedback available';
                feedbackParagraph.textContent += " (Available: Enjoy your visit!)";
            }
        });
    }

    updateTouristCounts();
    setInterval(updateTouristCounts, 10000); // Update popular places every 10 seconds

    updateCrowdCounts();
    setInterval(updateCrowdCounts, 10000); // Update additional places every 10 seconds

    // Refresh button
    const refreshButton = document.createElement('button');
    refreshButton.textContent = 'Refresh Tourist Counts';
    refreshButton.style.position = 'fixed';
    refreshButton.style.bottom = '20px';
    refreshButton.style.right = '20px';
    refreshButton.style.padding = '10px 20px';
    refreshButton.style.backgroundColor = '#ff7f50';
    refreshButton.style.color = '#fff';
    refreshButton.style.border = 'none';
    refreshButton.style.borderRadius = '5px';
    refreshButton.style.cursor = 'pointer';
    refreshButton.addEventListener('click', function() {
        updateTouristCounts();
        updateCrowdCounts();
    });
    document.body.appendChild(refreshButton);

    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    const suggestionsContainer = document.getElementById('suggestions');
    const destinations = [
        'Shri Krishna Temple Udupi',
        'Malpe Sea Walk',
        'Kapu Beach and Lighthouse',
        'Coin Museum CorpBank',
        'Kollur Sri Mookambika Temple',
        'Clifside Waterfall',
        'Chaturmukha Basadi',
        'St. Lawrence Church Attur',
        'Kudlu Falls'
    ];

    // Function to filter suggestions
    function filterSuggestions(query) {
        return destinations.filter(destination => 
            destination.toLowerCase().includes(query.toLowerCase())
        );
    }

    // Function to display suggestions
    function displaySuggestions(suggestions) {
        suggestionsContainer.innerHTML = suggestions.map(suggestion => 
            `<div class="suggestion-item">${suggestion}</div>`
        ).join('');
        suggestionsContainer.style.display = suggestions.length ? 'block' : 'none';
    }

    // Event listener for search input
    searchInput.addEventListener('input', function() {
        const query = searchInput.value;
        if (query) {
            const filteredSuggestions = filterSuggestions(query);
            displaySuggestions(filteredSuggestions);
        } else {
            suggestionsContainer.innerHTML = '';
            suggestionsContainer.style.display = 'none';
        }
    });

    // Hide suggestions when clicking outside
    document.addEventListener('click', function(event) {
        if (!searchInput.contains(event.target) && !suggestionsContainer.contains(event.target)) {
            suggestionsContainer.style.display = 'none';
        }
    });

    // Handle suggestion click
    suggestionsContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('suggestion-item')) {
            searchInput.value = event.target.textContent;
            suggestionsContainer.innerHTML = '';
            suggestionsContainer.style.display = 'none';
        }
    });
    
    // Handle keyboard navigation
    let currentSelectionIndex = -1;

    function selectSuggestion(index) {
        const items = document.querySelectorAll('.suggestion-item');
        items.forEach((item, i) => {
            item.classList.toggle('selected', i === index);
        });
    }

    searchInput.addEventListener('keydown', function(event) {
        const items = document.querySelectorAll('.suggestion-item');
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            currentSelectionIndex = Math.min(currentSelectionIndex + 1, items.length - 1);
            selectSuggestion(currentSelectionIndex);
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            currentSelectionIndex = Math.max(currentSelectionIndex - 1, 0);
            selectSuggestion(currentSelectionIndex);
        } else if (event.key === 'Enter') {
            event.preventDefault();
            if (currentSelectionIndex >= 0) {
                searchInput.value = items[currentSelectionIndex].textContent;
                suggestionsContainer.innerHTML = '';
                suggestionsContainer.style.display = 'none';
                searchAndNavigate(searchInput.value);
            }
        }
    });

    // Function to perform search and navigation
    function searchAndNavigate(query) {
        query = query.toLowerCase();
        const destinations = {
            'chaturmukha basadi': 'chaturmukha-basadi.html',
            'chaturmukha':'chaturmukha-basadi.html',
            'st lawrence church': 'st-lawrence-church.html',
            'church': 'st-lawrence-church.html',
            'kudlu falls': 'kudlu-falls.html',
            'falls': 'kudlu-falls.html',
            'shri krishna temple udupi':'Shri-Krishna-Temple-Udupi.html',
            'shri krishna temple': 'Shri-Krishna-Temple-Udupi.html',
            'malpe sea walk': 'Malpe-Sea-Walk.html',
            'kapu beach and lighthouse':'Kapu-Beach-and-Lighthouse.html',
            'coin museum corpbank':'Coin-Museum-CorpBank.html',
            'coin museum':'Coin-Museum-CorpBank.html',
            'kollur sri mookambika temple':'Kollur-Sri-Mookambika-Temple.html',
            'clifside waterfall':'Clifside-Waterfall.html'
        };

        const destinationPage = destinations[query];
        if (destinationPage) {
            window.location.href = destinationPage;
        } else {
            alert('Destination not found. Please try another search term.');
        }
    }

    // Event listener for the search input
    document.getElementById('search-input').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            let searchQuery = this.value;
            searchAndNavigate(searchQuery);
        }
    });

    // Event listener for the search button
    document.getElementById('search-button').addEventListener('click', function() {
        let searchQuery = document.getElementById('search-input').value;
        searchAndNavigate(searchQuery);
    });
});
