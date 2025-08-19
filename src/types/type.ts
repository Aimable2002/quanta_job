import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface NavItem {
    name: string;
    path: string;
    external?: boolean;
  }
  
  export interface Product {
    id: number;
    name: string;
    description: string;
    image: string;
    rating: string;
    downloads: string;
    badge?: string;
  }
  
  export interface Service {
    id: number;
    title: string;
    description: string;
    icon: string;
    link: string;
  }

export interface Value {
  id: number;
  title: string;
  description: string;
  icon: IconDefinition;
}

  export interface Testimonial {
    id: number;
    content: string;
    author: string;
    role: string;
    avatar: string;
  }
  
  export interface Message {
    id: number;
    text: string;
    sender: 'user' | 'bot';
  }