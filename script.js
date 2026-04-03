// Initialize the map, centered at UBC initially
var map = L.map('map').setView([49.2606, -123.2460], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Study spot data - in a real scenario, this would be loaded from a JSON file
// converted from your Excel spreadsheet.
const studySpots = [
    { name: "Koerner Library", lat: 49.2676, lng: -123.2530 },
    { name: "Irving K. Barber Learning Centre", lat: 49.2675, lng: -123.2526 },
    { name: "Nest (The AMS Student Nest)", lat: 49.2665, lng: -123.2498 },
    { name: "Woodward Library", lat: 49.2647, lng: -123.2483 },
    { name: "Sauder School of Business (Canzar Hall)", lat: 49.2655, lng: -123.2537 },
    { name: "Forest Sciences Centre", lat: 49.2604, lng: -123.2485 },
    { name: "Life Sciences Centre", lat: 49.2625, lng: -123.2450 },
    { name: "Buchanan Buildings", lat: 49.2687, lng: -123.2548 },
    { name: "SUB (Old Student Union Building)", lat: 49.2670, lng: -123.2505 },
    { name: "Great Dane Coffee", lat: 49.2681, lng: -123.2492 }
];

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

function updateSpotList(userLat, userLng) {
    const listElement = document.getElementById('spots-list');
    const statusText = document.getElementById('status');
    listElement.innerHTML = '';
    statusText.textContent = "Nearby Study Spots:";

    // Clear existing markers (except user location if needed)
    // For now, we'll just add markers to the map

    // Add distance to each spot and sort
    const sortedSpots = studySpots.map(spot => {
        return {
            ...spot,
            distance: calculateDistance(userLat, userLng, spot.lat, spot.lng)
        };
    }).sort((a, b) => a.distance - b.distance);

    // Limit to top 30 nearby spots
    const topSpots = sortedSpots.slice(0, 30);

    topSpots.forEach(spot => {
        // Create marker
        L.marker([spot.lat, spot.lng]).addTo(map)
            .bindPopup(spot.name);

        // Add to sidebar list
        const li = document.createElement('li');
        li.className = 'spot-item';
        li.innerHTML = `
            <h3>${spot.name}</h3>
            <p>${(spot.distance).toFixed(2)} km away</p>
        `;
        listElement.appendChild(li);
    });
}

// Get user location
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            map.setView([latitude, longitude], 15);
            L.circleMarker([latitude, longitude], {
                radius: 8,
                fillColor: "#3388ff",
                color: "#fff",
                weight: 2,
                opacity: 1,
                fillOpacity: 0.8
            }).addTo(map).bindPopup("You are here").openPopup();
            updateSpotList(latitude, longitude);
        },
        (error) => {
            console.error("Geolocation error:", error);
            alert("Geolocation denied or unavailable. Showing UBC campus study spots.");
            updateSpotList(49.2606, -123.2460); // Default to center of UBC
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
} else {
    alert("Your browser doesn't support geolocation. Showing UBC campus study spots.");
    updateSpotList(49.2606, -123.2460); // Default to center of UBC
}
