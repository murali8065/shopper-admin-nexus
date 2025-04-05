
import { useParams, Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { products } from "@/data/mockData";
import { useState, useEffect } from "react";
import ProductCard from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/button";
import { Home, FilterIcon } from "lucide-react";

const Category = () => {
  const { slug } = useParams<{ slug: string }>();
  const [isLoading, setIsLoading] = useState(true);
  
  // Filter products by the current category
  const categoryProducts = products.filter(
    (product) => product.category.slug === slug
  );
  
  const categoryName = categoryProducts.length > 0 
    ? categoryProducts[0].category.name 
    : slug;

  useEffect(() => {
    // Simulate loading to prevent UI flashing
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [slug]);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
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
        </div>
      </MainLayout>
    );
  }

  if (categoryProducts.length === 0) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <nav className="flex text-sm text-muted-foreground">
              <Link to="/" className="flex items-center hover:text-primary">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Link>
              <span className="mx-2">/</span>
              <span className="text-foreground capitalize">{slug?.replace('-', ' ')}</span>
            </nav>
          </div>
          
          <div className="mt-12 text-center">
            <h2 className="text-xl font-semibold">No products found in this category</h2>
            <p className="mt-2 text-muted-foreground">
              We couldn't find any products in the "{slug?.replace('-', ' ')}" category.
            </p>
            <Button className="mt-4" asChild>
              <Link to="/shop">Browse All Products</Link>
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <nav className="flex text-sm text-muted-foreground">
            <Link to="/" className="flex items-center hover:text-primary">
              <Home className="mr-2 h-4 w-4" />
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link to="/shop" className="hover:text-primary">
              Shop
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{categoryName}</span>
          </nav>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold capitalize">{categoryName}</h1>
          <p className="mt-2 text-muted-foreground">
            Browse our collection of {categoryName.toLowerCase()} products
          </p>
        </div>

        {categoryProducts.length > 0 ? (
          <div>
            <p className="mb-4 text-sm text-muted-foreground">
              Showing {categoryProducts.length} products
            </p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {categoryProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-12 text-center">
            <h2 className="text-xl font-semibold">No products found</h2>
            <p className="mt-2 text-muted-foreground">
              We couldn't find any products in this category.
            </p>
            <Button className="mt-4" asChild>
              <Link to="/shop">Browse All Products</Link>
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Category;
