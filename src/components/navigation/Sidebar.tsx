
import React, { useState } from "react";
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
  PanelRightClose
} from "lucide-react";
import { cn } from "@/lib/utils";
import { categories } from "@/lib/data";
import { Button } from "@/components/ui/button";

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
  const location = useLocation();
  
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);
  const toggleCategories = () => setExpandedCategories(!expandedCategories);
  
  return (
    <aside className={cn(
      "border-r bg-card transition-all duration-300 ease-in-out h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto",
      isCollapsed ? "w-16" : "w-64",
      className
    )}>
      <div className="p-4">
        <div className="flex justify-between items-center">
          {!isCollapsed && <h3 className="font-medium">Navigation</h3>}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleCollapse}
            className="h-8 w-8"
          >
            {isCollapsed ? <PanelLeft className="h-4 w-4" /> : <PanelRightClose className="h-4 w-4" />}
          </Button>
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
            {!isCollapsed && <span>Dashboard</span>}
          </Link>
          
          <div className="pt-2">
            <button
              className={cn(
                "flex items-center w-full gap-3 px-3 py-2 rounded-md transition-colors hover:bg-muted",
                expandedCategories && !isCollapsed ? "mb-2" : ""
              )}
              onClick={toggleCategories}
            >
              {expandedCategories ? (
                <ChevronDown className="h-5 w-5 flex-shrink-0" />
              ) : (
                <ChevronRight className="h-5 w-5 flex-shrink-0" />
              )}
              {!isCollapsed && <span className="font-medium">Categories</span>}
            </button>
            
            {expandedCategories && (
              <div className={cn("space-y-1", isCollapsed ? "px-2" : "ml-4")}>
                {categories.map(category => (
                  <Link
                    key={category.id}
                    to={`/categories/${category.id}`}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                      location.pathname === `/categories/${category.id}`
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-muted"
                    )}
                  >
                    {getCategoryIcon(category.id)}
                    {!isCollapsed && <span>{category.name}</span>}
                  </Link>
                ))}
              </div>
            )}
          </div>
          
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
            {!isCollapsed && <span>Favorites</span>}
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
            {!isCollapsed && <span>Settings</span>}
          </Link>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
