import type { Testimonial } from "../types/type";
import test1 from '../assets/images/testi1.png'
import test2 from '../assets/images/testi3.webp'
import test3 from '../assets/images/testi3.webp'
import test4 from '../assets/images/testi4.jpg'
// import test5 from '../assets/images/testi5.webp'

const testimonialsData: Testimonial[] = [
  {
    id: 1,
    content: "QUANTA's AI solutions transformed our business operations completely. Their technology is years ahead of competitors and their team delivered beyond our expectations.",
    author: "Sarah Johnson",
    role: "CTO, TechCorp International",
    avatar: test1 
  },
  {
    id: 2,
    content: "The QUANTA internship program produced some of the most skilled developers we've ever hired. Their training methodology is truly revolutionary in the tech education space.",
    author: "Michael Chen",
    role: "Engineering Director, FutureSystems",
    avatar: test2
  },
  {
    id: 3,
    content: "Working with QUANTA was a game-changer for our digital transformation. Their expertise in AI and machine learning helped us solve problems we thought were unsolvable.",
    author: "Emma Rodriguez",
    role: "CEO, DigitalFuture Inc.",
    avatar: test3
  },
  {
    id: 4,
    content: "QUANTA's vision for AGI aligns perfectly with our research goals. Their team brings both theoretical depth and practical implementation skills that are rare in this field.",
    author: "Dr. James Wilson",
    role: "Director, Advanced AI Research Lab",
    avatar: test4
  }
];

export default testimonialsData;