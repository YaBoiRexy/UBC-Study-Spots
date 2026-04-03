// Initialize the map, centered at UBC initially
var map = L.map('map').setView([49.2606, -123.2460], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Study spot data extracted from CSV
const studySpots = [
    { id: 1, lat: 49.2675321, lng: -123.2526827, name: "Art, Arch, & Music Library (IKB)", status: "Pretty Good", busy: "There's some people here", notes: "", description: "", plugs: "y", bookable: "y", private: "yes", microwave: "no", tv: "n", drinks: "", view: "y", couches: "n" },
    { id: 2, lat: 49.265929, lng: -123.2517095, name: "Phys Drop In Centre (HEBB)", status: "Really Good!", busy: "There's some people here", notes: "Clean, fantastic vibes", description: "", plugs: "", bookable: "", private: "", microwave: "", tv: "", drinks: "", view: "", couches: "" },
    { id: 3, lat: 49.265929, lng: -123.2517095, name: "HEBB (Upper Floor rooms)", status: "Pretty Good", busy: "Usually isolated", notes: "Often closed", description: "", plugs: "", bookable: "", private: "", microwave: "", tv: "", drinks: "", view: "", couches: "" },
    { id: 4, lat: 49.2675321, lng: -123.2526827, name: "IKB", status: "Not great", busy: "Very popular", notes: "", description: "", plugs: "", bookable: "", private: "", microwave: "", tv: "", drinks: "", view: "", couches: "" },
    { id: 5, lat: 49.2675321, lng: -123.2526827, name: "Ridington Room (IKB)", status: "Really Good!", busy: "There's some people here", notes: "AKA Harry Potter Room.", description: "", plugs: "", bookable: "", private: "", microwave: "", tv: "", drinks: "", view: "", couches: "" },
    { id: 6, lat: 49.2639988, lng: -123.2559045, name: "Education Classrooms", status: "Really Good!", busy: "Very popular", notes: "Usually packed during peak hours", description: "", plugs: "", bookable: "", private: "", microwave: "", tv: "", drinks: "", view: "", couches: "" },
    { id: 7, lat: 49.266612, lng: -123.2500257, name: "Nest (Upper Floors)", status: "Not great", busy: "Very popular", notes: "", description: "", plugs: "", bookable: "", private: "", microwave: "", tv: "", drinks: "", view: "", couches: "" },
    { id: 8, lat: 49.2676248, lng: -123.2501682, name: "LIFE", status: "Okay...", busy: "Very popular", notes: "", description: "", plugs: "", bookable: "", private: "", microwave: "", tv: "", drinks: "", view: "", couches: "" },
    { id: 9, lat: 49.2683012, lng: -123.2550739, name: "Buchanan (Upper Floor)", status: "Pretty Good", busy: "There's some people here", notes: "Good if you need empty classrooms", description: "", plugs: "", bookable: "", private: "", microwave: "", tv: "", drinks: "", view: "", couches: "" },
    { id: 10, lat: 49.2638663, lng: -123.2533686, name: "Former education library", status: "Really Good!", busy: "There's some people here", notes: "Nice vibes - IKB-like.", description: "", plugs: "", bookable: "", private: "", microwave: "", tv: "", drinks: "", view: "", couches: "" },
    { id: 11, lat: 49.2664763, lng: -123.2521888, name: "Hennings Building", status: "Pretty Good", busy: "There's some people here", notes: "", description: "", plugs: "", bookable: "", private: "", microwave: "", tv: "", drinks: "", view: "", couches: "" },
    { id: 12, lat: 49.2664763, lng: -123.2521888, name: "Michael Smith Laboratories", status: "Not great", busy: "Usually isolated", notes: "Very fancy.", description: "", plugs: "", bookable: "", private: "", microwave: "", tv: "", drinks: "", view: "", couches: "" },
    { id: 13, lat: 49.265641, lng: -123.2542739, name: "Networks of Centers of Excellence", status: "Okay...", busy: "Usually isolated", notes: "Hallway tables always empty. Loud machinery.", description: "", plugs: "", bookable: "", private: "", microwave: "", tv: "", drinks: "", view: "", couches: "" },
    { id: 14, lat: 49.2644912, lng: -123.2472591, name: "Woodward Library", status: "Okay...", busy: "There's some people here", notes: "Dead silent, always has seats.", description: "", plugs: "", bookable: "", private: "", microwave: "", tv: "", drinks: "", view: "", couches: "" },
    { id: 15, lat: 49.2659553, lng: -123.249958, name: "Welcome Centre", status: "Okay...", busy: "Usually isolated", notes: "Lonely cubical", description: "", plugs: "", bookable: "", private: "", microwave: "", tv: "", drinks: "", view: "", couches: "" },
    { id: 16, lat: 49.2620489, lng: -123.2530989, name: "CIRS (Upper Floors)", status: "Pretty Good", busy: "There's some people here", notes: "Kettles and microwaves available", description: "", plugs: "", bookable: "", private: "", microwave: "", tv: "", drinks: "", view: "", couches: "" },
    { id: 17, lat: 49.2631082, lng: -123.2520453, name: "Earth Sciences Building (ESB)", status: "Okay...", busy: "There's some people here", notes: "A few seats on L1 and a couch on L2. Two classes on L1 which are hit or miss (sometimes locked)", description: "", plugs: "", bookable: "", private: "", microwave: "", tv: "", drinks: "", view: "", couches: "" },
    { id: 18, lat: 49.2659006, lng: -123.2530777, name: "Chem Resource Centre (CHEM B357)", status: "Not great", busy: "Usually isolated", notes: "Permanently closed. Rotten fr", description: "", plugs: "", bookable: "", private: "", microwave: "", tv: "", drinks: "", view: "", couches: "" },
    { id: 20, lat: 49.2624183, lng: -123.2450666, name: "Life Sciences Center", status: "Really Good!", busy: "There's some people here", notes: "Extremely tall roof. Cafe + food nearby.", description: "", plugs: "", bookable: "", private: "", microwave: "", tv: "", drinks: "", view: "", couches: "" },
    { id: 21, lat: 49.2675321, lng: -123.2526827, name: "IKB downstairs", status: "Pretty Good", busy: "Usually isolated", notes: "Good if you need empty classrooms", description: "", plugs: "", bookable: "", private: "", microwave: "", tv: "", drinks: "", view: "", couches: "" },
    { id: 22, lat: 49.2612672, lng: -123.2489313, name: "ICICS / Computer Science (CS) building", status: "Really Good!", busy: "There's some people here", notes: "Many private but frequently booked rooms. Labs are always open and good for locking in (I’ve never been kicked out). Allegedly, cheap chips at downstairs student lounge.", description: "", plugs: "", bookable: "", private: "", microwave: "", tv: "", drinks: "", view: "", couches: "" },
    { id: 23, lat: 49.266835, lng: -123.2585761, name: "Asian Library", status: "Really Good!", busy: "Usually isolated", notes: "Second floor ⭐⭐⭐", description: "", plugs: "", bookable: "", private: "", microwave: "", tv: "", drinks: "", view: "", couches: "" },
    { id: 24, lat: 49.2697953, lng: -123.2535896, name: "Allard Law Library", status: "Really Good!", busy: "There's some people here", notes: "Lower floor really pretty", description: "", plugs: "", bookable: "", private: "", microwave: "", tv: "", drinks: "", view: "", couches: "" },
    { id: 25, lat: 49.2655358, lng: -123.2568397, name: "X̱wi7x̱wa (Musqueam) Library", status: "Pretty Good", busy: "Usually isolated", notes: "Cool if you wanna be alone but in a community place", description: "", plugs: "", bookable: "", private: "", microwave: "", tv: "", drinks: "", view: "", couches: "" },
    { id: 26, lat: 49.2648641, lng: -123.2536411, name: "Sauder (Henry Angus) glass meeting rooms", status: "Really Good!", busy: "There's some people here", notes: "Available in basement, main floor behind lounge, and near L4 lecture hall. All bookable, so you may get kicked out.", description: "", plugs: "", bookable: "", private: "", microwave: "", tv: "", drinks: "", view: "", couches: "" },
    { id: 27, lat: 49.2621606, lng: -123.2492561, name: "Engineering Student Center (ESC) meeting rooms", status: "Not great", busy: "There's some people here", notes: "Couches & tables, but perpetually dirty. More often free than one may guess.", description: "", plugs: "", bookable: "", private: "", microwave: "", tv: "", drinks: "", view: "", couches: "" },
    { id: 28, lat: 49.2621606, lng: -123.2492561, name: "Engineering Student Center (ESC)", status: "Not great", busy: "Very popular", notes: "Very dirty and loud. Usually some tables open. Upstairs is nicer.", description: "", plugs: "", bookable: "", private: "", microwave: "", tv: "", drinks: "", view: "", couches: "" },
    { id: 29, lat: 49.2672584, lng: -123.2579673, name: "CK Choi Meeting Rooms", status: "Really Good!", busy: "Usually isolated", notes: "Great soundproofing, heater present, great acoustics, TV. One on main + upper floors.", description: "", plugs: "", bookable: "", private: "", microwave: "", tv: "", drinks: "", view: "", couches: "" },
    { id: 30, lat: 49.2677801, lng: -123.2578635, name: "School of Journalism Reading Room", status: "Pretty Good", busy: "Usually isolated", notes: "No tables, but among the coziest public spots on campus.", description: "", plugs: "", bookable: "", private: "", microwave: "", tv: "", drinks: "", view: "", couches: "" },
    { id: 31, lat: 49.26781, lng: -123.2588905, name: "Place of Many Trees (International House)", status: "Pretty Good", busy: "Usually isolated", notes: "Wide, open room with glass walls. Not many outlets.", description: "", plugs: "", bookable: "", private: "", microwave: "", tv: "", drinks: "", view: "", couches: "" },
    { id: 32, lat: 49.26781, lng: -123.2588905, name: "Common area (International House)", status: "Pretty Good", busy: "Usually isolated", notes: "Free drinks available", description: "", plugs: "", bookable: "", private: "", microwave: "", tv: "", drinks: "", view: "", couches: "" },
    { id: 33, lat: 49.26781, lng: -123.2588905, name: "1st/3rd floor board rooms (International House)", status: "Really Good!", busy: "Usually isolated", notes: "Always available, but near faculty offices. Free drink coffee, hot chocolate, etc on 3rd floor.", description: "", plugs: "", bookable: "", private: "", microwave: "", tv: "", drinks: "", view: "", couches: "" },
    { id: 34, lat: 49.2634981, lng: -123.2547751, name: "ELI", status: "Really Good!", busy: "Usually isolated", notes: "Many private spaces. At least one room always open.", description: "", plugs: "", bookable: "", private: "", microwave: "", tv: "", drinks: "", view: "", couches: "" },
    { id: 36, lat: 49.2672584, lng: -123.2579673, name: "C.K. Choi Large Room", status: "Not great", busy: "There's some people here", notes: "Large lecture hall usually not used", description: "", plugs: "", bookable: "", private: "", microwave: "", tv: "", drinks: "", view: "", couches: "" },
    { id: 37, lat: 49.2646451, lng: -123.2445754, name: "Cafe Ami", status: "Really Good!", busy: "There's some people here", notes: "Cold tables, very welcoming vibe", description: "", plugs: "", bookable: "", private: "", microwave: "", tv: "", drinks: "", view: "", couches: "" },
    { id: 38, lat: 49.2659828, lng: -123.2561747, name: "Geography Building Lounge", status: "Really Good!", busy: "There's some people here", notes: "Couches and tables", description: "", plugs: "", bookable: "", private: "", microwave: "", tv: "", drinks: "", view: "", couches: "" },
    { id: 39, lat: 49.2659828, lng: -123.2561747, name: "Geography Classrooms", status: "Pretty Good", busy: "There's some people here", notes: "You will sometimes find empty rooms", description: "", plugs: "", bookable: "", private: "", microwave: "", tv: "", drinks: "", view: "", couches: "" },
    { id: 40, lat: 49.2628291, lng: -123.2543588, name: "Swing building classrooms.", status: "Pretty Good", busy: "There's some people here", notes: "Usually a few empty rooms.", description: "", plugs: "", bookable: "", private: "", microwave: "", tv: "", drinks: "", view: "", couches: "" },
    { id: 41, lat: 49.2643369, lng: -123.2550329, name: "School of Social Work", status: "Really Good!", busy: "Usually isolated", notes: "Rooms are bookable WITHOUT 24h notice.", description: "", plugs: "", bookable: "", private: "", microwave: "", tv: "", drinks: "", view: "", couches: "" },
    { id: 42, lat: 49.2637295, lng: -123.2549759, name: "Mercante area", status: "Okay...", busy: "Very popular", notes: "Some private rooms, but always full", description: "", plugs: "", bookable: "", private: "", microwave: "", tv: "", drinks: "", view: "", couches: "" },
    { id: 43, lat: 49.2648641, lng: -123.2536411, name: "Sauder (Henry Angus) lounge", status: "Pretty Good", busy: "There's some people here", notes: "2 private rooms, but public area always has space. Decently quite.", description: "", plugs: "", bookable: "", private: "", microwave: "", tv: "", drinks: "", view: "", couches: "" },
    { id: 44, lat: 49.2657716, lng: -123.2546239, name: "David Lam (DLAM) labs", status: "Pretty Good", busy: "There's some people here", notes: "Usually some people in there, but very quite. Technically not public.", description: "", plugs: "", bookable: "", private: "", microwave: "", tv: "", drinks: "", view: "", couches: "" },
    { id: 45, lat: 49.2630507, lng: -123.2518412, name: "Earth, Ocean, and Atmospheric Sciences (EOAS)", status: "Okay...", busy: "Usually isolated", notes: "You are bound to find empty classrooms, but they are very old, cold, and rocky.", description: "", plugs: "", bookable: "", private: "", microwave: "", tv: "", drinks: "", view: "", couches: "" },
    { id: 46, lat: 49.2611383, lng: -123.2502743, name: "MacMillan", status: "Pretty Good", busy: "There's some people here", notes: "Lots of classrooms, less used than usual. Good views, old vibes. Public areas too!", description: "", plugs: "", bookable: "", private: "", microwave: "", tv: "", drinks: "", view: "", couches: "" },
    { id: 47, lat: 49.2600602, lng: -123.2509365, name: "Orchard classrooms", status: "Pretty Good", busy: "There's some people here", notes: "Lots of classrooms, plenty of space. Student-homey vibes.", description: "", plugs: "", bookable: "", private: "", microwave: "", tv: "", drinks: "", view: "", couches: "" },
    { id: 48, lat: 49.2606379, lng: -123.2534654, name: "University Services Building (USB)", status: "Not great", busy: "There's some people here", notes: "No rooms, only a few one-person couches and tables.", description: "", plugs: "", bookable: "", private: "", microwave: "", tv: "", drinks: "", view: "", couches: "" },
    { id: 49, lat: 49.2590064, lng: -123.248435, name: "Old Barn Community Center", status: "Really Good!", busy: "There's some people here", notes: "A few public tables that usually have space. Couches that are usually empty. Children frequent this space.", description: "", plugs: "", bookable: "", private: "", microwave: "", tv: "", drinks: "", view: "", couches: "" }
];

let currentPos = { lat: 49.2606, lng: -123.2460 };

function getStatusColor(status) {
    status = status.toLowerCase();
    if (status.includes("really good")) return "#0a53a8";
    if (status.includes("pretty good")) return "#bfe1f6";
    if (status.includes("ok") || status.includes("okay")) return "#bba897";
    if (status.includes("not great")) return "#000000";
    if (status.includes("not visited")) return "#ffae00";
    return "#555";
}

function getBusyColor(busy) {
    busy = busy.toLowerCase();
    if (busy.includes("usually isolated")) return "#5a3286";
    if (busy.includes("some people")) return "#d4edbc";
    if (busy.includes("very popular")) return "#b10202";
    return "#555";
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
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

    const statusEl = document.getElementById('detail-status');
    statusEl.textContent = spot.status;
    statusEl.style.color = getStatusColor(spot.status);

    const busyEl = document.getElementById('detail-busy');
    busyEl.textContent = spot.busy;
    busyEl.style.color = getBusyColor(spot.busy);

    document.getElementById('detail-description').textContent = spot.description || "No description provided.";
    document.getElementById('detail-notes').textContent = spot.notes || "";

    // Icons logic (simplified for now as text/colored labels)
    const featuresList = document.getElementById('detail-features');
    featuresList.innerHTML = '';

    const featureMap = [
        { key: 'plugs', label: 'Plug', icon: '🔌' },
        { key: 'bookable', label: 'Bookable', icon: '📅' },
        { key: 'private', label: 'Private', icon: '🔒' },
        { key: 'microwave', label: 'Microwave', icon: '🍱' },
        { key: 'tv', label: 'TV', icon: '📺' }
    ];

    featureMap.forEach(f => {
        const val = spot[f.key] ? spot[f.key].toLowerCase() : '';
        if (val === 'y' || val === 'yes') {
            featuresList.innerHTML += `<span class="feature-tag yes">${f.icon} ${f.label}</span>`;
        } else if (val === 'n' || val === 'no') {
            featuresList.innerHTML += `<span class="feature-tag no">${f.icon} ${f.label}</span>`;
        }
    });

    const bonusesList = document.getElementById('detail-bonuses');
    bonusesList.innerHTML = '';
    const bonusMap = [
        { key: 'drinks', label: 'Free Drinks', icon: '☕' },
        { key: 'view', label: 'Good View', icon: '🖼️' },
        { key: 'couches', label: 'Couches', icon: '🛋️' }
    ];

    bonusMap.forEach(b => {
        const val = spot[b.key] ? spot[b.key].toLowerCase() : '';
        if (val === 'y' || val === 'yes') {
            bonusesList.innerHTML += `<span class="feature-tag bonus">${b.icon} ${b.label}</span>`;
        }
    });

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
        return { ...spot, distance: calculateDistance(userLat, userLng, spot.lat, spot.lng) };
    }).sort((a, b) => a.distance - b.distance);

    sortedSpots.forEach(spot => {
        const marker = L.marker([spot.lat, spot.lng]).addTo(map).bindPopup(spot.name);
        marker.on('click', () => showSpotDetails(spot));

        const li = document.createElement('li');
        li.className = 'spot-item';
        li.innerHTML = `
            <h3>${spot.name}</h3>
            <p>${(spot.distance).toFixed(2)} km away</p>
            <div class="spot-summary">
                <span style="color: ${getStatusColor(spot.status)}">●</span> ${spot.status} |
                <span style="color: ${getBusyColor(spot.busy)}">●</span> ${spot.busy}
            </div>
        `;
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
