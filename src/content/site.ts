/** The editorial source of truth. Replace concepts here when verified project stories are available. */
export const site = {
  name: "Psametra",
  intros: {
    services: {
      label: "Our capabilities",
      title: "The right thinking.",
      accent: "The right technology.",
      description:
        "One considered approach, from the first idea to the systems that bring it to life.",
    },
    work: {
      label: "A look at what’s possible",
      title: "Thought made tangible.",
      accent: "Possibility, engineered.",
      description:
        "A collection of concept studies exploring the systems, experiences, and products we can create.",
    },
    about: {
      label: "The thinking behind Psametra",
      title: "Intentional by nature.",
      accent: "Precise by design.",
      description:
        "Psametra is the company Muhammad Saad and Abdur Rafay Khan are building to create focused software products, business systems, and websites.",
    },
    contact: {
      label: "Let’s build something that matters",
      title: "A good place",
      accent: "to start.",
      description:
        "A clear idea, a complex challenge, or an early what-if. We’d like to hear what you have in mind.",
    },
  },
  aboutStory: [
    "There is no shortage of technology. What matters is choosing the right approach, understanding the people who will use it, and getting the details right.",
    "We bring complementary strengths to the same work: software engineering, AI and backend systems alongside full-stack development, interfaces, and product delivery.",
    "Our aim is simple: to be a thoughtful partner to ambitious businesses, building systems that make sense today and leave room for tomorrow.",
  ],
  description:
    "Thoughtful software engineering, AI systems, and digital experiences for ambitious businesses.",
  email:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL || "rmspvtltd.software@gmail.com",
  founders: [
    {
      name: "Muhammad Saad",
      focus: "Software engineering · AI/ML · Backend systems",
      description:
        "Connecting applied intelligence with dependable software foundations.",
      portfolio: "https://muhammadsaad-portfolio.vercel.app/",
    },
    {
      name: "Abdur Rafay Khan",
      focus: "Full-stack development · Interfaces · Product delivery",
      description:
        "Connecting considered interfaces with the systems that bring them to life.",
      portfolio: "https://abdur-rafay-khan-portfolio.vercel.app/",
    },
  ],
  logo: {
    light: "/brand/psametra-logo-dark.webp",
    dark: "/brand/psametra-logo-light.webp",
  },
  navigation: [
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  home: {
    description:
      "We turn ambitious ideas into thoughtful software, intelligent systems, and digital experiences built to last.",
  },
  services: [
    {
      id: "software",
      title: "Software Engineering",
      summary: "Purpose-built systems. Made for your real-world complexity.",
      description:
        "Build around the way your business actually works. We turn complex requirements into clear, dependable software with room to evolve.",
      deliverables: [
        "Custom business applications",
        "Platform architecture & APIs",
        "System integration & modernization",
      ],
    },
    {
      id: "ai",
      title: "AI Systems",
      summary: "Intelligence that works. Beyond the proof of concept.",
      description:
        "Put intelligence where it makes a meaningful difference. We connect AI to your processes with explicit evaluation, human oversight, and a clear purpose.",
      deliverables: [
        "AI workflow automation",
        "Knowledge & retrieval systems",
        "Applied AI product development",
      ],
    },
    {
      id: "web",
      title: "Web Platforms",
      summary: "Fast, intuitive experiences. Without the unnecessary.",
      description:
        "Give your business a digital foundation that feels effortless to use. Accessible, responsive platforms with performance considered from the first decision.",
      deliverables: [
        "Company websites & web applications",
        "Customer & operations portals",
        "Performance & accessibility",
      ],
    },
    {
      id: "product",
      title: "Product Design & Strategy",
      summary: "The right questions. A clearer path from idea to product.",
      description:
        "Find the right thing to build before building it. We connect user needs and business goals to a focused product direction and a coherent experience.",
      deliverables: [
        "Product discovery & technical planning",
        "UX research & interface design",
        "Design systems & prototyping",
      ],
    },
  ],
  projects: [
    {
      id: "systems",
      title: "Custom Software Systems",
      category: "PLATFORM ENGINEERING",
      type: "system",
      summary: "One coherent workspace for the moving parts of a business.",
      challenge:
        "Fragmented tools make everyday operations harder than they need to be.",
      approach:
        "A modular operations platform that brings workflows, permissions, and information into one considered experience.",
      tags: ["Architecture", "Operations", "Custom software"],
    },
    {
      id: "intelligence",
      title: "AI-Enabled Operations",
      category: "APPLIED INTELLIGENCE",
      type: "ai",
      summary: "From scattered information to useful, actionable intelligence.",
      challenge:
        "Useful knowledge is often buried across documents and disconnected processes.",
      approach:
        "A retrieval-led assistant with source references, explicit review points, and well-defined boundaries for automation.",
      tags: ["Retrieval", "Human oversight", "Automation"],
    },
    {
      id: "experiences",
      title: "Digital Experiences",
      category: "DESIGN & DEVELOPMENT",
      type: "web",
      summary: "An expressive digital presence, engineered to feel effortless.",
      challenge:
        "A digital experience should express a business clearly without getting in the visitor’s way.",
      approach:
        "An accessible, performance-minded web platform that balances distinctive design with a clear customer journey.",
      tags: ["Interface design", "Web", "Accessibility"],
    },
    {
      id: "products",
      title: "Product Engineering",
      category: "IDEA TO IMPLEMENTATION",
      type: "product",
      summary: "A focused product foundation, ready for its next chapter.",
      challenge:
        "Early ideas need a clear scope and a reliable foundation before adding complexity.",
      approach:
        "A focused product slice supported by a reusable design system, typed interfaces, and a deliberate path to iteration.",
      tags: ["Discovery", "Design systems", "Engineering"],
    },
  ],
  principles: [
    {
      title: "Clarity before complexity.",
      description:
        "We ask questions, challenge assumptions, and make the path forward clear before we write the first line of code.",
    },
    {
      title: "Quality in the details.",
      description:
        "Good engineering is felt in the experience and found in the foundations. We care about both.",
    },
    {
      title: "Partnership, by design.",
      description:
        "Open conversations, shared context, and thoughtful decisions. We work with you, not around you.",
    },
    {
      title: "Built for the long view.",
      description:
        "Readable code. Documented decisions. Systems your team can understand, maintain, and grow.",
    },
  ],
  process: [
    {
      title: "Understand",
      description:
        "Align on the problem, the people, and what a useful outcome looks like.",
    },
    {
      title: "Define",
      description:
        "Make the scope, experience, and technical direction explicit.",
    },
    {
      title: "Build",
      description:
        "Develop in focused increments, with working software and regular feedback.",
    },
    {
      title: "Refine",
      description:
        "Test the details, document the decisions, and prepare for what comes next.",
    },
  ],
} as const;

export type Project = (typeof site.projects)[number];
