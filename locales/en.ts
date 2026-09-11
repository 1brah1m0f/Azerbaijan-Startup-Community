import type { Dictionary } from "./az";

/**
 * English copy. Keys must match `locales/az.ts` exactly — TypeScript will
 * report any that drift apart.
 */
export const en: Dictionary = {
  meta: {
    title: "Azerbaijan Startup Community",
    description:
      "From the idea stage to growing startups — we bring founders, mentors and the ecosystem's opportunities together.",
  },

  nav: {
    startups: "Startups",
    mentors: "Mentors",
    opportunities: "Opportunities",
    about: "About",
    login: "Log In",
    joinStartup: "Join as a startup",
    joinMentor: "Become a mentor",
    menu: "Menu",
    switchLang: "Dili dəyiş / Switch language",
  },

  hero: {
    titleLead: "If you have an idea, you are",
    titleAccent: "in the right place.",
    sub: "From the idea stage to growing startups — we bring founders, mentors and the ecosystem's opportunities together.",
    ctaStartup: "Join as a startup",
    ctaMentor: "Join as a mentor",
    note: "Only have an idea? That is enough to join.",
  },

  stage: {
    eyebrow: "Who can join?",
    title: "What stage are you at?",
    badge: "You can join.",
    cards: {
      idea: {
        title: "I have an idea",
        text: "You have identified the problem, but there is no team or product yet.",
      },
      building: {
        title: "I am building a startup",
        text: "You have a team, an MVP or your first users.",
      },
      growing: {
        title: "I am growing",
        text: "You have customers and are looking for new markets, partners and investment opportunities.",
      },
    },
    cta: "Add your startup to ASC",
  },

  why: {
    eyebrow: "Why join?",
    title: "You do not have to build alone.",
    cards: {
      people: {
        title: "Meet the right people",
        text: "Connect with founders, mentors, investors, experts and corporate partners.",
      },
      experience: {
        title: "Learn from experience",
        text: "Draw on the experience of people who have already walked the path you are on.",
      },
      access: {
        title: "Get access to opportunities",
        text: "Stay informed about programs, challenges, pilots, investor meetings and partnership opportunities.",
      },
      visibility: {
        title: "Be visible",
        text: "Present your startup across the ASC ecosystem and let potential partners find you.",
      },
    },
    cta: "Join as a startup",
  },

  startups: {
    eyebrow: "Ecosystem",
    title: "ASC Startup Network",
    sub: "An open database of startups built in Azerbaijan. Explore them by sector, stage and the support they are looking for.",
    filterAll: "All",
    filterStage: "Stage",
    filterSector: "Sector",
    filterLooking: "Looking for",
    labelStage: "Stage",
    labelLooking: "Looking for",
    website: "Website",
    todo: "To be confirmed",
    empty: "No startups match these filters.",
    bottomTitle: "Let your startup be seen here.",
    cta: "Add your startup",
  },

  mentors: {
    title: "Your experience can change a startup's path.",
    paragraph:
      "If you have experience in business, technology, product, sales, marketing, finance, legal, investment or another field, share it with new founders.",
    listTitle: "As a mentor you can:",
    bullets: [
      "meet startups that match your expertise;",
      "share your experience with founders;",
      "contribute to shaping new products;",
      "take part in growing Azerbaijan's startup ecosystem.",
    ],
    cta: "Join as a mentor",
    note: "No ongoing commitment required. You decide your area of expertise and how much time you can give.",
    sampleBadge: "Mentor profile",
    networkTitle: "ASC Mentor Network",
    networkSub: "Mentors supporting founders.",
    networkCta: "Join the mentor network",
    labelExpertise: "Expertise",
    labelIndustries: "Industries",
    labelSupports: "Supports",
  },

  opportunities: {
    eyebrow: "Opportunities",
    title: "What is waiting for you at ASC?",
    cards: {
      mentorship: {
        title: "Mentorship",
        text: "A connection to experienced people who match what you need.",
      },
      community: {
        title: "Founder Community",
        text: "Exchange experience and connections with other startup founders.",
      },
      corporate: {
        title: "Startup × Corporate",
        text: "Challenge and pilot opportunities with corporate partners.",
      },
      investor: {
        title: "Investor Access",
        text: "Introductions to investors for startups that are ready.",
      },
      events: {
        title: "Events & Meetups",
        text: "Founder gatherings, workshops and themed events.",
      },
      global: {
        title: "Global Opportunities",
        text: "International programs, accelerators and ecosystem opportunities.",
      },
    },
  },

  partners: {
    title: "Our Partners",
  },

  team: {
    eyebrow: "Team",
    title: "Meet the Team",
    sub: "The leaders growing the Azerbaijani startup ecosystem.",
    bios: {
      shamsi:
        "Business leader with 12+ years of experience in FMCG, sales, trade marketing, business development, and digital transformation. Focused on AI and digital talent development, startup ecosystems, and industry academia collaboration.",
      fehruz:
        "Founded and leads a community for Azerbaijani startup founders and enthusiasts, fostering knowledge sharing, networking, and collaboration. Organizes events, workshops, and mentorship programs to support early stage startups.",
      mehin:
        "Works in innovation management and startup consulting. Coordinates community activities and supports startup growth.",
    },
  },

  finalCta: {
    title: "Which side of the ecosystem are you on?",
    startup: {
      title: "Building a startup?",
      text: "Join the ASC network, from idea to seed stage.",
      cta: "Join as a startup",
    },
    mentor: {
      title: "Want to share your experience?",
      text: "Support founders as a mentor as they grow.",
      cta: "Join as a mentor",
    },
  },

  formStartup: {
    title: "Join as a startup",
    sub: "Only have an idea? That is enough.",
    fullName: "Full name",
    email: "Email",
    startupName: "Startup name",
    stage: "Stage",
    stagePlaceholder: "Select a stage",
    sector: "Sector",
    sectorPlaceholder: "Select a sector",
    description: "Describe your startup in 2 sentences",
    descriptionPlaceholder: "What are you building and whose problem does it solve?",
    needs: "What do you need most right now?",
    needsHint: "You can pick more than one.",
    submit: "Send",
  },

  formMentor: {
    title: "Join as a mentor",
    sub: "No ongoing commitment required.",
    fullName: "Full name",
    email: "Email",
    role: "Role / Company",
    rolePlaceholder: "e.g. Head of Growth, Bakcell",
    expertise: "Expertise",
    industries: "Industry experience",
    industriesPlaceholder: "e.g. SaaS, Retail, FinTech",
    supports: "Which stage can you support a startup at?",
    linkedin: "LinkedIn",
    availability: "How much time can you give per month?",
    availabilityPlaceholder: "Select",
    submit: "Send",
  },

  business: {
    title: "Business inquiries",
    sub: "Reach out about partnership, sponsorship, or media.",
    name: "Full name",
    company: "Company",
    email: "Email",
    topic: "Topic",
    topicPartnership: "Partnership",
    topicSponsorship: "Sponsorship",
    topicMedia: "Media",
    topicOther: "Other",
    message: "Message",
    submit: "Send",
  },

  form: {
    success: "Sent!",
    successSub: "We'll get back to you soon.",
    sending: "Sending...",
    required: "Please fill in this field.",
    invalidEmail: "Please enter a valid email.",
    invalidUrl: "Please enter a valid link.",
    selectOne: "Please pick at least one.",
    tooLong: "This text is too long.",
    serverError: "Could not send. Please try again shortly.",
    charactersLeft: "characters left",
    optional: "optional",
  },

  options: {
    stage: {
      Idea: "Idea",
      "Pre-seed": "Pre-seed",
      Seed: "Seed",
      Growth: "Growth",
    },
    sector: {
      FinTech: "FinTech",
      AI: "AI",
      EdTech: "EdTech",
      SaaS: "SaaS",
      "E-commerce": "E-commerce",
      HealthTech: "HealthTech",
      Marketplace: "Marketplace",
      Logistics: "Logistics",
      GreenTech: "GreenTech",
      Media: "Media",
      Other: "Other",
    },
    needs: {
      Mentor: "Mentor",
      "Co-founder": "Co-founder",
      "Technical Talent": "Technical Talent",
      Customer: "Customer",
      Pilot: "Pilot",
      Investment: "Investment",
      Networking: "Networking",
    },
    expertise: {
      Business: "Business",
      Technology: "Technology",
      Product: "Product",
      Sales: "Sales",
      Marketing: "Marketing",
      Finance: "Finance",
      Legal: "Legal",
      Investment: "Investment",
      Other: "Other",
    },
    availability: {
      "1-2": "1–2 hours",
      "3-5": "3–5 hours",
      "5+": "5+ hours",
    },
  },

  footer: {
    about: "About",
    opportunities: "Opportunities",
    startups: "Startups",
    mentors: "Mentors",
    contact: "Contact",
    copy: "© 2026 Azerbaijan Startup Community. All rights reserved.",
    instagram: "Instagram",
    linkedin: "LinkedIn",
  },

  auth: {
    title: "Log In",
    subtitle: "Log in to your account and continue",
    roleStartup: "Startup",
    roleMentor: "Mentor",
    name: "Name",
    email: "Email",
    password: "Password",
    submit: "Log In",
    noAccount: "No account yet?",
    signup: "Sign Up",
    close: "Close",
    soon: "Log in will be enabled soon. For now, fill in the form below.",
    errorMissing: "Please fill in all fields.",
    errorEmail: "Please enter a valid email.",
  },
};
