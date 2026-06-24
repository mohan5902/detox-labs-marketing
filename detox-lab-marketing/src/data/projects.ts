import { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "lick-and-sip",
    name: "Lick & Sip",
    category: "Food & Beverage",
    description:
      "A premium food and beverage website designed with fully responsive layouts, elegant dark branding, and engaging interactive elements.",
    url: "https://lick-and-sip-psmb.vercel.app",
    stack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    accent: "from-circuit-400 to-cyan-accent",
    image: "/projects/lick-and-sip.png",
  },
  {
    slug: "gym-website",
    name: "Gym Website",
    category: "Fitness Industry",
    description:
      "A fast, modern gym and fitness website highlighting memberships, trainers, schedule timings, and call-to-actions.",
    url: "https://mohan5902.github.io/Gym-Website-Demo/",
    stack: ["HTML5", "CSS3", "JavaScript"],
    accent: "from-violet-accent to-circuit-400",
    image: "/projects/gym.png",
  },
  {
    slug: "real-estate",
    name: "Real Estate Website",
    category: "Real Estate",
    description:
      "A professional real estate listing portal and landing page built to present listings, house images, maps, and inquiries.",
    url: "https://mohan5902.github.io/Real-Estate-Website-Demo/",
    stack: ["HTML5", "CSS3", "JavaScript"],
    accent: "from-circuit-500 to-violet-accent",
    image: "/projects/real-estate.png",
  },
  {
    slug: "photography-studio",
    name: "Photography Studio Website",
    category: "Portfolio Website",
    description:
      "A creative portfolio site for photography studios featuring grid galleries, smooth transitions, and emergency booking sections.",
    url: "https://mohan5902.github.io/photography-studio-page/",
    stack: ["HTML5", "CSS3", "JavaScript"],
    accent: "from-cyan-accent to-circuit-300",
    image: "/projects/photography.png",
  },
  {
    slug: "plumbing-service",
    name: "Plumbing Service Website",
    category: "Service Business",
    description:
      "A high-converting plumbing service business landing page equipped with emergency booking forms and direct WhatsApp dials.",
    url: "https://mohan5902.github.io/Plumbing-website/",
    stack: ["HTML5", "CSS3", "JavaScript"],
    accent: "from-circuit-400 to-violet-accent",
    image: "/projects/plumbing.png",
  },
];
