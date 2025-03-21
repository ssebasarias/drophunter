
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Navigate } from "react-router-dom";
import Navbar from "@/components/navigation/Navbar";
import Sidebar from "@/components/navigation/Sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { categories, products } from "@/lib/data";
import TrendingProductCard from "@/components/products/TrendingProductCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TrendingProducts = () => {
  const { isLoggedIn } = useAuth();
  const [activeCategory, setActiveCategory] = useState("all");
  
  // Redirect to login if not logged in
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  
  // Get top 5 trending products by growth for each category
  const getTrendingByCategory = (categoryId: string) => {
    const filtered = categoryId === "all" 
      ? products 
      : products.filter(product => product.category === categoryId);
    
    return [...filtered]
      .sort((a, b) => b.growth - a.growth)
      .slice(0, 5);
  };
  
  const trendingProducts = getTrendingByCategory(activeCategory);
  
  return (
    <>
      <Helmet>
        <title>Trending Products - DropHunter</title>
      </Helmet>
      
      <Navbar />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1">
          <div className="container py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-medium tracking-tight">Trending Products</h1>
              <p className="text-muted-foreground">Discover fast-growing products to boost your sales</p>
            </div>
            
            <Tabs defaultValue="all" className="mb-8">
              <TabsList className="mb-6">
                <TabsTrigger value="all" onClick={() => setActiveCategory("all")}>
                  All Categories
                </TabsTrigger>
                {categories.map(category => (
                  <TabsTrigger 
                    key={category.id} 
                    value={category.id}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <TabsContent value={activeCategory} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {trendingProducts.map((product, index) => (
                    <TrendingProductCard
                      key={product.id}
                      product={product}
                      className="opacity-0 animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </>
  );
};

export default TrendingProducts;
