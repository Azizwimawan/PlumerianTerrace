export interface Property {
  id: string;
  title: string;
  type: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  location: {
    address: string;
    lat: number;
    lng: number;
  };
  images: string[];
  description: string;
  amenities: string[];
  status: string;
  agent: string;
  agentPhone: string;
  dateAdded: string;
  featured: boolean;
  propertyType: string;
  tenure: string;
  psf: number;
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  attachments: string[];
}

export interface Ticket {
  id: string;
  propertyId: string;
  title: string;
  description: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  assignee: string;
  reporter: string;
  createdDate: string;
  updatedDate: string;
  comments: Comment[];
  attachments: string[];
}

export interface ContactInfo {
  phone: string;
  whatsapp: string;
  instagram: string;
  email: string;
}

export interface SearchFilters {
  priceMin?: number;
  priceMax?: number;
  bedrooms?: number;
  propertyType?: string;
  location?: string;
}