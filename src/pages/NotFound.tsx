
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home, ShoppingBag, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  // Check if the current path might be related to shopping
  const isShoppingRelated = location.pathname.includes('/product') || 
    location.pathname.includes('/category') || 
    location.pathname.includes('/shop');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold mb-4 text-primary">404</h1>
        <p className="text-2xl font-semibold mb-2">Oops! Page not found</p>
        <p className="text-gray-600 mb-8">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild>
            <Link to="/" className="flex items-center gap-2">
              <Home size={16} />
              Back to Home
            </Link>
          </Button>
          
          {isShoppingRelated && (
            <Button variant="outline" asChild>
              <Link to="/shop" className="flex items-center gap-2">
                <ShoppingBag size={16} />
                Browse Products
              </Link>
            </Button>
          )}
          
          <Button variant="secondary" asChild>
            <Link to="/search" className="flex items-center gap-2">
              <Search size={16} />
              Search
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
