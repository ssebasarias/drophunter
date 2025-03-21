
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  Search, 
  Bell, 
  User, 
  Menu, 
  X, 
  Heart,
  LogOut,
  LogIn,
  UserPlus,
  TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { userData, notifications } from "@/lib/data";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully."
    });
    navigate("/");
  };
  
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
              <div className="hidden md:flex relative w-8 h-8 bg-primary rounded-md items-center justify-center">
                <span className="text-primary-foreground font-bold">D</span>
              </div>
              <span className="font-semibold text-xl tracking-tight">DropHunter</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-6">
              {isLoggedIn && (
                <>
                  <Link 
                    to="/dashboard" 
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary",
                      location.pathname === "/dashboard" ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/categories" 
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary",
                      location.pathname === "/categories" || location.pathname.startsWith("/categories/") 
                        ? "text-primary" 
                        : "text-muted-foreground"
                    )}
                  >
                    Categories
                  </Link>
                  <Link 
                    to="/trending" 
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary",
                      location.pathname === "/trending" ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    <span className="flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      Trending
                    </span>
                  </Link>
                  <Link 
                    to="/favorites" 
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary",
                      location.pathname === "/favorites" ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    Favorites
                  </Link>
                </>
              )}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {isSearchOpen ? (
              <div className="relative animate-fade-in">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-[200px] sm:w-[300px] h-9 rounded-md border border-input px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  autoFocus
                  onBlur={() => setIsSearchOpen(false)}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-9 w-9"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                className="hidden sm:flex"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
              </Button>
            )}

            {isLoggedIn && (
              <>
                <Link to="/favorites" className="hidden sm:flex">
                  <Button variant="ghost" size="icon">
                    <Heart className="h-5 w-5" />
                  </Button>
                </Link>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="h-5 w-5" />
                      {notifications.some(n => !n.read) && (
                        <span className="absolute -top-1 -right-1 flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[300px]">
                    <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {notifications.map(notification => (
                      <DropdownMenuItem key={notification.id} className="flex flex-col items-start py-2 px-4">
                        <div className="flex justify-between w-full">
                          <span className="font-medium">{notification.title}</span>
                          <span className="text-xs text-muted-foreground">{notification.time}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{notification.message}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}

            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full">
                    <img 
                      src={userData.avatar} 
                      alt="User" 
                      className="h-8 w-8 rounded-full object-cover" 
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2">
                    <Heart className="h-4 w-4" />
                    <span>Favorites</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="flex items-center gap-2 text-destructive"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login" className="flex items-center gap-1">
                    <LogIn className="h-4 w-4" />
                    <span>Login</span>
                  </Link>
                </Button>
                <Button variant="default" size="sm" asChild>
                  <Link to="/register" className="flex items-center gap-1">
                    <UserPlus className="h-4 w-4" />
                    <span>Register</span>
                  </Link>
                </Button>
              </div>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMenu}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="fixed inset-0 top-16 z-50 bg-background animate-fade-in md:hidden">
          <div className="container py-6">
            <nav className="flex flex-col gap-6">
              {isLoggedIn ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-primary",
                      location.pathname === "/dashboard" ? "text-primary" : "text-foreground"
                    )}
                    onClick={closeMenu}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/categories" 
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-primary",
                      location.pathname === "/categories" || location.pathname.startsWith("/categories/") 
                        ? "text-primary" 
                        : "text-foreground"
                    )}
                    onClick={closeMenu}
                  >
                    Categories
                  </Link>
                  <Link 
                    to="/trending" 
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-primary",
                      location.pathname === "/trending" ? "text-primary" : "text-foreground"
                    )}
                    onClick={closeMenu}
                  >
                    <span className="flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2" />
                      Trending Products
                    </span>
                  </Link>
                  <Link 
                    to="/favorites" 
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-primary",
                      location.pathname === "/favorites" ? "text-primary" : "text-foreground"
                    )}
                    onClick={closeMenu}
                  >
                    Favorites
                  </Link>
                </>
              ) : (
                <div className="flex flex-col gap-4 items-center justify-center py-8">
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-medium mb-2">Welcome to DropHunter</h3>
                    <p className="text-muted-foreground">Please log in to access all features</p>
                  </div>
                  <Button className="w-full" asChild>
                    <Link to="/login" onClick={closeMenu}>
                      <LogIn className="mr-2 h-4 w-4" />
                      Login
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/register" onClick={closeMenu}>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Register
                    </Link>
                  </Button>
                </div>
              )}
              
              {isLoggedIn && (
                <div className="pt-6 border-t">
                  <div className="flex items-center gap-4 mb-4">
                    <img 
                      src={userData.avatar} 
                      alt="User" 
                      className="h-10 w-10 rounded-full object-cover" 
                    />
                    <div>
                      <h4 className="font-medium">{userData.name}</h4>
                      <p className="text-sm text-muted-foreground">{userData.email}</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full justify-start" onClick={closeMenu}>
                    <User className="mr-2 h-4 w-4" />
                    Profile Settings
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start mt-2" 
                    onClick={() => {
                      handleLogout();
                      closeMenu();
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
