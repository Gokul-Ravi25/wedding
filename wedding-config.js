/**
 * Royal Wedding Website Configuration
 * Edit this file to easily update names, dates, venues, story, and photos.
 */

const WEDDING_CONFIG = {
  // Couple Information
  couple: {
    groom: {
      name: "Gokul Ravi",
      nickname: "Gokul",
      title: "The Groom",
      bio: "An engineer with a heart for innovation, adventures, and the love of his life.",
      avatar: "assets/images/hero.jpg",
      instagram: "@gokulravi"
    },
    bride: {
      name: "Sneha Swaminathan",
      nickname: "Sneha",
      title: "The Bride",
      bio: "A creative soul who brings elegance, boundless joy, and magic to every moment.",
      avatar: "assets/images/story.jpg",
      instagram: "@sneha_s"
    },
    hashtag: "#GokulWedsSneha",
    monogram: "G & S"
  },

  // Wedding Date & Time (Used for Live Countdown & Calendar)
  // Format: YYYY-MM-DDTHH:mm:ss
  weddingDate: "2026-11-28T09:30:00",
  dateFormatted: "Saturday, November 28, 2026",
  auspiciousTime: "Muhurtham: 09:15 AM - 10:45 AM (Dhanur Lagnam)",

  // Royal Welcome & Blessings
  shloka: {
    sanskrit: "मंगलम् भगवान विष्णुः मंगलम् गरुड़ध्वजः । मंगलम् पुण्डरीकाक्षः मंगलाय तनो हरिः ॥",
    translation: "May divine grace bestow eternal joy, boundless prosperity, and timeless devotion upon this auspicious union."
  },

  // Audio / Music Settings
  audio: {
    enabled: true,
    autoPlayOnEnter: true,
    songTitle: "Mangala Vadyam & Royal Serenade",
    artist: "Auspicious Symphony",
    // Set a custom MP3 URL if desired, or null to use our built-in royal procedural harp & tanpura ambient sound
    customAudioUrl: null
  },

  // Love Story Milestones
  storyMilestones: [
    {
      year: "2021",
      title: "The Serendipitous Beginning",
      subtitle: "When paths crossed in Bangalore",
      description: "What started as an afternoon coffee over shared dreams, laughter, and endless conversations quickly revealed an unspoken harmony that felt like home.",
      icon: "✨"
    },
    {
      year: "2023",
      title: "Adventures Across Horizons",
      subtitle: "Mountains, oceans, and memories",
      description: "From misty Nilgiri hill drives to quiet beach sunsets, every journey together deepened our bond and proved that every destination is sweeter side by side.",
      icon: "🌅"
    },
    {
      year: "2025",
      title: "The Royal Promise",
      subtitle: "A sunset proposal under palace arches",
      description: "Under the golden glow of palace lanterns and a sky lit by the evening starlight, Gokul asked the question that made two hearts beat as one forever.",
      icon: "💍"
    },
    {
      year: "2026",
      title: "The Sacred Beginning of Forever",
      subtitle: "November 28, 2026",
      description: "Surrounded by our beloved families, cherished friends, and ancient sacred vows, we step into the most beautiful chapter of our lives.",
      icon: "🪔"
    }
  ],

  // Wedding Events & Celebrations
  events: [
    {
      id: "mehendi",
      title: "Mehendi & Haldi Splendor",
      tagline: "Turmeric Glow & Auspicious Henna",
      date: "Friday, November 27, 2026",
      time: "10:30 AM onwards",
      venueName: "The Courtyard Gardens, Grand Chola Palace",
      location: "Chennai, Tamil Nadu",
      mapUrl: "https://maps.google.com/?q=ITC+Grand+Chola+Chennai",
      dressCode: "Festive Yellows, Ochre & Floral Pastels",
      description: "An effervescent morning of traditional dholak beats, fragrant herbal turmeric ceremonies, and intricate artistic henna designs adorned with fresh marigold blossoms.",
      image: "assets/images/mehendi.jpg"
    },
    {
      id: "sangeet",
      title: "Royal Sangeet & Musical Evening",
      tagline: "Glitz, Glamour & Celebration Dance",
      date: "Friday, November 27, 2026",
      time: "07:00 PM onwards",
      venueName: "The Royal Ballroom, Grand Chola Palace",
      location: "Chennai, Tamil Nadu",
      mapUrl: "https://maps.google.com/?q=ITC+Grand+Chola+Chennai",
      dressCode: "Emerald Green, Royal Velvet, Indo-Western Glamour",
      description: "A dazzling evening filled with high-energy family dance performances, live acoustic melodies, royal cocktails, and non-stop celebration on the dance floor.",
      image: "assets/images/sangeet.jpg"
    },
    {
      id: "muhurtham",
      title: "The Muhurtham & Wedding Ceremony",
      tagline: "Sacred Mantras, Holy Fire & Saptapadi",
      date: "Saturday, November 28, 2026",
      time: "08:30 AM - 11:30 AM",
      venueName: "The Grand Mandapam, Heritage Palace Pavilion",
      location: "Chennai, Tamil Nadu",
      mapUrl: "https://maps.google.com/?q=ITC+Grand+Chola+Chennai",
      dressCode: "Traditional Kanjeevaram Silk & Pure Zari Veshti",
      description: "The auspicious union solemnized with Vedic chants, tying of the sacred Mangalsutra (Thirumaangalyam), and the eternal seven sacred steps around Agni.",
      image: "assets/images/mandap.jpg"
    },
    {
      id: "reception",
      title: "The Grand Imperial Reception",
      tagline: "Feast of Kings & Evening of Elegance",
      date: "Saturday, November 28, 2026",
      time: "07:00 PM onwards",
      venueName: "The Rajendra Grand Imperial Hall",
      location: "Chennai, Tamil Nadu",
      mapUrl: "https://maps.google.com/?q=ITC+Grand+Chola+Chennai",
      dressCode: "Royal Formal Evening / Traditional Black Tie & Silk",
      description: "A banquet fit for royalty, celebratory toasts, live symphony, and an unforgettable culinary journey honoring our family and distinguished guests.",
      image: "assets/images/reception.jpg"
    }
  ],

  // Photo Gallery
  gallery: [
    {
      url: "assets/images/hero.jpg",
      category: "couple",
      title: "Royal Union",
      caption: "In the presence of timeless architecture, two souls unite."
    },
    {
      url: "assets/images/story.jpg",
      category: "moments",
      title: "Starlight Romance",
      caption: "Under the royal starlit evening, whispered vows and laughter."
    },
    {
      url: "assets/images/mandap.jpg",
      category: "ceremonies",
      title: "The Auspicious Mandap",
      caption: "Draped in red roses and golden light for sacred rituals."
    },
    {
      url: "assets/images/sangeet.jpg",
      category: "celebrations",
      title: "The Sangeet Spectacle",
      caption: "An electrifying night of joyous rhythms and chandeliers."
    },
    {
      url: "assets/images/mehendi.jpg",
      category: "rituals",
      title: "Henna & Emeralds",
      caption: "Intricate bridal artwork symbolizing love, prosperity, and joy."
    },
    {
      url: "assets/images/reception.jpg",
      category: "celebrations",
      title: "Imperial Grand Banquet",
      caption: "Celebrating a royal milestone with everyone we hold dear."
    }
  ],

  // Guest Information & Travel
  travelGuide: [
    {
      title: "Airport & Transit",
      desc: "Chennai International Airport (MAA) is situated 12 km (approx 25 mins) from the venue. Dedicated chauffeur airport transfers will be available for outstation guests."
    },
    {
      title: "Luxury Accommodations",
      desc: "Rooms have been reserved for outstation guests at the venue palace. Please mention our wedding code #GokulSneha2026 during check-in for complimentary concierge services."
    },
    {
      title: "Valet & Parking",
      desc: "Complimentary royal valet parking is available at the Main Grand Chola Portico entrance throughout all wedding events."
    }
  ],

  // FAQ
  faqs: [
    {
      q: "Can I bring a plus one or children?",
      a: "Yes! Our celebrations are a family gathering and we would love to welcome you and your loved ones. Kindly indicate the number of guests in your RSVP."
    },
    {
      q: "What is the dress code for the ceremonies?",
      a: "For Mehendi/Haldi, joyful yellows and festive pastels are encouraged. For Sangeet, dress in glamorous evening Indo-Western or royal gowns. For Muhurtham, traditional Indian silks (Kanjeevaram / Kurta Veshti) are cherished."
    },
    {
      q: "Do you have dietary arrangements?",
      a: "Yes, an extensive gourmet multi-cuisine royal feast will be served featuring Traditional South Indian Sadya, North Indian delicacies, live chaat counters, and dedicated Jain & Vegan options."
    },
    {
      q: "Whom can I contact for questions or travel assistance?",
      a: "Our wedding coordination team is available at hospitality@gokulwedsneha.com or +91 98765 43210."
    }
  ]
};
