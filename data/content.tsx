import React from 'react';

export const COUNTRIES = [
  { name: "Afghanistan", code: "+93", iso: "AF" },
  { name: "Albania", code: "+355", iso: "AL" },
  { name: "Algeria", code: "+213", iso: "DZ" },
  { name: "Argentina", code: "+54", iso: "AR" },
  { name: "Australia", code: "+61", iso: "AU" },
  { name: "Austria", code: "+43", iso: "AT" },
  { name: "Bangladesh", code: "+880", iso: "BD" },
  { name: "Belgium", code: "+32", iso: "BE" },
  { name: "Brazil", code: "+55", iso: "BR" },
  { name: "Canada", code: "+1", iso: "CA" },
  { name: "China", code: "+86", iso: "CN" },
  { name: "Colombia", code: "+57", iso: "CO" },
  { name: "Denmark", code: "+45", iso: "DK" },
  { name: "Egypt", code: "+20", iso: "EG" },
  { name: "Finland", code: "+358", iso: "FI" },
  { name: "France", code: "+33", iso: "FR" },
  { name: "Germany", code: "+49", iso: "DE" },
  { name: "Greece", code: "+30", iso: "GR" },
  { name: "Hong Kong", code: "+852", iso: "HK" },
  { name: "India", code: "+91", iso: "IN" },
  { name: "Indonesia", code: "+62", iso: "ID" },
  { name: "Ireland", code: "+353", iso: "IE" },
  { name: "Israel", code: "+972", iso: "IL" },
  { name: "Italy", code: "+39", iso: "IT" },
  { name: "Japan", code: "+81", iso: "JP" },
  { name: "Mexico", code: "+52", iso: "MX" },
  { name: "Netherlands", code: "+31", iso: "NL" },
  { name: "New Zealand", code: "+64", iso: "NZ" },
  { name: "Nigeria", code: "+234", iso: "NG" },
  { name: "Norway", code: "+47", iso: "NO" },
  { name: "Pakistan", code: "+92", iso: "PK" },
  { name: "Philippines", code: "+63", iso: "PH" },
  { name: "Poland", code: "+48", iso: "PL" },
  { name: "Portugal", code: "+351", iso: "PT" },
  { name: "Qatar", code: "+974", iso: "QA" },
  { name: "Russia", code: "+7", iso: "RU" },
  { name: "Saudi Arabia", code: "+966", iso: "SA" },
  { name: "Singapore", code: "+65", iso: "SG" },
  { name: "South Africa", code: "+27", iso: "ZA" },
  { name: "South Korea", code: "+82", iso: "KR" },
  { name: "Spain", code: "+34", iso: "ES" },
  { name: "Sweden", code: "+46", iso: "SE" },
  { name: "Switzerland", code: "+41", iso: "CH" },
  { name: "Taiwan", code: "+886", iso: "TW" },
  { name: "Thailand", code: "+66", iso: "TH" },
  { name: "Turkey", code: "+90", iso: "TR" },
  { name: "Ukraine", code: "+380", iso: "UA" },
  { name: "United Arab Emirates", code: "+971", iso: "AE" },
  { name: "United Kingdom", code: "+44", iso: "GB" },
  { name: "United States", code: "+1", iso: "US" },
  { name: "Vietnam", code: "+84", iso: "VN" }
];

export const SITE_CONTENT = {
  general: {
    brandName: "MxS STUDIO",
    brandSub: "Madhushree x Sumontro",
    version: "v1.2",
    logo: "MxS"
  },
  preloader: {
    text: "MxS STUDIO"
  },
  navigation: {
    apply: "APPLY",
    scrollDown: "SCROLL ↓",
    backToTop: "BACK TO TOP ↑"
  },
  hero: {
    line1: "WE DO NOT",
    line2: "BUILD WEBSITES",
    subtext: "We Architect Digital Homes"
  },
  philosophy: [
    {
      title: "No Templates",
      content: "We reject the tyranny of drag-and-drop. Every pixel is placed with intention, ensuring your digital home feels distinctly yours.",
      highlight: false
    },
    {
      title: "Sovereign Ownership",
      content: "You are not a subscriber. You are an owner. You own the digital asset completely. No strings attached.",
      highlight: true
    },
    {
      title: "The Gift Economy",
      content: "Radical generosity. We select a limited number of creators each cycle and build for free. Because we can.",
      highlight: false
    }
  ],
  process: {
    sectionTitle: "The Protocol",
    steps: [
      {
        number: "01.",
        title: "The Audit",
        description: "We analyze your digital footprint. We study your vibe, your audience, and your content. Then, we align."
      },
      {
        number: "02.",
        title: "The Blueprint",
        description: "We architect your home using bespoke code. No bloat. Zero latency. Pure, compiled digital craft."
      },
      {
        number: "03.",
        title: "The Handover",
        description: "You receive your live personal link and full ownership rights. It is yours forever. No monthly fees. No strings."
      }
    ]
  },
  gallery: {
    header: "Recent Commissions",
    cards: [
      {
        title: "The Minimalist Poet",
        author: "Arjun V.",
        role: "Writer & Thinker",
        colorClass: "text-emerald-500",
        image: "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?q=80&w=800&auto=format&fit=crop",
        code: (
          <>
            &lt;div class="hero"&gt;<br/>
            &nbsp;&nbsp;&lt;h1&gt;Poetry in Code&lt;/h1&gt;<br/>
            &nbsp;&nbsp;&lt;nav&gt;...&lt;/nav&gt;<br/>
            &lt;/div&gt;<br/><br/>
            // Tailwind Config<br/>
            bg-slate-900 text-slate-50
          </>
        )
      },
      {
        title: "Urban Kinetic",
        author: "Sara K.",
        role: "Movement Coach",
        colorClass: "text-sky-500",
        image: "https://images.unsplash.com/photo-1486718448742-163732cd1544?q=80&w=800&auto=format&fit=crop",
        code: (
          <>
            &lt;section id="booking"&gt;<br/>
            &nbsp;&nbsp;&lt;a href="wa.me/..."&gt;<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;Book Session<br/>
            &nbsp;&nbsp;&lt;/a&gt;<br/>
            // Zero latency
          </>
        )
      },
      {
        title: "Sonic Architect",
        author: "Rohan D.",
        role: "Sound Designer",
        colorClass: "text-rose-500",
        image: "https://images.unsplash.com/photo-1615714264626-ee30623d5d79?q=80&w=800&auto=format&fit=crop",
        code: (
          <>
            &lt;audio src="mix.mp3"&gt;<br/>
            &nbsp;&nbsp;&lt;track kind="captions"&gt;<br/>
            &lt;/audio&gt;<br/>
            // Audio API
          </>
        )
      }
    ],
    archiveCard: {
      title: "The Archive",
      subtitle: "View Collection"
    },
    archiveModal: {
      title: "The Extended Archive",
      subtitle: "Selected Works 2023-2024",
      closeText: "Close Archive",
      endText: "End of Public Records",
      items: [
        {
          title: "Neon Drift",
          author: "Alex M.",
          role: "Visual Artist",
          colorClass: "text-purple-500",
          image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop",
          code: (
            <>
              &lt;canvas id="gl"&gt;<br/>
              &nbsp;&nbsp;initShader(vert, frag);<br/>
              &nbsp;&nbsp;renderLoop();<br/>
              &lt;/canvas&gt;<br/>
              // WebGL Core
            </>
          )
        },
        {
          title: "Silent Lens",
          author: "Sarah J.",
          role: "Photographer",
          colorClass: "text-neutral-400",
          image: "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?q=80&w=800&auto=format&fit=crop",
          code: (
            <>
              &lt;gallery mode="lightbox"&gt;<br/>
              &nbsp;&nbsp;&lt;img src="raw.arw" /&gt;<br/>
              &nbsp;&nbsp;&lt;meta iso="400" /&gt;<br/>
              &lt;/gallery&gt;<br/>
              // Color Grade: B&W
            </>
          )
        },
        {
          title: "Echo Chamber",
          author: "David L.",
          role: "Podcaster",
          colorClass: "text-orange-500",
          image: "https://images.unsplash.com/photo-1478737270239-2f02b77ac6d5?q=80&w=800&auto=format&fit=crop",
          code: (
            <>
              &lt;stream bitrate="320"&gt;<br/>
              &nbsp;&nbsp;&lt;source src="rss.xml" /&gt;<br/>
              &lt;/stream&gt;<br/>
              // Audio Workstation
            </>
          )
        },
        {
          title: "Type Foundry",
          author: "Elena R.",
          role: "Typography Designer",
          colorClass: "text-yellow-200",
          image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop",
          code: (
            <>
              @font-face &#123;<br/>
              &nbsp;&nbsp;font-family: 'Neue';<br/>
              &nbsp;&nbsp;src: url('neue.woff2');<br/>
              &#125;<br/>
              // Kerning: -0.05em
            </>
          )
        }
      ]
    }
  },
  pricing: {
    invoiceHeader: "INVOICE #00000",
    items: [
      "01. Hosting",
      "02. Design Architecture",
      "03. Custom Domain Map",
      "04. Technical Upkeep"
    ],
    totalLabel: "TOTAL DUE:",
    totalValue: "INVITE ONLY",
    footer: "MxS Studio Concierge Service"
  },
  status: {
    text: "Status:",
    value: "3 Spots Remaining (Jan)",
    indicatorColor: "bg-green-500",
    quote: "\"Scarcity ensures craftsmanship.\"",
    tooltip: "We only accept 5 projects per cycle."
  },
  footer: {
    requestTitle: "Request Residency",
    inputPlaceholder: "@INSTAGRAM_HANDLE",
    inputError: "PLEASE ENTER HANDLE",
    button: {
      default: "REQUEST AUDIT",
      active: "REQUESTED"
    },
    successMessage: "Application Logged. We will stalk you shortly.",
    subText: "Limited intake per cycle.",
    links: {
      concierge: { text: "Concierge", url: "https://wa.me/919007856326" },
      instagram: { text: "Instagram", url: "#" },
      email: { text: "Email", url: "#" }
    },
    legalLinks: ["Privacy Protocol", "Terms of Residency", "Disclaimer"]
  },
  modal: {
    brand: "MxS Studio",
    title: "Contact Details",
    emailLabel: "Email Address",
    phoneLabel: "Phone Number",
    authorizeLabel: "I authorize MxS Studio to contact me",
    submitText: "SUBMIT REQUEST",
    successText: "VERIFIED"
  },
  legalOverlay: {
    title: "Operational Protocols // v1.0",
    backText: "[ Return to Studio ]",
    footer: "End of Protocols",
    protocols: [
      {
        id: "01",
        title: "Data Sovereignty (Privacy)",
        content: [
          { label: "Minimization Principle", text: "MxS Studio rejects the surveillance economy. We collect strictly necessary data attributes: your \"Moniker\" (Name), \"Digital Handle\" (Instagram/Social URL), and \"Concierge Line\" (WhatsApp/Email)." },
          { label: "Purpose of Collection", text: "This data is utilized exclusively for the architectural design process, identity verification, and direct service communication." },
          { label: "Communication Consent", text: "By submitting an application, the Resident explicitly consents to receive service-related operational communications via WhatsApp or Email." },
          { label: "Zero Brokerage", text: "We do not sell, trade, broker, or distribute your data to third-party ad networks, trackers, or data aggregators. Your digital footprint within our studio remains hermetically sealed." }
        ]
      },
      {
        id: "02",
        title: "Terms of Residency",
        content: [
          { label: "The Gift Economy", text: "MxS Studio operates on a radical \"Gift Economy\" model. Selected residencies are provided free of monetary charge. As such, the relationship is one of mutual respect, not commercial obligation." },
          { label: "\"As-Is\" Warranty", text: "The digital asset is provided \"as is\" without warranties of any kind, express or implied. We do not guarantee 100% uptime, specific SEO rankings, or revenue generation capabilities." },
          { label: "The Kill Switch", text: "MxS Studio reserves the unilateral right to unpublish, revoke, or redirect the subdomain (.edgentiq.com) if a Resident publishes hate speech, illegal content, or material that materially damages the Studio's reputation.", alert: true },
          { label: "Maintenance Definition", text: "\"Technical Upkeep\" refers strictly to maintaining the validity of the live link. It does not include daily content updates, design revisions, or feature expansions post-handover." }
        ]
      },
      {
        id: "03",
        title: "Platform Disclosure",
        content: [
          { label: "Infrastructure", text: "This architecture relies on standard cloud infrastructure. We are subject to the provider's global uptime availability and Acceptable Use Policies." },
          { label: "Intellectual Property", text: "Upon handover, the specific configuration of the code belongs to the Creator (You). However, the \"MxS Design System\" credit and link in the footer must remain intact in perpetuity as the signature of the architect." }
        ]
      }
    ]
  }
};
