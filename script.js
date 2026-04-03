// Initialize the map, centered at UBC initially
var map = L.map('map').setView([49.2606, -123.2460], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Study spot data - in a real scenario, this would be loaded from a JSON file
// converted from your Excel spreadsheet.
const studySpots = [
    {
        name: "Koerner Library",
        lat: 49.2676, lng: -123.2530,
        description: "Large academic library with quiet study areas.",
        capacity: "High",
        features: "Wi-Fi, Power Outlets, Printers"
    },
    {
        name: "Irving K. Barber Learning Centre",
        lat: 49.2675, lng: -123.2526,
        description: "Premier learning facility with diverse study spaces.",
        capacity: "Very High",
        features: "Wi-Fi, Power Outlets, Cafe"
    },
    {
        name: "Nest (The AMS Student Nest)",
        lat: 49.2665, lng: -123.2498,
        description: "Vibrant student center with various seating options.",
        capacity: "High",
        features: "Wi-Fi, Food Court, Seating"
    },
    {
        name: "Woodward Library",
        lat: 49.2647, lng: -123.2483,
        description: "Specialized library for health and life sciences.",
        capacity: "Medium",
        features: "Wi-Fi, Quiet Study, Group Rooms"
    },
    {
        name: "Sauder School of Business (Canzar Hall)",
        lat: 49.2655, lng: -123.2537,
        description: "Business-focused study environment with modern facilities.",
        capacity: "Medium",
        features: "Wi-Fi, Power Outlets, Lounge"
    },
    {
        name: "Forest Sciences Centre",
        lat: 49.2604, lng: -123.2485,
        description: "Unique wooden architecture with natural light.",
        capacity: "Medium",
        features: "Wi-Fi, Cafe, Unique Atmosphere"
    },
    {
        name: "Life Sciences Centre",
        lat: 49.2625, lng: -123.2450,
        description: "Modern facility with open study spaces and research focus.",
        capacity: "Medium",
        features: "Wi-Fi, Cafe, Modern Design"
    },
    {
        name: "Buchanan Buildings",
        lat: 49.2687, lng: -123.2548,
        description: "Arts building with various lounge and study areas.",
        capacity: "Medium",
        features: "Wi-Fi, Quiet Areas"
    },
    {
        name: "SUB (Old Student Union Building)",
        lat: 49.2670, lng: -123.2505,
        description: "Historic student building with many nooks for study.",
        capacity: "High",
        features: "Wi-Fi, Varied Seating"
    },
    {
        name: "Great Dane Coffee",
        lat: 49.2681, lng: -123.2492,
        description: "Cozy cafe setting with great coffee and a studious vibe.",
        capacity: "Low",
        features: "Wi-Fi, Great Coffee, Food"
    }
];

let currentPos = { lat: 49.2606, lng: -123.2460 };

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

function showSpotDetails(spot) {
    document.getElementById('sidebar-content').style.display = 'none';
    document.getElementById('spot-detail').style.display = 'flex';

    document.getElementById('detail-name').textContent = spot.name;
    document.getElementById('detail-distance').textContent = `${spot.distance.toFixed(2)} km away`;
    document.getElementById('detail-description').textContent = spot.description || "No description available.";
    document.getElementById('detail-capacity').textContent = spot.capacity || "N/A";
    document.getElementById('detail-features').textContent = spot.features || "N/A";

    map.flyTo([spot.lat, spot.lng], 17);
}

function showMainList() {
    document.getElementById('sidebar-content').style.display = 'block';
    document.getElementById('spot-detail').style.display = 'none';
    map.flyTo([currentPos.lat, currentPos.lng], 15);
}

document.getElementById('back-to-list').addEventListener('click', showMainList);

function updateSpotList(userLat, userLng) {
    const listElement = document.getElementById('spots-list');
    const statusText = document.getElementById('status');
    listElement.innerHTML = '';
    statusText.textContent = "Nearby Study Spots:";

    const sortedSpots = studySpots.map(spot => {
        const dist = calculateDistance(userLat, userLng, spot.lat, spot.lng);
        return { ...spot, distance: dist };
    }).sort((a, b) => a.distance - b.distance);

    const topSpots = sortedSpots.slice(0, 30);

    topSpots.forEach(spot => {
        const marker = L.marker([spot.lat, spot.lng]).addTo(map).bindPopup(spot.name);
        marker.on('click', () => showSpotDetails(spot));

        const li = document.createElement('li');
        li.className = 'spot-item';
        li.innerHTML = `<h3>${spot.name}</h3><p>${(spot.distance).toFixed(2)} km away</p>`;
        li.addEventListener('click', () => showSpotDetails(spot));
        listElement.appendChild(li);
    });
}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            currentPos = { lat: latitude, lng: longitude };
            map.setView([latitude, longitude], 15);
            L.circleMarker([latitude, longitude], {
                radius: 8, fillColor: "#3388ff", color: "#fff", weight: 2, opacity: 1, fillOpacity: 0.8
            }).addTo(map).bindPopup("You are here").openPopup();
            updateSpotList(latitude, longitude);
        },
        () => updateSpotList(currentPos.lat, currentPos.lng),
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
} else {
    updateSpotList(currentPos.lat, currentPos.lng);
}
