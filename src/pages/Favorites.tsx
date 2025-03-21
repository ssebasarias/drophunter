
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Heart } from "lucide-react";
import { Navigate, Link } from "react-router-dom";
import Navbar from "@/components/navigation/Navbar";
import Sidebar from "@/components/navigation/Sidebar";
import ProductGrid from "@/components/products/ProductGrid";
import { Button } from "@/components/ui/button";
import { products, userData } from "@/lib/data";
import { useAuth } from "@/contexts/AuthContext";

const Favorites = () => {
  const { isLoggedIn } = useAuth();
  const [favorites, setFavorites] = useState<string[]>(userData.favorites);
  
  // Redirect to login if not logged in
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  
  const toggleFavorite = (id: string) => {
    setFavorites(favorites.filter(fav => fav !== id));
  };
  
  // Filter products to only show favorites
  const favoriteProducts = products.filter(product => 
    favorites.includes(product.id)
  );
  
  return (
    <>
      <Helmet>
        <title>My Favorites - DropHunter</title>
      </Helmet>
      
      <Navbar />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1">
          <div className="container py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-medium tracking-tight">My Favorites</h1>
              <p className="text-muted-foreground">Products you've saved for later</p>
            </div>
            
            {favoriteProducts.length > 0 ? (
              <ProductGrid
                products={favoriteProducts}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
              />
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                  <Heart className="h-8 w-8 text-muted-foreground" />
                </div>
                <h2 className="text-xl font-medium mb-2">No favorites yet</h2>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Start exploring products and save your favorites to keep track of them.
                </p>
                <Button asChild>
                  <Link to="/dashboard">
                    Explore Products
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default Favorites;
