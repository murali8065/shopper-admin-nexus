
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { categories } from "@/data/mockData";
import { useState, useEffect } from "react";
import CategoryCard from "@/components/ui/CategoryCard";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const Categories = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading to prevent UI flashing
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 aspect-square rounded-md mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              </div>
            ))}
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
            <span className="text-foreground">All Categories</span>
          </nav>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold">All Categories</h1>
          <p className="mt-2 text-muted-foreground">
            Browse all available product categories
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories.map(category => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Categories;
