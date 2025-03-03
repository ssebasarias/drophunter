
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { Search } from "lucide-react";
import Navbar from "@/components/navigation/Navbar";
import Sidebar from "@/components/navigation/Sidebar";
import ProductGrid from "@/components/products/ProductGrid";
import { Input } from "@/components/ui/input";
import { products, categories, userData } from "@/lib/data";

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [favorites, setFavorites] = useState<string[]>(userData.favorites);
  const [searchTerm, setSearchTerm] = useState("");
  
  const category = categories.find(cat => cat.id === categoryId);
  
  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(fav => fav !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };
  
  const filteredProducts = products
    .filter(product => 
      product.category === categoryId &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
  return (
    <>
      <Helmet>
        <title>{category ? category.name : "Category"} - DropHunter</title>
      </Helmet>
      
      <Navbar />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1">
          <div className="container py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-medium tracking-tight">{category ? category.name : "Category"}</h1>
              <p className="text-muted-foreground">Discover trending products in this category</p>
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
            
            {filteredProducts.length > 0 ? (
              <ProductGrid
                products={filteredProducts}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
              />
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-muted-foreground mb-4">No products found in this category.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default CategoryPage;
