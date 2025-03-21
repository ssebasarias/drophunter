
import React from "react";
import { Link } from "react-router-dom";
import { ArrowUp, ChevronRight, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { LineChart, Line, ResponsiveContainer, XAxis } from "recharts";

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
  performance: Array<{ month: string; sales: number }>;
  tags?: string[];
};

type TrendingProductCardProps = {
  product: Product;
  className?: string;
  style?: React.CSSProperties;
};

const TrendingProductCard = ({ 
  product,
  className,
  style
}: TrendingProductCardProps) => {
  const {
    id,
    name,
    price,
    growth,
    image,
    performance
  } = product;
  
  return (
    <Card className={cn("overflow-hidden transition-all hover:shadow-md", className)} style={style}>
      <div className="relative h-[140px] overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="h-full w-full object-cover"
        />
        <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 rounded-bl-md font-medium">
          <div className="flex items-center gap-1">
            <ArrowUp className="h-4 w-4" />
            <span>{growth}%</span>
          </div>
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-medium line-clamp-1 mb-2">{name}</h3>
        
        <div className="text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <DollarSign className="h-4 w-4" />
            <span className="font-medium">${price.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="h-[80px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performance}>
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#2563eb"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Link 
          to={`/product/${id}`}
          className="text-sm font-medium text-primary flex items-center hover:underline"
        >
          View Details
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default TrendingProductCard;
