import type { Product } from "../types/type";
import Aiassa from '../assets/images/Aiass.webp'
import product2 from '../assets/images/product2.png'
import hero from '../assets/hero.jpeg'
import product4 from '../assets/images/product4.png'
import product5 from '../assets/images/product5.jpg'

const productsData: Product[] = [
  {
    id: 1,
    name: "Divinex Web App",
    description: "Divinex helps religious communities worldwide host live and recorded services...",
    image: Aiassa,
    rating: "4.9/5",
    downloads: "10K+",
    badge: "New Release"
  },
  {
    id: 2,
    name: "QUANTA Vision Pro",
    description: "Advanced computer vision platform for real-time analytics.",
    image: product2,
    rating: "4.7/5",
    downloads: "8K+"
  },
  {
    id: 3,
    name: "QUANTA Flow",
    description: "Automated workflow builder with AI-powered decision making",
    image: hero,
    rating: "4.8/5",
    downloads: "12K+",
    badge: "Featured"
  },
  {
    id: 4,
    name: "QUANTA Analytics",
    description: "AI-powered business intelligence and data visualization.",
    image: product4,
    rating: "4.8/5",
    downloads: "12K+",
    badge: "Featured"
  },
  {
    id: 5,
    name: "QUANTA Voice",
    description: "Natural language processing for voice-enabled applications.",
    image: product5,
    rating: "4.6/5",
    downloads: "9K+"
  }
];

export default productsData;