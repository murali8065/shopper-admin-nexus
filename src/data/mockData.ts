
import { Category, Product, Review, SalesData, User } from "@/types";

export const categories: Category[] = [
  {
    id: "1",
    name: "Living Room",
    slug: "living-room",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1032&q=80"
  },
  {
    id: "2",
    name: "Bedroom",
    slug: "bedroom",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJlZHJvb20lMjBmdXJuaXR1cmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: "3",
    name: "Dining",
    slug: "dining",
    image: "https://images.unsplash.com/photo-1615968679312-9b7ed9f04e79?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGluaW5nJTIwdGFibGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: "4",
    name: "Office",
    slug: "office",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b2ZmaWNlJTIwZnVybml0dXJlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: "5",
    name: "Outdoor",
    slug: "outdoor",
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8b3V0ZG9vciUyMGZ1cm5pdHVyZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: "6",
    name: "Decor",
    slug: "decor",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG9tZSUyMGRlY29yfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
  }
];

export const users: User[] = [
  {
    id: "1",
    name: "Demo User",
    email: "user@example.com",
    role: "user",
    avatar: "https://i.pravatar.cc/150?u=user"
  },
  {
    id: "2",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    avatar: "https://i.pravatar.cc/150?u=admin"
  },
  {
    id: "3",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "user",
    avatar: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    id: "4",
    name: "Michael Brown",
    email: "michael@example.com",
    role: "user",
    avatar: "https://i.pravatar.cc/150?u=michael"
  }
];

export const reviews: Review[] = [
  {
    id: "1",
    user: users[2],
    rating: 5,
    text: "I love this piece of furniture! It's exactly as described and looks amazing in my living room.",
    date: "2023-12-01",
    verified: true
  },
  {
    id: "2",
    user: users[0],
    rating: 4,
    text: "Good quality and comfortable. The color is slightly different than in the photos, but still looks great.",
    date: "2023-11-15",
    verified: true
  },
  {
    id: "3",
    user: users[3],
    rating: 5,
    text: "Fantastic furniture, quick shipping, and easy assembly. Highly recommend!",
    date: "2023-10-28",
    verified: true
  },
  {
    id: "4",
    user: users[2],
    rating: 3,
    text: "It's okay but took longer than expected to ship. Quality is good though.",
    date: "2023-09-20",
    verified: false
  }
];

export const products: Product[] = [
  {
    id: "1",
    name: "Modern Leather Sofa",
    slug: "modern-leather-sofa",
    description: "Elegant modern sofa with genuine leather upholstery, perfect for contemporary living spaces.",
    price: 1299,
    category: categories[0],
    images: [
      "https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c29mYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1550254478-ead40cc3b1b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHNvZmF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
    ],
    stock: 15,
    rating: 4.5,
    reviews: [reviews[0], reviews[1]],
    seller: users[1]
  },
  {
    id: "2",
    name: "Wooden Coffee Table",
    slug: "wooden-coffee-table",
    description: "Handcrafted coffee table made from reclaimed wood, adding a rustic charm to any living space.",
    price: 449,
    category: categories[0],
    images: [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29mZmVlJTIwdGFibGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1608909322671-f8e5eda9f033?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNvZmZlZSUyMHRhYmxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
    ],
    stock: 23,
    rating: 4.8,
    reviews: [reviews[2], reviews[0]],
    seller: users[1]
  },
  {
    id: "3",
    name: "King Size Platform Bed",
    slug: "king-size-platform-bed",
    description: "Minimalist king-size platform bed with built-in storage drawers and a sleek headboard.",
    price: 899,
    category: categories[1],
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YmVkfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJlZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
    ],
    stock: 10,
    rating: 4.6,
    reviews: [reviews[1], reviews[2]],
    seller: users[1]
  },
  {
    id: "4",
    name: "Ergonomic Office Chair",
    slug: "ergonomic-office-chair",
    description: "Premium ergonomic office chair with adjustable lumbar support and breathable mesh back.",
    price: 349,
    category: categories[3],
    images: [
      "https://images.unsplash.com/photo-1571722288749-921772083966?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8b2ZmaWNlJTIwY2hhaXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8b2ZmaWNlJTIwY2hhaXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
    ],
    stock: 32,
    rating: 4.7,
    reviews: [reviews[3], reviews[2]],
    seller: users[1]
  },
  {
    id: "5",
    name: "Dining Table Set",
    slug: "dining-table-set",
    description: "Six-seater dining table set with solid wood construction and comfortable upholstered chairs.",
    price: 1199,
    category: categories[2],
    images: [
      "https://images.unsplash.com/photo-1617098591651-ad3807D60c1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGRpbmluZyUyMHRhYmxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1631679706909-1844bbd07221?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZGluaW5nJTIwdGFibGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
    ],
    stock: 8,
    rating: 4.3,
    reviews: [reviews[0], reviews[3]],
    seller: users[1]
  },
  {
    id: "6",
    name: "Outdoor Lounge Set",
    slug: "outdoor-lounge-set",
    description: "Weather-resistant outdoor lounge set with comfortable cushions and a sleek modern design.",
    price: 1699,
    category: categories[4],
    images: [
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8b3V0ZG9vciUyMGZ1cm5pdHVyZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8b3V0ZG9vciUyMGZ1cm5pdHVyZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
    ],
    stock: 5,
    rating: 4.9,
    reviews: [reviews[2], reviews[1]],
    seller: users[1]
  },
  {
    id: "7",
    name: "Decorative Wall Mirror",
    slug: "decorative-wall-mirror",
    description: "Elegant round wall mirror with ornate metal frame, perfect for enhancing any room.",
    price: 249,
    category: categories[5],
    images: [
      "https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVjb3JhdGl2ZSUyMG1pcnJvcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGVjb3JhdGl2ZSUyMG1pcnJvcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
    ],
    stock: 18,
    rating: 4.4,
    reviews: [reviews[3], reviews[0]],
    seller: users[1]
  },
  {
    id: "8",
    name: "Bookshelf with Storage",
    slug: "bookshelf-with-storage",
    description: "Versatile bookshelf with multiple shelves and cabinets for efficient storage and display.",
    price: 599,
    category: categories[0],
    images: [
      "https://images.unsplash.com/photo-1594620302200-9a762244a156?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ym9va3NoZWxmfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1588254057341-387a318ca6ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Ym9va3NoZWxmfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
    ],
    stock: 12,
    rating: 4.5,
    reviews: [reviews[1], reviews[2]],
    seller: users[1]
  }
];

export const mockSalesData: SalesData[] = [
  { date: "2023-01", sales: 12500 },
  { date: "2023-02", sales: 15000 },
  { date: "2023-03", sales: 18000 },
  { date: "2023-04", sales: 16800 },
  { date: "2023-05", sales: 21000 },
  { date: "2023-06", sales: 19500 },
  { date: "2023-07", sales: 22500 },
  { date: "2023-08", sales: 25000 },
  { date: "2023-09", sales: 27800 },
  { date: "2023-10", sales: 24500 },
  { date: "2023-11", sales: 29000 },
  { date: "2023-12", sales: 34500 },
];
