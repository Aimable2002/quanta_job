// valuesData.ts
import { faHeart, faBullseye, faStar, faMedal, faGlasses, faFire, faBolt, faUsers, faShieldAlt, faRocket } from '@fortawesome/free-solid-svg-icons';
import type { Value } from "../types/type";

const valuesData: Value[] = [
  {
    id: 1,
    title: "Empathy",
    description:
      "We deeply understand what people need before they even know it. We build products that connect with human emotion, culture, and behavior.",
    icon: faHeart,
  },
  {
    id: 2,
    title: "Focus",
    description:
      "We say no to distractions and average ideas. We pour all our energy into building excellent, world-class products.",
    icon: faBullseye,
  },
  {
    id: 3,
    title: "Impute",
    description:
      "Every detail of what we build — from design to communication — must reflect our excellence, precision, and boldness.",
    icon: faStar,
  },
  {
    id: 4,
    title: "Extreme Ownership",
    description:
      "Every team member is responsible for the success or failure of our mission. We act, fix, innovate, and own the outcome.",
    icon: faMedal,
  },
  {
    id: 5,
    title: "Future Obsession",
    description:
      "We don't follow trends — we invent them. We predict the future, build it faster than anyone, and set the pace for the world.",
    icon: faGlasses,
  },
  {
    id: 6,
    title: "Sacrificial Dedication",
    description:
      "We are warriors of innovation. We sacrifice comfort, time, and even money when needed to fulfill the mission.",
    icon: faFire,
  },
  {
    id: 7,
    title: "100x Mindset",
    description:
      "We don't build to compete — we build to dominate. Our mindset is not 10x but 100x in quality, speed, and impact.",
    icon: faBolt,
  },
  {
    id: 8,
    title: "Intelligent Unity",
    description:
      "We are one body with many minds. We sync our skills into one unstoppable force, driven by purpose, not ego.",
    icon: faUsers,
  },
  {
    id: 9,
    title: "Uncompromised Integrity",
    description:
      "We protect our mission, our data, our users, and our company. We stay true to our values even when no one is watching.",
    icon: faShieldAlt,
  },
  {
    id: 10,
    title: "Built for Earth and Beyond",
    description:
      "We are not just building for today, or just for Earth. We are preparing for the intelligence of tomorrow — across galaxies.",
    icon: faRocket,
  },
];

export default valuesData;
