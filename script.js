// --- CONFIGURATION ---
const WALKING_SPEED_KMH = 5;
const UBC_CENTER = { lat: 49.2606, lng: -123.2460 };

// Initialize Map
var map = L.map('map', {
    zoomControl: false,
    attributionControl: false
}).setView([UBC_CENTER.lat, UBC_CENTER.lng], 15);

// Modern, cleaner map tiles
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    subdomains: 'abcd',
    maxZoom: 20
}).addTo(map);

// Data
const studySpots = [
    { id: 1, lat: 49.2675321, lng: -123.2526827, name: "Art, Arch, & Music Library (IKB)", status: "Pretty Good", busy: "There's some people here", notes: "", description: "A classic study spot with high ceilings and historical charm.", plugs: "y", bookable: "y", private: "yes", microwave: "no", tv: "n", drinks: "", view: "y", couches: "n" },
    { id: 2, lat: 49.265929, lng: -123.2517095, name: "Phys Drop In Centre (HEBB)", status: "Really Good!", busy: "There's some people here", notes: "Clean, fantastic vibes", description: "Bright, modern space perfect for science students.", plugs: "y", bookable: "n", private: "n", microwave: "n", tv: "n", drinks: "n", view: "y", couches: "y" },
    { id: 3, lat: 49.265929, lng: -123.2517095, name: "HEBB (Upper Floor rooms)", status: "Pretty Good", busy: "Usually isolated", notes: "Often closed", description: "Quiet, secluded rooms for deep focus.", plugs: "y", bookable: "y", private: "y", microwave: "n", tv: "n", drinks: "n", view: "n", couches: "n" },
    { id: 4, lat: 49.2675321, lng: -123.2526827, name: "IKB", status: "Not great", busy: "Very popular", notes: "", description: "The heart of campus study, but can get very crowded.", plugs: "y", bookable: "y", private: "n", microwave: "n", tv: "n", drinks: "n", view: "n", couches: "n" },
    { id: 5, lat: 49.2675321, lng: -123.2526827, name: "Ridington Room (IKB)", status: "Really Good!", busy: "There's some people here", notes: "AKA Harry Potter Room.", description: "Stunning historical room with a magical atmosphere.", plugs: "n", bookable: "n", private: "n", microwave: "n", tv: "n", drinks: "n", view: "y", couches: "y" },
    { id: 6, lat: 49.2639988, lng: -123.2559045, name: "Education Classrooms", status: "Really Good!", busy: "Very popular", notes: "Usually packed during peak hours", description: "Spacious classrooms often available for group study.", plugs: "y", bookable: "n", private: "n", microwave: "n", tv: "y", drinks: "n", view: "n", couches: "n" },
    { id: 7, lat: 49.266612, lng: -123.2500257, name: "Nest (Upper Floors)", status: "Not great", busy: "Very popular", notes: "", description: "Social and energetic environment in the student union building.", plugs: "y", bookable: "y", private: "n", microwave: "y", tv: "n", drinks: "n", view: "y", couches: "y" },
    { id: 8, lat: 49.2676248, lng: -123.2501682, name: "LIFE", status: "Okay...", busy: "Very popular", notes: "", description: "Versatile space with plenty of food options nearby.", plugs: "y", bookable: "n", private: "n", microwave: "y", tv: "n", drinks: "n", view: "n", couches: "y" },
    { id: 9, lat: 49.2683012, lng: -123.2550739, name: "Buchanan (Upper Floor)", status: "Pretty Good", busy: "There's some people here", notes: "Good if you need empty classrooms", description: "Traditional academic setting with plenty of natural light.", plugs: "n", bookable: "n", private: "n", microwave: "n", tv: "n", drinks: "n", view: "n", couches: "n" },
    { id: 10, lat: 49.2638663, lng: -123.2533686, name: "Former education library", status: "Really Good!", busy: "There's some people here", notes: "Nice vibes - IKB-like.", description: "A hidden gem with a classic library feel.", plugs: "y", bookable: "n", private: "n", microwave: "n", tv: "n", drinks: "n", view: "n", couches: "y" },
    { id: 11, lat: 49.2664763, lng: -123.2521888, name: "Hennings Building", status: "Pretty Good", busy: "There's some people here", notes: "", description: "Solid study spots within the physics and astronomy building.", plugs: "n", bookable: "n", private: "n", microwave: "n", tv: "n", drinks: "n", view: "n", couches: "n" },
    { id: 12, lat: 49.2664763, lng: -123.2521888, name: "Michael Smith Laboratories", status: "Not great", busy: "Usually isolated", notes: "Very fancy.", description: "Modern and quiet research facility environment.", plugs: "y", bookable: "n", private: "n", microwave: "n", tv: "n", drinks: "n", view: "n", couches: "n" },
    { id: 13, lat: 49.265641, lng: -123.2542739, name: "Networks of Centers of Excellence", status: "Okay...", busy: "Usually isolated", notes: "Hallway tables always empty. Loud machinery.", description: "Industrial vibes with guaranteed seating.", plugs: "y", bookable: "n", private: "n", microwave: "n", tv: "n", drinks: "n", view: "n", couches: "n" },
    { id: 14, lat: 49.2644912, lng: -123.2472591, name: "Woodward Library", status: "Okay...", busy: "There's some people here", notes: "Dead silent, always has seats.", description: "Large library catering to health sciences.", plugs: "y", bookable: "y", private: "n", microwave: "n", tv: "n", drinks: "n", view: "n", couches: "n" },
    { id: 15, lat: 49.2659553, lng: -123.249958, name: "Welcome Centre", status: "Okay...", busy: "Usually isolated", notes: "Lonely cubical", description: "Quiet and professional environment.", plugs: "y", bookable: "n", private: "n", microwave: "n", tv: "n", drinks: "n", view: "n", couches: "n" },
    { id: 16, lat: 49.2620489, lng: -123.2530989, name: "CIRS (Upper Floors)", status: "Pretty Good", busy: "There's some people here", notes: "Kettles and microwaves available", description: "Sustainable and bright building with great common areas.", plugs: "y", bookable: "n", private: "n", microwave: "y", tv: "n", drinks: "y", view: "y", couches: "y" },
    { id: 17, lat: 49.2631082, lng: -123.2520453, name: "Earth Sciences Building (ESB)", status: "Okay...", busy: "There's some people here", notes: "A few seats on L1 and a couch on L2. Two classes on L1 which are hit or miss (sometimes locked)", description: "Modern architecture with science-focused common spaces.", plugs: "y", bookable: "n", private: "n", microwave: "n", tv: "n", drinks: "n", view: "n", couches: "y" },
    { id: 18, lat: 49.2659006, lng: -123.2530777, name: "Chem Resource Centre (CHEM B357)", status: "Not great", busy: "Usually isolated", notes: "Permanently closed. Rotten fr", description: "Currently unavailable for study.", plugs: "n", bookable: "n", private: "n", microwave: "n", tv: "n", drinks: "n", view: "n", couches: "n" },
    { id: 20, lat: 49.2624183, lng: -123.2450666, name: "Life Sciences Center", status: "Really Good!", busy: "There's some people here", notes: "Extremely tall roof. Cafe + food nearby.", description: "Vast, impressive space with a modern aesthetic.", plugs: "y", bookable: "n", private: "n", microwave: "n", tv: "n", drinks: "n", view: "y", couches: "y" },
    { id: 21, lat: 49.2675321, lng: -123.2526827, name: "IKB downstairs", status: "Pretty Good", busy: "Usually isolated", notes: "Good if you need empty classrooms", description: "Often overlooked area with many potential study rooms.", plugs: "y", bookable: "n", private: "n", microwave: "n", tv: "n", drinks: "n", view: "n", couches: "n" },
    { id: 22, lat: 49.2612672, lng: -123.2489313, name: "ICICS / Computer Science (CS) building", status: "Really Good!", busy: "There's some people here", notes: "Many private but frequently booked rooms. Labs are always open and good for locking in (I’ve never been kicked out). Allegedly, cheap chips at downstairs student lounge.", description: "Tech-focused building with many functional spaces.", plugs: "y", bookable: "y", private: "y", microwave: "y", tv: "y", drinks: "n", view: "n", couches: "n" },
    { id: 23, lat: 49.266835, lng: -123.2585761, name: "Asian Library", status: "Really Good!", busy: "Usually isolated", notes: "Second floor ⭐⭐⭐", description: "Incredibly peaceful and architecturally unique library.", plugs: "y", bookable: "n", private: "n", microwave: "n", tv: "n", drinks: "n", view: "y", couches: "y" },
    { id: 24, lat: 49.2697953, lng: -123.2535896, name: "Allard Law Library", status: "Really Good!", busy: "There's some people here", notes: "Lower floor really pretty", description: "Prestigious and beautiful library overlooking the ocean.", plugs: "y", bookable: "y", private: "n", microwave: "n", tv: "n", drinks: "n", view: "y", couches: "y" },
    { id: 25, lat: 49.2655358, lng: -123.2568397, name: "X̱wi7x̱wa (Musqueam) Library", status: "Pretty Good", busy: "Usually isolated", notes: "Cool if you wanna be alone but in a community place", description: "Indigenous library with a warm and intimate feel.", plugs: "y", bookable: "n", private: "n", microwave: "n", tv: "n", drinks: "n", view: "n", couches: "y" },
    { id: 26, lat: 49.2648641, lng: -123.2536411, name: "Sauder (Henry Angus) glass meeting rooms", status: "Really Good!", busy: "There's some people here", notes: "Available in basement, main floor behind lounge, and near L4 lecture hall. All bookable, so you may get kicked out.", description: "Professional meeting rooms for productive sessions.", plugs: "y", bookable: "y", private: "y", microwave: "n", tv: "y", drinks: "n", view: "n", couches: "n" },
    { id: 27, lat: 49.2621606, lng: -123.2492561, name: "Engineering Student Center (ESC) meeting rooms", status: "Not great", busy: "There's some people here", notes: "Couches & tables, but perpetually dirty. More often free than one may guess.", description: "Functional rooms for group engineering projects.", plugs: "y", bookable: "y", private: "y", microwave: "n", tv: "y", drinks: "n", view: "n", couches: "y" },
    { id: 28, lat: 49.2621606, lng: -123.2492561, name: "Engineering Student Center (ESC)", status: "Not great", busy: "Very popular", notes: "Very dirty and loud. Usually some tables open. Upstairs is nicer.", description: "High-energy hub for engineering students.", plugs: "y", bookable: "n", private: "n", microwave: "y", tv: "n", drinks: "n", view: "n", couches: "y" },
    { id: 29, lat: 49.2672584, lng: -123.2579673, name: "CK Choi Meeting Rooms", status: "Really Good!", busy: "Usually isolated", notes: "Great soundproofing, heater present, great acoustics, TV. One on main + upper floors.", description: "Premium meeting spaces with excellent facilities.", plugs: "y", bookable: "y", private: "y", microwave: "n", tv: "y", drinks: "n", view: "y", couches: "n" },
    { id: 30, lat: 49.2677801, lng: -123.2578635, name: "School of Journalism Reading Room", status: "Pretty Good", busy: "Usually isolated", notes: "No tables, but among the coziest public spots on campus.", description: "Intimate reading room for quiet reflection.", plugs: "n", bookable: "n", private: "n", microwave: "n", tv: "n", drinks: "n", view: "n", couches: "y" },
    { id: 31, lat: 49.26781, lng: -123.2588905, name: "Place of Many Trees (International House)", status: "Pretty Good", busy: "Usually isolated", notes: "Wide, open room with glass walls. Not many outlets.", description: "Serene space with floor-to-ceiling windows and nature views.", plugs: "n", bookable: "n", private: "n", microwave: "n", tv: "n", drinks: "n", view: "y", couches: "n" },
    { id: 32, lat: 49.26781, lng: -123.2588905, name: "Common area (International House)", status: "Pretty Good", busy: "Usually isolated", notes: "Free drinks available", description: "Social and welcoming community space.", plugs: "y", bookable: "n", private: "n", microwave: "n", tv: "n", drinks: "y", view: "n", couches: "y" },
    { id: 33, lat: 49.26781, lng: -123.2588905, name: "1st/3rd floor board rooms (International House)", status: "Really Good!", busy: "Usually isolated", notes: "Always available, but near faculty offices. Free drink coffee, hot chocolate, etc on 3rd floor.", description: "High-quality boardrooms for serious study.", plugs: "y", bookable: "y", private: "y", microwave: "n", tv: "y", drinks: "y", view: "y", couches: "n" },
    { id: 34, lat: 49.2634981, lng: -123.2547751, name: "ELI", status: "Really Good!", busy: "Usually isolated", notes: "Many private spaces. At least one room always open.", description: "Quiet and well-maintained educational facility.", plugs: "y", bookable: "n", private: "y", microwave: "n", tv: "n", drinks: "n", view: "n", couches: "n" },
    { id: 36, lat: 49.2672584, lng: -123.2579673, name: "C.K. Choi Large Room", status: "Not great", busy: "There's some people here", notes: "Large lecture hall usually not used", description: "Spacious lecture hall often available for individual work.", plugs: "n", bookable: "n", private: "n", microwave: "n", tv: "n", drinks: "n", view: "n", couches: "n" },
    { id: 37, lat: 49.2646451, lng: -123.2445754, name: "Cafe Ami", status: "Really Good!", busy: "There's some people here", notes: "Cold tables, very welcoming vibe", description: "Charming cafe with a great study atmosphere.", plugs: "y", bookable: "n", private: "n", microwave: "n", tv: "n", drinks: "n", view: "n", couches: "y" },
    { id: 38, lat: 49.2659828, lng: -123.2561747, name: "Geography Building Lounge", status: "Really Good!", busy: "There's some people here", notes: "Couches and tables", description: "Comfortable and friendly student lounge.", plugs: "y", bookable: "n", private: "n", microwave: "n", tv: "n", drinks: "n", view: "n", couches: "y" },
    { id: 39, lat: 49.2659828, lng: -123.2561747, name: "Geography Classrooms", status: "Pretty Good", busy: "There's some people here", notes: "You will sometimes find empty rooms", description: "Quiet academic building with many hidden study spaces.", plugs: "y", bookable: "n", private: "n", microwave: "n", tv: "y", drinks: "n", view: "n", couches: "n" },
    { id: 40, lat: 49.2628291, lng: -123.2543588, name: "Swing building classrooms.", status: "Pretty Good", busy: "There's some people here", notes: "Usually a few empty rooms.", description: "Modern classrooms with reliable facilities.", plugs: "y", bookable: "n", private: "n", microwave: "n", tv: "y", drinks: "n", view: "n", couches: "n" },
    { id: 41, lat: 49.2643369, lng: -123.2550329, name: "School of Social Work", status: "Really Good!", busy: "Usually isolated", notes: "Rooms are bookable WITHOUT 24h notice.", description: "Friendly and modern facility with great booking flexibility.", plugs: "y", bookable: "y", private: "y", microwave: "n", tv: "n", drinks: "n", view: "n", couches: "n" },
    { id: 42, lat: 49.2637295, lng: -123.2549759, name: "Mercante area", status: "Okay...", busy: "Very popular", notes: "Some private rooms, but always full", description: "Lively cafe area with some secluded spots.", plugs: "y", bookable: "n", private: "y", microwave: "n", tv: "n", drinks: "n", view: "n", couches: "y" },
    { id: 43, lat: 49.2648641, lng: -123.2536411, name: "Sauder (Henry Angus) lounge", status: "Pretty Good", busy: "There's some people here", notes: "2 private rooms, but public area always has space. Decently quite.", description: "Business-focused study lounge with modern furniture.", plugs: "y", bookable: "n", private: "y", microwave: "n", tv: "n", drinks: "n", view: "n", couches: "y" },
    { id: 44, lat: 49.2657716, lng: -123.2546239, name: "David Lam (DLAM) labs", status: "Pretty Good", busy: "There's some people here", notes: "Usually some people in there, but very quite. Technically not public.", description: "Quiet and professional computer labs.", plugs: "y", bookable: "n", private: "n", microwave: "n", tv: "n", drinks: "n", view: "n", couches: "n" },
    { id: 45, lat: 49.2630507, lng: -123.2518412, name: "Earth, Ocean, and Atmospheric Sciences (EOAS)", status: "Okay...", busy: "Usually isolated", notes: "You are bound to find empty classrooms, but they are very old, cold, and rocky.", description: "Academic and quiet, if a bit rustic.", plugs: "y", bookable: "n", private: "n", microwave: "n", tv: "n", drinks: "n", view: "n", couches: "n" },
    { id: 46, lat: 49.2611383, lng: -123.2502743, name: "MacMillan", status: "Pretty Good", busy: "There's some people here", notes: "Lots of classrooms, less used than usual. Good views, old vibes. Public areas too!", description: "Historic building with many charming study corners.", plugs: "n", bookable: "n", private: "n", microwave: "n", tv: "n", drinks: "n", view: "y", couches: "y" },
    { id: 47, lat: 49.2600602, lng: -123.2509365, name: "Orchard classrooms", status: "Pretty Good", busy: "There's some people here", notes: "Lots of classrooms, plenty of space. Student-homey vibes.", description: "Modern, comfortable classrooms within a student residence area.", plugs: "y", bookable: "n", private: "n", microwave: "n", tv: "y", drinks: "n", view: "n", couches: "n" },
    { id: 48, lat: 49.2606379, lng: -123.2534654, name: "University Services Building (USB)", status: "Not great", busy: "There's some people here", notes: "No rooms, only a few one-person couches and tables.", description: "Functional space for a quick study session.", plugs: "y", bookable: "n", private: "n", microwave: "n", tv: "n", drinks: "n", view: "n", couches: "y" },
    { id: 49, lat: 49.2590064, lng: -123.248435, name: "Old Barn Community Center", status: "Really Good!", busy: "There's some people here", notes: "A few public tables that usually have space. Couches that are usually empty. Children frequent this space.", description: "Cozy community center with a cafe and warm atmosphere.", plugs: "y", bookable: "n", private: "n", microwave: "n", tv: "n", drinks: "n", view: "n", couches: "y" }
];

// --- STATE ---
let currentPos = { lat: UBC_CENTER.lat, lng: UBC_CENTER.lng };
let userMarker = null;
let routeLine = null;

// --- UTILS ---
function getDist(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

function getStatusTheme(status) {
    const s = status.toLowerCase();
    if (s.includes("really good")) return { bg: "#0a53a8", text: "white" };
    if (s.includes("pretty good")) return { bg: "#bfe1f6", text: "#002145" };
    if (s.includes("ok") || s.includes("okay")) return { bg: "#bba897", text: "white" };
    if (s.includes("not great")) return { bg: "#000000", text: "white" };
    return { bg: "#ffae00", text: "white" };
}

function getBusyTheme(busy) {
    const b = busy.toLowerCase();
    if (b.includes("isolated")) return { bg: "#5a3286", text: "white" };
    if (b.includes("some people")) return { bg: "#d4edbc", text: "#2d5a27" };
    return { bg: "#b10202", text: "white" };
}

// --- UI COMPONENTS ---
function renderBadge(label, theme) {
    return `<span class="badge" style="background:${theme.bg}; color:${theme.text}">${label}</span>`;
}

function renderFeatureRow(item, isBonus = false) {
    const val = String(item.value).toLowerCase();
    const isYes = val === 'y' || val === 'yes';
    const isNo = val === 'n' || val === 'no';

    if (!isYes && !isNo && !isBonus) return '';
    if (isBonus && !isYes) return '';

    return `
        <div class="feature-row">
            <img src="Images/${item.icon}" class="feature-icon ${isYes ? 'icon-yes' : 'icon-no'}" alt="">
            <span class="feature-text ${isNo ? 'text-no' : ''}">${item.label}</span>
        </div>
    `;
}

// --- MAP ACTIONS ---
function drawPath(target) {
    if (routeLine) map.removeLayer(routeLine);
    routeLine = L.polyline([[currentPos.lat, currentPos.lng], [target.lat, target.lng]], {
        color: '#3388ff',
        weight: 3,
        opacity: 0.6,
        dashArray: '8, 12'
    }).addTo(map);
}

// --- APP LOGIC ---
function openSpot(spot) {
    const detail = document.getElementById('spot-detail');
    detail.style.display = 'flex';

    document.getElementById('detail-name').textContent = spot.name;
    document.getElementById('detail-description').textContent = spot.description;
    document.getElementById('detail-notes').textContent = spot.notes;
    document.getElementById('distance-text').textContent = `${spot.distance.toFixed(2)} km`;
    document.getElementById('walk-text').textContent = `${(spot.distance / WALKING_SPEED_KMH * 60).toFixed(0)} mins walk`;

    const metrics = document.getElementById('detail-metrics');
    metrics.innerHTML = renderBadge(spot.status, getStatusTheme(spot.status)) +
                        renderBadge(spot.busy, getBusyTheme(spot.busy));

    const list = document.getElementById('detail-list');
    list.innerHTML = [
        { label: 'Plug Availability', value: spot.plugs, icon: 'plug.png' },
        { label: 'Bookable Space', value: spot.bookable, icon: 'schedule.png' },
        { label: 'Private Area', value: spot.private, icon: 'private.png' },
        { label: 'Microwave', value: spot.microwave, icon: 'microwave.png' },
        { label: 'Projector/TV', value: spot.tv, icon: 'tv.png' }
    ].map(f => renderFeatureRow(f)).join('') +
    [
        { label: 'Free Drinks', value: spot.drinks, icon: 'drinks.png' },
        { label: 'Good View', value: spot.view, icon: 'view.png' },
        { label: 'Couches', value: spot.couches, icon: 'couch.png' }
    ].map(b => renderFeatureRow(b, true)).join('');

    map.flyTo([spot.lat, spot.lng], 17, { duration: 1.5 });
    drawPath(spot);
}

function updateList(lat, lng) {
    const container = document.getElementById('spots-list');
    container.innerHTML = '';

    const sorted = studySpots.map(s => ({
        ...s,
        distance: getDist(lat, lng, s.lat, s.lng)
    })).sort((a, b) => a.distance - b.distance);

    sorted.forEach(spot => {
        const card = document.createElement('li');
        card.className = 'spot-card';
        card.innerHTML = `
            <h3>${spot.name}</h3>
            <span class="distance">📍 ${spot.distance.toFixed(2)} km away</span>
            <div class="badge-row">
                ${renderBadge(spot.status, getStatusTheme(spot.status))}
                ${renderBadge(spot.busy, getBusyTheme(spot.busy))}
            </div>
        `;

        card.onclick = () => openSpot(spot);
        card.onmouseenter = () => drawPath(spot);
        card.onmouseleave = () => {
            if (document.getElementById('spot-detail').style.display !== 'flex') {
                if (routeLine) map.removeLayer(routeLine);
            }
        };

        container.appendChild(card);

        // Add Marker
        L.marker([spot.lat, spot.lng]).addTo(map)
            .on('click', () => openSpot(spot));
    });

    document.getElementById('status').textContent = `${sorted.length} spots found near you`;
}

// --- INIT ---
document.getElementById('back-to-list').onclick = () => {
    document.getElementById('spot-detail').style.display = 'none';
    if (routeLine) map.removeLayer(routeLine);
    map.flyTo([currentPos.lat, currentPos.lng], 15);
};

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
        const { latitude: lat, longitude: lng } = pos.coords;
        currentPos = { lat, lng };

        map.setView([lat, lng], 15);
        userMarker = L.circleMarker([lat, lng], {
            radius: 10,
            fillColor: '#3388ff',
            color: 'white',
            weight: 3,
            fillOpacity: 1
        }).addTo(map);

        updateList(lat, lng);
    }, () => updateList(UBC_CENTER.lat, UBC_CENTER.lng));
} else {
    updateList(UBC_CENTER.lat, UBC_CENTER.lng);
}
