
import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/products/ProductCard";
import { products, userData } from "@/lib/data";

const FeaturedProducts = () => {
  // Get top 4 products by sales
  const topProducts = [...products]
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 4);
  
  return (
    <section className="container py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
        <div>
          <h2 className="text-3xl font-medium tracking-tight mb-3">
            Trending Products
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            Discover high-performance products with proven sales records and growth potential.
          </p>
        </div>
        <Button asChild variant="outline" className="mt-4 md:mt-0">
          <Link to="/dashboard">
            View All Products
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {topProducts.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            isFavorite={userData.favorites.includes(product.id)}
            onToggleFavorite={() => {}}
            className="opacity-0 animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
