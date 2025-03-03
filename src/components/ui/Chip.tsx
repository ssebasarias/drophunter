
import React from "react";
import { cn } from "@/lib/utils";

type ChipProps = {
  label: string;
  variant?: "default" | "outline" | "secondary" | "primary";
  size?: "sm" | "md" | "lg";
  className?: string;
};

const Chip = ({ 
  label, 
  variant = "default", 
  size = "md", 
  className 
}: ChipProps) => {
  const variants = {
    default: "bg-secondary text-secondary-foreground",
    outline: "border border-input bg-background hover:bg-secondary/50",
    secondary: "bg-secondary text-secondary-foreground",
    primary: "bg-primary text-primary-foreground"
  };
  
  const sizes = {
    sm: "text-xs px-2 py-0.5 rounded-full",
    md: "text-sm px-3 py-1 rounded-full",
    lg: "px-4 py-1.5 rounded-full"
  };
  
  return (
    <span 
      className={cn(
        "inline-flex items-center font-medium transition-colors",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {label}
    </span>
  );
};

export default Chip;
