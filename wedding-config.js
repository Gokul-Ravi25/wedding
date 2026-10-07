/**
 * Royal Tamil Wedding Website Configuration
 * Edit this file to customize names, dates, venues, ceremonies, and photos.
 */

const WEDDING_CONFIG = {
  // Couple Information
  couple: {
    groom: {
      name: "Gokul R",
      nickname: "Gokul",
      title: "The Groom (மணமகன்)",
      bio: "An engineer with a heart for innovation, adventures, and the love of his life.",
      avatar: "assets/images/hero.jpg",
      instagram: "@gokul_r"
    },
    bride: {
      name: "Anandhi S",
      nickname: "Anandhi",
      title: "The Bride (மணமகள்)",
      bio: "A creative soul who brings elegance, boundless joy, and magic to every moment.",
      avatar: "assets/images/story.jpg",
      instagram: "@anandhi_s"
    },
    hashtag: "#GokulWedsAnandhi",
    monogram: "G & A"
  },

  // Wedding Date & Time (Used for Live Countdown & Calendar)
  // Day 1 Reception: 15th at 7:00 PM | Day 2 Muhurtham: 16th at 6:00 AM - 8:00 AM
  weddingDate: "2026-11-15T19:00:00",
  dateFormatted: "15th & 16th November 2026",
  auspiciousTime: "Day 1 Reception: 7:00 PM | Day 2 Muhurtham: 6:00 AM - 8:00 AM",

  // Sacred Shloka & Blessings
  shloka: {
    sanskrit: "மாங்கல்யம் தந்துனானேன மம ஜீவன ஹேதுனா । கண்டே பத்னாமி சுபகே சஞ்சீவ சரதஃ சதம் ॥",
    tamilQuote: "அன்பும் அறனும் உடைத்தாயின் இல்வாழ்க்கை பண்பும் பயனும் அது — திருக்குறள்",
    translation: "This sacred thread, the essence of my life, I tie around your neck. May you live with me in love and boundless grace for a hundred autumns."
  },

  // Audio / Music Settings
  audio: {
    enabled: true,
    autoPlayOnEnter: true,
    songTitle: "Mangala Nadaswaram & Royal Vadyam",
    artist: "Auspicious Symphony",
    customAudioUrl: null
  },

  // Love Story Milestones
  storyMilestones: [
    {
      year: "2021",
      title: "The Serendipitous Beginning",
      subtitle: "When paths crossed in Chennai & Bangalore",
      description: "What started as an afternoon coffee over shared dreams, laughter, and endless conversations quickly revealed an unspoken harmony that felt like home.",
      icon: "✨"
    },
    {
      year: "2023",
      title: "Adventures Across Horizons",
      subtitle: "Nilgiri hills, temple towns, and cherished sunsets",
      description: "From misty mountain drives to quiet temple visits, every journey together deepened our bond and proved that every destination is sweeter side by side.",
      icon: "🌅"
    },
    {
      year: "2025",
      title: "The Royal Promise (நிச்சயதார்த்தம்)",
      subtitle: "Two families united with golden blessings",
      description: "With the loving blessings of our elders and the auspicious exchange of Thamboolam, the promise of forever was sealed with pure joy.",
      icon: "💍"
    },
    {
      year: "2026",
      title: "The Sacred Beginning of Forever (சுப முகூர்த்தம்)",
      subtitle: "15th & 16th November 2026",
      description: "Surrounded by our beloved families, cherished friends, the divine sound of Nadaswaram, and the holy fire, we begin our eternal journey as one.",
      icon: "🪔"
    }
  ],

  // 2-Day Tamil Wedding Events & Celebrations
  events: [
    {
      id: "reception",
      dayNumber: "Day 1",
      title: "Maalai Varaverpu & Grand Reception",
      tagline: "மாலை வரவேற்பு • Celebrations & Musical Evening",
      date: "Day 1 • 15th November 2026",
      time: "Evening 07:00 PM onwards",
      venueName: "The Grand Imperial Ballroom, ITC Grand Chola",
      location: "Guindy, Chennai, Tamil Nadu",
      mapUrl: "https://maps.google.com/?q=ITC+Grand+Chola+Chennai",
      dressCode: "Silk Sarees, Tuxedos & Indo-Western Glamour",
      description: "Welcoming the radiant bride & groom with traditional garlands, congratulatory wishes, live music, and a celebratory grand royal dinner feast.",
      image: "assets/images/reception.jpg"
    },
    {
      id: "muhurtham",
      dayNumber: "Day 2",
      title: "Subha Muhurtham & Thirumanam",
      tagline: "சுப முகூர்த்தம் • Sacred Vows & Thirumaangalyam",
      date: "Day 2 • 16th November 2026",
      time: "Morning 06:00 AM - 08:00 AM (Subha Muhurtham)",
      venueName: "The Auspicious Mandapam, Heritage Pavilion",
      location: "Guindy, Chennai, Tamil Nadu",
      mapUrl: "https://maps.google.com/?q=ITC+Grand+Chola+Chennai",
      dressCode: "Traditional Kanjeevaram Silk & Pure Pattu Veshti",
      description: "Solemnizing the divine union with auspicious Nadaswaram, Kashi Yatra, Oonjal (Swing ceremony), Kanyadaanam, Thirumaangalyam Dharanam (Kettimelam), and the holy Saptapadi.",
      image: "assets/images/mandap.jpg"
    },
    {
      id: "kalyana-virundhu",
      dayNumber: "Day 2",
      title: "Grand Kalyana Virundhu",
      tagline: "பாரம்பரிய வாழை இலை விருந்து • Authentic Tamil Feast",
      date: "Day 2 • 16th November 2026",
      time: "Morning 11:30 AM - 02:30 PM",
      venueName: "The Royal Dining Hall",
      location: "Guindy, Chennai, Tamil Nadu",
      mapUrl: "https://maps.google.com/?q=ITC+Grand+Chola+Chennai",
      dressCode: "Traditional Festive Attire",
      description: "A lavish traditional Tamil Elai Saapadu served on fresh plantain leaves featuring Medu Vada, Paal Payasam, Avial, Mor Kuzhambu, Sambar, Rasam, and festive sweets.",
      image: "assets/images/hero.jpg"
    }
  ],

  // Photo Gallery
  gallery: [
    {
      url: "assets/images/hero.jpg",
      category: "couple",
      title: "Royal Couple Portrait",
      caption: "Gokul & Anandhi in regal emerald green and gold silk attire."
    },
    {
      url: "assets/images/story.jpg",
      category: "moments",
      title: "Twilight Romance",
      caption: "A joyful moment under palace arches and starlit skies."
    },
    {
      url: "assets/images/mandap.jpg",
      category: "ceremonies",
      title: "The Subha Muhurtham Mandap",
      caption: "Adorned with fragrant jasmine, marigolds, and glowing brass kuthuvilakku."
    },
    {
      url: "assets/images/reception.jpg",
      category: "celebrations",
      title: "Day 1 Reception Hall",
      caption: "Grand chandeliers and imperial dining for our evening celebration."
    },
    {
      url: "assets/images/mehendi.jpg",
      category: "rituals",
      title: "Traditional Henna & Gold Bangles",
      caption: "Intricate bridal artwork symbolizing prosperity and eternal love."
    },
    {
      url: "assets/images/sangeet.jpg",
      category: "celebrations",
      title: "Joyous Musical Celebrations",
      caption: "An electrifying night of rhythm, joy, and family celebrations."
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
      desc: "Rooms have been reserved for outstation guests at the venue palace. Please mention our wedding code #GokulAnandhi2026 during check-in for complimentary concierge services."
    },
    {
      title: "Valet & Parking",
      desc: "Complimentary royal valet parking is available at the Main Grand Chola Portico entrance throughout all wedding events on the 15th and 16th."
    }
  ],

  // FAQ for Tamil Wedding
  faqs: [
    {
      q: "What is the schedule across the 2 days?",
      a: "Day 1 (15th): Grand Reception begins in the evening at 7:00 PM followed by dinner. Day 2 (16th): The auspicious Subha Muhurtham takes place in the early morning between 6:00 AM - 8:00 AM, followed by breakfast and the grand afternoon Kalyana Virundhu feast."
    },
    {
      q: "What is the recommended dress code for the ceremonies?",
      a: "For Day 1 Reception (Evening 7 PM), elegant Silk Sarees, Tuxedos, Sherwanis or Indo-Western attire are ideal. For Day 2 Muhurtham (Morning 6 - 8 AM), traditional South Indian attire is warmly encouraged: pure Kanjeevaram Pattu sarees for ladies and Pattu Veshti (Silk Dhoti with Angavastram) for gentlemen."
    },
    {
      q: "What dining arrangements are planned?",
      a: "We have arranged a magnificent pure vegetarian South Indian royal feast on banana leaves (Elai Saapadu) along with multi-cuisine dinner on Day 1, with dedicated Jain and Vegan options."
    },
    {
      q: "Will breakfast be served before/during the morning Muhurtham?",
      a: "Yes! Traditional South Indian morning tiffin (filter coffee, hot idlis, vadas, pongal) will be available from 5:30 AM onwards for all our early morning guests."
    },
    {
      q: "Whom can I contact for questions or travel assistance?",
      a: "Our wedding hospitality team is available at hospitality@gokulwedanandhi.com or +91 98765 43210."
    }
  ]
};
