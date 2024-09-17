document.addEventListener("DOMContentLoaded", function() {
    function getRandomTouristCount() {
        return Math.floor(Math.random() * 1000) + 1; // Random number between 1 and 1000
    }

    function updateCrowdStatus(count) {
        const statusElement = document.getElementById('crowdStatus');
        if (statusElement) {
            if (count <= 900) {
                statusElement.textContent = 'Place Available. Enjoy!';
                statusElement.classList.add('available');
                statusElement.classList.remove('not-available');
            } else {
                statusElement.textContent = 'Not Available. check other destinations!.';
                statusElement.classList.add('not-available');
                statusElement.classList.remove('available');
            }
        }
    }

    function updateTouristInfo() {
        const touristCountElement = document.getElementById('touristCount');
        const touristCount = getRandomTouristCount();
        if (touristCountElement) {
            touristCountElement.textContent = `Tourists Currently: ${touristCount}`;
            updateCrowdStatus(touristCount);
        }
    }

    // Initial update
    updateTouristInfo();

    // Update every 10 seconds
    setInterval(updateTouristInfo, 10000); // 10000 milliseconds = 10 seconds
});
