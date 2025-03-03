
import React from "react";
import { Link } from "react-router-dom";
import { ArrowUp, ArrowDown, Star, Heart, DollarSign, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Chip from "@/components/ui/Chip";
import { toast } from "@/components/ui/use-toast";

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

type ProductCardProps = {
  product: Product;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
  className?: string;
};

const ProductCard = ({ 
  product, 
  isFavorite = false, 
  onToggleFavorite,
  className 
}: ProductCardProps) => {
  const {
    id,
    name,
    category,
    price,
    cost,
    sales,
    rating,
    growth,
    image,
    tags
  } = product;
  
  const profit = price - cost;
  const margin = Math.round((profit / price) * 100);
  
  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onToggleFavorite) {
      onToggleFavorite(id);
      toast({
        title: isFavorite ? "Removed from favorites" : "Added to favorites",
        description: name,
        duration: 2000,
      });
    }
  };
  
  return (
    <Link 
      to={`/product/${id}`} 
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-lg border bg-card hover-lift",
        className
      )}
    >
      <div className="relative h-[200px] overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        {tags && tags.length > 0 && (
          <div className="absolute top-2 left-2 flex gap-2 flex-wrap">
            {tags.includes("trending") && (
              <Chip label="Trending" variant="primary" size="sm" />
            )}
            {tags.includes("high-margin") && (
              <Chip label="High Margin" variant="secondary" size="sm" />
            )}
            {tags.includes("popular") && (
              <Chip label="Popular" variant="outline" size="sm" className="bg-background/80" />
            )}
            {tags.includes("eco-friendly") && (
              <Chip label="Eco-Friendly" variant="outline" size="sm" className="bg-background/80" />
            )}
          </div>
        )}
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/80"
          onClick={handleFavoriteToggle}
        >
          <Heart className={cn(
            "h-4 w-4 transition-colors",
            isFavorite ? "fill-destructive text-destructive" : "text-foreground"
          )} />
        </Button>
      </div>
      
      <div className="flex flex-1 flex-col space-y-3 p-4">
        <h3 className="font-medium line-clamp-1">{name}</h3>
        
        <div className="mt-auto space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span>{rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <DollarSign className="h-4 w-4" />
              <span className="font-medium">${price.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-sm">
              <TrendingUp className="h-4 w-4" />
              <span>{sales.toLocaleString()} sales</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              {growth > 0 ? (
                <ArrowUp className="h-4 w-4 text-green-500" />
              ) : (
                <ArrowDown className="h-4 w-4 text-red-500" />
              )}
              <span className={cn(
                growth > 0 ? "text-green-500" : "text-red-500",
                "font-medium"
              )}>
                {Math.abs(growth)}%
              </span>
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground">
            Profit margin: <span className="font-medium">{margin}%</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
