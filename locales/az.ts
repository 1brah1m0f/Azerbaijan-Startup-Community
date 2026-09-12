/**
 * Azerbaijani copy — the source of truth for all site content.
 *
 * To edit the site's text, change the strings here, then mirror the change in
 * `locales/en.ts`. The shape of this object defines the `Dictionary` type, so
 * TypeScript flags any key that is missing from the English file.
 */
export const az = {
  meta: {
    title: "Azerbaijan Startup Community",
    description:
      "İdeya mərhələsindən böyüyən startaplara qədər — founder-ları, mentorları və ekosistemin imkanlarını bir araya gətiririk.",
  },

  nav: {
    startups: "Startaplar",
    mentors: "Mentorlar",
    opportunities: "İmkanlar",
    about: "Haqqımızda",
    login: "Giriş",
    joinStartup: "Startup kimi qoşul",
    joinMentor: "Mentor ol",
    menu: "Menyu",
    switchLang: "Dili dəyiş / Switch language",
  },

  hero: {
    titleLead: "İdeyan varsa, başlamaq üçün",
    titleAccent: "doğru yerdəsən.",
    sub: "İdeya mərhələsindən böyüyən startaplara qədər — founder-ları, mentorları və ekosistemin imkanlarını bir araya gətiririk.",
    ctaStartup: "Startup kimi qoşul",
    ctaMentor: "Mentor kimi qoşul",
    note: "Sadəcə ideyan var? Bu da qoşulmaq üçün kifayətdir.",
  },

  stage: {
    eyebrow: "Kimlər qoşula bilər?",
    title: "Hansı mərhələdəsən?",
    badge: "Qoşula bilərsən.",
    cards: {
      idea: {
        title: "İdeyam var",
        text: "Problemi müəyyən etmisən, amma hələ komanda və ya məhsul yoxdur.",
      },
      building: {
        title: "Startup qururam",
        text: "Komandan, MVP-n və ya ilk istifadəçilərin var.",
      },
      growing: {
        title: "Böyüyürəm",
        text: "Müştərilərin var və yeni bazar, tərəfdaş və investisiya imkanları axtarırsan.",
      },
    },
    cta: "Startup-ını ASC-yə əlavə et",
  },

  why: {
    eyebrow: "Niyə qoşulum?",
    title: "Tək qurmaq məcburiyyətində deyilsən.",
    cards: {
      people: {
        title: "Doğru insanlarla tanış ol",
        text: "Founder, mentor, investor, ekspert və korporativ tərəfdaşlarla əlaqə qur.",
      },
      experience: {
        title: "Təcrübədən faydalan",
        text: "Sənin keçdiyin yolu daha əvvəl keçmiş insanların təcrübəsindən istifadə et.",
      },
      access: {
        title: "Fürsətlərə çıxış əldə et",
        text: "Proqramlar, challenge-lər, pilotlar, investor görüşləri və tərəfdaşlıq imkanlarından xəbərdar ol.",
      },
      visibility: {
        title: "Görünür ol",
        text: "Startup-ını ASC ekosistemində təqdim et və potensial tərəfdaşların səni tapmasına imkan yarat.",
      },
    },
    cta: "Startup kimi qoşul",
  },

  startups: {
    eyebrow: "Ekosistem",
    title: "ASC Startup Network",
    sub: "Azərbaycanda qurulan startapların açıq bazası. Sektoruna, mərhələsinə və axtardığı dəstəyə görə tanış ol.",
    filterAll: "Hamısı",
    filterStage: "Mərhələ",
    filterSector: "Sektor",
    filterLooking: "Axtarır",
    labelStage: "Mərhələ",
    labelLooking: "Axtarır",
    website: "Sayt",
    todo: "Dəqiqləşdirilir",
    empty: "Bu filtrlərə uyğun startup tapılmadı.",
    bottomTitle: "Startup-ın burada görünsün.",
    cta: "Startup-ını əlavə et",
  },

  mentors: {
    title: "Təcrübən bir startup-ın yolunu dəyişə bilər.",
    paragraph:
      "Biznes, texnologiya, məhsul, satış, marketinq, maliyyə, hüquq, investisiya və digər sahələrdə təcrübən varsa, onu yeni founder-larla paylaş.",
    listTitle: "Mentor olaraq:",
    bullets: [
      "uyğun startup-larla tanış ol;",
      "təcrübəni founder-larla paylaş;",
      "yeni məhsulların formalaşmasına töhfə ver;",
      "Azərbaycanın startup ekosisteminin inkişafında iştirak et.",
    ],
    cta: "Mentor kimi qoşul",
    note: "Daimi öhdəlik tələb etmir. Ekspertiza sahəni və ayıra biləcəyin vaxtı sən müəyyən edirsən.",
    sampleBadge: "Mentor profili",
    networkTitle: "ASC Mentor Network",
    networkSub: "Founder-lara dəstək olan mentorlar.",
    networkCta: "Mentor şəbəkəsinə qoşul",
    labelExpertise: "Expertise",
    labelIndustries: "Industries",
    labelSupports: "Supports",
  },

  opportunities: {
    eyebrow: "İmkanlar",
    title: "ASC-də səni nə gözləyir?",
    cards: {
      mentorship: {
        title: "Mentorluq",
        text: "Ehtiyacına uyğun təcrübəli insanlarla əlaqə.",
      },
      community: {
        title: "Founder Community",
        text: "Digər startup qurucuları ilə təcrübə və əlaqə mübadiləsi.",
      },
      corporate: {
        title: "Startup × Corporate",
        text: "Korporativ tərəfdaşlarla challenge və pilot imkanları.",
      },
      investor: {
        title: "Investor Access",
        text: "Hazır olan startup-lar üçün investorlarla tanışlıq imkanları.",
      },
      events: {
        title: "Events & Meetups",
        text: "Founder görüşləri, workshop-lar və tematik tədbirlər.",
      },
      global: {
        title: "Global Opportunities",
        text: "Beynəlxalq proqram, accelerator və ecosystem imkanları.",
      },
    },
  },

  partners: {
    title: "Tərəfdaşlarımız",
  },

  team: {
    eyebrow: "Komanda",
    title: "Komandamızla Tanış Ol",
    sub: "Azərbaycan startap ekosistemini inkişaf etdirən liderlər.",
    bios: {
      shamsi:
        "FMCG, satış, ticarət marketinqi, biznesin inkişafı və rəqəmsal transformasiya sahələrində 12 ildən çox təcrübəyə malik biznes lideri. Fəaliyyəti süni intellekt və rəqəmsal istedadların inkişafı, startap ekosistemləri, eləcə də sənaye ilə akademiya arasında əməkdaşlıq üzərində cəmləşib.",
      fehruz:
        "Azərbaycandakı startap qurucuları və həvəskarları üçün icma yaradıb idarə edir; bilik mübadiləsi, şəbəkələşmə və əməkdaşlığı təşviq edir. Erkən mərhələ startapları dəstəkləmək üçün tədbirlər, seminarlar və mentorluq proqramları təşkil edir.",
      mehin:
        "İnnovasiya menecmenti və startap konsaltinqi sahəsində çalışır. İcma fəaliyyətini koordinasiya edir və startapların inkişafına dəstək olur.",
    },
  },

  finalCta: {
    title: "Ekosistemin hansı tərəfindəsən?",
    startup: {
      title: "Startup qurursan?",
      text: "İdeyadan seed mərhələsinə qədər ASC şəbəkəsinə qoşul.",
      cta: "Startup kimi qoşul",
    },
    mentor: {
      title: "Təcrübəni paylaşmaq istəyirsən?",
      text: "Founder-ların inkişafına mentor kimi dəstək ol.",
      cta: "Mentor kimi qoşul",
    },
  },

  formStartup: {
    title: "Startup kimi qoşul",
    sub: "Sadəcə ideyan var? Bu da kifayətdir.",
    fullName: "Ad / Soyad",
    email: "E-poçt",
    startupName: "Startup adı",
    stage: "Stage",
    stagePlaceholder: "Mərhələ seç",
    sector: "Sektor",
    sectorPlaceholder: "Sektor seç",
    description: "Startup-ı 2 cümlə ilə izah et",
    descriptionPlaceholder: "Nə qurursan və kimin problemini həll edir?",
    needs: "Hazırda ən çox nəyə ehtiyacın var?",
    needsHint: "Bir neçəsini seçə bilərsən.",
    submit: "Göndər",
  },

  formMentor: {
    title: "Mentor kimi qoşul",
    sub: "Daimi öhdəlik tələb etmir.",
    fullName: "Ad / Soyad",
    email: "E-poçt",
    role: "Vəzifə / Şirkət",
    rolePlaceholder: "Məs. Head of Growth, Bakcell",
    expertise: "Expertise",
    industries: "Sektor təcrübəsi",
    industriesPlaceholder: "Məs. SaaS, Retail, FinTech",
    supports: "Hansı mərhələdə startup-a dəstək verə bilərsən?",
    linkedin: "LinkedIn",
    availability: "Ayda nə qədər vaxt ayıra bilərsən?",
    availabilityPlaceholder: "Seç",
    submit: "Göndər",
  },

  business: {
    title: "Biznes müraciətləri",
    sub: "Partnyorluq, sponsorluq və ya media ilə bağlı bizə yazın.",
    name: "Ad",
    company: "Şirkət",
    email: "E-poçt",
    topic: "Mövzu",
    topicPartnership: "Partnyorluq",
    topicSponsorship: "Sponsorluq",
    topicMedia: "Media",
    topicOther: "Digər",
    message: "Mesaj",
    submit: "Göndər",
  },

  form: {
    success: "Göndərildi!",
    successSub: "Tezliklə səninlə əlaqə saxlayacağıq.",
    sending: "Göndərilir...",
    required: "Bu sahəni doldur.",
    invalidEmail: "Düzgün e-poçt daxil et.",
    invalidUrl: "Düzgün keçid daxil et.",
    selectOne: "Ən azı bir seçim et.",
    tooLong: "Mətn çox uzundur.",
    serverError: "Göndərmək alınmadı. Bir azdan yenidən yoxla.",
    charactersLeft: "simvol qalıb",
    optional: "istəyə bağlı",
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
      Other: "Digər",
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
      "1-2": "1–2 saat",
      "3-5": "3–5 saat",
      "5+": "5+ saat",
    },
  },

  footer: {
    about: "Haqqımızda",
    opportunities: "İmkanlar",
    startups: "Startaplar",
    mentors: "Mentorlar",
    contact: "Əlaqə",
    copy: "© 2026 Azerbaijan Startup Community. Bütün hüquqlar qorunur.",
    instagram: "Instagram",
    linkedin: "LinkedIn",
  },

  account: {
    title: "Hesabım",
    signOut: "Çıxış",
    backToSite: "Sayta qayıt",
    submitted: "Göndərilib",
    startupProfile: "Startup profilin",
    mentorProfile: "Mentor profilin",
    startupMatches: "Sənə uyğun mentorlar",
    mentorMatches: "Sənə uyğun startaplar",
    noMatches:
      "Hələ uyğun nəticə yoxdur. Şəbəkəyə yeni qoşulanlar oldukca burada görünəcək.",
    introNote: "Əlaqə məlumatları göstərilmir — tanışlığı ASC təşkil edir.",
    fit: "Uyğunluq",
    labelStage: "Mərhələ",
    labelSector: "Sektor",
    labelNeeds: "Ehtiyac",
    labelAbout: "Haqqında",
    labelRole: "Vəzifə",
    labelExpertise: "Ekspertiza",
    labelIndustries: "Sektorlar",
    labelSupports: "Dəstək verir",
    labelAvailability: "Aylıq vaxt",
    nothingYet: "Bu e-poçt ilə göndərilmiş müraciət tapılmadı.",
  },

  auth: {
    title: "Daxil Ol",
    subtitle: "Hesabına daxil ol və davam et",
    roleStartup: "Startap",
    roleMentor: "Mentor",
    email: "E-poçt",
    password: "Şifrə",
    submit: "Daxil Ol",
    noAccount: "Hesabın yoxdur?",
    signup: "Hesab yarat",
    signupTitle: "Hesab yarat",
    signupSubtitle: "Müraciət etdiyin e-poçt ilə hesab yarat",
    haveAccount: "Artıq hesabın var?",
    backToLogin: "Daxil ol",
    passwordHint: "Ən azı 8 simvol",
    close: "Bağla",
    errorMissing: "Bütün sahələri doldur.",
    errorEmail: "Düzgün e-poçt daxil et.",
    errorInvalid: "E-poçt və ya şifrə yanlışdır.",
    errorNotRegistered:
      "Bu e-poçt ilə müraciət tapılmadı. Əvvəlcə aşağıdakı formanı doldur.",
    errorAlreadyRegistered: "Bu e-poçt üçün hesab var. Daxil ol.",
    errorWeakPassword: "Şifrə ən azı 8 simvol olmalıdır.",
    errorFailed: "Alınmadı. Bir azdan yenidən yoxla.",
    goToForm: "Formanı doldur",
  },
} as const;

/**
 * Widens the literal types produced by `as const` back to `string`, so that
 * `en.ts` can supply different wording while keeping exactly the same keys.
 */
type Widen<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? readonly Widen<U>[]
    : { readonly [K in keyof T]: Widen<T[K]> };

export type Dictionary = Widen<typeof az>;
