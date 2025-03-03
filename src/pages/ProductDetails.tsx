
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Heart, 
  TrendingUp, 
  DollarSign,
  Star,
  Truck,
  Clock,
  Share2
} from "lucide-react";
import Navbar from "@/components/navigation/Navbar";
import Sidebar from "@/components/navigation/Sidebar";
import { Button } from "@/components/ui/button";
import Chip from "@/components/ui/Chip";
import { toast } from "@/components/ui/use-toast";
import { products, userData } from "@/lib/data";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState(products.find(p => p.id === id));
  const [isFavorite, setIsFavorite] = useState(userData.favorites.includes(id || ""));
  
  useEffect(() => {
    // If product not found, get it from products array
    if (!product && id) {
      const foundProduct = products.find(p => p.id === id);
      setProduct(foundProduct);
    }
    
    // Check if product is in favorites
    setIsFavorite(userData.favorites.includes(id || ""));
  }, [id, product]);
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: product?.name,
      duration: 2000,
    });
  };
  
  if (!product) {
    return (
      <>
        <Navbar />
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-medium mb-4">Product not found</h1>
          <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </>
    );
  }
  
  const {
    name,
    category,
    price,
    cost,
    sales,
    rating,
    growth,
    image,
    description,
    performance,
    tags
  } = product;
  
  const profit = price - cost;
  const margin = Math.round((profit / price) * 100);
  
  return (
    <>
      <Helmet>
        <title>{name} - DropHunter</title>
      </Helmet>
      
      <Navbar />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1">
          <div className="container py-8">
            <div className="mb-8">
              <Button
                variant="ghost"
                className="mb-4"
                asChild
              >
                <Link to="/dashboard">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </Link>
              </Button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                <div className="relative rounded-lg overflow-hidden border aspect-square md:aspect-auto md:h-full">
                  <img 
                    src={image} 
                    alt={name}
                    className="h-full w-full object-cover"
                  />
                  
                  {tags && tags.length > 0 && (
                    <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                      {tags.map(tag => (
                        <Chip
                          key={tag}
                          label={tag.charAt(0).toUpperCase() + tag.slice(1).replace('-', ' ')}
                          variant={tag === "trending" || tag === "high-margin" ? "primary" : "outline"}
                          size="md"
                          className={tag !== "trending" && tag !== "high-margin" ? "bg-background/80" : ""}
                        />
                      ))}
                    </div>
                  )}
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Chip
                      label={category.charAt(0).toUpperCase() + category.slice(1)}
                      variant="secondary"
                      size="sm"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={toggleFavorite}
                      className="h-9 w-9 rounded-full"
                    >
                      <Heart className={`h-4 w-4 ${isFavorite ? "fill-destructive text-destructive" : ""}`} />
                    </Button>
                  </div>
                  
                  <h1 className="text-3xl font-medium mb-4">{name}</h1>
                  
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 fill-primary text-primary" />
                      <span className="font-medium">{rating.toFixed(1)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-5 w-5 text-muted-foreground" />
                      <span>{sales.toLocaleString()} sales</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-5 w-5 text-muted-foreground" />
                      <span>Profit: <span className="font-medium">${profit.toFixed(2)}</span></span>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <p className="text-muted-foreground mb-4">{description}</p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col p-4 rounded-lg bg-secondary/50">
                        <span className="text-sm text-muted-foreground mb-1">Cost Price</span>
                        <span className="text-xl font-medium">${cost.toFixed(2)}</span>
                      </div>
                      <div className="flex flex-col p-4 rounded-lg bg-secondary/50">
                        <span className="text-sm text-muted-foreground mb-1">Selling Price</span>
                        <span className="text-xl font-medium">${price.toFixed(2)}</span>
                      </div>
                      <div className="flex flex-col p-4 rounded-lg bg-secondary/50">
                        <span className="text-sm text-muted-foreground mb-1">Profit Margin</span>
                        <span className="text-xl font-medium">{margin}%</span>
                      </div>
                      <div className="flex flex-col p-4 rounded-lg bg-secondary/50">
                        <span className="text-sm text-muted-foreground mb-1">Growth Rate</span>
                        <span className={`text-xl font-medium ${growth > 0 ? "text-green-500" : "text-red-500"}`}>
                          {growth > 0 ? "+" : ""}{growth}%
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <Truck className="h-5 w-5 text-muted-foreground" />
                      <span>Estimated shipping time: 12-20 days</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <span>Processing time: 1-3 business days</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <Button className="flex-1">Add to Store</Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 mb-8">
              <h2 className="text-2xl font-medium mb-6">Sales Performance</h2>
              
              <div className="h-80 rounded-lg border p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={performance}
                    margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{ 
                        borderRadius: '8px', 
                        border: '1px solid #f0f0f0',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                      formatter={(value: number) => [`${value} sales`, 'Sales']}
                    />
                    <Line
                      type="monotone"
                      dataKey="sales"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{ r: 4, strokeWidth: 2 }}
                      activeDot={{ r: 6, strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ProductDetails;
