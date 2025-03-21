
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Zap, 
  Shirt, 
  Lamp, 
  SprayCan, 
  Dumbbell, 
  ChevronRight,
  ChevronDown,
  LayoutDashboard,
  Heart,
  Settings,
  PanelLeft,
  PanelRightClose,
  TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";
import { categories } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";

const getCategoryIcon = (id: string) => {
  switch (id) {
    case "electronics":
      return <Zap className="h-5 w-5" />;
    case "fashion":
      return <Shirt className="h-5 w-5" />;
    case "home":
      return <Lamp className="h-5 w-5" />;
    case "beauty":
      return <SprayCan className="h-5 w-5" />;
    case "sports":
      return <Dumbbell className="h-5 w-5" />;
    default:
      return <Zap className="h-5 w-5" />;
  }
};

type SidebarProps = {
  className?: string;
};

const Sidebar = ({ className }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isLoggedIn } = useAuth();
  const isMobile = useIsMobile();
  
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);
  const toggleCategories = () => setExpandedCategories(!expandedCategories);
  
  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  if (!isLoggedIn) {
    return null;
  }
  
  const mobileStyles = isMobile ? {
    position: "fixed",
    zIndex: 40,
    height: "100vh",
    width: isMobileMenuOpen ? "85%" : "0",
    transition: "width 0.3s ease-in-out",
    overflow: "hidden",
    top: 0,
    left: 0
  } as React.CSSProperties : {};

  const mobileOverlay = isMobile && isMobileMenuOpen ? (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-30"
      onClick={() => setIsMobileMenuOpen(false)}
    />
  ) : null;
  
  const sidebarContent = (
    <aside className={cn(
      "border-r bg-card transition-all duration-300 ease-in-out",
      isMobile ? "h-full w-full" : `h-[calc(100vh-0rem)] sticky top-0 overflow-y-auto ${isCollapsed ? "w-16" : "w-64"}`,
      className
    )}
    style={mobileStyles}
    >
      <div className="p-4">
        <div className="flex justify-between items-center">
          {(!isCollapsed || isMobile) && (
            <Link to="/" className="font-semibold text-xl tracking-tight flex items-center gap-2">
              <div className="relative w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <span className="text-primary-foreground font-bold">D</span>
              </div>
              <span>DropHunter</span>
            </Link>
          )}
          {!isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleCollapse}
              className="h-8 w-8"
            >
              {isCollapsed ? <PanelLeft className="h-4 w-4" /> : <PanelRightClose className="h-4 w-4" />}
            </Button>
          )}
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(false)}
              className="h-8 w-8"
            >
              <PanelRightClose className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <nav className="mt-4 space-y-1">
          <Link 
            to="/dashboard" 
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
              location.pathname === "/dashboard" 
                ? "bg-primary text-primary-foreground" 
                : "hover:bg-muted"
            )}
          >
            <LayoutDashboard className="h-5 w-5 flex-shrink-0" />
            {(!isCollapsed || isMobile) && <span>Dashboard</span>}
          </Link>
          
          <div className="pt-2">
            <button
              onClick={toggleCategories}
              className={cn(
                "flex items-center justify-between w-full px-3 py-2 rounded-md transition-colors hover:bg-muted",
                expandedCategories && "mb-1"
              )}
            >
              <div className="flex items-center gap-3">
                {(!isCollapsed || isMobile) && <span className="font-medium">Categories</span>}
              </div>
              {(!isCollapsed || isMobile) && (
                expandedCategories ? 
                <ChevronDown className="h-4 w-4" /> : 
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
            
            {expandedCategories && (!isCollapsed || isMobile) && (
              <div className="space-y-1 ml-2 pl-2 border-l border-muted">
                {categories.map(category => (
                  <Link
                    key={category.id}
                    to={`/categories/${category.id}`}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm",
                      location.pathname === `/categories/${category.id}`
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-muted"
                    )}
                  >
                    {getCategoryIcon(category.id)}
                    <span>{category.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          
          <Link 
            to="/trending" 
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
              location.pathname === "/trending" 
                ? "bg-primary text-primary-foreground" 
                : "hover:bg-muted"
            )}
          >
            <TrendingUp className="h-5 w-5 flex-shrink-0" />
            {(!isCollapsed || isMobile) && <span>Trending Products</span>}
          </Link>
          
          <Link 
            to="/favorites" 
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
              location.pathname === "/favorites" 
                ? "bg-primary text-primary-foreground" 
                : "hover:bg-muted"
            )}
          >
            <Heart className="h-5 w-5 flex-shrink-0" />
            {(!isCollapsed || isMobile) && <span>Favorites</span>}
          </Link>
          
          <Link 
            to="/settings" 
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
              location.pathname === "/settings" 
                ? "bg-primary text-primary-foreground" 
                : "hover:bg-muted"
            )}
          >
            <Settings className="h-5 w-5 flex-shrink-0" />
            {(!isCollapsed || isMobile) && <span>Settings</span>}
          </Link>
        </nav>
      </div>
    </aside>
  );

  // For mobile, we add a hamburger button that can be displayed in the navbar
  if (isMobile) {
    return (
      <>
        {mobileOverlay}
        {isMobileMenuOpen && sidebarContent}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileMenuOpen(true)}
          className="fixed top-4 left-4 z-20 h-10 w-10 bg-background"
        >
          <PanelLeft className="h-5 w-5" />
        </Button>
      </>
    );
  }
  
  return sidebarContent;
};

export default Sidebar;
