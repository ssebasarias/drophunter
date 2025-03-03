
import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="container relative z-10 py-16 md:py-24 flex flex-col items-center text-center">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-50 -z-10"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(239, 246, 255, 0.8), rgba(224, 231, 255, 0.4))"
          }}
        />
        
        <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6">
          Discover Profitable Products
        </span>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-balance max-w-3xl mb-6">
          Find Winning Products for Your Dropshipping Business
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8">
          DropHunter helps you discover high-margin products with proven sales data, 
          making your product research effortless and profitable.
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg" className="rounded-full px-8">
            <Link to="/dashboard">
              Explore Trending Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg" className="rounded-full px-8">
            <Link to="/categories">
              Browse Categories
            </Link>
          </Button>
        </div>
        
        <div className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
          <div className="flex flex-col items-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">1000+</div>
            <div className="text-sm text-muted-foreground">Curated Products</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">45%</div>
            <div className="text-sm text-muted-foreground">Average Margin</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">24/7</div>
            <div className="text-sm text-muted-foreground">Market Analysis</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">15K+</div>
            <div className="text-sm text-muted-foreground">Happy Sellers</div>
          </div>
        </div>
      </div>
      
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-full max-w-6xl h-64 bg-gradient-to-b from-primary/5 to-transparent rounded-[100%] blur-3xl -z-10" />
    </div>
  );
};

export default Hero;
