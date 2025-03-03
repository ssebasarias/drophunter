
import React from "react";
import { cn } from "@/lib/utils";
import ProductCard from "./ProductCard";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  cost: number;
  sales: number;
  rating: number;
  growth: number;
  image: string;
  tags?: string[];
};

type ProductGridProps = {
  products: Product[];
  favorites?: string[];
  onToggleFavorite?: (id: string) => void;
  className?: string;
};

const ProductGrid = ({ 
  products, 
  favorites = [], 
  onToggleFavorite,
  className 
}: ProductGridProps) => {
  return (
    <div className={cn(
      "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6",
      className
    )}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isFavorite={favorites.includes(product.id)}
          onToggleFavorite={onToggleFavorite}
          className="animate-scale-in"
        />
      ))}
    </div>
  );
};

export default ProductGrid;
