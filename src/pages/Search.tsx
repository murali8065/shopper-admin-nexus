
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { products } from "@/data/mockData";
import ProductCard from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon } from "lucide-react";
import { Link } from "react-router-dom";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(true);

  useEffect(() => {
    setIsSearching(true);
    // Filter products based on search query
    const results = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.name.toLowerCase().includes(query.toLowerCase())
    );
    
    // Small timeout to simulate searching and allow rendering to complete
    const timer = setTimeout(() => {
      setSearchResults(results);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Search Results</h1>
          <p className="mt-2 text-muted-foreground">
            Showing results for "{query}"
          </p>
        </div>

        {isSearching ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 aspect-square rounded-md mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        ) : searchResults.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {searchResults.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="mt-12 flex flex-col items-center justify-center text-center">
            <SearchIcon className="mb-4 h-16 w-16 text-muted-foreground" />
            <h2 className="text-xl font-semibold">No products found</h2>
            <p className="mt-2 text-muted-foreground">
              We couldn't find any products matching your search.
            </p>
            <div className="mt-6 space-x-4">
              <Button variant="outline" asChild>
                <Link to="/shop">Browse All Products</Link>
              </Button>
              <Button asChild>
                <Link to="/">Return Home</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Search;
