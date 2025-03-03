
// Product categories
export const categories = [
  { id: "electronics", name: "Electronics", icon: "zap" },
  { id: "fashion", name: "Fashion", icon: "shirt" },
  { id: "home", name: "Home & Garden", icon: "lamp" },
  { id: "beauty", name: "Beauty", icon: "spray-can" },
  { id: "sports", name: "Sports", icon: "dumbbell" }
];

// Product data
export const products = [
  {
    id: "p1",
    name: "Wireless Earbuds Pro",
    category: "electronics",
    price: 59.99,
    cost: 22.50,
    sales: 12500,
    rating: 4.7,
    growth: 23,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Premium wireless earbuds with active noise cancellation, touch controls, and 24-hour battery life.",
    performance: [
      { month: "Jan", sales: 950 },
      { month: "Feb", sales: 1100 },
      { month: "Mar", sales: 1250 },
      { month: "Apr", sales: 1400 },
      { month: "May", sales: 1550 },
      { month: "Jun", sales: 1700 }
    ],
    tags: ["trending", "high-margin"]
  },
  {
    id: "p2",
    name: "Smart Watch Series 5",
    category: "electronics",
    price: 129.99,
    cost: 45.00,
    sales: 8700,
    rating: 4.5,
    growth: 15,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Versatile smartwatch with heart rate monitoring, GPS, and customizable watch faces.",
    performance: [
      { month: "Jan", sales: 650 },
      { month: "Feb", sales: 700 },
      { month: "Mar", sales: 750 },
      { month: "Apr", sales: 900 },
      { month: "May", sales: 1000 },
      { month: "Jun", sales: 1200 }
    ],
    tags: ["popular"]
  },
  {
    id: "p3",
    name: "Minimalist Ceramic Vase",
    category: "home",
    price: 34.99,
    cost: 8.25,
    sales: 6200,
    rating: 4.8,
    growth: 32,
    image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Elegant minimalist ceramic vase, perfect for modern home decor.",
    performance: [
      { month: "Jan", sales: 380 },
      { month: "Feb", sales: 420 },
      { month: "Mar", sales: 490 },
      { month: "Apr", sales: 560 },
      { month: "May", sales: 650 },
      { month: "Jun", sales: 780 }
    ],
    tags: ["trending", "high-margin"]
  },
  {
    id: "p4",
    name: "Eco-friendly Water Bottle",
    category: "sports",
    price: 24.99,
    cost: 7.50,
    sales: 9800,
    rating: 4.6,
    growth: 18,
    image: "https://images.unsplash.com/photo-1605274280946-93c095146427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Insulated stainless steel water bottle that keeps drinks cold for 24 hours.",
    performance: [
      { month: "Jan", sales: 780 },
      { month: "Feb", sales: 820 },
      { month: "Mar", sales: 850 },
      { month: "Apr", sales: 900 },
      { month: "May", sales: 950 },
      { month: "Jun", sales: 1000 }
    ],
    tags: ["popular", "eco-friendly"]
  },
  {
    id: "p5",
    name: "Compact Drone with HD Camera",
    category: "electronics",
    price: 149.99,
    cost: 62.00,
    sales: 4300,
    rating: 4.3,
    growth: 27,
    image: "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Portable drone with 4K camera, 30-minute flight time, and intelligent flight modes.",
    performance: [
      { month: "Jan", sales: 310 },
      { month: "Feb", sales: 350 },
      { month: "Mar", sales: 370 },
      { month: "Apr", sales: 400 },
      { month: "May", sales: 430 },
      { month: "Jun", sales: 480 }
    ],
    tags: ["trending"]
  },
  {
    id: "p6",
    name: "Skincare Serum Set",
    category: "beauty",
    price: 89.99,
    cost: 22.50,
    sales: 7500,
    rating: 4.9,
    growth: 45,
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Premium skincare set with vitamin C serum, hyaluronic acid, and retinol formula.",
    performance: [
      { month: "Jan", sales: 580 },
      { month: "Feb", sales: 620 },
      { month: "Mar", sales: 690 },
      { month: "Apr", sales: 780 },
      { month: "May", sales: 850 },
      { month: "Jun", sales: 980 }
    ],
    tags: ["trending", "high-margin"]
  },
  {
    id: "p7",
    name: "Minimalist Desk Organizer",
    category: "home",
    price: 39.99,
    cost: 12.00,
    sales: 5900,
    rating: 4.7,
    growth: 22,
    image: "https://images.unsplash.com/photo-1517705600644-93efc4e82be2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Modern desk organizer with compartments for stationery, devices, and accessories.",
    performance: [
      { month: "Jan", sales: 480 },
      { month: "Feb", sales: 510 },
      { month: "Mar", sales: 540 },
      { month: "Apr", sales: 590 },
      { month: "May", sales: 630 },
      { month: "Jun", sales: 670 }
    ],
    tags: ["popular"]
  },
  {
    id: "p8",
    name: "LED Ring Light",
    category: "electronics",
    price: 29.99,
    cost: 9.50,
    sales: 8100,
    rating: 4.6,
    growth: 29,
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Adjustable LED ring light with tripod stand, phone holder, and multiple lighting modes.",
    performance: [
      { month: "Jan", sales: 680 },
      { month: "Feb", sales: 710 },
      { month: "Mar", sales: 750 },
      { month: "Apr", sales: 790 },
      { month: "May", sales: 840 },
      { month: "Jun", sales: 880 }
    ],
    tags: ["trending"]
  }
];

// Generate more products for the collection
export const allProducts = [
  ...products,
  // Generate more products to have a larger collection
  ...Array.from({ length: 12 }).map((_, index) => {
    const baseProduct = products[index % products.length];
    const newId = `p${products.length + index + 1}`;
    
    // Modify some properties to create a variation
    return {
      ...baseProduct,
      id: newId,
      name: baseProduct.name + " (New Edition)",
      price: Math.round((baseProduct.price * (1 + Math.random() * 0.2)) * 100) / 100,
      cost: Math.round((baseProduct.cost * (1 + Math.random() * 0.1)) * 100) / 100,
      sales: Math.floor(baseProduct.sales * (0.7 + Math.random() * 0.6)),
      rating: Math.min(5, Math.round((baseProduct.rating * (0.9 + Math.random() * 0.2)) * 10) / 10),
      growth: Math.floor(baseProduct.growth * (0.8 + Math.random() * 0.5)),
      performance: baseProduct.performance.map(item => ({
        ...item,
        sales: Math.floor(item.sales * (0.8 + Math.random() * 0.4))
      }))
    };
  })
];

// Notifications data
export const notifications = [
  {
    id: "n1",
    title: "Price Alert",
    message: "Wireless Earbuds Pro price decreased by 15%",
    time: "2 hours ago",
    read: false
  },
  {
    id: "n2",
    title: "Trending Product",
    message: "Minimalist Ceramic Vase is gaining popularity",
    time: "5 hours ago",
    read: false
  },
  {
    id: "n3",
    title: "Competitor Alert",
    message: "New competitor for Smart Watch Series 5 detected",
    time: "1 day ago",
    read: true
  },
  {
    id: "n4",
    title: "Sales Milestone",
    message: "Eco-friendly Water Bottle reached 10,000 sales",
    time: "2 days ago",
    read: true
  }
];

// User data (simulated)
export const userData = {
  name: "Alex Morgan",
  email: "alex@example.com",
  avatar: "https://i.pravatar.cc/150?img=68",
  favorites: ["p1", "p3", "p6"]
};
