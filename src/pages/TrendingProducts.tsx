
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Navigate } from "react-router-dom";
import Navbar from "@/components/navigation/Navbar";
import Sidebar from "@/components/navigation/Sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { categories, products } from "@/lib/data";
import TrendingProductCard from "@/components/products/TrendingProductCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";

// Sample data to ensure there's at least one product per category
const ensureProductsInCategories = (existingProducts: any[]) => {
  const productsByCategory: Record<string, any[]> = {};
  
  // Group existing products by category
  existingProducts.forEach(product => {
    if (!productsByCategory[product.category]) {
      productsByCategory[product.category] = [];
    }
    productsByCategory[product.category].push(product);
  });
  
  // Ensure each category has at least one product
  const enhancedProducts = [...existingProducts];
  
  categories.forEach(category => {
    if (!productsByCategory[category.id] || productsByCategory[category.id].length === 0) {
      // Create a sample product for this category
      const newProduct = {
        id: `sample-${category.id}`,
        name: `${category.name} Top Seller`,
        category: category.id,
        price: Math.floor(Math.random() * 100) + 19.99,
        cost: Math.floor(Math.random() * 50) + 9.99,
        sales: Math.floor(Math.random() * 500) + 100,
        rating: (Math.random() * 3) + 2,
        growth: Math.floor(Math.random() * 50) + 20,
        image: `https://source.unsplash.com/random/300x200?${category.id}`,
        performance: Array.from({ length: 6 }, (_, i) => ({
          month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i],
          sales: Math.floor(Math.random() * 100) + 20
        })),
        tags: [category.name, 'Trending', 'Popular']
      };
      
      enhancedProducts.push(newProduct);
    }
  });
  
  return enhancedProducts;
};

const TrendingProducts = () => {
  const { isLoggedIn } = useAuth();
  const [activeCategory, setActiveCategory] = useState("all");
  const isMobile = useIsMobile();
  
  // Redirect to login if not logged in
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  
  // Get enhanced products list with at least one product per category
  const enhancedProducts = ensureProductsInCategories(products);
  
  // Get top 5 trending products by growth for each category
  const getTrendingByCategory = (categoryId: string) => {
    const filtered = categoryId === "all" 
      ? enhancedProducts 
      : enhancedProducts.filter(product => product.category === categoryId);
    
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
          <div className={`container py-8 ${isMobile ? 'px-4 pt-16' : ''}`}>
            <div className="mb-8">
              <h1 className="text-3xl font-medium tracking-tight">Trending Products</h1>
              <p className="text-muted-foreground">Discover fast-growing products to boost your sales</p>
            </div>
            
            <Tabs 
              value={activeCategory} 
              onValueChange={setActiveCategory} 
              defaultValue="all" 
              className="mb-8"
            >
              <TabsList className={`mb-6 ${isMobile ? 'flex flex-wrap' : ''}`}>
                <TabsTrigger value="all" className={isMobile ? 'mb-1' : ''}>
                  All Categories
                </TabsTrigger>
                {categories.map(category => (
                  <TabsTrigger 
                    key={category.id} 
                    value={category.id}
                    className={isMobile ? 'mb-1' : ''}
                  >
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <TabsContent value={activeCategory} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {trendingProducts.length > 0 ? (
                    trendingProducts.map((product, index) => (
                      <TrendingProductCard
                        key={product.id}
                        product={product}
                        className="opacity-0 animate-fade-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      />
                    ))
                  ) : (
                    <div className="col-span-full text-center py-10">
                      <p className="text-muted-foreground">No trending products found in this category.</p>
                    </div>
                  )}
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
