
import React from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/navigation/Navbar";
import Hero from "@/components/home/Hero";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, TrendingUp, Filter, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { isLoggedIn } = useAuth();
  
  return (
    <>
      <Helmet>
        <title>DropHunter - Find Profitable Dropshipping Products</title>
      </Helmet>
      
      <Navbar />
      
      <main>
        <Hero />
        
        <section className="container py-16">
          <h2 className="text-3xl font-medium tracking-tight text-center mb-12">
            Why Choose DropHunter
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="frost-panel rounded-lg p-6 text-center">
              <div className="mx-auto w-12 h-12 flex items-center justify-center bg-primary/10 rounded-full mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-3">Trend Analysis</h3>
              <p className="text-muted-foreground mb-4">
                Real-time data on product popularity and sales trends to help you make informed decisions.
              </p>
            </div>
            
            <div className="frost-panel rounded-lg p-6 text-center">
              <div className="mx-auto w-12 h-12 flex items-center justify-center bg-primary/10 rounded-full mb-4">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-3">Profit Metrics</h3>
              <p className="text-muted-foreground mb-4">
                Detailed analytics on profit margins and potential returns on your investment.
              </p>
            </div>
            
            <div className="frost-panel rounded-lg p-6 text-center">
              <div className="mx-auto w-12 h-12 flex items-center justify-center bg-primary/10 rounded-full mb-4">
                <Filter className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-3">Smart Filtering</h3>
              <p className="text-muted-foreground mb-4">
                Powerful search and filtering tools to find the perfect products for your store.
              </p>
            </div>
          </div>
        </section>
        
        {/* Only show for logged in users */}
        {isLoggedIn && (
          <section className="bg-gradient-to-b from-muted/50 to-background py-16">
            <div className="container">
              <div className="flex flex-col lg:flex-row items-center gap-12">
                <div className="lg:w-1/2">
                  <h2 className="text-3xl font-medium tracking-tight mb-6">
                    Save your favorite products for later
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Keep track of products you're interested in by adding them to your favorites. 
                    Compare metrics, monitor trends, and make the right decision when you're ready.
                  </p>
                  <Button asChild size="lg">
                    <Link to="/favorites">
                      <Heart className="mr-2 h-4 w-4" />
                      View Favorites
                    </Link>
                  </Button>
                </div>
                <div className="lg:w-1/2 rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                    alt="Product Analysis"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </section>
        )}
        
        <section className="container py-16 text-center">
          <h2 className="text-3xl font-medium tracking-tight mb-6">
            Ready to find your next winning product?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start exploring thousands of high-potential products and make data-driven 
            decisions for your dropshipping business.
          </p>
          {isLoggedIn ? (
            <Button asChild size="lg" className="rounded-full px-8">
              <Link to="/dashboard">
                Go to Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          ) : (
            <Button asChild size="lg" className="rounded-full px-8">
              <Link to="/login">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
        </section>
      </main>
      
      <footer className="border-t">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <span className="text-primary-foreground font-bold">D</span>
              </div>
              <span className="font-semibold">DropHunter</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} DropHunter. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Index;
