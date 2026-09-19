"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import {
  Search,
  Sparkles,
  MapPin,
  Clock,
  Star,
  ArrowRight,
  Phone,
  ExternalLink,
  ChevronDown,
  Calendar,
  Compass,
  Car,
  CloudSun,
  MessageSquareShare,
  X,
  Copy,
  Check,
  Share2,
  Coffee,
  Sun,
  Camera,
  Moon,
  Utensils,
  CheckCircle,
  ShieldCheck,
  AlertTriangle,
  Signal,
  CreditCard,
  SunMedium,
  CheckCircle2,
  HelpCircle,
  Hotel,
  Menu,
} from "lucide-react";

// ==========================================
// 1. DATA STRUCTURES & MOCK DATA
// ==========================================

interface ExploreItem {
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
  contactPhone?: string;
}

interface TaxiPackage {
  id: string;
  route: string;
  vehicleType: string;
  capacity: string;
  price: string;
  description: string;
  inclusions: string[];
  popularFor: string;
}

interface ItineraryTimeSlot {
  time: string;
  title: string;
  description: string;
  location: string;
  tip?: string;
  iconType: "coffee" | "sun" | "compass" | "camera" | "moon" | "car" | "utensils";
}

interface ItineraryPlan {
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

const EXPLORE_CATEGORIES = [
  { id: "places", label: "Places", icon: "🏞️" },
  { id: "stay", label: "Stay", icon: "🏨" },
  { id: "food", label: "Food", icon: "🍴" },
  { id: "camping", label: "Camping", icon: "🏕️" },
  { id: "activities", label: "Activities", icon: "🥾" },
  { id: "photospots", label: "Photo Spots", icon: "📸" },
  { id: "taxi", label: "Taxi", icon: "🚕" },
] as const;

const EXPLORE_ITEMS: ExploreItem[] = [
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

const TAXI_PACKAGES: TaxiPackage[] = [
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

const ITINERARY_DATABASE: Record<string, ItineraryPlan> = {
  "family_half-day": {
    traveler: "family",
    duration: "half-day",
    title: "Gentle Family Lakeside Getaway (Half Day)",
    overview: "A stress-free 4-5 hour outing designed for all ages, featuring scenic driving, leisurely boating at Tikkar Taal, garden strolls, and wholesome hot lunch.",
    estimatedBudget: "₹1,200 – ₹2,000 for family of 4",
    recommendedStay: "Day trip (Optional: Tikkar Lakeview Resort lawn lounge)",
    transportAdvice: "Private car or pre-booked Sedan cab from Panchkula (45 mins drive).",
    packingTips: ["Sun hats & light jackets for kids", "Water bottles", "Comfortable walking shoes", "Camera"],
    timeline: [
      { time: "10:30 AM", title: "Scenic Hill Drive & Ghat Overlook", description: "Climb through winding roads with lush views. Quick stop at Mile 12 overlook for a family photograph.", location: "Panchkula-Morni Road", tip: "Drive at steady speed, winding bends are gentle.", iconType: "car" },
      { time: "11:30 AM", title: "Tikkar Taal Boating & Lakeside Walk", description: "Arrive at Bada Taal. Take a 4-seater pedal boat ride across the calm water and let kids enjoy the shore breeze.", location: "Tikkar Taal Jetty", tip: "Lifejackets are mandatory and provided for kids.", iconType: "sun" },
      { time: "01:00 PM", title: "Wholesome Pahadi Lunch", description: "Enjoy hot stuffed paneer paranthas, yellow dal tadka, and steaming kadhi-chawal at the lakeside family restaurant.", location: "Lakeview Dhaba", tip: "Don't miss the ginger-cardamom tea in earthen kulhads.", iconType: "utensils" },
      { time: "02:30 PM", title: "Adventure Park & Children Play Zone", description: "Let children enjoy the safe swings, tree house, and mini rope bridges while elders relax on shaded benches.", location: "Morni Adventure Park", tip: "Combo tickets are available at the counter.", iconType: "compass" },
      { time: "04:00 PM", title: "Return Drive to Panchkula / Chandigarh", description: "Head back comfortably before sunset to beat any evening traffic.", location: "Highway Return", iconType: "car" },
    ],
  },
  "family_1-day": {
    traveler: "family",
    duration: "1-day",
    title: "Complete Morni Heritage & Nature Day Tour (1 Day)",
    overview: "A full, balanced day exploring the historical Morni Fort, enjoying Tikkar Taal lake activities, tasting authentic dhabas, and catching the sunset.",
    estimatedBudget: "₹2,500 – ₹4,000 total",
    recommendedStay: "Day trip or Tikkar Tourist Resort for day-use",
    transportAdvice: "Book a round-trip Sedan/SUV taxi or drive family car via Nada Sahib road.",
    packingTips: ["Binoculars for bird watching", "Light sweater for late afternoon", "Power bank", "Cash for entry tickets"],
    timeline: [
      { time: "08:30 AM", title: "Morning Drive & Breakfast near Nada Sahib", description: "Start early from Chandigarh/Panchkula. Optional quick blessing at historic Nada Sahib Gurudwara.", location: "Panchkula Foothills", iconType: "coffee" },
      { time: "10:00 AM", title: "Morni Fort Exploration & Museum", description: "Explore the 17th-century fortress, walk on ancient ramparts, and learn about Shivalik flora and fauna.", location: "Morni Fort", tip: "The central courtyard has great spots for group family photos.", iconType: "compass" },
      { time: "12:00 PM", title: "Arrive at Tikkar Taal & Boating", description: "Move to the lake. Enjoy pedal boating and capture photos with the backdrop of the hillocks.", location: "Tikkar Taal", iconType: "sun" },
      { time: "01:30 PM", title: "Grand Family Lunch at Tikkar Lakeview", description: "Relish rich North Indian fare, fresh salad, tandoori rotis, and ice cream in the garden facing the water.", location: "Tikkar Tourist Resort Restaurant", iconType: "utensils" },
      { time: "03:30 PM", title: "Adventure Park & Nature Stroll", description: "Try safe zipline runs, walk through the pine park pathways, or relax by Chhota Taal.", location: "Adventure Park & Chhota Taal", iconType: "compass" },
      { time: "05:30 PM", title: "Golden Hour Sunset & Kulhad Chai", description: "Sip hot masala chai and pakoras as the sky turns golden over the lake.", location: "Sunset Shoreline", tip: "Best sunset views are between 5:30 and 6:30 PM.", iconType: "camera" },
      { time: "06:45 PM", title: "Scenic Evening Descent", description: "Comfortable drive back down to Tricity.", location: "Panchkula Route", iconType: "car" },
    ],
  },
  "family_2-days": {
    traveler: "family",
    duration: "2-days",
    title: "Relaxing Hillside Weekend Family Retreat (2 Days / 1 Night)",
    overview: "A rejuvenating overnight mountain holiday with resort luxury, bird watching sanctuary, stargazing, bonfires, and leisurely lake mornings.",
    estimatedBudget: "₹7,000 – ₹12,000 for family of 4 (including resort stay & meals)",
    recommendedStay: "The Pine Woods Boutique Retreat or Tikkar Lakeview Resort",
    transportAdvice: "Private SUV or overnight 2-day cab package for effortless luggage transit.",
    packingTips: ["Warm clothes for crisp night temperatures", "Board games for kids", "Good walking shoes", "Medication kit"],
    timeline: [
      { time: "Day 1 - 10:00 AM", title: "Arrival & Check-in at Hillside Resort", description: "Check into cozy wooden cottages surrounded by pine woods. Relax with welcome herbal tea.", location: "Morni Resort", iconType: "coffee" },
      { time: "Day 1 - 12:30 PM", title: "Tikkar Taal Sightseeing & Boat Ride", description: "Spend a leisurely afternoon boating and walking along the water's edge.", location: "Tikkar Taal", iconType: "sun" },
      { time: "Day 1 - 04:00 PM", title: "Morni Adventure Park Activities", description: "Fun family obstacles, tree-walk, and peaceful tea in the pine grove.", location: "Adventure Park", iconType: "compass" },
      { time: "Day 1 - 07:30 PM", title: "Resort Lawn Bonfire & Barbecue Dinner", description: "Gather around crackling fire under a star-filled hill sky with live acoustic music and barbecue snacks.", location: "Resort Lawns", tip: "Temperatures drop pleasantly at night, wear a sweater.", iconType: "moon" },
      { time: "Day 2 - 07:30 AM", title: "Morning Bird Chirping Walk & Berwala Sanctuary", description: "Wake up to fresh mountain air. Take a gentle morning nature trail to spot pheasants and native birds.", location: "Berwala Sanctuary Trail", iconType: "camera" },
      { time: "Day 2 - 10:00 AM", title: "Breakfast & Morni Fort Visit", description: "Enjoy hot aloo puri & fresh fruit breakfast, followed by exploring the historic ramparts of Morni Fort.", location: "Morni Fort", iconType: "utensils" },
      { time: "Day 2 - 02:00 PM", title: "Local Souvenirs & Relaxed Checkout", description: "Pick up pure hill honey and local pine artifacts from village shops before heading home.", location: "Morni Market & Descent", iconType: "car" },
    ],
  },
  "couple_half-day": {
    traveler: "couple",
    duration: "half-day",
    title: "Romantic Sunset & Cafe Drive (Half Day)",
    overview: "A scenic, romantic afternoon drive through misty hill bends, couple kayaking or quiet boat ride, cozy cafe coffee with valley views, and golden hour magic.",
    estimatedBudget: "₹1,000 – ₹1,800 per couple",
    recommendedStay: "Half-day drive (or day cottage room)",
    transportAdvice: "Bike ride or car drive; smooth roads with scenic photo turnouts.",
    packingTips: ["Sunglasses", "Light jacket", "Camera / Smartphone with portrait mode", "Playlist for drive"],
    timeline: [
      { time: "02:00 PM", title: "Scenic Hill Climb with Mountain Tunes", description: "Drive up the lush green curves as the air turns cool and crisp.", location: "Panchkula-Morni Highway", iconType: "car" },
      { time: "03:15 PM", title: "Quiet Rowboat or Double Kayak Ride", description: "Drift together on the mirror-like waters of Tikkar Taal surrounded by pine-covered hills.", location: "Tikkar Taal Lake", tip: "Ask the boat operator for the quieter corner near the lotus lilies.", iconType: "sun" },
      { time: "04:45 PM", title: "Golden Hour Photography on the Wooden Deck", description: "Take romantic sunset portrait shots as the evening sun washes the lake in warm amber tones.", location: "Tikkar Taal Sunset Point", iconType: "camera" },
      { time: "06:00 PM", title: "Candlelight Coffee & Momos at Cliffside Cafe", description: "Sip hazelnut cappuccino and steaming cheese maggie overlooking twinkling city lights in the valley below.", location: "The Mist & Maggie Hill Cafe", iconType: "coffee" },
      { time: "07:30 PM", title: "Smooth Evening Drive Down", description: "Descend comfortably under the starlit sky.", location: "Descent Route", iconType: "car" },
    ],
  },
  "couple_1-day": {
    traveler: "couple",
    duration: "1-day",
    title: "Enchanting Nature & Serenity Day for Couples (1 Day)",
    overview: "A full romantic day blending pine forest strolls, panoramic fort ramparts, tranquil lake boating, and a sunset dinner with hill breezes.",
    estimatedBudget: "₹2,200 – ₹3,500 total",
    recommendedStay: "Boutique cottage day stay or return to Tricity",
    transportAdvice: "Private sedan cab or personal vehicle.",
    packingTips: ["Walking shoes for pine trails", "Sunscreen", "Couple outfits for aesthetic photos"],
    timeline: [
      { time: "09:30 AM", title: "Morning Drive & Pine Forest Nature Trail", description: "Arrive in Morni and take an intimate 1-hour walk on the pine needle carpeted forest path.", location: "Chir Pine Forest Trail", iconType: "compass" },
      { time: "11:30 AM", title: "Morni Fort Ramparts & Valley Viewpoints", description: "Hold hands through the arched heritage corridors with 360-degree viewpoints over the Shivalik ranges.", location: "Morni Fort", tip: "The east bastion has the most picturesque stone frames.", iconType: "camera" },
      { time: "01:00 PM", title: "Hilltop Lunch with Valley Vista", description: "Indulge in freshly prepared pahadi specialities and creamy paneer dishes at a scenic restaurant terrace.", location: "The Pine Woods Restaurant", iconType: "utensils" },
      { time: "03:00 PM", title: "Tikkar Taal Boating & Secluded Shoreline", description: "Enjoy peaceful 2-seater pedal boating on the lake and stroll to the quiet Chhota Taal.", location: "Tikkar Taal", iconType: "sun" },
      { time: "05:30 PM", title: "Sunset High Tea by the Lake", description: "Sip steaming ginger chai with crunchy pakoras as the sun sets over the lake reflection.", location: "Tikkar Lakefront Lawn", iconType: "coffee" },
      { time: "07:00 PM", title: "Romantic Dinner & Pleasant Drive Home", description: "End the memorable day with dinner under fairy lights before returning.", location: "Cliffside Highway Cafe", iconType: "moon" },
    ],
  },
  "couple_2-days": {
    traveler: "couple",
    duration: "2-days",
    title: "Romantic Luxury Glamping & Cottage Escape (2 Days / 1 Night)",
    overview: "The ultimate romantic weekend getaway: private wooden chalet or luxury lakefront dome tent, private bonfire, stargazing, candle-lit dining, and misty mountain mornings.",
    estimatedBudget: "₹6,500 – ₹11,000 for couple (including luxury stay, meals & activities)",
    recommendedStay: "The Pine Woods Boutique Retreat OR Tikkar Glamping Domes",
    transportAdvice: "Dedicated cab or personal car for freedom to roam.",
    packingTips: ["Cozy sweaters / shawl", "Favorite warm beverages", "Camera & tripod", "Warm socks"],
    timeline: [
      { time: "Day 1 - 11:00 AM", title: "Check-in to Luxury Hill Cottage", description: "Unpack in your private chalet with wooden interior and a private balcony opening to endless pine forests.", location: "The Pine Woods Retreat", iconType: "coffee" },
      { time: "Day 1 - 01:00 PM", title: "Alfresco Balcony Lunch", description: "Enjoy gourmet lunch on your wooden deck listening to singing mountain thrushes.", location: "Resort Balcony", iconType: "utensils" },
      { time: "Day 1 - 03:30 PM", title: "Tikkar Taal Private Boat Ride", description: "Head to Tikkar Taal for serene boating, walking hand-in-hand along the lakeside promenade.", location: "Tikkar Taal", iconType: "sun" },
      { time: "Day 1 - 06:00 PM", title: "Sunset Golden Hour Deck Photos", description: "Capture unforgettable couple memories against the crimson and gold sky.", location: "Tikkar Sunset Deck", iconType: "camera" },
      { time: "Day 1 - 08:00 PM", title: "Private Bonfire & Candlelight Dinner", description: "Cozy up next to your private campfire with barbecue skewers, soothing music, and stargazing.", location: "Private Bonfire Pit", tip: "Clear mountain nights offer brilliant views of constellations.", iconType: "moon" },
      { time: "Day 2 - 08:00 AM", title: "Misty Morning Balcony Tea", description: "Watch clouds drift below your balcony while enjoying freshly brewed tea.", location: "Cottage Deck", iconType: "coffee" },
      { time: "Day 2 - 10:30 AM", title: "Morni Fort Exploration & Village Craft Walk", description: "Tour the royal bastions and shop for local pure honey and herbal mountain teas.", location: "Morni Fort & Village", iconType: "compass" },
      { time: "Day 2 - 01:30 PM", title: "Farewell Lunch & Sweet Drive Home", description: "Savor a leisurely lunch before driving back down with refreshed minds.", location: "Hilltop Dhaba", iconType: "car" },
    ],
  },
  "friends_half-day": {
    traveler: "friends",
    duration: "half-day",
    title: "Thrilling Roadtrip & Lake Vibes (Half Day)",
    overview: "A fast-paced, high-energy hill sprint with your squad: scenic bike/car rally, thrilling zip-line, spicy roadside maggie, and lake chill.",
    estimatedBudget: "₹600 – ₹1,000 per person",
    recommendedStay: "Half-day trip",
    transportAdvice: "Motorcycles / convoy of cars; great winding ghats.",
    packingTips: ["Riding gear / sunglasses", "Bluetooth speaker", "GoPro / action camera", "Cash for tickets"],
    timeline: [
      { time: "01:00 PM", title: "Squad Gathering & Ghat Road Convoy", description: "Meet up at Panchkula checkpoint and cruise up the scenic twists with panoramic valley turns.", location: "Panchkula-Morni Road", iconType: "car" },
      { time: "02:30 PM", title: "Adventure Park Zipline & High Rope Challenges", description: "Challenge your friends to the high-wire zipline, Burma bridge crossing, and artificial rock climb.", location: "Morni Adventure Park", tip: "Go for the group combo pass for maximum savings.", iconType: "compass" },
      { time: "04:30 PM", title: "Speed Boating & Chilling at Tikkar Taal", description: "Hop on the high-speed motorboat across the lake, followed by chilling on the lush grass banks.", location: "Tikkar Taal", iconType: "sun" },
      { time: "06:00 PM", title: "Maggie & Chai Feast at Ghat Cliff Cafe", description: "Order platters of cheese-loaded mountain maggie, crispy onion pakoras, and endless cups of ginger chai.", location: "The Mist & Maggie Hill Cafe", iconType: "coffee" },
      { time: "07:30 PM", title: "Night Drive Back to City", description: "Cruise down the lit ghats back into the city lights.", location: "Descent Route", iconType: "car" },
    ],
  },
  "friends_1-day": {
    traveler: "friends",
    duration: "1-day",
    title: "Epic Shivalik Adventure & Summit Quest (1 Day)",
    overview: "An action-packed day: Trekking Haryana's highest point (Karoh Peak), conquering the adventure park, boating, and feast at authentic Punjabi dhabas.",
    estimatedBudget: "₹1,200 – ₹2,000 per person",
    recommendedStay: "Day trip (or extend to camping)",
    transportAdvice: "Self-driven car / SUV or group cab.",
    packingTips: ["Trekking shoes with grip", "Plenty of water bottles", "Sunscreen & caps", "First aid essentials"],
    timeline: [
      { time: "07:30 AM", title: "Early Bird Squad Convoy to Karoh Peak", description: "Start early while mountain air is cold and fresh. Head straight to the Karoh Peak trailhead.", location: "Bhoj Dharti Base", iconType: "car" },
      { time: "09:00 AM", title: "Trek to Karoh Peak Summit (4,813 ft)", description: "Hike through dense pine forests to conquer the highest point in Haryana. Celebrate summit selfies at boundary marker.", location: "Karoh Peak Summit", tip: "Trail is 2.5 km uphill; takes around 1.5 hours to climb.", iconType: "compass" },
      { time: "12:00 PM", title: "Hearty Dhaba Feast at Tikkar Taal", description: "Replenish energy with piping hot butter paranthas, rajma chawal, and sweet lassi.", location: "Lakeview Dhaba", iconType: "utensils" },
      { time: "01:30 PM", title: "Morni Adventure Park Challenges", description: "Compete with your friends on ziplines, rope net climbs, and commando obstacles.", location: "Adventure Park", iconType: "compass" },
      { time: "03:30 PM", title: "Tikkar Taal Lake Boating & Photography", description: "Group paddle boat races and aesthetic squad reels at the lake edge.", location: "Tikkar Taal", iconType: "sun" },
      { time: "05:30 PM", title: "Morni Fort Sunset Viewpoint", description: "Climb the ancient ramparts for sweeping sunset panoramic views across the Shivalik hills.", location: "Morni Fort Bastions", iconType: "camera" },
      { time: "07:00 PM", title: "Dinner Stop & Drive Back", description: "Late evening dinner on the highway before heading back to Chandigarh / Panchkula.", location: "Highway Dhaba", iconType: "car" },
    ],
  },
  "friends_2-days": {
    traveler: "friends",
    duration: "2-days",
    title: "Lakeside Camping, Bonfire & Trekking Weekend (2 Days / 1 Night)",
    overview: "The quintessential friends weekend: Lakeside tent camping, night bonfire with acoustic jams & barbecue, Karoh Peak summit trek, and endless fun.",
    estimatedBudget: "₹3,000 – ₹4,500 per person (including camp, all meals, bonfire & activities)",
    recommendedStay: "Tikkar Taal Lakeside Glamping OR Pine Wilderness Camp",
    transportAdvice: "Rent an SUV or travel in carpool convoy with camping luggage.",
    packingTips: ["Warm jackets & beanies for night", "Torch / Headlamp", "Bluetooth speaker", "Power banks"],
    timeline: [
      { time: "Day 1 - 01:00 PM", title: "Squad Arrival & Camp Check-in", description: "Pitch your dome tents or check into lakeside safari tents right on the shore of Tikkar Taal.", location: "Tikkar Lakeside Camp", iconType: "compass" },
      { time: "Day 1 - 03:00 PM", title: "Lake Boating & Adventure Park Action", description: "Speed boating on the lake followed by adrenaline-pumping ziplines at the adventure park.", location: "Tikkar Taal & Adventure Zone", iconType: "sun" },
      { time: "Day 1 - 06:00 PM", title: "Sunset Chilling by Camp Chairs", description: "Relax by the water with tea and pakoras watching the twilight sky.", location: "Campfront Shore", iconType: "camera" },
      { time: "Day 1 - 08:00 PM", title: "Night Bonfire, BBQ & Stargazing", description: "Campfire under the starry sky, roasted paneer/chicken tikkas, guitar sing-alongs, and late-night talks.", location: "Camp Bonfire Ground", tip: "Carry your warm fleece; lake breeze gets quite chilly at night.", iconType: "moon" },
      { time: "Day 2 - 07:00 AM", title: "Sunrise Over Lake & Breakfast", description: "Catch the morning mist lifting from the lake surface while sipping freshly brewed hot tea.", location: "Camp Dining Mess", iconType: "coffee" },
      { time: "Day 2 - 09:00 AM", title: "Karoh Peak Summit Hike", description: "Conquer the 4,813 ft peak through fragrant pine woods and take victorious group photos.", location: "Karoh Peak Trail", iconType: "compass" },
      { time: "Day 2 - 01:30 PM", title: "Morni Fort Tour & Highway Dhaba Feast", description: "Quick visit to historical Morni Fort, followed by a heavy tandoori lunch before driving home.", location: "Morni Fort & Dhaba", iconType: "utensils" },
    ],
  },
  "solo_half-day": {
    traveler: "solo",
    duration: "half-day",
    title: "Quiet Mountain Reconnect & Solitude Drive (Half Day)",
    overview: "A peaceful escape from city noise: scenic hill ride, reading or journaling by the lake, pine forest quietude, and a comforting warm cup of tea.",
    estimatedBudget: "₹500 – ₹900",
    recommendedStay: "Day trip",
    transportAdvice: "Personal bike or motorcycle ride; therapeutic winding roads.",
    packingTips: ["A good book or journal", "Earphones / headphones", "Camera", "Light windcheater"],
    timeline: [
      { time: "02:00 PM", title: "Mindful Solo Ride up the Shivaliks", description: "Leave the city bustle behind as you cruise into cool pine breezes and quiet winding roads.", location: "Panchkula-Morni Route", iconType: "car" },
      { time: "03:30 PM", title: "Solitary Lake Stroll & Journaling at Chhota Taal", description: "Walk past the crowded spots to the quiet shores of Chhota Taal. Sit under the pine shade to read or meditate.", location: "Chhota Taal Shore", tip: "The shaded bank opposite the boat jetty is exceptionally calm.", iconType: "sun" },
      { time: "05:15 PM", title: "Golden Hour Photography Walk", description: "Capture solitary portraits of nature, reflections on the ripples, and shifting light.", location: "Tikkar Taal Shoreline", iconType: "camera" },
      { time: "06:15 PM", title: "Tea & Mountain Maggi at Cliffside Perch", description: "Enjoy a silent hot cup of adrak chai while watching dusk settle over the valleys.", location: "The Mist Cafe", iconType: "coffee" },
      { time: "07:15 PM", title: "Peaceful Ride Back Down", description: "Head back to the city thoroughly recharged and peaceful.", location: "Return Route", iconType: "car" },
    ],
  },
  "solo_1-day": {
    traveler: "solo",
    duration: "1-day",
    title: "Solo Trekker & Heritage Discovery Day (1 Day)",
    overview: "A soulful day for the independent explorer: summiting Karoh Peak, wandering ancient Morni Fort ramparts, bird watching at Berwala, and lake contemplation.",
    estimatedBudget: "₹1,000 – ₹1,800",
    recommendedStay: "Day trip (or Shivalik Homestay)",
    transportAdvice: "Bike or solo bus/shared cab from Panchkula bus stand.",
    packingTips: ["Daypack with 2L water", "Trekking poles (optional)", "Power bank", "Cash in small denominations"],
    timeline: [
      { time: "08:00 AM", title: "Morning Drive & Solo Karoh Peak Trek", description: "Arrive early and take the scenic 2.5 km trek up through Chir pines to Haryana's highest elevation.", location: "Karoh Peak Summit", tip: "Start early to enjoy the mountain trail in absolute tranquility.", iconType: "compass" },
      { time: "11:30 AM", title: "Morni Fort & Wildlife Center Visit", description: "Wander through the peaceful 17th-century fort courtyard, read the historical panels, and take in panoramic views.", location: "Morni Fort", iconType: "camera" },
      { time: "01:00 PM", title: "Authentic Local Pahadi Lunch", description: "Eat like a local at a village dhaba: hot missi roti, freshly made kadhi, and spicy garlic chutney.", location: "Village Dhaba", iconType: "utensils" },
      { time: "02:30 PM", title: "Berwala Bird Sanctuary Walk", description: "Quietly spot exotic pheasants, junglefowl, and vibrant mountain songbirds through the dense tree cover.", location: "Berwala Sanctuary", iconType: "compass" },
      { time: "04:30 PM", title: "Tikkar Taal Lake Stroll & Sunset Meditation", description: "Sit by the water as ripples gleam under the setting sun. Unwind with hot chai.", location: "Tikkar Taal", iconType: "sun" },
      { time: "06:30 PM", title: "Return Journey with Renewed Energy", description: "Descend safely back to Panchkula / Chandigarh.", location: "Return Route", iconType: "car" },
    ],
  },
  "solo_2-days": {
    traveler: "solo",
    duration: "2-days",
    title: "Mountain Retreat & Homestay Immersive (2 Days / 1 Night)",
    overview: "A deep immersion into hill life: Stay at a welcoming village homestay, organic home-cooked food, deep pine forest hikes, stargazing, and total digital detox.",
    estimatedBudget: "₹2,500 – ₹4,000 (including homestay, all meals & trails)",
    recommendedStay: "Shivalik Crest Homestay OR Pine Wilderness Eco Camp",
    transportAdvice: "Bike or direct taxi for luggage flexibility.",
    packingTips: ["Notebook / sketchbook", "Warm fleece", "Sturdy hiking shoes", "Reusable water bottle"],
    timeline: [
      { time: "Day 1 - 10:00 AM", title: "Check-in at Shivalik Crest Homestay", description: "Meet your welcoming local hosts. Settle into your mountain-view room with herbal tea.", location: "Bhoj Dharti Homestay", iconType: "coffee" },
      { time: "Day 1 - 12:00 PM", title: "Pine Forest Trail to Hidden Hill Springs", description: "Hike through secluded pine trails with directions from your host to discover hidden freshwater springs.", location: "Upper Pine Trail", iconType: "compass" },
      { time: "Day 1 - 03:30 PM", title: "Tikkar Taal Solitary Boating & Lake Exploration", description: "Paddle across the quiet lake waters and visit the picturesque Chhota Taal.", location: "Tikkar Taal", iconType: "sun" },
      { time: "Day 1 - 07:30 PM", title: "Homestyle Organic Pahadi Dinner & Rooftop Stargazing", description: "Eat freshly cooked organic vegetables, farm rotis, and dal made on traditional wood fire. Look up at the Milky Way.", location: "Homestay Courtyard", tip: "Zero light pollution makes stargazing exceptional here.", iconType: "moon" },
      { time: "Day 2 - 06:30 AM", title: "Sunrise Bird Watching & Fresh Tea", description: "Wake up to mist rolling over the hills and the song of Himalayan bulbuls.", location: "Village Ridge", iconType: "camera" },
      { time: "Day 2 - 08:30 AM", title: "Karoh Peak Summit Trek", description: "Hike to Haryana's highest crest with crisp morning clarity and clear views into Himachal.", location: "Karoh Peak", iconType: "compass" },
      { time: "Day 2 - 01:00 PM", title: "Farewell Meal & Mountain Honey Shopping", description: "Buy pure forest honey directly from local beekeepers before returning invigorated.", location: "Homestay & Market", iconType: "utensils" },
    ],
  },
};

const MORNI_FAQS = [
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

const POPULAR_SEARCHES = [
  "Tikkar Taal",
  "Morni Fort",
  "Lakeside Camping",
  "Adventure Park",
  "Karoh Peak",
  "Taxi to Morni",
  "Hill Dhaba",
];

const TRAVELERS: {
  id: "family" | "couple" | "friends" | "solo";
  label: string;
  emoji: string;
  desc: string;
}[] = [
  { id: "family", label: "Family", emoji: "👨‍👩‍👧", desc: "Gentle lake walks, boating & safe dining" },
  { id: "couple", label: "Couple", emoji: "❤️", desc: "Sunset points, cozy cafes & scenic chalets" },
  { id: "friends", label: "Friends", emoji: "👥", desc: "Adrenaline zipline, night camps & roadtrip" },
  { id: "solo", label: "Solo", emoji: "🎒", desc: "Peak summits, pine silence & mindful chill" },
];

const DURATIONS: {
  id: "half-day" | "1-day" | "2-days";
  label: string;
  badge: string;
  desc: string;
}[] = [
  { id: "half-day", label: "Half Day", badge: "4 - 5 Hours", desc: "Quick afternoon or morning escape" },
  { id: "1-day", label: "1 Day", badge: "Full Day Tour", desc: "Morning breakfast to sunset dinner" },
  { id: "2-days", label: "2 Days", badge: "Weekend Stay", desc: "Overnight camp or cozy resort stay" },
];

// ==========================================
// 2. MAIN COMPONENT (PAGE)
// ==========================================

export default function Home() {
  // Navigation & Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedDetailItem, setSelectedDetailItem] = useState<ExploreItem | null>(null);

  // Planner States
  const [selectedTraveler, setSelectedTraveler] = useState<"family" | "couple" | "friends" | "solo">("couple");
  const [selectedDuration, setSelectedDuration] = useState<"half-day" | "1-day" | "2-days">("1-day");
  const [copied, setCopied] = useState(false);

  // FAQs State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Smooth Scroll Handlers
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  // Filter Items
  const filteredItems = useMemo(() => {
    let items = EXPLORE_ITEMS;
    if (activeCategory !== "all") {
      items = items.filter((item) => item.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.tagline.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.location.toLowerCase().includes(q) ||
          item.highlights.some((h) => h.toLowerCase().includes(q))
      );
    }
    return items;
  }, [activeCategory, searchQuery]);

  // Current Itinerary Plan
  const planKey = `${selectedTraveler}_${selectedDuration}`;
  const currentPlan: ItineraryPlan =
    ITINERARY_DATABASE[planKey] || ITINERARY_DATABASE["couple_1-day"];

  const handleCopyItinerary = () => {
    const text = `🏞️ ${currentPlan.title}\n\nOverview: ${currentPlan.overview}\nBudget: ${currentPlan.estimatedBudget}\nTransport: ${currentPlan.transportAdvice}\n\nTimeline:\n${currentPlan.timeline
      .map((t) => `• ${t.time} - ${t.title} (${t.location}): ${t.description}`)
      .join("\n")}\n\nPlanned with Morni Escape 🌄`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const getSlotIcon = (iconType: string) => {
    switch (iconType) {
      case "coffee":
        return <Coffee className="w-4 h-4 text-amber-600" />;
      case "sun":
        return <Sun className="w-4 h-4 text-yellow-500" />;
      case "compass":
        return <Compass className="w-4 h-4 text-emerald-600" />;
      case "camera":
        return <Camera className="w-4 h-4 text-purple-600" />;
      case "moon":
        return <Moon className="w-4 h-4 text-indigo-500" />;
      case "utensils":
        return <Utensils className="w-4 h-4 text-orange-600" />;
      case "car":
      default:
        return <Car className="w-4 h-4 text-blue-600" />;
    }
  };

  const handleBookCab = (pkg: TaxiPackage) => {
    const text = `Hi Morni Escape! I want to inquire/book the cab package: "${pkg.route}" (${pkg.vehicleType}) for ${pkg.price}.`;
    window.open(
      `https://wa.me/919888877777?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  // Keyboard ESC listener for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedDetailItem(null);
    };
    if (selectedDetailItem) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedDetailItem]);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans text-stone-900 selection:bg-emerald-600 selection:text-white">
      {/* ==========================================
          NAVBAR
      ========================================== */}
      <header className="sticky top-0 z-40 w-full border-b border-stone-200/80 bg-white/95 backdrop-blur-md transition-all shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 sm:h-22">
            {/* Left Cluster: Bigger Logo + Navigation closer to it */}
            <div className="flex items-center gap-6 lg:gap-10">
              {/* Logo */}
              <a href="#" className="flex items-center group focus:outline-hidden py-1">
                <div className="relative flex items-center">
                  <Image
                    src="/Morni-escape.png"
                    alt="Morni Escape Logo"
                    width={260}
                    height={90}
                    className="h-14 sm:h-18 w-auto object-contain group-hover:scale-105 transition-transform"
                    priority
                  />
                </div>
              </a>

              {/* Desktop Navigation (Brought close to Logo) */}
              <nav className="hidden md:flex items-center gap-6 lg:gap-7 text-sm font-semibold text-stone-700">
                <button
                  onClick={() => scrollTo("explore")}
                  className="hover:text-emerald-700 transition-colors flex items-center gap-1.5 cursor-pointer py-2"
                >
                  <Compass className="w-4 h-4 text-emerald-600" />
                  <span>Explore Spots</span>
                </button>
                <button
                  onClick={() => scrollTo("trip-planner")}
                  className="hover:text-emerald-700 transition-colors flex items-center gap-1.5 cursor-pointer py-2"
                >
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  <span>Trip Planner</span>
                </button>
                <button
                  onClick={() => scrollTo("taxi-section")}
                  className="hover:text-emerald-700 transition-colors flex items-center gap-1.5 cursor-pointer py-2"
                >
                  <Car className="w-4 h-4 text-emerald-600" />
                  <span>Taxi & Cabs</span>
                </button>
                <button
                  onClick={() => scrollTo("travel-tips")}
                  className="hover:text-emerald-700 transition-colors flex items-center gap-1.5 cursor-pointer py-2"
                >
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span>Travel Tips</span>
                </button>
              </nav>
            </div>

            {/* Weather & Call Action */}
            <div className="hidden lg:flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-100 border border-stone-200 text-xs text-stone-700 font-medium">
                <CloudSun className="w-4 h-4 text-amber-500 animate-pulse" />
                <span>Morni: 21°C • Clear Sky</span>
              </div>

              <a
                href="https://wa.me/919888877777?text=Hi!%20I%20am%20planning%20a%20trip%20to%20Morni%20Hills%20via%20Morni%20Escape."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xs transition-all hover:shadow-md"
              >
                <MessageSquareShare className="w-3.5 h-3.5" />
                <span>WhatsApp Guide</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 md:hidden">
              <a
                href="tel:+919888877777"
                aria-label="Call Assistance"
                className="p-2 rounded-lg bg-emerald-50 text-emerald-700"
              >
                <Phone className="w-5 h-5" />
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-stone-600 hover:bg-stone-100 focus:outline-hidden"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-stone-200 bg-white px-4 pt-3 pb-5 space-y-3 animate-fade-in">
            <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50 border border-emerald-100 text-xs font-medium text-emerald-900">
              <div className="flex items-center gap-2">
                <CloudSun className="w-4 h-4 text-amber-500" />
                <span>Morni Hills Live Weather: 21°C • Pleasant</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1 text-sm font-medium">
              <button
                onClick={() => scrollTo("explore")}
                className="p-3 text-left rounded-xl bg-stone-50 hover:bg-emerald-50 text-stone-800 hover:text-emerald-700 flex items-center gap-2"
              >
                <Compass className="w-4 h-4 text-emerald-600" />
                Explore Spots
              </button>
              <button
                onClick={() => scrollTo("trip-planner")}
                className="p-3 text-left rounded-xl bg-stone-50 hover:bg-emerald-50 text-stone-800 hover:text-emerald-700 flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-emerald-600" />
                Trip Planner
              </button>
              <button
                onClick={() => scrollTo("taxi-section")}
                className="p-3 text-left rounded-xl bg-stone-50 hover:bg-emerald-50 text-stone-800 hover:text-emerald-700 flex items-center gap-2"
              >
                <Car className="w-4 h-4 text-emerald-600" />
                Taxis & Cabs
              </button>
              <button
                onClick={() => scrollTo("travel-tips")}
                className="p-3 text-left rounded-xl bg-stone-50 hover:bg-emerald-50 text-stone-800 hover:text-emerald-700 flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-emerald-600" />
                Travel Tips
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ==========================================
          MAIN CONTENT
      ========================================== */}
      <main className="flex-1">
        {/* ==========================================
            HERO SECTION:
            MORNI ESCAPE 🌄
            Plan Your Perfect Morni Trip
            [ Where do you want to go? 🔍 ]
        ========================================== */}
        <section className="relative overflow-hidden bg-gradient-to-b from-stone-900 via-emerald-950 to-stone-900 text-white pt-12 pb-20 md:pt-20 md:pb-28">
          <div className="absolute inset-0 opacity-25 pointer-events-none mix-blend-overlay">
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500 rounded-full blur-3xl" />
            <div className="absolute top-1/2 -right-32 w-96 h-96 bg-teal-400 rounded-full blur-3xl" />
          </div>

          <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-stone-50 to-transparent pointer-events-none" />

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Top Tagline */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs sm:text-sm font-medium mb-6 shadow-inner backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span>The Hidden Hill Station of Shivalik Foothills</span>
            </div>

            {/* Exact Heading from Prompt: MORNI ESCAPE 🌄 */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-4 drop-shadow-sm">
              MORNI ESCAPE <span className="inline-block animate-bounce">🌄</span>
            </h1>

            {/* Exact Subhead from Prompt: Plan Your Perfect Morni Trip */}
            <p className="text-lg sm:text-xl md:text-2xl font-light text-stone-200 max-w-2xl mx-auto mb-8 leading-relaxed">
              Plan Your Perfect Morni Trip
            </p>

            {/* Exact Search Input from Prompt: [ Where do you want to go? 🔍 ] */}
            <div className="max-w-2xl mx-auto mb-6">
              <div
                className={`relative flex items-center bg-white rounded-2xl p-2 shadow-2xl transition-all duration-300 border-2 ${
                  isSearchFocused
                    ? "border-emerald-500 ring-4 ring-emerald-500/20 shadow-emerald-950/40 scale-[1.01]"
                    : "border-stone-200 shadow-stone-950/40"
                }`}
              >
                <div className="pl-3 pr-2 text-stone-400">
                  <Search className="w-6 h-6 text-emerald-600" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  placeholder="Where do you want to go? (e.g. Tikkar Taal, Camping, Fort...)"
                  className="w-full py-3 px-2 text-stone-800 text-base sm:text-lg focus:outline-hidden placeholder-stone-400 font-medium"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 mr-1"
                    aria-label="Clear search"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
                <button
                  onClick={() => scrollTo("explore")}
                  className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Popular Chips */}
            <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto text-xs sm:text-sm">
              <span className="text-stone-400 text-xs uppercase tracking-wider font-semibold mr-1">
                Popular:
              </span>
              {POPULAR_SEARCHES.map((chip) => (
                <button
                  key={chip}
                  onClick={() => {
                    setSearchQuery(chip);
                    scrollTo("explore");
                  }}
                  className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-stone-200 hover:text-white transition-all backdrop-blur-xs cursor-pointer active:scale-95"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto mt-12 pt-8 border-t border-white/10 text-left">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <div className="text-emerald-400 font-bold text-lg sm:text-xl">42 km</div>
                <div className="text-stone-300 text-xs">From Chandigarh (1 hr)</div>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <div className="text-emerald-400 font-bold text-lg sm:text-xl">1,220 m</div>
                <div className="text-stone-300 text-xs">Peak Elevation & Pines</div>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <div className="text-emerald-400 font-bold text-lg sm:text-xl">Twin Lakes</div>
                <div className="text-stone-300 text-xs">Tikkar Bada & Chhota</div>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <div className="text-emerald-400 font-bold text-lg sm:text-xl">17th Cent.</div>
                <div className="text-stone-300 text-xs">Historic Morni Fort</div>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
            EXPLORE SECTION:
            Places 🏞️, Stay 🏨, Food 🍴, Camping 🏕️,
            Activities 🥾, Photo Spots 📸, Taxi 🚕
        ========================================== */}
        <section id="explore" className="py-16 sm:py-20 bg-stone-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Discover Morni Hills</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
                Explore Morni
              </h2>
              <p className="mt-2 text-base sm:text-lg text-stone-600">
                Browse through top sightseeing places, hill retreats, dhabas, camping spots, and cabs.
              </p>
            </div>

            {/* Category Filter Pills (Exact from prompt) */}
            <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 pt-1 gap-2.5 no-scrollbar">
              <button
                onClick={() => setActiveCategory("all")}
                className={`shrink-0 flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold transition-all shadow-xs cursor-pointer ${
                  activeCategory === "all"
                    ? "bg-emerald-800 text-white shadow-emerald-900/20 scale-105"
                    : "bg-white text-stone-700 hover:bg-stone-100 border border-stone-200"
                }`}
              >
                <span>✨</span>
                <span>All Categories</span>
              </button>

              {EXPLORE_CATEGORIES.map((cat) => {
                const isSelected = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      if (cat.id === "taxi") {
                        setActiveCategory(cat.id);
                        scrollTo("taxi-section");
                      } else {
                        setActiveCategory(cat.id);
                      }
                    }}
                    className={`shrink-0 flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold transition-all shadow-xs cursor-pointer ${
                      isSelected
                        ? "bg-emerald-800 text-white shadow-emerald-900/20 scale-105"
                        : "bg-white text-stone-700 hover:bg-stone-100 border border-stone-200"
                    }`}
                  >
                    <span className="text-lg">{cat.icon}</span>
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Result Counter */}
            <div className="flex items-center justify-between mt-6 mb-8 text-sm text-stone-600 border-b border-stone-200/80 pb-3">
              <div>
                Showing <strong className="text-stone-900">{filteredItems.length}</strong>{" "}
                {activeCategory === "all" ? "destinations & services" : activeCategory}
                {searchQuery && (
                  <span>
                    {" "}matching &quot;<strong className="text-emerald-700">{searchQuery}</strong>&quot;
                  </span>
                )}
              </div>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 underline cursor-pointer"
                >
                  Reset search
                </button>
              )}
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-stone-200/90 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-300"
                >
                  {/* Image & Badge */}
                  <div className="relative h-56 w-full overflow-hidden bg-stone-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent opacity-80" />

                    {item.badge && (
                      <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-md text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-white/20">
                        {item.badge}
                      </div>
                    )}

                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-stone-800 shadow-xs">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>{item.rating}</span>
                      <span className="text-stone-400 font-normal">
                        ({item.reviewsCount})
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-stone-200 font-medium bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="truncate max-w-[220px]">{item.location}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-stone-900 group-hover:text-emerald-700 transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-xs font-medium text-emerald-700 mt-0.5 mb-2">
                        {item.tagline}
                      </p>
                      <p className="text-stone-600 text-sm line-clamp-2 leading-relaxed mb-4">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {item.highlights.slice(0, 3).map((hl) => (
                          <span
                            key={hl}
                            className="text-[11px] font-medium bg-stone-100 text-stone-700 px-2.5 py-1 rounded-md"
                          >
                            {hl}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Footer Info & Action */}
                    <div className="pt-4 border-t border-stone-100 flex flex-col gap-3">
                      <div className="flex items-center justify-between text-xs text-stone-500">
                        {item.timing && (
                          <div className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-stone-400" />
                            <span>{item.timing}</span>
                          </div>
                        )}
                        {item.priceOrFee && (
                          <div className="font-semibold text-stone-800 bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-sm">
                            {item.priceOrFee}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedDetailItem(item)}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-stone-900 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors cursor-pointer"
                        >
                          <span>View Details</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>

                        {item.contactPhone ? (
                          <a
                            href={`tel:${item.contactPhone}`}
                            className="p-2.5 rounded-xl border border-stone-200 hover:border-emerald-600 hover:bg-emerald-50 text-stone-700 hover:text-emerald-700 transition-colors"
                            title="Call directly"
                            aria-label={`Call ${item.name}`}
                          >
                            <Phone className="w-4 h-4" />
                          </a>
                        ) : (
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                              item.name + " Morni Hills Panchkula"
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-xl border border-stone-200 hover:border-emerald-600 hover:bg-emerald-50 text-stone-700 hover:text-emerald-700 transition-colors"
                            title="Google Maps"
                            aria-label={`Open ${item.name} in Google Maps`}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Down Arrow transition requested in prompt */}
        <div className="flex justify-center bg-stone-900 py-6">
          <div className="w-10 h-10 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center text-emerald-400 animate-bounce">
            <ChevronDown className="w-5 h-5" />
          </div>
        </div>

        {/* ==========================================
            TRIP PLANNER SECTION (Prompt Flow):
            Plan Your Escape
            [ Family ] [ Couple ] [ Friends ] [ Solo ]
                     ↓
            Choose Duration
            [ Half Day ] [ 1 Day ] [ 2 Days ]
                     ↓
            Your Morni Escape
        ========================================== */}
        <section id="trip-planner" className="py-16 sm:py-24 bg-stone-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-1/4 -left-40 w-96 h-96 bg-emerald-500 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-teal-500 rounded-full blur-3xl" />
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Interactive AI Trip Builder</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
                Plan Your Escape
              </h2>
              <p className="mt-3 text-stone-300 text-base sm:text-lg">
                Choose who you are traveling with and your duration to generate a personalized itinerary.
              </p>
            </div>

            {/* STEP 1: Plan Your Escape [ Family ] [ Couple ] [ Friends ] [ Solo ] */}
            <div className="mb-10">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-100">
                  Select Traveler Vibe
                </h3>
              </div>
              <p className="text-center text-xs text-stone-400 mb-6">
                Who is accompanying you on this Morni trip?
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
                {TRAVELERS.map((item) => {
                  const isSelected = selectedTraveler === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedTraveler(item.id)}
                      className={`p-4 sm:p-5 rounded-2xl border text-left transition-all duration-200 cursor-pointer relative overflow-hidden group ${
                        isSelected
                          ? "bg-gradient-to-b from-emerald-800/90 to-emerald-950 border-emerald-400 ring-2 ring-emerald-400/30 shadow-lg shadow-emerald-950/60 scale-[1.02]"
                          : "bg-stone-800/80 hover:bg-stone-800 border-stone-700/80 text-stone-300"
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      )}
                      <div className="text-3xl sm:text-4xl mb-3">{item.emoji}</div>
                      <div className="font-bold text-base sm:text-lg text-white mb-1">
                        {item.label}
                      </div>
                      <div className="text-[11px] sm:text-xs text-stone-300 leading-snug">
                        {item.desc}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Down Arrow ↓ */}
            <div className="flex justify-center my-6">
              <div className="w-10 h-10 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center text-emerald-400 animate-bounce">
                <ChevronDown className="w-5 h-5" />
              </div>
            </div>

            {/* STEP 2: Choose Duration [ Half Day ] [ 1 Day ] [ 2 Days ] */}
            <div className="mb-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-100">
                  Choose Duration
                </h3>
              </div>
              <p className="text-center text-xs text-stone-400 mb-6">
                Select how long your Morni escape will be:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto">
                {DURATIONS.map((dur) => {
                  const isSelected = selectedDuration === dur.id;
                  return (
                    <button
                      key={dur.id}
                      onClick={() => setSelectedDuration(dur.id)}
                      className={`p-4 sm:p-5 rounded-2xl border text-center transition-all duration-200 cursor-pointer relative ${
                        isSelected
                          ? "bg-gradient-to-b from-teal-800/90 to-stone-900 border-teal-400 ring-2 ring-teal-400/30 shadow-lg shadow-teal-950/60 scale-[1.02]"
                          : "bg-stone-800/80 hover:bg-stone-800 border-stone-700/80 text-stone-300"
                      }`}
                    >
                      <div className="inline-block px-2.5 py-0.5 rounded-full bg-stone-700 text-emerald-300 text-[10px] font-semibold uppercase tracking-wider mb-2">
                        {dur.badge}
                      </div>
                      <div className="font-extrabold text-lg sm:text-xl text-white mb-1">
                        {dur.label}
                      </div>
                      <div className="text-xs text-stone-300">{dur.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Down Arrow ↓ */}
            <div className="flex justify-center my-6">
              <div className="w-10 h-10 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center text-emerald-400">
                <ChevronDown className="w-5 h-5" />
              </div>
            </div>

            {/* STEP 3: Your Morni Escape (Tailored Output) */}
            <div className="max-w-4xl mx-auto bg-stone-800/95 border border-stone-700 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md relative">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-700 pb-6 mb-8">
                <div>
                  <div className="flex items-center gap-2 text-emerald-400 text-xs uppercase tracking-widest font-bold mb-1">
                    <span>⭐ Your Morni Escape</span>
                    <span>•</span>
                    <span className="capitalize">{selectedTraveler}</span>
                    <span>•</span>
                    <span className="capitalize">{selectedDuration.replace("-", " ")}</span>
                  </div>
                  <h4 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {currentPlan.title}
                  </h4>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyItinerary}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-700 hover:bg-stone-600 text-xs font-semibold text-white transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Itinerary</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(
                      `Check out this ${currentPlan.title} on Morni Escape:\nhttps://morniescape.com`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Share</span>
                  </a>
                </div>
              </div>

              {/* Overview */}
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-6">
                {currentPlan.overview}
              </p>

              {/* Quick Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 text-xs sm:text-sm">
                <div className="p-3.5 rounded-xl bg-stone-900/80 border border-stone-700/80">
                  <div className="text-stone-400 text-[11px] uppercase tracking-wider mb-0.5">
                    Estimated Budget
                  </div>
                  <div className="font-bold text-emerald-400">
                    {currentPlan.estimatedBudget}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-900/80 border border-stone-700/80">
                  <div className="text-stone-400 text-[11px] uppercase tracking-wider mb-0.5">
                    Travel / Cab Advice
                  </div>
                  <div className="font-medium text-stone-200 text-xs line-clamp-2">
                    {currentPlan.transportAdvice}
                  </div>
                </div>

                {currentPlan.recommendedStay && (
                  <div className="p-3.5 rounded-xl bg-stone-900/80 border border-stone-700/80">
                    <div className="text-stone-400 text-[11px] uppercase tracking-wider mb-0.5 flex items-center gap-1">
                      <Hotel className="w-3 h-3 text-emerald-400" />
                      <span>Recommended Stay</span>
                    </div>
                    <div className="font-bold text-stone-100 text-xs line-clamp-2">
                      {currentPlan.recommendedStay}
                    </div>
                  </div>
                )}
              </div>

              {/* Timeline */}
              <div className="mb-8">
                <h5 className="text-lg font-bold text-stone-100 mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>Recommended Timeline & Route</span>
                </h5>

                <div className="relative pl-6 sm:pl-8 border-l-2 border-emerald-500/30 space-y-6">
                  {currentPlan.timeline.map((slot, index) => (
                    <div key={index} className="relative group">
                      <div className="absolute -left-[31px] sm:-left-[39px] top-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-stone-900 border-2 border-emerald-500 flex items-center justify-center shadow-md">
                        {getSlotIcon(slot.iconType)}
                      </div>

                      <div className="bg-stone-900/60 p-4 rounded-2xl border border-stone-700/60 hover:border-emerald-500/40 transition-colors">
                        <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                          <span className="text-xs font-bold text-emerald-400 tracking-wide uppercase">
                            {slot.time}
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-stone-800 text-stone-300 font-medium">
                            📍 {slot.location}
                          </span>
                        </div>

                        <h6 className="font-bold text-base text-white mb-1">
                          {slot.title}
                        </h6>
                        <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mb-2">
                          {slot.description}
                        </p>

                        {slot.tip && (
                          <div className="text-[11px] bg-emerald-950/60 text-emerald-200 px-3 py-1.5 rounded-lg border border-emerald-800/40 flex items-center gap-1.5">
                            <Sparkles className="w-3 h-3 text-emerald-400 shrink-0" />
                            <span>
                              <strong>Pro Tip:</strong> {slot.tip}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Packing Checklist */}
              <div className="mb-8 p-4 rounded-2xl bg-stone-900/60 border border-stone-700/70">
                <div className="text-xs uppercase tracking-wider text-stone-400 font-bold mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Recommended Checklist For This Trip</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-300">
                  {currentPlan.packingTips.map((tip, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-stone-700">
                <div className="text-xs text-stone-400 text-center sm:text-left">
                  Need a verified mountain cab for this itinerary?
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => scrollTo("taxi-section")}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-stone-700 hover:bg-stone-600 text-white text-xs font-semibold px-4 py-3 rounded-xl transition-all cursor-pointer"
                  >
                    <Car className="w-3.5 h-3.5" />
                    <span>View Taxi Fares</span>
                  </button>
                  <a
                    href={`https://wa.me/919888877777?text=${encodeURIComponent(
                      `Hi Morni Escape, I want to book a trip for: ${currentPlan.title}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold px-5 py-3 rounded-xl transition-all shadow-md active:scale-95"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Book This Itinerary</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
            TAXI & CABS SECTION
        ========================================== */}
        <section id="taxi-section" className="py-16 sm:py-20 bg-stone-100/70 border-t border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold mb-3">
                <span className="text-sm">🚕</span>
                <span>Morni Escape Official Cab Network</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
                Tricity to Morni Hills Taxis & Tours
              </h2>
              <p className="mt-2 text-stone-600 text-base sm:text-lg">
                Reliable, hill-expert drivers from Chandigarh, Panchkula, Mohali & Zirakpur to Morni Hills & Tikkar Taal.
              </p>
            </div>

            {/* Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto mb-10 text-xs text-stone-700">
              <div className="flex items-center gap-2 p-3 rounded-xl bg-white border border-stone-200 shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Certified Hill Drivers</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-white border border-stone-200 shadow-2xs">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Transparent Flat Rates</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-white border border-stone-200 shadow-2xs">
                <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>24/7 Doorstep Pickup</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-white border border-stone-200 shadow-2xs">
                <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Clean AC Sedans & SUVs</span>
              </div>
            </div>

            {/* Taxi Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {TAXI_PACKAGES.map((pkg) => (
                <div
                  key={pkg.id}
                  className="bg-white rounded-3xl border border-stone-200/90 shadow-xs hover:shadow-xl hover:border-amber-400 transition-all flex flex-col justify-between overflow-hidden group"
                >
                  <div className="p-6">
                    <div className="text-[11px] font-bold text-amber-800 bg-amber-50 inline-block px-2.5 py-1 rounded-md mb-3 border border-amber-200/60">
                      {pkg.popularFor}
                    </div>

                    <h3 className="font-bold text-lg text-stone-900 mb-1 leading-snug">
                      {pkg.route}
                    </h3>

                    <div className="flex items-center gap-2 text-xs text-stone-500 mb-4">
                      <Car className="w-3.5 h-3.5 text-stone-400" />
                      <span>{pkg.vehicleType}</span>
                      <span>•</span>
                      <span>{pkg.capacity}</span>
                    </div>

                    <div className="mb-4 pb-4 border-b border-stone-100">
                      <div className="text-2xl sm:text-3xl font-black text-stone-900">
                        {pkg.price}
                      </div>
                      <div className="text-[11px] text-stone-500">
                        All inclusive price
                      </div>
                    </div>

                    <p className="text-stone-600 text-xs leading-relaxed mb-4">
                      {pkg.description}
                    </p>

                    <div className="space-y-1.5 mb-2">
                      <div className="text-[11px] uppercase tracking-wider font-bold text-stone-400">
                        Included
                      </div>
                      {pkg.inclusions.map((inc, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-xs text-stone-700"
                        >
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 pt-0 mt-auto">
                    <button
                      onClick={() => handleBookCab(pkg)}
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-stone-900 group-hover:bg-amber-600 text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Book on WhatsApp</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Custom Route Callout Banner */}
            <div className="mt-12 bg-gradient-to-r from-emerald-900 to-teal-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
              <div className="space-y-2 text-center md:text-left">
                <h3 className="text-xl sm:text-2xl font-bold flex items-center justify-center md:justify-start gap-2">
                  <MapPin className="w-5 h-5 text-emerald-400" />
                  <span>Need Airport Pickup or Custom Multi-Stop Tempo Traveller?</span>
                </h3>
                <p className="text-stone-300 text-xs sm:text-sm max-w-xl">
                  We also arrange 12-16 seater Tempo Travellers for big family reunions and corporate college groups traveling from Delhi or Chandigarh Airport.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <a
                  href="tel:+919888877777"
                  className="inline-flex items-center gap-2 bg-white text-stone-900 hover:bg-stone-100 font-bold px-5 py-3 rounded-xl text-xs sm:text-sm shadow-md transition-all active:scale-95"
                >
                  <Phone className="w-4 h-4 text-emerald-700" />
                  <span>Call +91 98888 77777</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
            TRAVEL TIPS & FAQS
        ========================================== */}
        <section id="travel-tips" className="py-16 sm:py-24 bg-white border-t border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-3">
                <Compass className="w-3.5 h-3.5" />
                <span>Local Traveler Guide</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
                Essential Morni Travel Tips & FAQs
              </h2>
              <p className="mt-3 text-stone-600 text-base sm:text-lg">
                Everything you should know before starting your drive to the Shivaliks.
              </p>
            </div>

            {/* Practical Advice Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <div className="p-6 rounded-3xl bg-stone-50 border border-stone-200/80 hover:border-emerald-300 transition-colors">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-stone-900 mb-2">
                  Mountain Ghat Driving
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  The road from Panchkula / Chandimandir is well-paved with gentle winding hairpins. Drive in lower gear, use horn on blind curves, and avoid night driving in heavy fog.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-stone-50 border border-stone-200/80 hover:border-emerald-300 transition-colors">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
                  <SunMedium className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-stone-900 mb-2">
                  Best Timing & Season
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  September to March has pleasant, clear days (16°C – 24°C). For day-trippers, arrive by 10 AM to enjoy Tikkar Taal boating before afternoon crowds arrive.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-stone-50 border border-stone-200/80 hover:border-emerald-300 transition-colors">
                <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center mb-4">
                  <Signal className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-stone-900 mb-2">
                  Mobile Network & Wi-Fi
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Jio and Airtel have strong 4G connectivity across Morni town, Tikkar Taal, and resorts. Deeper pine forest trails like Karoh Peak may see fluctuating signals.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-stone-50 border border-stone-200/80 hover:border-emerald-300 transition-colors">
                <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center mb-4">
                  <CreditCard className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-stone-900 mb-2">
                  Cash & Online UPI
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  UPI (Google Pay / PhonePe / Paytm) works at most lakeside stalls and dhabas. Carry ₹1,000–₹2,000 cash for entry tickets as ATMs are limited.
                </p>
              </div>
            </div>

            {/* FAQs Accordion */}
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-2 mb-6">
                <HelpCircle className="w-5 h-5 text-emerald-600" />
                <h3 className="text-xl font-bold text-stone-900">
                  Frequently Asked Questions
                </h3>
              </div>

              <div className="space-y-3">
                {MORNI_FAQS.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl border border-stone-200 bg-stone-50/50 overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full flex items-center justify-between p-5 text-left text-sm sm:text-base font-semibold text-stone-900 hover:text-emerald-700 cursor-pointer"
                      >
                        <span className="pr-4">{faq.q}</span>
                        <ChevronDown
                          className={`w-5 h-5 shrink-0 text-stone-500 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-emerald-600" : ""
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-200/60 mt-1 pt-3">
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{faq.a}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ==========================================
          DETAIL MODAL
      ========================================== */}
      {selectedDetailItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs animate-fade-in">
          <div
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 my-8 transition-all animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedDetailItem(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-md transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-64 sm:h-72 w-full bg-stone-900">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedDetailItem.image}
                alt={selectedDetailItem.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute top-4 left-4 flex items-center gap-2">
                {selectedDetailItem.badge && (
                  <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold shadow-xs">
                    {selectedDetailItem.badge}
                  </span>
                )}
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-stone-200 text-xs font-medium uppercase tracking-wider">
                  {selectedDetailItem.category}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-2xl sm:text-3xl font-extrabold drop-shadow-xs">
                  {selectedDetailItem.name}
                </h3>
                <p className="text-xs sm:text-sm text-stone-200 font-medium mt-1">
                  {selectedDetailItem.tagline}
                </p>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs">
                  <div className="text-stone-400 text-[10px] uppercase font-bold">
                    Rating
                  </div>
                  <div className="flex items-center gap-1 font-bold text-stone-800 mt-0.5">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span>{selectedDetailItem.rating}</span>
                    <span className="text-stone-400 font-normal">
                      ({selectedDetailItem.reviewsCount} reviews)
                    </span>
                  </div>
                </div>

                {selectedDetailItem.priceOrFee && (
                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs">
                    <div className="text-stone-400 text-[10px] uppercase font-bold">
                      Price / Entry
                    </div>
                    <div className="font-bold text-emerald-700 mt-0.5">
                      {selectedDetailItem.priceOrFee}
                    </div>
                  </div>
                )}

                {selectedDetailItem.timing && (
                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs col-span-2 sm:col-span-1">
                    <div className="text-stone-400 text-[10px] uppercase font-bold">
                      Timings
                    </div>
                    <div className="font-medium text-stone-800 mt-0.5 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span className="truncate">{selectedDetailItem.timing}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 text-sm text-stone-600 bg-stone-50 p-3 rounded-xl border border-stone-200">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{selectedDetailItem.location}</span>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-wider text-stone-400 font-bold mb-2">
                  About this destination
                </h4>
                <p className="text-stone-700 text-sm leading-relaxed">
                  {selectedDetailItem.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-wider text-stone-400 font-bold mb-2">
                  Highlights & Experiences
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedDetailItem.highlights.map((hl, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-xs text-stone-700 bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-100"
                    >
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 bg-stone-50 border-t border-stone-200 flex flex-wrap items-center justify-end gap-3">
              <button
                onClick={() => setSelectedDetailItem(null)}
                className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-100 text-xs font-semibold cursor-pointer"
              >
                Close
              </button>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  selectedDetailItem.name + " Morni Hills Panchkula"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-semibold transition-colors"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Google Maps</span>
                <ExternalLink className="w-3 h-3 text-stone-500" />
              </a>

              {selectedDetailItem.contactPhone ? (
                <a
                  href={`tel:${selectedDetailItem.contactPhone}`}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold transition-colors shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Host / Booking</span>
                </a>
              ) : (
                <a
                  href={`https://wa.me/919888877777?text=${encodeURIComponent(
                    `Hi! I want more info/help visiting "${selectedDetailItem.name}" in Morni Hills.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold transition-colors shadow-xs"
                >
                  <span>WhatsApp Inquiry</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          FLOATING QUICK ASSISTANT
      ========================================== */}
      <aside aria-label="Quick contact" className="fixed bottom-6 right-6 z-40">
        <a
          href="https://wa.me/919888877777?text=Hi%20Morni%20Escape!%20I%20need%20assistance%20planning%20my%20Morni%20Hills%20trip."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-3 rounded-full shadow-2xl hover:scale-105 transition-all group font-semibold text-xs sm:text-sm border-2 border-white/40"
          title="Chat with Morni Travel Assistant"
        >
          <MessageSquareShare className="w-5 h-5 fill-white" />
          <span className="hidden sm:inline">Trip Assistant</span>
        </a>
      </aside>

      {/* ==========================================
          FOOTER
      ========================================== */}
      <footer className="bg-stone-950 text-stone-300 pt-16 pb-12 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-white/95 rounded-xl p-1.5 shadow-md">
                  <Image
                    src="/Morni-escape.png"
                    alt="Morni Escape"
                    width={130}
                    height={42}
                    className="h-9 w-auto object-contain"
                  />
                </div>
              </div>
              <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-sm">
                Your comprehensive local digital guide to exploring Morni Hills, Haryana. Plan personalized escapes, discover lakeside camping, boutique stays, authentic Pahadi food, and book verified cabs.
              </p>
              <div className="flex items-center gap-2 text-xs text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Welcoming travelers 365 days a year</span>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-white text-xs font-bold uppercase tracking-wider">
                Explore
              </h4>
              <ul className="space-y-2 text-xs text-stone-400">
                <li>
                  <button
                    onClick={() => scrollTo("explore")}
                    className="hover:text-emerald-400 transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>Tikkar Taal Lakes</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo("explore")}
                    className="hover:text-emerald-400 transition-colors cursor-pointer"
                  >
                    Morni Fort & Museum
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo("explore")}
                    className="hover:text-emerald-400 transition-colors cursor-pointer"
                  >
                    Karoh Peak Hike
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo("explore")}
                    className="hover:text-emerald-400 transition-colors cursor-pointer"
                  >
                    Adventure Park Zipline
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo("explore")}
                    className="hover:text-emerald-400 transition-colors cursor-pointer"
                  >
                    Lakeside Camping
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-white text-xs font-bold uppercase tracking-wider">
                Plan & Transit
              </h4>
              <ul className="space-y-2 text-xs text-stone-400">
                <li>
                  <button
                    onClick={() => scrollTo("trip-planner")}
                    className="hover:text-emerald-400 transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Family Day Trips</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo("trip-planner")}
                    className="hover:text-emerald-400 transition-colors cursor-pointer"
                  >
                    Romantic Couple Escapes
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo("trip-planner")}
                    className="hover:text-emerald-400 transition-colors cursor-pointer"
                  >
                    Friends Camping Weekend
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo("taxi-section")}
                    className="hover:text-emerald-400 transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Car className="w-3.5 h-3.5" />
                    <span>Chandigarh Cabs</span>
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Emergency Helplines</span>
              </h4>
              <ul className="space-y-2 text-xs text-stone-400">
                <li className="flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-stone-500" />
                  <span>Morni Police: 112</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-stone-500" />
                  <span>Panchkula Civil Hospital: 108</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-stone-500" />
                  <span>Forest Range: 01733-250123</span>
                </li>
                <li className="flex items-center gap-1.5 text-emerald-400 font-medium">
                  <Phone className="w-3 h-3" />
                  <span>Taxi Dispatch: +91 98888 77777</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
            <div>
              © {new Date().getFullYear()} MORNI ESCAPE. Crafted for nature lovers and weekend explorers.
            </div>
            <div className="flex items-center gap-1">
              <span>Made with</span>
              <span className="text-rose-500">❤️</span>
              <span>for Shivalik Hills Tourism</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
