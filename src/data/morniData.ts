export interface ExploreItem {
  id: string;
  name: string;
  category: "places" | "stay" | "food" | "camping" | "activities" | "photospots" | "taxi";
  tagline: string;
  description: string;
  image: string;
  rating: number;
  reviewsCount: number;
  location: string;
  priceOrFee?: string;
  timing?: string;
  badge?: string;
  highlights: string[];
  bestFor: ("family" | "couple" | "friends" | "solo")[];
  coordinates?: { lat: number; lng: number };
  contactPhone?: string;
}

export interface TaxiPackage {
  id: string;
  route: string;
  vehicleType: string;
  capacity: string;
  price: string;
  description: string;
  inclusions: string[];
  popularFor: string;
}

export interface ItineraryTimeSlot {
  time: string;
  title: string;
  description: string;
  location: string;
  tip?: string;
  iconType: "coffee" | "sun" | "compass" | "camera" | "moon" | "car" | "utensils";
}

export interface ItineraryPlan {
  traveler: "family" | "couple" | "friends" | "solo";
  duration: "half-day" | "1-day" | "2-days";
  title: string;
  overview: string;
  estimatedBudget: string;
  recommendedStay?: string;
  transportAdvice: string;
  timeline: ItineraryTimeSlot[];
  packingTips: string[];
}

export const EXPLORE_CATEGORIES = [
  { id: "places", label: "Places", icon: "🏞️", color: "from-emerald-500 to-teal-700" },
  { id: "stay", label: "Stay", icon: "🏨", color: "from-blue-500 to-indigo-700" },
  { id: "food", label: "Food", icon: "🍴", color: "from-amber-500 to-orange-700" },
  { id: "camping", label: "Camping", icon: "🏕️", color: "from-green-600 to-emerald-800" },
  { id: "activities", label: "Activities", icon: "🥾", color: "from-rose-500 to-red-700" },
  { id: "photospots", label: "Photo Spots", icon: "📸", color: "from-purple-500 to-pink-700" },
  { id: "taxi", label: "Taxi", icon: "🚕", color: "from-yellow-500 to-amber-600" },
] as const;

export const EXPLORE_ITEMS: ExploreItem[] = [
  // Places
  {
    id: "tikkar-taal",
    name: "Tikkar Taal (Twin Lakes)",
    category: "places",
    tagline: "Serene twin lakes surrounded by lush green Shivalik hills",
    description:
      "The crown jewel of Morni Hills. Tikkar Taal consists of two interconnected natural water bodies - Bada Taal and Chhota Taal, separated by a scenic hillock. Ideal for boating, lakeside picnics, and sunset photography.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80",
    rating: 4.6,
    reviewsCount: 1420,
    location: "Tikkar Taal, 14 km from Morni village",
    priceOrFee: "₹30-50 entry / Boating extra",
    timing: "8:00 AM – 6:30 PM",
    badge: "Must Visit",
    highlights: ["Twin Natural Lakes", "Pedal & Motor Boating", "Lakeside Walking Track", "Canteen & Gardens"],
    bestFor: ["family", "couple", "friends", "solo"],
  },
  {
    id: "morni-fort",
    name: "Morni Fort & Heritage Center",
    category: "places",
    tagline: "17th-century fortress offering 360° panoramic valley vistas",
    description:
      "Perched high on a ridge, this historic fort was constructed by the rulers of Kotaha. Restored by Haryana Tourism, it now houses educational exhibits on local wildlife, tribal heritage, and offers sweeping valley overlooks.",
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=900&q=80",
    rating: 4.4,
    reviewsCount: 890,
    location: "Morni Village Center",
    priceOrFee: "Free entry",
    timing: "9:00 AM – 5:30 PM",
    badge: "Heritage",
    highlights: ["Historical Ramparts", "Wildlife Interpretation Center", "Valley View Terrace", "Pine Canopy Walk"],
    bestFor: ["family", "couple", "solo"],
  },
  {
    id: "karoh-peak",
    name: "Karoh Peak (Haryana's Highest)",
    category: "places",
    tagline: "The tallest mountain summit in Haryana at 4,813 feet",
    description:
      "Karoh Peak stands proud at 1,467 meters as the highest elevation in Haryana, bordering Himachal Pradesh. Reached via a gentle 2.5 km uphill trek through fragrant Chir pine forests, it rewards with crisp mountain air.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80",
    rating: 4.7,
    reviewsCount: 520,
    location: "Near Bhoj Dharti Ridge",
    priceOrFee: "Free access",
    timing: "Sunrise to Sunset",
    badge: "Highest Peak",
    highlights: ["4,813 ft Elevation", "Pine Forest Trail", "Himachal Border Views", "Bird Watching"],
    bestFor: ["friends", "solo"],
  },
  {
    id: "berwala-bird-sanctuary",
    name: "Berwala Bird & Pheasant Sanctuary",
    category: "places",
    tagline: "Tranquil avian sanctuary famous for rare mountain pheasants",
    description:
      "A peaceful conservation forest dedicated to breeding and sheltering exotic mountain bird species, notably the endangered Cheer Pheasant and Red Junglefowl. A paradise for nature photographers and wildlife enthusiasts.",
    image: "https://images.unsplash.com/photo-1444464666168-49d633b86797?auto=format&fit=crop&w=900&q=80",
    rating: 4.3,
    reviewsCount: 310,
    location: "Berwala, Morni Hills road",
    priceOrFee: "₹20 entry",
    timing: "7:00 AM – 5:00 PM",
    badge: "Wildlife",
    highlights: ["Pheasant Breeding Center", "Dense Green Forest", "Quiet Nature Walk", "Great for Photographers"],
    bestFor: ["family", "solo"],
  },

  // Stay
  {
    id: "tikkar-tourist-resort",
    name: "Tikkar Taal Lakeview Resort",
    category: "stay",
    tagline: "Government-operated serene lakeside rooms with lawn access",
    description:
      "Run by Haryana Tourism, this resort offers unobstructed views of Bada Taal. Features spacious family rooms, lush lawn dining, lakeside verandas, and instant access to morning water activities.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
    rating: 4.2,
    reviewsCount: 650,
    location: "Right on Tikkar Taal Lakefront",
    priceOrFee: "₹2,500 - ₹4,200 / night",
    timing: "Check-in: 12 PM | Check-out: 11 AM",
    badge: "Lakefront",
    highlights: ["Direct Lake Views", "In-house Restaurant", "Spacious Lawns", "Safe Parking"],
    bestFor: ["family", "couple"],
    contactPhone: "+91 98765 43210",
  },
  {
    id: "pine-valley-luxury-resort",
    name: "The Pine Woods Boutique Retreat",
    category: "stay",
    tagline: "Cozy wooden cottages tucked amidst towering pine trees",
    description:
      "A premium hillside getaway featuring Swiss-style chalets, wooden balconies looking out over misty valleys, private bonfire pits, and an open-air barbecue grill. Perfect for romantic getaways or peaceful escapes.",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=900&q=80",
    rating: 4.8,
    reviewsCount: 420,
    location: "Morni-Bhoj Road, 5 km from Fort",
    priceOrFee: "₹4,500 - ₹7,500 / night",
    timing: "24/7 Reception",
    badge: "Luxury & Romance",
    highlights: ["Private Balcony Views", "Evening Bonfire & Music", "Free High-Speed Wi-Fi", "Continental & Pahadi Food"],
    bestFor: ["couple", "family"],
    contactPhone: "+91 98123 45678",
  },
  {
    id: "shivalik-homestay",
    name: "Shivalik Crest Homestay",
    category: "stay",
    tagline: "Warm local hospitality with farm-fresh organic food",
    description:
      "Experience genuine Pahadi living with local hosts. Clean, cozy rooms with mountain views, home-cooked organic meals with freshly baked chapatis, and guided trails to secret village springs.",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=900&q=80",
    rating: 4.6,
    reviewsCount: 280,
    location: "Bhoj Dharti Village, Morni",
    priceOrFee: "₹1,400 - ₹2,200 / night",
    timing: "Check-in: Flexible",
    badge: "Budget Friendly",
    highlights: ["Home-Cooked Pahadi Meals", "Village Culture Walk", "Pet Friendly", "Pocket Friendly"],
    bestFor: ["solo", "friends"],
    contactPhone: "+91 94160 12345",
  },

  // Food
  {
    id: "lakeview-dhaba",
    name: "Tikkar Taal Punjabi & Pahadi Dhaba",
    category: "food",
    tagline: "Authentic Makki Roti, Sarson Ka Saag & bubbling kadhi",
    description:
      "Located just a stone's throw from the lake, this famous dhaba serves piping hot tandoori paranthas, fresh paneer bhurji, dal makhani, and winter specials like Makki Di Roti with freshly churned white butter.",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=900&q=80",
    rating: 4.5,
    reviewsCount: 1100,
    location: "Near Tikkar Taal Parking",
    priceOrFee: "₹150 - ₹300 per person",
    timing: "7:00 AM – 10:00 PM",
    badge: "Top Rated Food",
    highlights: ["Hot Stuffed Paranthas", "Chai in Kulhad", "Lake Breeze Seating", "Pure Desi Ghee"],
    bestFor: ["family", "friends", "couple", "solo"],
  },
  {
    id: "the-pine-mist-cafe",
    name: "The Mist & Maggie Hill Cafe",
    category: "food",
    tagline: "Steaming ginger tea, cheese maggie, and cliffside panoramas",
    description:
      "A rustic hillside cafe perched on a bend with breathtaking views of the Panchkula plains below. Known for spicy mountain Maggi, cold coffee, momos, and hot pakoras during misty evenings.",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=900&q=80",
    rating: 4.7,
    reviewsCount: 760,
    location: "Panchkula-Morni Highway, Mile 18",
    priceOrFee: "₹100 - ₹250 per person",
    timing: "8:00 AM – 9:00 PM",
    badge: "Instagrammable",
    highlights: ["Valley View Deck", "Special Masala Chai", "Cheesy Hill Maggi", "Acoustic Vibes"],
    bestFor: ["friends", "couple", "solo"],
  },

  // Camping
  {
    id: "tikkar-lakeside-camps",
    name: "Tikkar Taal Lakeside Glamping",
    category: "camping",
    tagline: "Waterfront dome tents with star gazing and evening campfires",
    description:
      "Sleep under the starry night sky right on the shores of Tikkar Taal. Includes waterproof safari tents with comfortable bedding, night bonfire with acoustic music, barbecue dinner, and morning kayaking.",
    image: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=900&q=80",
    rating: 4.7,
    reviewsCount: 540,
    location: "Lakeside Shore, Tikkar Taal",
    priceOrFee: "₹1,800 / person (all meals & tent)",
    timing: "4:00 PM Check-in to 11:00 AM Check-out",
    badge: "Best Seller",
    highlights: ["Lakefront Tents", "Bonfire & BBQ", "Stargazing Telescope", "Morning Sunrise Boating"],
    bestFor: ["friends", "couple"],
    contactPhone: "+91 99912 34567",
  },
  {
    id: "pine-wilderness-camp",
    name: "Pine Forest Eco Camp & Trek Base",
    category: "camping",
    tagline: "Raw wilderness camping deep within the Chir pine forest",
    description:
      "Ideal for true adventure seekers and outdoor buffs. Set amidst tall fragrant pine trees, offering tent pitching workshops, guided night hikes, survival skill sessions, and soothing bird calls at dawn.",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=900&q=80",
    rating: 4.6,
    reviewsCount: 330,
    location: "Upper Morni Pine Ridge",
    priceOrFee: "₹1,400 / person (Tents + Dinner)",
    timing: "3:00 PM Check-in",
    badge: "Adventure",
    highlights: ["Forest Canopy", "Guided Night Trail", "Barbecue Grill", "Eco-friendly Set-up"],
    bestFor: ["friends", "solo"],
    contactPhone: "+91 98989 12345",
  },

  // Activities
  {
    id: "morni-adventure-park",
    name: "Morni Hills Adventure Park",
    category: "activities",
    tagline: "Zip-line, Burma bridge, rock climbing, and obstacle courses",
    description:
      "A thrilling adventure park developed right next to the lake. Offers zip-lining over green slopes, Burma bridge, rope obstacle challenges, artificial rock climbing, tree house views, and child-safe play zones.",
    image: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=900&q=80",
    rating: 4.5,
    reviewsCount: 920,
    location: "Adjacent to Tikkar Taal",
    priceOrFee: "₹50 entry / ₹350 full activity combo",
    timing: "9:00 AM – 6:00 PM",
    badge: "Adrenaline",
    highlights: ["High Zip-line", "Burma Bridge & Commando Net", "Kids Play Area", "Certified Instructors"],
    bestFor: ["family", "friends"],
  },
  {
    id: "lake-boating",
    name: "Tikkar Taal Boating & Kayaking",
    category: "activities",
    tagline: "Paddle boats & speed boating in the tranquil hill lake",
    description:
      "Glide gently across the shimmering waters of Bada Taal. Choose from 2-seater and 4-seater pedal boats, or hop on a thrilling motorboat ride with life jackets and safety gear provided.",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=80",
    rating: 4.6,
    reviewsCount: 1650,
    location: "Tikkar Taal Boat Jetty",
    priceOrFee: "₹100 - ₹250 per boat (30 mins)",
    timing: "9:00 AM – 6:00 PM",
    badge: "Popular",
    highlights: ["Pedal & Motor Boats", "Lifejackets Included", "Calm Lake Waters", "Scenic Mountain Backdrop"],
    bestFor: ["family", "couple", "friends", "solo"],
  },
  {
    id: "pine-forest-trek",
    name: "Chir Pine Forest Nature Hike",
    category: "activities",
    tagline: "Invigorating 4 km forest walk with crisp Himalayan breeze",
    description:
      "A guided or self-walk peaceful trail through the pristine pine forests of Morni. The carpet of dry pine needles, bird songs, wild butterflies, and occasional deer sightings make it deeply refreshing.",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=80",
    rating: 4.8,
    reviewsCount: 410,
    location: "Trailheads start near Morni Fort & Bhoj Road",
    priceOrFee: "Free / ₹500 for local guide",
    timing: "6:00 AM – 5:30 PM",
    badge: "Serene Walk",
    highlights: ["Chir Pine Canopy", "Easy-to-Moderate Grade", "Bird Watching", "Fresh Mountain Air"],
    bestFor: ["couple", "solo", "friends"],
  },

  // Photo Spots
  {
    id: "tikkar-sunset-point",
    name: "Tikkar Taal Golden Hour Jetty",
    category: "photospots",
    tagline: "Dazzling golden reflections on water as the sun dips behind hills",
    description:
      "The wooden deck and western shoreline of Tikkar Taal offer one of the most stunning sunset compositions in Haryana. Sunrays filter through pine silhouettes, casting amber and violet hues over the water.",
    image: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?auto=format&fit=crop&w=900&q=80",
    rating: 4.9,
    reviewsCount: 880,
    location: "West shore, Tikkar Taal",
    priceOrFee: "Included in park entry",
    timing: "Best: 5:00 PM – 6:45 PM",
    badge: "Top Sunset",
    highlights: ["Golden Reflections", "Wooden Jetty Angle", "Silhouette Photography", "Romantic Atmosphere"],
    bestFor: ["couple", "solo", "friends"],
  },
  {
    id: "fort-terrace-viewpoint",
    name: "Morni Fort Bastion Lookout",
    category: "photospots",
    tagline: "Stone arched windows framing cascading Shivalik green valleys",
    description:
      "The ancient stone archways and fortified turrets of Morni Fort frame the green valleys below in a timeless architectural vignette. Especially atmospheric on misty mornings and late afternoons.",
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=900&q=80",
    rating: 4.7,
    reviewsCount: 490,
    location: "Upper Bastion, Morni Fort",
    priceOrFee: "Free",
    timing: "Morning & Late Afternoon",
    badge: "Heritage Frame",
    highlights: ["Historic Stone Arches", "Valley Panorama", "Dramatic Clouds", "Portrait Backdrop"],
    bestFor: ["couple", "solo", "family"],
  },
  {
    id: "hairpin-overlook",
    name: "Morni Ghat Viewpoint (Mile 12)",
    category: "photospots",
    tagline: "Panoramic aerial view of winding hill roads and Panchkula city",
    description:
      "Located at a broad bend on the uphill climb from Chandimandir/Panchkula. Offers a sweeping bird's-eye panorama of the foothills and city lights in the evening.",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=900&q=80",
    rating: 4.6,
    reviewsCount: 340,
    location: "Panchkula-Morni Ghat Road",
    priceOrFee: "Free",
    timing: "Anytime (Safe daylight recommended)",
    badge: "Winding Roads",
    highlights: ["Wide Landscape Shots", "Night City Lights", "Tea Stall Nearby", "Scenic Hairpins"],
    bestFor: ["friends", "solo"],
  },

  // Taxi & Transit
  {
    id: "morni-express-cabs",
    name: "Morni Escape Verified Hill Taxis",
    category: "taxi",
    tagline: "Safe, courteous mountain-expert drivers from Tricity to Morni",
    description:
      "Reliable taxi service connecting Chandigarh, Mohali, Panchkula, and Zirakpur to all destinations in Morni Hills, including Tikkar Taal, Morni Fort, and secluded resorts. Transparent pricing with toll & parking clarity.",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=900&q=80",
    rating: 4.9,
    reviewsCount: 680,
    location: "Chandigarh / Panchkula to Morni Hills",
    priceOrFee: "Starting ₹1,499 one-way / ₹2,400 round-trip",
    timing: "Available 24/7 on call / WhatsApp",
    badge: "Verified Cabs",
    highlights: ["Hill Driving Certified", "AC Hatchbacks & Sedans & Innovas", "Doorstep Pickup", "Zero Hidden Charges"],
    bestFor: ["family", "couple", "friends", "solo"],
    contactPhone: "+91 98888 77777",
  },
];

export const TAXI_PACKAGES: TaxiPackage[] = [
  {
    id: "chandigarh-drop",
    route: "Chandigarh / Panchkula → Morni (One Way)",
    vehicleType: "Sedan (Dzire / Etios)",
    capacity: "4 Passengers",
    price: "₹1,499",
    description: "Point-to-point drop from any location in Chandigarh, Mohali, or Panchkula to your Morni hotel or Tikkar Taal.",
    inclusions: ["Toll taxes included", "Doorstep pickup", "Luggage carrier", "Experienced hill driver"],
    popularFor: "Weekend Travelers & Campers",
  },
  {
    id: "full-day-tour",
    route: "Same Day Morni Sightseeing Tour (Round Trip)",
    vehicleType: "Sedan or SUV (Ertiga / Innova)",
    capacity: "4 to 6 Passengers",
    price: "₹2,699 (Sedan) / ₹3,499 (SUV)",
    description: "Complete full-day private cab covering Tikkar Taal, Morni Fort, Adventure Park, and scenic photo viewpoints with flexible waiting time.",
    inclusions: ["8-10 Hours coverage", "Driver allowance included", "Multiple spot stops", "Pick & Drop at your home"],
    popularFor: "Families & Couples (Day Trip)",
  },
  {
    id: "overnight-camping-trip",
    route: "2-Day Weekend Escape (Overnight Stay Package)",
    vehicleType: "Spacious SUV (Ertiga / Crysta)",
    capacity: "Up to 6 Passengers",
    price: "₹4,299",
    description: "Private cab stays with you overnight. Pick up Day 1 morning, stay overnight in Morni, and return Day 2 evening at your leisure.",
    inclusions: ["Day 1 + Day 2 Full Cab", "Driver night stay included", "Local sightseeing flexible", "All state tolls"],
    popularFor: "Friends Groups & Overnighters",
  },
  {
    id: "local-morni-shuttle",
    route: "Tikkar Taal ⇄ Morni Fort & Viewpoints",
    vehicleType: "Local Hill Taxi (Alto / Swift)",
    capacity: "4 Passengers",
    price: "₹700 - ₹900",
    description: "Local transfers between Tikkar Taal lake, Morni village market, resorts, and Karoh trailhead.",
    inclusions: ["Quick local hops", "Local driver guidance", "No waiting hassles"],
    popularFor: "Local Transfers",
  },
];

export const ITINERARY_DATABASE: Record<string, ItineraryPlan> = {
  // Family - Half Day
  "family_half-day": {
    traveler: "family",
    duration: "half-day",
    title: "Gentle Family Lakeside Getaway (Half Day)",
    overview:
      "A stress-free 4-5 hour outing designed for all ages, featuring scenic driving, leisurely boating at Tikkar Taal, garden strolls, and wholesome hot lunch.",
    estimatedBudget: "₹1,200 – ₹2,000 for family of 4",
    recommendedStay: "Day trip (Optional: Tikkar Lakeview Resort lawn lounge)",
    transportAdvice: "Private car or pre-booked Sedan cab from Panchkula (45 mins drive).",
    packingTips: ["Sun hats & light jackets for kids", "Water bottles", "Comfortable walking shoes", "Camera"],
    timeline: [
      {
        time: "10:30 AM",
        title: "Scenic Hill Drive & Ghat Overlook",
        description: "Climb through winding roads with lush views. Quick 10-minute stop at Mile 12 overlook for a family photograph.",
        location: "Panchkula-Morni Road",
        tip: "Drive at steady speed, winding bends are gentle.",
        iconType: "car",
      },
      {
        time: "11:30 AM",
        title: "Tikkar Taal Boating & Lakeside Walk",
        description: "Arrive at Bada Taal. Take a 4-seater pedal boat ride across the calm water and let kids feed fish or enjoy the shore breeze.",
        location: "Tikkar Taal Jetty",
        tip: "Lifejackets are mandatory and provided for kids.",
        iconType: "sun",
      },
      {
        time: "01:00 PM",
        title: "Wholesome Pahadi Lunch",
        description: "Enjoy hot stuffed paneer paranthas, yellow dal tadka, and steaming kadhi-chawal at the lakeside family restaurant.",
        location: "Lakeview Dhaba",
        tip: "Don't miss the ginger-cardamom tea in earthen kulhads.",
        iconType: "utensils",
      },
      {
        time: "02:30 PM",
        title: "Adventure Park & Children Play Zone",
        description: "Let children enjoy the safe swings, tree house, and mini rope bridges while elders relax on shaded benches.",
        location: "Morni Adventure Park",
        tip: "Combo tickets are available at the counter.",
        iconType: "compass",
      },
      {
        time: "04:00 PM",
        title: "Return Drive to Panchkula / Chandigarh",
        description: "Head back comfortably before sunset to beat any evening traffic.",
        location: "Highway Return",
        iconType: "car",
      },
    ],
  },

  // Family - 1 Day
  "family_1-day": {
    traveler: "family",
    duration: "1-day",
    title: "Complete Morni Heritage & Nature Day Tour (1 Day)",
    overview:
      "A full, balanced day exploring the historical Morni Fort, enjoying Tikkar Taal lake activities, tasting authentic dhabas, and catching the sunset.",
    estimatedBudget: "₹2,500 – ₹4,000 total",
    recommendedStay: "Day trip or Tikkar Tourist Resort for day-use",
    transportAdvice: "Book a round-trip Sedan/SUV taxi or drive family car via Nada Sahib road.",
    packingTips: ["Binoculars for bird watching", "Light sweater for late afternoon", "Power bank", "Cash for entry tickets"],
    timeline: [
      {
        time: "08:30 AM",
        title: "Morning Drive & Breakfast near Nada Sahib",
        description: "Start early from Chandigarh/Panchkula. Optional quick blessing at historic Nada Sahib Gurudwara.",
        location: "Panchkula Foothills",
        iconType: "coffee",
      },
      {
        time: "10:00 AM",
        title: "Morni Fort Exploration & Museum",
        description: "Explore the 17th-century fortress, walk on ancient ramparts, and learn about Shivalik flora and fauna inside the center.",
        location: "Morni Fort",
        tip: "The central courtyard has great spots for group family photos.",
        iconType: "compass",
      },
      {
        time: "12:00 PM",
        title: "Arrive at Tikkar Taal & Boating",
        description: "Move to the lake. Enjoy pedal boating and capture photos with the backdrop of the hillocks.",
        location: "Tikkar Taal",
        iconType: "sun",
      },
      {
        time: "01:30 PM",
        title: "Grand Family Lunch at Tikkar Lakeview",
        description: "Relish rich North Indian fare, fresh salad, tandoori rotis, and ice cream in the garden facing the water.",
        location: "Tikkar Tourist Resort Restaurant",
        iconType: "utensils",
      },
      {
        time: "03:30 PM",
        title: "Adventure Park & Nature Stroll",
        description: "Try safe zipline runs, walk through the pine park pathways, or relax by Chhota Taal.",
        location: "Adventure Park & Chhota Taal",
        iconType: "compass",
      },
      {
        time: "05:30 PM",
        title: "Golden Hour Sunset & Kulhad Chai",
        description: "Sip hot masala chai and pakoras as the sky turns golden over the lake.",
        location: "Sunset Shoreline",
        tip: "Best sunset views are between 5:30 and 6:30 PM.",
        iconType: "camera",
      },
      {
        time: "06:45 PM",
        title: "Scenic Evening Descent",
        description: "Comfortable drive back down to Tricity.",
        location: "Panchkula Route",
        iconType: "car",
      },
    ],
  },

  // Family - 2 Days
  "family_2-days": {
    traveler: "family",
    duration: "2-days",
    title: "Relaxing Hillside Weekend Family Retreat (2 Days / 1 Night)",
    overview:
      "A rejuvenating overnight mountain holiday with resort luxury, bird watching sanctuary, stargazing, bonfires, and leisurely lake mornings.",
    estimatedBudget: "₹7,000 – ₹12,000 for family of 4 (including resort stay & meals)",
    recommendedStay: "The Pine Woods Boutique Retreat or Tikkar Lakeview Resort",
    transportAdvice: "Private SUV or overnight 2-day cab package for effortless luggage transit.",
    packingTips: ["Warm clothes for crisp night temperatures", "Board games for kids", "Good walking shoes", "Medication kit"],
    timeline: [
      {
        time: "Day 1 - 10:00 AM",
        title: "Arrival & Check-in at Hillside Resort",
        description: "Check into cozy wooden cottages surrounded by pine woods. Relax with welcome herbal tea.",
        location: "Morni Resort",
        iconType: "coffee",
      },
      {
        time: "Day 1 - 12:30 PM",
        title: "Tikkar Taal Sightseeing & Boat Ride",
        description: "Spend a leisurely afternoon boating and walking along the water's edge.",
        location: "Tikkar Taal",
        iconType: "sun",
      },
      {
        time: "Day 1 - 04:00 PM",
        title: "Morni Adventure Park Activities",
        description: "Fun family obstacles, tree-walk, and peaceful tea in the pine grove.",
        location: "Adventure Park",
        iconType: "compass",
      },
      {
        time: "Day 1 - 07:30 PM",
        title: "Resort Lawn Bonfire & Barbecue Dinner",
        description: "Gather around crackling fire under a star-filled hill sky with live acoustic music and barbecue snacks.",
        location: "Resort Lawns",
        tip: "Temperatures drop pleasantly at night, wear a sweater.",
        iconType: "moon",
      },
      {
        time: "Day 2 - 07:30 AM",
        title: "Morning Bird Chirping Walk & Berwala Sanctuary",
        description: "Wake up to fresh mountain air. Take a gentle morning nature trail to spot pheasants and native birds.",
        location: "Berwala Sanctuary Trail",
        iconType: "camera",
      },
      {
        time: "Day 2 - 10:00 AM",
        title: "Breakfast & Morni Fort Visit",
        description: "Enjoy hot aloo puri & fresh fruit breakfast, followed by exploring the historic ramparts of Morni Fort.",
        location: "Morni Fort",
        iconType: "utensils",
      },
      {
        time: "Day 2 - 02:00 PM",
        title: "Local Souvenirs & Relaxed Checkout",
        description: "Pick up pure hill honey and local pine artifacts from village shops before heading home refreshed.",
        location: "Morni Market & Descent",
        iconType: "car",
      },
    ],
  },

  // Couple - Half Day
  "couple_half-day": {
    traveler: "couple",
    duration: "half-day",
    title: "Romantic Sunset & Cafe Drive (Half Day)",
    overview:
      "A scenic, romantic afternoon drive through misty hill bends, couple kayaking or quiet boat ride, cozy cafe coffee with valley views, and golden hour magic.",
    estimatedBudget: "₹1,000 – ₹1,800 per couple",
    recommendedStay: "Half-day drive (or day cottage room)",
    transportAdvice: "Bike ride or car drive; smooth roads with scenic photo turnouts.",
    packingTips: ["Sunglasses", "Light jacket", "Camera / Smartphone with portrait mode", "Playlist for drive"],
    timeline: [
      {
        time: "02:00 PM",
        title: "Scenic Hill Climb with Mountain Tunes",
        description: "Drive up the lush green curves as the air turns cool and crisp.",
        location: "Panchkula-Morni Highway",
        iconType: "car",
      },
      {
        time: "03:15 PM",
        title: "Quiet Rowboat or Double Kayak Ride",
        description: "Drift together on the mirror-like waters of Tikkar Taal surrounded by pine-covered hills.",
        location: "Tikkar Taal Lake",
        tip: "Ask the boat operator for the quieter corner near the lotus lilies.",
        iconType: "sun",
      },
      {
        time: "04:45 PM",
        title: "Golden Hour Photography on the Wooden Deck",
        description: "Take romantic sunset portrait shots as the evening sun washes the lake in warm amber tones.",
        location: "Tikkar Taal Sunset Point",
        iconType: "camera",
      },
      {
        time: "06:00 PM",
        title: "Candlelight Coffee & Momos at Cliffside Cafe",
        description: "Sip hazelnut cappuccino and steaming cheese maggie overlooking twinkling city lights in the valley below.",
        location: "The Mist & Maggie Hill Cafe",
        iconType: "coffee",
      },
      {
        time: "07:30 PM",
        title: "Smooth Evening Drive Down",
        description: "Descend comfortably under the starlit sky.",
        location: "Descent Route",
        iconType: "car",
      },
    ],
  },

  // Couple - 1 Day
  "couple_1-day": {
    traveler: "couple",
    duration: "1-day",
    title: "Enchanting Nature & Serenity Day for Couples (1 Day)",
    overview:
      "A full romantic day blending pine forest strolls, panoramic fort ramparts, tranquil lake boating, and a sunset dinner with hill breezes.",
    estimatedBudget: "₹2,200 – ₹3,500 total",
    recommendedStay: "Boutique cottage day stay or return to Tricity",
    transportAdvice: "Private sedan cab or personal vehicle.",
    packingTips: ["Walking shoes for pine trails", "Sunscreen", "Couple outfits for aesthetic photos"],
    timeline: [
      {
        time: "09:30 AM",
        title: "Morning Drive & Pine Forest Nature Trail",
        description: "Arrive in Morni and take an intimate 1-hour walk on the pine needle carpeted forest path.",
        location: "Chir Pine Forest Trail",
        iconType: "compass",
      },
      {
        time: "11:30 AM",
        title: "Morni Fort Ramparts & Valley Viewpoints",
        description: "Hold hands through the arched heritage corridors with 360-degree viewpoints over the Shivalik ranges.",
        location: "Morni Fort",
        tip: "The east bastion has the most picturesque stone frames.",
        iconType: "camera",
      },
      {
        time: "01:00 PM",
        title: "Hilltop Lunch with Valley Vista",
        description: "Indulge in freshly prepared pahadi specialities and creamy paneer dishes at a scenic restaurant terrace.",
        location: "The Pine Woods Restaurant",
        iconType: "utensils",
      },
      {
        time: "03:00 PM",
        title: "Tikkar Taal Boating & Secluded Shoreline",
        description: "Enjoy peaceful 2-seater pedal boating on the lake and stroll to the quiet Chhota Taal.",
        location: "Tikkar Taal",
        iconType: "sun",
      },
      {
        time: "05:30 PM",
        title: "Sunset High Tea by the Lake",
        description: "Sip steaming ginger chai with crunchy pakoras as the sun sets over the lake reflection.",
        location: "Tikkar Lakefront Lawn",
        iconType: "coffee",
      },
      {
        time: "07:00 PM",
        title: "Romantic Dinner & Pleasant Drive Home",
        description: "End the memorable day with dinner under fairy lights before returning.",
        location: "Cliffside Highway Cafe",
        iconType: "moon",
      },
    ],
  },

  // Couple - 2 Days
  "couple_2-days": {
    traveler: "couple",
    duration: "2-days",
    title: "Romantic Luxury Glamping & Cottage Escape (2 Days / 1 Night)",
    overview:
      "The ultimate romantic weekend getaway: private wooden chalet or luxury lakefront dome tent, private bonfire, stargazing, candle-lit dining, and misty mountain mornings.",
    estimatedBudget: "₹6,500 – ₹11,000 for couple (including luxury stay, meals & activities)",
    recommendedStay: "The Pine Woods Boutique Retreat OR Tikkar Glamping Domes",
    transportAdvice: "Dedicated cab or personal car for freedom to roam.",
    packingTips: ["Cozy sweaters / shawl", "Favorite wine or beverages (where permitted)", "Camera & tripod", "Warm socks"],
    timeline: [
      {
        time: "Day 1 - 11:00 AM",
        title: "Check-in to Luxury Hill Cottage",
        description: "Unpack in your private chalet with wooden interior and a private balcony opening to endless pine forests.",
        location: "The Pine Woods Retreat",
        iconType: "coffee",
      },
      {
        time: "Day 1 - 01:00 PM",
        title: "Alfresco Balcony Lunch",
        description: "Enjoy gourmet lunch on your wooden deck listening to singing mountain thrushes.",
        location: "Resort Balcony",
        iconType: "utensils",
      },
      {
        time: "Day 1 - 03:30 PM",
        title: "Tikkar Taal Private Boat Ride",
        description: "Head to Tikkar Taal for serene boating, walking hand-in-hand along the lakeside promenade.",
        location: "Tikkar Taal",
        iconType: "sun",
      },
      {
        time: "Day 1 - 06:00 PM",
        title: "Sunset Golden Hour Deck Photos",
        description: "Capture unforgettable couple memories against the crimson and gold sky.",
        location: "Tikkar Sunset Deck",
        iconType: "camera",
      },
      {
        time: "Day 1 - 08:00 PM",
        title: "Private Bonfire & Candlelight Dinner",
        description: "Cozy up next to your private campfire with barbecue skewers, soothing music, and stargazing.",
        location: "Private Bonfire Pit",
        tip: "Clear mountain nights offer brilliant views of constellations.",
        iconType: "moon",
      },
      {
        time: "Day 2 - 08:00 AM",
        title: "Misty Morning Balcony Tea",
        description: "Watch clouds drift below your balcony while enjoying freshly brewed Darjeeling tea.",
        location: "Cottage Deck",
        iconType: "coffee",
      },
      {
        time: "Day 2 - 10:30 AM",
        title: "Morni Fort Exploration & Village Craft Walk",
        description: "Tour the royal bastions and shop for local pure honey and herbal mountain teas.",
        location: "Morni Fort & Village",
        iconType: "compass",
      },
      {
        time: "Day 2 - 01:30 PM",
        title: "Farewell Lunch & Sweet Drive Home",
        description: "Savor a leisurely lunch before driving back down with refreshed minds.",
        location: "Hilltop Dhaba",
        iconType: "car",
      },
    ],
  },

  // Friends - Half Day
  "friends_half-day": {
    traveler: "friends",
    duration: "half-day",
    title: "Thrilling Roadtrip & Lake Vibes (Half Day)",
    overview:
      "A fast-paced, high-energy hill sprint with your squad: scenic bike/car rally, thrilling zip-line, spicy roadside maggie, and lake chill.",
    estimatedBudget: "₹600 – ₹1,000 per person",
    recommendedStay: "Half-day trip",
    transportAdvice: "Motorcycles / convoy of cars; great winding ghats.",
    packingTips: ["Riding gear / sunglasses", "Bluetooth speaker", "GoPro / action camera", "Cash for tickets"],
    timeline: [
      {
        time: "01:00 PM",
        title: "Squad Gathering & Ghat Road Convoy",
        description: "Meet up at Panchkula checkpoint and cruise up the scenic twists with panoramic valley turns.",
        location: "Panchkula-Morni Road",
        iconType: "car",
      },
      {
        time: "02:30 PM",
        title: "Adventure Park Zipline & High Rope Challenges",
        description: "Challenge your friends to the high-wire zipline, Burma bridge crossing, and artificial rock climb.",
        location: "Morni Adventure Park",
        tip: "Go for the group combo pass for maximum savings.",
        iconType: "compass",
      },
      {
        time: "04:30 PM",
        title: "Speed Boating & Chilling at Tikkar Taal",
        description: "Hop on the high-speed motorboat across the lake, followed by chilling on the lush grass banks.",
        location: "Tikkar Taal",
        iconType: "sun",
      },
      {
        time: "06:00 PM",
        title: "Maggie & Chai Feast at Ghat Cliff Cafe",
        description: "Order platters of cheese-loaded mountain maggie, crispy onion pakoras, and endless cups of ginger chai.",
        location: "The Mist & Maggie Hill Cafe",
        iconType: "coffee",
      },
      {
        time: "07:30 PM",
        title: "Night Drive Back to City",
        description: "Cruise down the lit ghats back into the city lights.",
        location: "Descent Route",
        iconType: "car",
      },
    ],
  },

  // Friends - 1 Day
  "friends_1-day": {
    traveler: "friends",
    duration: "1-day",
    title: "Epic Shivalik Adventure & Summit Quest (1 Day)",
    overview:
      "An action-packed day: Trekking Haryana's highest point (Karoh Peak), conquering the adventure park, boating, and feast at authentic Punjabi dhabas.",
    estimatedBudget: "₹1,200 – ₹2,000 per person",
    recommendedStay: "Day trip (or extend to camping)",
    transportAdvice: "Self-driven car / SUV or group cab.",
    packingTips: ["Trekking shoes with grip", "Plenty of water bottles", "Sunscreen & caps", "First aid essentials"],
    timeline: [
      {
        time: "07:30 AM",
        title: "Early Bird Squad Convoy to Karoh Peak",
        description: "Start early while mountain air is cold and fresh. Head straight to the Karoh Peak trailhead.",
        location: "Bhoj Dharti Base",
        iconType: "car",
      },
      {
        time: "09:00 AM",
        title: "Trek to Karoh Peak Summit (4,813 ft)",
        description: "Hike through dense pine forests to conquer the highest point in Haryana. Celebrate summit selfies at the boundary marker.",
        location: "Karoh Peak Summit",
        tip: "Trail is 2.5 km uphill; takes around 1.5 hours to climb.",
        iconType: "compass",
      },
      {
        time: "12:00 PM",
        title: "Hearty Dhaba Feast at Tikkar Taal",
        description: "Replenish energy with piping hot butter paranthas, rajma chawal, and sweet lassi.",
        location: "Lakeview Dhaba",
        iconType: "utensils",
      },
      {
        time: "01:30 PM",
        title: "Morni Adventure Park Challenges",
        description: "Compete with your friends on ziplines, rope net climbs, and commando obstacles.",
        location: "Adventure Park",
        iconType: "compass",
      },
      {
        time: "03:30 PM",
        title: "Tikkar Taal Lake Boating & Photography",
        description: "Group paddle boat races and aesthetic squad reels at the lake edge.",
        location: "Tikkar Taal",
        iconType: "sun",
      },
      {
        time: "05:30 PM",
        title: "Morni Fort Sunset Viewpoint",
        description: "Climb the ancient ramparts for sweeping sunset panoramic views across the Shivalik hills.",
        location: "Morni Fort Bastions",
        iconType: "camera",
      },
      {
        time: "07:00 PM",
        title: "Dinner Stop & Drive Back",
        description: "Late evening dinner on the highway before heading back to Chandigarh / Panchkula.",
        location: "Highway Dhaba",
        iconType: "car",
      },
    ],
  },

  // Friends - 2 Days
  "friends_2-days": {
    traveler: "friends",
    duration: "2-days",
    title: "Lakeside Camping, Bonfire & Trekking Weekend (2 Days / 1 Night)",
    overview:
      "The quintessential friends weekend: Lakeside tent camping, night bonfire with acoustic jams & barbecue, Karoh Peak summit trek, and endless fun.",
    estimatedBudget: "₹3,000 – ₹4,500 per person (including camp, all meals, bonfire & activities)",
    recommendedStay: "Tikkar Taal Lakeside Glamping OR Pine Wilderness Camp",
    transportAdvice: "Rent an SUV or travel in carpool convoy with camping luggage.",
    packingTips: ["Warm jackets & beanies for night", "Torch / Headlamp", "Bluetooth speaker", "Power banks", "Mosquito repellent"],
    timeline: [
      {
        time: "Day 1 - 01:00 PM",
        title: "Squad Arrival & Camp Check-in",
        description: "Pitch your dome tents or check into lakeside safari tents right on the shore of Tikkar Taal.",
        location: "Tikkar Lakeside Camp",
        iconType: "compass",
      },
      {
        time: "Day 1 - 03:00 PM",
        title: "Lake Boating & Adventure Park Action",
        description: "Speed boating on the lake followed by adrenaline-pumping ziplines at the adventure park.",
        location: "Tikkar Taal & Adventure Zone",
        iconType: "sun",
      },
      {
        time: "Day 1 - 06:00 PM",
        title: "Sunset Chilling by Camp Chairs",
        description: "Relax by the water with tea and pakoras watching the twilight sky.",
        location: "Campfront Shore",
        iconType: "camera",
      },
      {
        time: "Day 1 - 08:00 PM",
        title: "Night Bonfire, BBQ & Stargazing",
        description: "The highlight! Campfire under the starry sky, roasted paneer/chicken tikkas, guitar sing-alongs, and late-night talks.",
        location: "Camp Bonfire Ground",
        tip: "Carry your warm fleece; lake breeze gets quite chilly at night.",
        iconType: "moon",
      },
      {
        time: "Day 2 - 07:00 AM",
        title: "Sunrise Over Lake & Fresh Omelette Breakfast",
        description: "Catch the morning mist lifting from the lake surface while sipping freshly brewed hot tea.",
        location: "Camp Dining Mess",
        iconType: "coffee",
      },
      {
        time: "Day 2 - 09:00 AM",
        title: "Karoh Peak Summit Hike (Haryana High Point)",
        description: "Conquer the 4,813 ft peak through fragrant pine woods and take victorious group photos.",
        location: "Karoh Peak Trail",
        iconType: "compass",
      },
      {
        time: "Day 2 - 01:30 PM",
        title: "Morni Fort Heritage Tour & Highway Dhaba Feast",
        description: "Quick visit to historical Morni Fort, followed by a heavy tandoori lunch before driving home.",
        location: "Morni Fort & Dhaba",
        iconType: "utensils",
      },
    ],
  },

  // Solo - Half Day
  "solo_half-day": {
    traveler: "solo",
    duration: "half-day",
    title: "Quiet Mountain Reconnect & Solitude Drive (Half Day)",
    overview:
      "A peaceful escape from city noise: scenic hill ride, reading or journaling by the lake, pine forest quietude, and a comforting warm cup of tea.",
    estimatedBudget: "₹500 – ₹900",
    recommendedStay: "Day trip",
    transportAdvice: "Personal bike or motorcycle ride; therapeutic winding roads.",
    packingTips: ["A good book or journal", "Earphones / noise cancelling headphones", "Camera", "Light windcheater"],
    timeline: [
      {
        time: "02:00 PM",
        title: "Mindful Solo Ride up the Shivaliks",
        description: "Leave the city bustle behind as you cruise into cool pine breezes and quiet winding roads.",
        location: "Panchkula-Morni Route",
        iconType: "car",
      },
      {
        time: "03:30 PM",
        title: "Solitary Lake Stroll & Journaling at Chhota Taal",
        description: "Walk past the crowded spots to the quiet shores of Chhota Taal. Sit under the pine shade to read or meditate.",
        location: "Chhota Taal Shore",
        tip: "The shaded bank opposite the boat jetty is exceptionally calm.",
        iconType: "sun",
      },
      {
        time: "05:15 PM",
        title: "Golden Hour Photography Walk",
        description: "Capture solitary portraits of nature, reflections on the ripples, and shifting light.",
        location: "Tikkar Taal Shoreline",
        iconType: "camera",
      },
      {
        time: "06:15 PM",
        title: "Tea & Mountain Maggi at Cliffside Perch",
        description: "Enjoy a silent hot cup of adrak chai while watching dusk settle over the valleys.",
        location: "The Mist Cafe",
        iconType: "coffee",
      },
      {
        time: "07:15 PM",
        title: "Peaceful Ride Back Down",
        description: "Head back to the city thoroughly recharged and peaceful.",
        location: "Return Route",
        iconType: "car",
      },
    ],
  },

  // Solo - 1 Day
  "solo_1-day": {
    traveler: "solo",
    duration: "1-day",
    title: "Solo Trekker & Heritage Discovery Day (1 Day)",
    overview:
      "A soulful day for the independent explorer: summiting Karoh Peak, wandering ancient Morni Fort ramparts, bird watching at Berwala, and lake contemplation.",
    estimatedBudget: "₹1,000 – ₹1,800",
    recommendedStay: "Day trip (or Shivalik Homestay)",
    transportAdvice: "Bike or solo bus/shared cab from Panchkula bus stand.",
    packingTips: ["Daypack with 2L water", "Trekking poles (optional)", "Power bank", "Cash in small denominations"],
    timeline: [
      {
        time: "08:00 AM",
        title: "Morning Drive & Solo Karoh Peak Trek",
        description: "Arrive early and take the scenic 2.5 km trek up through Chir pines to Haryana's highest elevation.",
        location: "Karoh Peak Summit",
        tip: "Start early to enjoy the mountain trail in absolute tranquility.",
        iconType: "compass",
      },
      {
        time: "11:30 AM",
        title: "Morni Fort & Wildlife Center Visit",
        description: "Wander through the peaceful 17th-century fort courtyard, read the historical panels, and take in the panoramic views.",
        location: "Morni Fort",
        iconType: "camera",
      },
      {
        time: "01:00 PM",
        title: "Authentic Local Pahadi Lunch",
        description: "Eat like a local at a village dhaba: hot missi roti, freshly made kadhi, and spicy garlic chutney.",
        location: "Village Dhaba",
        iconType: "utensils",
      },
      {
        time: "02:30 PM",
        title: "Berwala Bird Sanctuary Walk",
        description: "Quietly spot exotic pheasants, junglefowl, and vibrant mountain songbirds through the dense tree cover.",
        location: "Berwala Sanctuary",
        iconType: "compass",
      },
      {
        time: "04:30 PM",
        title: "Tikkar Taal Lake Stroll & Sunset Meditation",
        description: "Sit by the water as ripples gleam under the setting sun. Unwind with hot chai.",
        location: "Tikkar Taal",
        iconType: "sun",
      },
      {
        time: "06:30 PM",
        title: "Return Journey with Renewed Energy",
        description: "Descend safely back to Panchkula / Chandigarh.",
        location: "Return Route",
        iconType: "car",
      },
    ],
  },

  // Solo - 2 Days
  "solo_2-days": {
    traveler: "solo",
    duration: "2-days",
    title: "Mountain Retreat & Homestay Immersive (2 Days / 1 Night)",
    overview:
      "A deep immersion into hill life: Stay at a welcoming village homestay, organic home-cooked food, deep pine forest hikes, stargazing, and total digital detox.",
    estimatedBudget: "₹2,500 – ₹4,000 (including homestay, all meals & trails)",
    recommendedStay: "Shivalik Crest Homestay OR Pine Wilderness Eco Camp",
    transportAdvice: "Bike or direct taxi for luggage flexibility.",
    packingTips: ["Notebook / sketchbook", "Warm fleece", "Sturdy hiking shoes", "Reusable water bottle"],
    timeline: [
      {
        time: "Day 1 - 10:00 AM",
        title: "Check-in at Shivalik Crest Homestay",
        description: "Meet your welcoming local hosts. Settle into your mountain-view room with herbal tea.",
        location: "Bhoj Dharti Homestay",
        iconType: "coffee",
      },
      {
        time: "Day 1 - 12:00 PM",
        title: "Pine Forest Trail to Hidden Hill Springs",
        description: "Hike through secluded pine trails with directions from your host to discover hidden freshwater springs.",
        location: "Upper Pine Trail",
        iconType: "compass",
      },
      {
        time: "Day 1 - 03:30 PM",
        title: "Tikkar Taal Solitary Boating & Lake Exploration",
        description: "Paddle across the quiet lake waters and visit the picturesque Chhota Taal.",
        location: "Tikkar Taal",
        iconType: "sun",
      },
      {
        time: "Day 1 - 07:30 PM",
        title: "Homestyle Organic Pahadi Dinner & Rooftop Stargazing",
        description: "Eat freshly cooked organic vegetables, farm rotis, and dal made on traditional wood fire. Look up at the Milky Way.",
        location: "Homestay Courtyard",
        tip: "Zero light pollution makes stargazing exceptional here.",
        iconType: "moon",
      },
      {
        time: "Day 2 - 06:30 AM",
        title: "Sunrise Bird Watching & Fresh Tea",
        description: "Wake up to mist rolling over the hills and the song of Himalayan bulbuls.",
        location: "Village Ridge",
        iconType: "camera",
      },
      {
        time: "Day 2 - 08:30 AM",
        title: "Karoh Peak Summit Trek",
        description: "Hike to Haryana's highest crest with crisp morning clarity and clear views into Himachal.",
        location: "Karoh Peak",
        iconType: "compass",
      },
      {
        time: "Day 2 - 01:00 PM",
        title: "Farewell Meal & Mountain Honey Shopping",
        description: "Buy pure forest honey directly from local beekeepers before returning invigorated.",
        location: "Homestay & Market",
        iconType: "utensils",
      },
    ],
  },
};

export const MORNI_FAQS = [
  {
    q: "How far is Morni Hills from Chandigarh and Panchkula?",
    a: "Morni Hills is approximately 42 km from Chandigarh and 35 km from Panchkula. By car or taxi, it takes around 1 hour to 1 hour 15 minutes through scenic, well-paved ghat roads.",
  },
  {
    q: "What is the best time to visit Morni Hills?",
    a: "Morni Hills is a year-round weekend getaway. September to March offers the most pleasant, crisp mountain weather (15°C to 24°C). Monsoons (July-August) make the hills lush green with waterfalls, but caution is advised on winding roads.",
  },
  {
    q: "Is boating open at Tikkar Taal?",
    a: "Yes! Boating is open all 7 days from 9:00 AM to 6:00 PM. Both pedal boats and motorboats are available with life jackets provided.",
  },
  {
    q: "Are there camping facilities available in Morni?",
    a: "Yes, there are organized lakeside glamping camps right by Tikkar Taal and wilderness eco-camps in the pine forests offering dome tents, bonfires, and barbecue packages.",
  },
  {
    q: "How is mobile network connectivity in Morni Hills?",
    a: "Jio and Airtel have good 4G coverage in Morni village, Tikkar Taal, and along the main highway. However, deep inside forest trails or near Karoh Peak, signal can occasionally fluctuate.",
  },
];

