/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ClubEvent, Donor, DonationTier, MembershipTier } from "./types";

// Dynamic paths matching generated assets
export const CLUB_IMAGES = {
  logo: "/src/assets/images/club_logo_1780054604858.png",
  hero: "/src/assets/images/club_hero_1780054581027.png"
};

export const CORE_VALUES = [
  {
    title: "Intergenerational Legacy",
    description: "Bridging the wisdom of elder generations with the vibrant energy of youth to create lasting community networks.",
    icon: "Users"
  },
  {
    title: "Intellectual Discourses",
    description: "Fostering standard-setting debates, panels, and guest salons covering arts, philosophy, sciences, and local policy.",
    icon: "BookOpen"
  },
  {
    title: "Philanthropy & Aid",
    description: "Fostering active benevolence, establishing community relief funds, and backing academic scholarship paths.",
    icon: "Heart"
  },
  {
    title: "Leisure & Celebration",
    description: "Cultivating beautiful social milestones, sporting traditions, and curated seasonal galas in exclusive clubhouses.",
    icon: "Sparkles"
  }
];

export const INITIAL_PROGRAMS = [
  {
    id: "p1",
    title: "Bridges of Wisdom Mentorship",
    category: "Community Outreach",
    tagline: "Uniting lifetimes of knowledge",
    description: "Our hallmark program pairings secondary school and college students with accomplished senior mentors. They exchange vocational training, life advisory support, and digital literacy development.",
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800&auto=format&fit=crop",
    impact: "Over 450 pairs graduated to date"
  },
  {
    id: "p2",
    title: "The Golden Philanthropy Circle",
    category: "Charitable Action",
    tagline: "Investing back in our soil",
    description: "A collaborative effort that pools member donations to execute local green-urban projects, support underfunded public elementary education, and provide immediate shelter grants.",
    image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=800&auto=format&fit=crop",
    impact: "$240,000+ distributed across our county"
  },
  {
    id: "p3",
    title: "Fireside Salons & Lectures",
    category: "Culture & Intellect",
    tagline: "Sparking elite conversations",
    description: "Monthly curated panels that host leading scientists, philosophers, authors, and artists. Facilitating high-quality intimate dialogue inside our historic library wing.",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=800&auto=format&fit=crop",
    impact: "24 guest lecturers hosted annually"
  }
];

export const DONATION_TIERS: DonationTier[] = [
  {
    id: "dt1",
    label: "Friend of the Club",
    amount: 25,
    description: "Provides library books for our free community learning room.",
    benefits: ["Featured recognition on our online donor honor wall", "A subscription to our quarterly printed chronicle: The Gilded Letter"]
  },
  {
    id: "dt2",
    label: "Supporting Family",
    amount: 100,
    description: "Funds computer training supplies for three local high schoolers.",
    benefits: [
      "Online donor honor wall recognition",
      "Gilded Letter print subscription",
      "Two complimentary tickets to our summer garden reception"
    ]
  },
  {
    id: "dt3",
    label: "Golden Benefactor",
    amount: 250,
    description: "Directly finances a student scholar stipend or community pantry fridge.",
    benefits: [
      "Elegant custom engraved brick on our Memorial Walkway",
      "Exclusive invitation to the President's Private Cocktail Lounge",
      "VIP front-row seating at all Fireside Salons"
    ]
  },
  {
    id: "dt4",
    label: "Sovereign Patron",
    amount: 750,
    description: "Sponsors a full year of intergenerational bridge community center programs.",
    benefits: [
      "Engraved gold name-plate in the Great Vestibule Hall",
      "Sovereign tier naming rights for select youth development events",
      "Annual private dinner with the Family Club Board of Trustees"
    ]
  }
];

export const INITIAL_DONORS: Donor[] = [
  {
    id: "d1",
    name: "Genevieve Stirling",
    email: "g.stirling@legacy.com",
    amount: 750,
    message: "A marvelous community initiative. Connecting families and preserving our history is more vital than ever.",
    timestamp: "2026-05-28T14:32:00Z",
    isAnonymous: false,
    tier: "Sovereign Patron"
  },
  {
    id: "d2",
    name: "The Vance Family Foundation",
    email: "charity@vancefoundation.org",
    amount: 250,
    message: "Supporting the young scholar stipends! We hope this inspires children to push the boundaries of science.",
    timestamp: "2026-05-27T10:15:00Z",
    isAnonymous: false,
    tier: "Golden Benefactor"
  },
  {
    id: "d3",
    name: "Anonymous Patron",
    email: "",
    amount: 100,
    message: "Deeply grateful for the friendly environment and the senior mentorship program. To many more decades!",
    timestamp: "2026-05-26T18:44:00Z",
    isAnonymous: true,
    tier: "Supporting Family"
  },
  {
    id: "d4",
    name: "Robert & Clara Hayes",
    email: "rc.hayes@web.net",
    amount: 25,
    message: "Small drops of water make a mighty ocean. Blessings to the social circle!",
    timestamp: "2026-05-25T08:21:00Z",
    isAnonymous: false,
    tier: "Friend of the Club"
  }
];

export const INITIAL_EVENTS: ClubEvent[] = [
  {
    id: "e1",
    title: "Annual Summer Sovereign Gala",
    description: "Curated formal banquet with premium custom culinary pairings, silent art auctions backrolling youth scholarships, live orchestral jazz, and fireworks over the lake.",
    date: "July 18, 2026",
    time: "6:00 PM - 11:30 PM",
    location: "Sovereign Lawn & Lakeside Pavilion",
    image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=800&auto=format&fit=crop",
    seatsTotal: 150,
    seatsBooked: 138
  },
  {
    id: "e2",
    title: "Philosophy Salon: Ethics in the Digital Age",
    description: "An intimate fireside roundtable led by visiting scholars, exploring the boundaries of machine reasoning, modern media echo-chambers, and preserving human empathy.",
    date: "June 24, 2026",
    time: "7:00 PM - 9:30 PM",
    location: "Oakwood Memorial Library Wing",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop",
    seatsTotal: 45,
    seatsBooked: 41
  },
  {
    id: "e3",
    title: "Charity Golf & Lawn Tennis Classic",
    description: "A friendly handicap tournament designed to build camaraderie and raise essential funds for community outreach initiatives, paired with afternoon champagne picnic.",
    date: "August 2, 2026",
    time: "8:00 AM - 3:00 PM",
    location: "Whispering Pines Greens & Courts",
    image: "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=800&auto=format&fit=crop",
    seatsTotal: 80,
    seatsBooked: 52
  },
  {
    id: "e4",
    title: "Intergenerational Baking & Story Circle",
    description: "A delicious morning gathering where club seniors partner with youth to bake heritage confectionery recipes and record family anecdotes for our history archives.",
    date: "June 14, 2026",
    time: "10:30 AM - 1:00 PM",
    location: "The Great Hearth Kitchen",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop",
    seatsTotal: 30,
    seatsBooked: 22
  }
];

export const MEMBERSHIP_TIERS: MembershipTier[] = [
  {
    id: "m1",
    name: "Patron Family Circle",
    price: "1,200",
    frequency: "year",
    description: "Complete prestige access to all club branches for primary members, spouses, and their children under 21.",
    benefits: [
      "Access to Lakeside Pavilion, Olympic Pool, Gym, and Tennis",
      "Unlimited reservations in our Historic Dining Rooms",
      "Comp charges for all standard Fireside Salons and Lectures",
      "4 guest passes per month",
      "Inclusion in select private tasting roundtables"
    ]
  },
  {
    id: "m2",
    name: "Individual Fellow",
    price: "600",
    frequency: "year",
    description: "Optimized for single members committed to civic excellence, networking, intellectual salon culture, and wellness.",
    benefits: [
      "Unrestricted individual clubhouse access",
      "Free entry to all standard Fireside Salons and guest speaker forums",
      "Guaranteed priority table reserve at our bistro restaurant",
      "2 guest passes per month",
      "Electoral voting rights in general committee chairs"
    ]
  },
  {
    id: "m3",
    name: "Junior Associate (Under 30)",
    price: "350",
    frequency: "year",
    description: "A special dynamic tier curated for young career builders, student activists, and local athletes looking to connect.",
    benefits: [
      "Full access to recreational active leagues (Tennis, Golf tournaments)",
      "Invitation to quarterly Gen-Next Founder Mixers",
      "Structured professional mentorship pairings with Senior Patrons",
      "1 guest pass per month",
      "Access to coworking suites in the Garden Carriage Lounge"
    ]
  }
];
