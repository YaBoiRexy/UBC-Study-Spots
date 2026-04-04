// --- CONFIGURATION ---
const WALKING_SPEED_KMH = 5;
const UBC_CENTER = { lat: 49.2606, lng: -123.2460 };

// Initialize Map
var map = L.map('map', {
    zoomControl: false,
    attributionControl: false
}).setView([UBC_CENTER.lat, UBC_CENTER.lng], 15);

L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    subdomains: 'abcd',
    maxZoom: 20
}).addTo(map);

// Full Study Spot Data (67 entries strictly from CSV)
const studySpots = [
    { id: 1, lat: 49.2675321, lng: -123.2526827, name: "Art, Arch, & Music Library (IKB)", status: "Pretty Good", busy: "There's some people here", notes: "", description: "", plugs: "y", bookable: "n", private: "n", microwave: "n", tv: "n", drinks: "n", view: "y", couches: "n", bridge: "", cheapfood: "", tourist: "" },
    { id: 2, lat: 49.265929, lng: -123.2517095, name: "Phys Drop In Centre (HEBB)", status: "Really Good!", busy: "There's some people here", notes: "Clean, fantastic vibes", description: "", plugs: "y", bookable: "n", private: "n", microwave: "n", tv: "n", drinks: "n", view: "n", couches: "n", bridge: "", cheapfood: "", tourist: "" },
    { id: 3, lat: 49.265929, lng: -123.2517095, name: "HEBB (Upper Floor rooms)", status: "Pretty Good", busy: "Usually isolated", notes: "Often closed", description: "", plugs: "y", bookable: "n", private: "y", microwave: "n", tv: "y", drinks: "n", view: "n", couches: "n", bridge: "", cheapfood: "", tourist: "" },
    { id: 4, lat: 49.2675321, lng: -123.2526827, name: "IKB", status: "Not great", busy: "Very popular", notes: "", description: "", plugs: "y", bookable: "n", private: "n", microwave: "n", tv: "n", drinks: "n", view: "y", couches: "n", bridge: "", cheapfood: "", tourist: "" },
    { id: 5, lat: 49.2675321, lng: -123.2526827, name: "Ridington Room (IKB)", status: "Really Good!", busy: "There's some people here", notes: "AKA Harry Potter Room.", description: "", plugs: "y", bookable: "n", private: "n", microwave: "n", tv: "n", drinks: "n", view: "y", couches: "n", bridge: "", cheapfood: "", tourist: "y" },
    { id: 6, lat: 49.2639988, lng: -123.2559045, name: "Education Classrooms", status: "Really Good!", busy: "Very popular", notes: "Usually packed during peak hours", description: "", plugs: "y", bookable: "n", private: "y", microwave: "n", tv: "y", drinks: "n", view: "n", couches: "n", bridge: "", cheapfood: "", tourist: "" },
    { id: 7, lat: 49.266612, lng: -123.2500257, name: "Nest (Upper Floors)", status: "Not great", busy: "Very popular", notes: "", description: "", plugs: "y", bookable: "n", private: "n", microwave: "y", tv: "n", drinks: "n", view: "y", couches: "n", bridge: "", cheapfood: "", tourist: "" },
    { id: 8, lat: 49.2676248, lng: -123.2501682, name: "LIFE", status: "Okay...", busy: "Very popular", notes: "", description: "", plugs: "y", bookable: "n", private: "n", microwave: "y", tv: "n", drinks: "n", view: "n", couches: "n", bridge: "", cheapfood: "", tourist: "" },
    { id: 9, lat: 49.2683012, lng: -123.2550739, name: "Buchanan (Upper Floor)", status: "Pretty Good", busy: "There's some people here", notes: "Good if you need empty classrooms", description: "", plugs: "y", bookable: "n", private: "y", microwave: "n", tv: "y", drinks: "n", view: "n", couches: "n", bridge: "", cheapfood: "", tourist: "" },
    { id: 10, lat: 49.2638663, lng: -123.2533686, name: "Former education library", status: "Really Good!", busy: "There's some people here", notes: "Nice vibes - IKB-like.", description: "", plugs: "y", bookable: "n", private: "n", microwave: "y", tv: "n", drinks: "n", view: "n", couches: "n", bridge: "", cheapfood: "", tourist: "" },
    { id: 11, lat: 49.2664763, lng: -123.2521888, name: "Hennings Building", status: "Pretty Good", busy: "There's some people here", notes: "", description: "", plugs: "y", bookable: "n", private: "n", microwave: "y", tv: "n", drinks: "n", view: "n", couches: "n", bridge: "", cheapfood: "", tourist: "" },
    { id: 12, lat: 49.2664763, lng: -123.2521888, name: "Michael Smith Laboratories", status: "Not great", busy: "Usually isolated", notes: "Very fancy.", description: "", plugs: "y", bookable: "n", private: "y", microwave: "n", tv: "y", drinks: "n", view: "n", couches: "n", bridge: "", cheapfood: "", tourist: "" },
    { id: 13, lat: 49.265641, lng: -123.2542739, name: "Networks of Centers of Excellence", status: "Okay...", busy: "Usually isolated", notes: "Hallway tables always empty. Loud machinery.", description: "", plugs: "n", bookable: "n", private: "n", microwave: "n", tv: "n", drinks: "n", view: "y", couches: "n", bridge: "", cheapfood: "", tourist: "" },
    { id: 14, lat: 49.2644912, lng: -123.2472591, name: "Woodward Library", status: "Okay...", busy: "There's some people here", notes: "Dead silent, always has seats.", description: "", plugs: "y", bookable: "y", private: "y", microwave: "n", tv: "n", drinks: "n", view: "n", couches: "n", bridge: "", cheapfood: "", tourist: "" },
    { id: 15, lat: 49.2659553, lng: -123.249958, name: "Welcome Centre", status: "Okay...", busy: "Usually isolated", notes: "Lonely cubical", description: "", plugs: "y", bookable: "n", private: "n", microwave: "n", tv: "n", drinks: "n", view: "n", couches: "n", bridge: "", cheapfood: "", tourist: "" },
    { id: 16, lat: 49.2620489, lng: -123.2530989, name: "CIRS (Upper Floors)", status: "Pretty Good", busy: "There's some people here", notes: "Kettles and microwaves available", description: "", plugs: "y", bookable: "n", private: "n", microwave: "y", tv: "n", drinks: "n", view: "y", couches: "y", bridge: "", cheapfood: "", tourist: "" },
    { id: 17, lat: 49.2631082, lng: -123.2520453, name: "Earth Sciences Building (ESB)", status: "Okay...", busy: "There's some people here", notes: "A few seats on L1 and a couch on L2. Two classes on L1 which are hit or miss (sometimes locked)", description: "", plugs: "y", bookable: "n", private: "y", microwave: "n", tv: "y", drinks: "n", view: "n", couches: "n", bridge: "", cheapfood: "", tourist: "y" },
    { id: 20, lat: 49.2624183, lng: -123.2450666, name: "Life Sciences Center", status: "Really Good!", busy: "There's some people here", notes: "Extremely tall roof. Cafe + food nearby.", description: "", plugs: "y", bookable: "n", private: "y", microwave: "n", tv: "y", drinks: "n", view: "n", couches: "y", bridge: "", cheapfood: "", tourist: "" },
    { id: 21, lat: 49.2675321, lng: -123.2526827, name: "IKB downstairs", status: "Pretty Good", busy: "Usually isolated", notes: "Good if you need empty classrooms", description: "", plugs: "y", bookable: "y", private: "y", microwave: "n", tv: "n", drinks: "n", view: "n", couches: "n", bridge: "", cheapfood: "", tourist: "" },
    { id: 22, lat: 49.2612672, lng: -123.2489313, name: "ICICS / Computer Science (CS) building", status: "Really Good!", busy: "There's some people here", notes: "Many private but frequently booked rooms. Labs are always open and good for locking in (I’ve never been kicked out). Allegedly, cheap chips at downstairs student lounge.", description: "", plugs: "y", bookable: "y", private: "y", microwave: "y", tv: "y", drinks: "n", view: "n", couches: "n", bridge: "", cheapfood: "", tourist: "" },
    { id: 23, lat: 49.266835, lng: -123.2585761, name: "Asian Library", status: "Really Good!", busy: "Usually isolated", notes: "Second floor ⭐⭐⭐", description: "", plugs: "y", bookable: "n", private: "n", microwave: "y", tv: "n", drinks: "n", view: "n", couches: "y", bridge: "", cheapfood: "", tourist: "" },
    { id: 24, lat: 49.2697953, lng: -123.2535896, name: "Allard Law Library", status: "Really Good!", busy: "There's some people here", notes: "Lower floor really pretty", description: "", plugs: "y", bookable: "n", private: "n", microwave: "y", tv: "n", drinks: "n", view: "y", couches: "n", bridge: "", cheapfood: "", tourist: "" },
    { id: 25, lat: 49.2655358, lng: -123.2568397, name: "X̱wi7x̱wa (Musqueam) Library", status: "Pretty Good", busy: "Usually isolated", notes: "Cool if you wanna be alone but in a community place", description: "", plugs: "y", bookable: "n", private: "n", microwave: "n", tv: "n", drinks: "n", view: "n", couches: "n", bridge: "", cheapfood: "", tourist: "" },
    { id: 26, lat: 49.2648641, lng: -123.2536411, name: "Sauder (Henry Angus) glass meeting rooms", status: "Really Good!", busy: "There's some people here", notes: "Available in basement, main floor behind lounge, and near L4 lecture hall. All bookable, so you may get kicked out.", description: "", plugs: "y", bookable: "y", private: "y", microwave: "y", tv: "n", drinks: "n", view: "n", couches: "n", bridge: "", cheapfood: "", tourist: "" },
    { id: 27, lat: 49.2621606, lng: -123.2492561, name: "Engineering Student Center (ESC) meeting rooms", status: "Not great", busy: "There's some people here", notes: "Couches & tables, but perpetually dirty. More often free than one may guess.", description: "", plugs: "y", bookable: "y", private: "y", microwave: "y", tv: "n", drinks: "n", view: "n", couches: "n", bridge: "y", cheapfood: "", tourist: "" },
    { id: 28, lat: 49.2621606, lng: -123.2492561, name: "Engineering Student Center (ESC)", status: "Not great", busy: "Very popular", notes: "Very dirty and loud. Usually some tables open. Upstairs is nicer.", description: "", plugs: "y", bookable: "n", private: "n", microwave: "y", tv: "n", drinks: "n", view: "n", couches: "y", bridge: "y", cheapfood: "", tourist: "" },
    { id: 29, lat: 49.2672584, lng: -123.2579673, name: "CK Choi Meeting Rooms", status: "Really Good!", busy: "Usually isolated", notes: "Great soundproofing, heater present, great acoustics, TV. One on main + upper floors.", description: "", plugs: "y", bookable: "n", private: "y", microwave: "y", tv: "y", drinks: "n", view: "n", couches: "n", bridge: "", cheapfood: "", tourist: "" },
    { id: 30, lat: 49.2677801, lng: -123.2578635, name: "School of Journalism Reading Room", status: "Pretty Good", busy: "Usually isolated", notes: "No tables, but among the coziest public spots on campus.", description: "", plugs: "n", bookable: "n", private: "n", microwave: "n", tv: "n", drinks: "n", view: "n", couches: "y", bridge: "", cheapfood: "", tourist: "" },
    { id: 31, lat: 49.26781, lng: -123.2588905, name: "Place of Many Trees (International House)", status: "Pretty Good", busy: "Usually isolated", notes: "Wide, open room with glass walls. Not many outlets.", description: "", plugs: "y", bookable: "n", private: "n", microwave: "n", tv: "n", drinks: "y", view: "y", couches: "n", bridge: "", cheapfood: "", tourist: "" },
    { id: 32, lat: 49.26781, lng: -123.2588905, name: "Common area (International House)", status: "Pretty Good", busy: "Usually isolated", notes: "Free drinks available", description: "", plugs: "y", bookable: "n", private: "n", microwave: "n", tv: "n", drinks: "y", view: "n", couches: "n", bridge: "", cheapfood: "", tourist: "" },
    { id: 33, lat: 49.26781, lng: -123.2588905, name: "1st/3rd floor board rooms (International House)", status: "Really Good!", busy: "Usually isolated", notes: "Always available, but near faculty offices. Free drink coffee, hot chocolate, etc on 3rd floor.", description: "", plugs: "y", bookable: "n", private: "y", microwave: "n", tv: "y", drinks: "y", view: "n", couches: "n", bridge: "", cheapfood: "", tourist: "" },
    { id: 34, lat: 49.2634981, lng: -123.2547751, name: "ELI", status: "Really Good!", busy: "Usually isolated", notes: "Many private spaces. At least one room always open.", description: "", plugs: "y", bookable: "n", private: "y", microwave: "y", tv: "y", drinks: "n", view: "n", couches: "n", bridge: "", cheapfood: "", tourist: "" },
    { id: 36, lat: 49.2672584, lng: -123.2579673, name: "C.K. Choi Large Room", status: "Not great", busy: "There's some people here", notes: "Large lecture hall usually not used", description: "", plugs: "y", bookable: "n", private: "n", microwave: "y", tv: "n", drinks: "n", view: "n", couches: "y", bridge: "", cheapfood: "", tourist: "" },
    { id: 37, lat: 49.2646451, lng: -123.2445754, name: "Cafe Ami", status: "Really Good!", busy: "There's some people here", notes: "Cold tables, very welcoming vibe", description: "", plugs: "y", bookable: "n", private: "n", microwave: "n", tv: "n", drinks: "n", view: "n", couches: "n", bridge: "", cheapfood: "", tourist: "" },
    { id: 38, lat: 49.2659828, lng: -123.2561747, name: "Geography Building Lounge", status: "Really Good!", busy: "There's some people here", notes: "Couches and tables", description: "", plugs: "y", bookable: "n", private: "n", microwave: "y", tv: "n", drinks: "n", view: "n", couches: "n", bridge: "", cheapfood: "", tourist: "" },
    { id: 39, lat: 49.2659828, lng: -123.2561747, name: "Geography Classrooms", status: "Pretty Good", busy: "There's some people here", notes: "You will sometimes find empty rooms", description: "", plugs: "y", bookable: "n", private: "y", microwave: "y", tv: "y", drinks: "n", view: "n", couches: "n", bridge: "", cheapfood: "", tourist: "" },
    { id: 40, lat: 49.2628291, lng: -123.2543588, name: "Swing building classrooms.", status: "Pretty Good", busy: "There's some people here", notes: "Usually a few empty rooms.", description: "", plugs: "y", bookable: "n", private: "y", microwave: "n", tv: "y", drinks: "n", view: "n", couches: "n", bridge: "", cheapfood: "", tourist: "" },
    { id: 41, lat: 49.2643369, lng: -123.2550329, name: "School of Social Work", status: "Really Good!", busy: "Usually isolated", notes: "Rooms are bookable WITHOUT 24h notice.", description: "", plugs: "y", bookable: "y", private: "y", microwave: "y", tv: "y", drinks: "n", view: "n", couches: "n", bridge: "", cheapfood: "", tourist: "" },
    { id: 42, lat: 49.2637295, lng: -123.2549759, name: "Mercante area", status: "Okay...", busy: "Very popular", notes: "Some private rooms, but always full", description: "", plugs: "n", bookable: "n", private: "n", microwave: "n", tv: "n", drinks: "n", view: "n", couches: "n", bridge: "", cheapfood: "", tourist: "" },
    { id: 43, lat: 49.2648641, lng: -123.2536411, name: "Sauder (Henry Angus) lounge", status: "Pretty Good", busy: "There's some people here", notes: "2 private rooms, but public area always has space. Decently quite.", description: "", plugs: "y", bookable: "n", private: "n", microwave: "y", tv: "n", drinks: "n", view: "n", couches: "y", bridge: "", cheapfood: "", tourist: "" },
    { id: 44, lat: 49.2657716, lng: -123.2546239, name: "David Lam (DLAM) labs", status: "Pretty Good", busy: "There's some people here", notes: "Usually some people in there, but very quite. Technically not public.", description: "", plugs: "y", bookable: "n", private: "y", microwave: "y", tv: "y", drinks: "n", view: "n", couches: "n", bridge: "", cheapfood: "", tourist: "" },
    { id: 45, lat: 49.2630507, lng: -123.2518412, name: "Earth, Ocean, and Atmospheric Sciences (EOAS)", status: "Okay...", busy: "Usually isolated", notes: "You are bound to find empty classrooms, but they are very old, cold, and rocky.", description: "", plugs: "y", bookable: "n", private: "y", microwave: "y", tv: "y", drinks: "n", view: "n", couches: "n", bridge: "", cheapfood: "", tourist: "y" },
    { id: 46, lat: 49.2611383, lng: -123.2502743, name: "MacMillan", status: "Pretty Good", busy: "There's some people here", notes: "Lots of classrooms, less used than usual. Good views, old vibes. Public areas too!", description: "", plugs: "y", bookable: "n", private: "y", microwave: "y", tv: "y", drinks: "n", view: "y", couches: "n", bridge: "", cheapfood: "", tourist: "" },
    { id: 47, lat: 49.2600602, lng: -123.2509365, name: "Orchard classrooms", status: "Pretty Good", busy: "There's some people here", notes: "Lots of classrooms, plenty of space. Student-homey vibes.", description: "", plugs: "y", bookable: "n", private: "y", microwave: "y", tv: "y", drinks: "n", view: "n", couches: "n", bridge: "", cheapfood: "", tourist: "" },
    { id: 48, lat: 49.2606379, lng: -123.2534654, name: "University Services Building (USB)", status: "Not great", busy: "There's some people here", notes: "No rooms, only a few one-person couches and tables.", description: "", plugs: "n", bookable: "n", private: "n", microwave: "y", tv: "n", drinks: "y", view: "n", couches: "y", bridge: "", cheapfood: "", tourist: "" },
    { id: 49, lat: 49.2590064, lng: -123.248435, name: "Old Barn Community Center", status: "Really Good!", busy: "There's some people here", notes: "A few public tables that usually have space. Couches that are usually empty. Children frequent this space.", description: "", plugs: "y", bookable: "n", private: "n", microwave: "y", tv: "n", drinks: "n", view: "n", couches: "y", bridge: "", cheapfood: "", tourist: "" },
    { id: 50, lat: 49.2604859, lng: -123.2488265, name: "Forestry Student Center (FSC)", status: "Okay...", busy: "Very popular", notes: "Tables on higher level usually have space. Public study space often has only a few empty seats, but lots of trees! Classrooms are sometimes empty.", description: "", plugs: "y", bookable: "n", private: "n", microwave: "y", tv: "n", drinks: "y", view: "y", couches: "y", bridge: "", cheapfood: "y", tourist: "y" },
    { id: 51, lat: 49.2611918, lng: -123.2480522, name: "Hugh Dempster Pavillion (DMP)", status: "Not great", busy: "Very popular", notes: "Hard to find empty classroom. Public study spots are few and far between.", description: "", plugs: "y", bookable: "n", private: "y", microwave: "n", tv: "y", drinks: "n", view: "n", couches: "n", bridge: "", cheapfood: "", tourist: "" },
    { id: 52, lat: 49.2620872, lng: -123.2479029, name: "Brimacomb Building", status: "Not great", busy: "Usually isolated", notes: "Downstairs has seats that are never used and dead silent. No spaces otherwise.", description: "", plugs: "n", bookable: "n", private: "n", microwave: "n", tv: "n", drinks: "n", view: "n", couches: "y", bridge: "", cheapfood: "", tourist: "y" },
    { id: 53, lat: 49.2616108, lng: -123.2494107, name: "MacLeod (MCLD)", status: "Okay...", busy: "There's some people here", notes: "Classrooms, though frequently used, are nice after hours. Very modern. Some public spaces. 4th floor spaces less often used.", description: "", plugs: "y", bookable: "n", private: "y", microwave: "y", tv: "y", drinks: "y", view: "n", couches: "y", bridge: "", cheapfood: "", tourist: "" },
    { id: 54, lat: 49.262369, lng: -123.2501181, name: "Kaiser", status: "Not great", busy: "Very popular", notes: "Only very busy (often 100% full) public space. The left door of the upstairs hall is broken (sometimes doesn’t lock).", description: "", plugs: "y", bookable: "n", private: "n", microwave: "n", tv: "n", drinks: "n", view: "n", couches: "y", bridge: "", cheapfood: "", tourist: "" },
    { id: 55, lat: 49.2628113, lng: -123.2489328, name: "Civil and Mechanical Engineering (CEME)", status: "Not great", busy: "There's some people here", notes: "Level 1 has very busy public spots. Level 2 has slightly quieter public spots and some class/lab rooms.", description: "", plugs: "y", bookable: "n", private: "y", microwave: "n", tv: "y", drinks: "n", view: "n", couches: "y", bridge: "y", cheapfood: "", tourist: "" },
    { id: 56, lat: 49.2623149, lng: -123.2482374, name: "Engineering Design Center (EDC)", status: "Okay...", busy: "There's some people here", notes: "Has a single private room on level 2. Public areas are nice, but pretty busy.", description: "", plugs: "y", bookable: "n", private: "n", microwave: "n", tv: "n", drinks: "n", view: "y", couches: "y", bridge: "", cheapfood: "", tourist: "y" },
    { id: 57, lat: 49.2644974, lng: -123.251268, name: "Biology Building corner", status: "Really Good!", busy: "There's some people here", notes: "Very fancy public area with very fancy personal lights and plugs. Quite even though it’s busy.", description: "", plugs: "y", bookable: "n", private: "n", microwave: "y", tv: "n", drinks: "n", view: "y", couches: "n", bridge: "", cheapfood: "", tourist: "" },
    { id: 58, lat: 49.2632648, lng: -123.2510159, name: "Niche Cafe (Beaty Biodiversity Museum)", status: "Pretty Good", busy: "There's some people here", notes: "Public spot. Always has empty tables.", description: "", plugs: "n", bookable: "n", private: "n", microwave: "n", tv: "n", drinks: "n", view: "n", couches: "n", bridge: "", cheapfood: "", tourist: "y" },
    { id: 59, lat: 49.2641064, lng: -123.2486593, name: "School of Population and Public Health (SPPH)", status: "Really Good!", busy: "There's some people here", notes: "Downstairs classrooms are vibes, super private, and NOT BOOKABLE YESSSSS. Always full though…", description: "", plugs: "y", bookable: "n", private: "y", microwave: "n", tv: "y", drinks: "n", view: "n", couches: "y", bridge: "", cheapfood: "", tourist: "" },
    { id: 60, lat: 49.2645509, lng: -123.2471782, name: "Instructional Resource Center (IRC)", status: "Okay...", busy: "There's some people here", notes: "Some private rooms on main floor, but usually full. The smaller lecture halls are nice. Public area is noisy but comfortable.", description: "", plugs: "y", bookable: "n", private: "n", microwave: "n", tv: "n", drinks: "n", view: "n", couches: "y", bridge: "", cheapfood: "", tourist: "" },
    { id: 61, lat: 49.2644912, lng: -123.2472591, name: "Woodward Library", status: "Pretty Good", busy: "There's some people here", notes: "Main floor always has space. Cozy spot behind the librarian counter. Downstairs is super vibes with the empty computer lab and silent space. Upstairs has tables and bookable rooms too.", description: "", plugs: "y", bookable: "y", private: "y", microwave: "n", tv: "n", drinks: "n", view: "n", couches: "y", bridge: "", cheapfood: "", tourist: "" },
    { id: 62, lat: 49.2624894, lng: -123.2476363, name: "CHBE lounge", status: "Pretty Good", busy: "There's some people here", notes: "Among the nicest lounges at UBC. Comfy, but usually busy.", description: "", plugs: "y", bookable: "n", private: "n", microwave: "y", tv: "n", drinks: "n", view: "n", couches: "y", bridge: "", cheapfood: "", tourist: "" },
    { id: 63, lat: 49.2624894, lng: -123.2476363, name: "CHBE", status: "Pretty Good", busy: "There's some people here", notes: "A few classrooms. A secret meeting room is available upstairs.", description: "", plugs: "y", bookable: "n", private: "y", microwave: "y", tv: "y", drinks: "n", view: "n", couches: "n", bridge: "", cheapfood: "", tourist: "" },
    { id: 64, lat: 49.262256, lng: -123.2433984, name: "Pharmacy building", status: "Pretty Good", busy: "Very popular", notes: "Has 1st, 2nd, and 3rd floor public areas which are nice but busy. Secret classroom on floor 3. Nice lecture hall.", description: "", plugs: "y", bookable: "n", private: "n", microwave: "y", tv: "n", drinks: "n", view: "y", couches: "y", bridge: "", cheapfood: "", tourist: "y" },
    { id: 65, lat: 49.2654666, lng: -123.2459634, name: "Friedman Student Lounge", status: "Pretty Good", busy: "Usually isolated", notes: "3rd floor. Quietest student lounge ever. Has tables and a good view of the IRC backyard.", description: "", plugs: "y", bookable: "n", private: "n", microwave: "n", tv: "n", drinks: "n", view: "n", couches: "y", bridge: "", cheapfood: "", tourist: "" },
    { id: 66, lat: 49.2659, lng: -123.246282, name: "Shrum / Biomedical Engineering building", status: "Really Good!", busy: "There's some people here", notes: "Has several floor of public spots. Non-private private rooms.", description: "", plugs: "y", bookable: "n", private: "y", microwave: "y", tv: "y", drinks: "n", view: "y", couches: "y", bridge: "", cheapfood: "", tourist: "" },
    { id: 67, lat: 49.2659289, lng: -123.2500243, name: "Robert H. Lee Alumni Center", status: "Pretty Good", busy: "There's some people here", notes: "Downstairs has couches and tall tables only, but it’s nice. Nice fireplaces for chilling. Nothing upstairs.", description: "", plugs: "y", bookable: "n", private: "n", microwave: "n", tv: "n", drinks: "n", view: "n", couches: "y", bridge: "", cheapfood: "", tourist: "y" }
];

// --- STATE ---
let currentPos = { lat: UBC_CENTER.lat, lng: UBC_CENTER.lng };
let userMarker = null;
let routeLine = null;
let currentFilters = {
    search: '',
    status: 'all',
    busy: 'all',
    plugs: false,
    bookable: false,
    private: false,
    microwave: false,
    tv: false,
    drinks: false,
    view: false,
    couches: false
};

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

// --- RENDERING ---
function renderBadge(label, theme) {
    return `<span class="badge" style="background:${theme.bg}; color:${theme.text}">${label}</span>`;
}

function renderFeatureRowLarge(item, isBonus = false) {
    const val = String(item.value).toLowerCase();
    const isYes = val === 'y' || val === 'yes';
    const isNo = val === 'n' || val === 'no';

    if (!isYes && !isNo && !isBonus) return '';
    if (isBonus && !isYes) return '';

    const typeClass = isBonus ? 'bonus' : (isYes ? 'yes' : 'no');

    return `
        <div class="feature-row-modern ${typeClass}">
            <img src="Images/${item.icon}" class="feature-icon-large" alt="${item.label}">
            <div class="feature-text-large ${isNo ? 'text-no-modern' : ''}">${item.label}</div>
        </div>
    `;
}

// --- MAP ACTIONS ---
function drawPath(target) {
    if (routeLine) map.removeLayer(routeLine);
    routeLine = L.polyline([[currentPos.lat, currentPos.lng], [target.lat, target.lng]], {
        color: '#3388ff',
        weight: 4,
        dashArray: '10, 10'
    }).addTo(map);
}

// --- APP LOGIC ---
function openSpot(spot) {
    document.getElementById('sidebar-content').style.display = 'none';
    document.getElementById('spot-detail').style.display = 'flex';

    document.getElementById('detail-name').textContent = spot.name;
    document.getElementById('detail-description').textContent = spot.description || "No description available.";
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
    ].map(f => renderFeatureRowLarge(f)).join('') +
    [
        { label: 'Free Drinks', value: spot.drinks, icon: 'drinks.png' },
        { label: 'Good View', value: spot.view, icon: 'view.png' },
        { label: 'Couches', value: spot.couches, icon: 'couch.png' },
        { label: 'Super Cool Bridge', value: spot.bridge, icon: 'bridge.png' },
        { label: 'Cheap Food', value: spot.cheapfood, icon: 'cheapfood.png' },
        { label: 'Tourist Attraction', value: spot.tourist, icon: 'tourist.png' }
    ].map(b => renderFeatureRowLarge(b, true)).join('');

    map.flyTo([spot.lat, spot.lng], 17, { duration: 1.5 });
    drawPath(spot);
}

function updateList() {
    const container = document.getElementById('spots-list');
    container.innerHTML = '';

    // Clear existing markers (keep userMarker)
    map.eachLayer(function (layer) {
        if (layer instanceof L.Marker && layer !== userMarker) {
            map.removeLayer(layer);
        }
    });

    const searchTerm = document.getElementById('search-input').value.toLowerCase();

    let filteredSpots = studySpots.map(s => ({
        ...s,
        distance: getDist(currentPos.lat, currentPos.lng, s.lat, s.lng)
    }));

    // Filter Logic
    filteredSpots = filteredSpots.filter(s => {
        const matchesSearch = s.name.toLowerCase().includes(searchTerm);
        const matchesStatus = currentFilters.status === 'all' || s.status === currentFilters.status;
        const matchesBusy = currentFilters.busy === 'all' || s.busy === currentFilters.busy;

        const checkY = (v) => String(v).toLowerCase().startsWith('y');
        const matchesPlugs = !currentFilters.plugs || checkY(s.plugs);
        const matchesBookable = !currentFilters.bookable || checkY(s.bookable);
        const matchesPrivate = !currentFilters.private || checkY(s.private);
        const matchesMicrowave = !currentFilters.microwave || checkY(s.microwave);
        const matchesTV = !currentFilters.tv || checkY(s.tv);
        const matchesDrinks = !currentFilters.drinks || checkY(s.drinks);
        const matchesView = !currentFilters.view || checkY(s.view);
        const matchesCouches = !currentFilters.couches || checkY(s.couches);

        return matchesSearch && matchesStatus && matchesBusy && matchesPlugs &&
               matchesBookable && matchesPrivate && matchesMicrowave &&
               matchesTV && matchesDrinks && matchesView && matchesCouches;
    });

    filteredSpots.sort((a, b) => a.distance - b.distance);

    filteredSpots.forEach(spot => {
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
        L.marker([spot.lat, spot.lng]).addTo(map).on('click', () => openSpot(spot));
    });

    document.getElementById('status').textContent = `${filteredSpots.length} spots found`;
}

// --- LISTENERS ---
document.getElementById('search-input').addEventListener('input', updateList);

document.getElementById('filter-btn').addEventListener('click', () => {
    const m = document.getElementById('filter-modal');
    m.style.display = (m.style.display === 'block') ? 'none' : 'block';
});

document.getElementById('apply-filters').addEventListener('click', () => {
    currentFilters.status = document.getElementById('filter-status').value;
    currentFilters.busy = document.getElementById('filter-busy').value;
    currentFilters.plugs = document.getElementById('filter-plugs').checked;
    currentFilters.bookable = document.getElementById('filter-bookable').checked;
    currentFilters.private = document.getElementById('filter-private').checked;
    currentFilters.microwave = document.getElementById('filter-microwave').checked;
    currentFilters.tv = document.getElementById('filter-tv').checked;
    currentFilters.drinks = document.getElementById('filter-drinks').checked;
    currentFilters.view = document.getElementById('filter-view').checked;
    currentFilters.couches = document.getElementById('filter-couches').checked;

    document.getElementById('filter-modal').style.display = 'none';
    updateList();
});

document.getElementById('back-to-list').addEventListener('click', () => {
    document.getElementById('spot-detail').style.display = 'none';
    document.getElementById('sidebar-content').style.display = 'block';
    if (routeLine) map.removeLayer(routeLine);
    map.flyTo([currentPos.lat, currentPos.lng], 15);
});

// --- INIT ---
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
        currentPos = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        map.setView([currentPos.lat, currentPos.lng], 15);
        userMarker = L.circleMarker([currentPos.lat, currentPos.lng], {
            radius: 10, fillColor: '#3388ff', color: 'white', weight: 3, fillOpacity: 1
        }).addTo(map);
        updateList();
    }, () => {
        map.setView([UBC_CENTER.lat, UBC_CENTER.lng], 15);
        updateList();
    });
} else {
    map.setView([UBC_CENTER.lat, UBC_CENTER.lng], 15);
    updateList();
}
