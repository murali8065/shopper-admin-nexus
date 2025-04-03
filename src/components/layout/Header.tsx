
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart, User, LogOut, Settings, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { products } from "@/data/mockData";

const Header = () => {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  
  const filteredProducts = products
    .filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, 5);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowSearchResults(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4 sm:px-8">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-xl font-semibold text-primary"
        >
          <span className="hidden sm:inline">E-FURNITO</span>
          <span className="font-light text-muted-foreground">Marketplace</span>
        </Link>

        <div className="hidden md:flex md:flex-1 md:items-center md:justify-center md:px-4">
          <form 
            className="relative w-full max-w-sm" 
            onSubmit={handleSearch}
          >
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for furniture..."
              className="w-full rounded-full bg-background pl-8 pr-4"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchResults(e.target.value.length > 0);
              }}
              onBlur={() => {
                // Delay hiding results to allow clicking on them
                setTimeout(() => setShowSearchResults(false), 200);
              }}
            />
            {showSearchResults && searchQuery && (
              <div className="absolute top-full mt-1 w-full rounded-md border bg-popover p-2 shadow-md">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map(product => (
                    <Link
                      key={product.id}
                      to={`/product/${product.slug}`}
                      className="flex items-center gap-2 rounded-sm p-2 hover:bg-accent"
                      onClick={() => setShowSearchResults(false)}
                    >
                      <img 
                        src={product.images[0]} 
                        alt={product.name} 
                        className="h-8 w-8 rounded object-cover"
                      />
                      <div className="flex-1 text-left">
                        <p className="line-clamp-1 text-sm font-medium">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{product.category.name}</p>
                      </div>
                      <p className="text-sm font-semibold">${product.price}</p>
                    </Link>
                  ))
                ) : (
                  <p className="p-2 text-sm text-muted-foreground">No products found</p>
                )}
                <Button 
                  variant="ghost" 
                  className="mt-1 w-full justify-start text-sm text-muted-foreground hover:text-foreground"
                  onClick={() => {
                    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
                    setShowSearchResults(false);
                  }}
                >
                  <Search className="mr-2 h-4 w-4" />
                  Search for "{searchQuery}"
                </Button>
              </div>
            )}
          </form>
        </div>

        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative"
            onClick={() => navigate("/cart")}
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <Badge 
                className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full p-0 text-xs" 
                variant="default"
              >
                {totalItems}
              </Badge>
            )}
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex cursor-pointer items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/orders" className="flex cursor-pointer items-center">
                    <Package className="mr-2 h-4 w-4" />
                    <span>Orders</span>
                  </Link>
                </DropdownMenuItem>
                {user.role === "admin" && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin" className="flex cursor-pointer items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Admin Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="flex cursor-pointer items-center text-red-500 focus:bg-red-50 focus:text-red-500"
                  onClick={logout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="default" onClick={() => navigate("/login")}>
              Sign in
            </Button>
          )}
        </div>
      </div>

      {/* Mobile search */}
      <div className="border-t border-border/40 p-2 md:hidden">
        <form className="flex w-full" onSubmit={handleSearch}>
          <Input
            type="search"
            placeholder="Search for furniture..."
            className="flex-1 rounded-r-none border-r-0"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button type="submit" className="rounded-l-none">
            <Search className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </header>
  );
};

export default Header;
