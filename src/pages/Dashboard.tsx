
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { 
  TrendingUp, 
  Search, 
  ChevronDown, 
  Filter, 
  ArrowDownNarrowWide,
  ArrowUpWideNarrow
} from "lucide-react";
import Navbar from "@/components/navigation/Navbar";
import Sidebar from "@/components/navigation/Sidebar";
import ProductGrid from "@/components/products/ProductGrid";
import Chip from "@/components/ui/Chip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { products, userData } from "@/lib/data";

const Dashboard = () => {
  const [favorites, setFavorites] = useState<string[]>(userData.favorites);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"sales" | "rating" | "growth" | "price">("sales");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(fav => fav !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };
  
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  const filteredProducts = products
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedTags.length === 0 || 
        (product.tags && product.tags.some(tag => selectedTags.includes(tag))))
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
        <title>Dashboard - DropHunter</title>
      </Helmet>
      
      <Navbar />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1">
          <div className="container py-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-medium tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">Discover trending and profitable products</p>
              </div>
              
              <div className="flex items-center gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <span>Filter</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <div className="p-2">
                      <h4 className="mb-2 text-sm font-medium">Product Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => toggleTag("trending")}
                          className={`px-2 py-1 text-xs rounded-full transition-colors ${
                            selectedTags.includes("trending") 
                              ? "bg-primary text-primary-foreground" 
                              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                          }`}
                        >
                          Trending
                        </button>
                        <button
                          onClick={() => toggleTag("high-margin")}
                          className={`px-2 py-1 text-xs rounded-full transition-colors ${
                            selectedTags.includes("high-margin") 
                              ? "bg-primary text-primary-foreground" 
                              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                          }`}
                        >
                          High Margin
                        </button>
                        <button
                          onClick={() => toggleTag("popular")}
                          className={`px-2 py-1 text-xs rounded-full transition-colors ${
                            selectedTags.includes("popular") 
                              ? "bg-primary text-primary-foreground" 
                              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                          }`}
                        >
                          Popular
                        </button>
                        <button
                          onClick={() => toggleTag("eco-friendly")}
                          className={`px-2 py-1 text-xs rounded-full transition-colors ${
                            selectedTags.includes("eco-friendly") 
                              ? "bg-primary text-primary-foreground" 
                              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                          }`}
                        >
                          Eco-Friendly
                        </button>
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="flex items-center gap-2">
                        <span>Sort by: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}</span>
                        <ChevronDown className="h-4 w-4" />
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
            </div>
            
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {selectedTags.length > 0 && (
              <div className="flex items-center gap-2 mb-6">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                <div className="flex flex-wrap gap-2">
                  {selectedTags.map(tag => (
                    <Chip
                      key={tag}
                      label={tag.charAt(0).toUpperCase() + tag.slice(1).replace('-', ' ')}
                      variant="primary"
                      size="sm"
                      className="cursor-pointer"
                      onClick={() => toggleTag(tag)}
                    />
                  ))}
                  {selectedTags.length > 0 && (
                    <button
                      className="text-xs text-muted-foreground underline hover:text-foreground"
                      onClick={() => setSelectedTags([])}
                    >
                      Clear all
                    </button>
                  )}
                </div>
              </div>
            )}
            
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-medium">Trending Products</h2>
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
                  <Button variant="outline" onClick={() => {
                    setSearchTerm("");
                    setSelectedTags([]);
                  }}>
                    Clear filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
