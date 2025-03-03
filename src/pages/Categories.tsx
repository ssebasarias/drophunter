
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation, useNavigate } from "react-router-dom";
import { Search, Filter, ArrowDownNarrowWide, ArrowUpWideNarrow } from "lucide-react";
import Navbar from "@/components/navigation/Navbar";
import Sidebar from "@/components/navigation/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProductGrid from "@/components/products/ProductGrid";
import { products, categories, userData } from "@/lib/data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";

const Categories = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<string[]>(userData.favorites);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"sales" | "rating" | "growth" | "price">("sales");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  
  // Get category from URL or default to first category
  const getSelectedCategory = () => {
    const pathParts = location.pathname.split('/');
    if (pathParts.length > 2) {
      return pathParts[2];
    }
    return "all";
  };
  
  const selectedCategory = getSelectedCategory();
  
  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(fav => fav !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };
  
  const handleCategoryChange = (category: string) => {
    if (category === "all") {
      navigate("/categories");
    } else {
      navigate(`/categories/${category}`);
    }
  };
  
  const filteredProducts = products
    .filter(product => 
      (selectedCategory === "all" || product.category === selectedCategory) && 
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case "sales":
          comparison = a.sales - b.sales;
          break;
        case "rating":
          comparison = a.rating - b.rating;
          break;
        case "growth":
          comparison = a.growth - b.growth;
          break;
        case "price":
          comparison = a.price - b.price;
          break;
      }
      
      return sortOrder === "asc" ? comparison : -comparison;
    });
  
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
  
  return (
    <>
      <Helmet>
        <title>Product Categories - DropHunter</title>
      </Helmet>
      
      <Navbar />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1">
          <div className="container py-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-medium tracking-tight">Categories</h1>
                <p className="text-muted-foreground">Browse products by category</p>
              </div>
              
              <div className="flex items-center gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <span>Sort by: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}</span>
                      <ArrowDownNarrowWide className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setSortBy("sales")}>
                      Sales
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("rating")}>
                      Rating
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("growth")}>
                      Growth
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("price")}>
                      Price
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Button variant="ghost" size="icon" onClick={toggleSortOrder}>
                  {sortOrder === "desc" ? (
                    <ArrowDownNarrowWide className="h-4 w-4" />
                  ) : (
                    <ArrowUpWideNarrow className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            
            <Tabs 
              defaultValue={selectedCategory} 
              value={selectedCategory}
              onValueChange={handleCategoryChange}
              className="mb-8"
            >
              <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 lg:w-fit">
                <TabsTrigger value="all">All</TabsTrigger>
                {categories.map(category => (
                  <TabsTrigger key={category.id} value={category.id}>
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {filteredProducts.length > 0 ? (
              <ProductGrid
                products={filteredProducts}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
              />
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-muted-foreground mb-4">No products match your search criteria.</p>
                <Button variant="outline" onClick={() => setSearchTerm("")}>
                  Clear search
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default Categories;
