
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { products } from "@/data/mockData";
import ProductCard from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Check, SlidersHorizontal } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Shop = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortOption, setSortOption] = useState("recommended");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);

  // Extract all unique categories
  const categories = Array.from(
    new Set(products.map((product) => product.category.name))
  );

  // Filter products based on search, price range, and categories
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category.name);

    return matchesSearch && matchesPrice && matchesCategory;
  });

  // Sort products based on the selected option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return 0; // recommended, no specific sorting
    }
  });

  // Toggle category selection
  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setPriceRange([0, 5000]);
    setSelectedCategories([]);
    setSortOption("recommended");
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Shop Furniture</h1>
          <p className="mt-2 text-muted-foreground">
            Browse our collection of high-quality furniture
          </p>
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-4">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md"
            />
          </div>

          <div className="flex items-center gap-2">
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">Recommended</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>

            <Sheet open={filterSheetOpen} onOpenChange={setFilterSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                  {(selectedCategories.length > 0 ||
                    priceRange[0] > 0 ||
                    priceRange[1] < 5000) && (
                    <Badge className="ml-1 h-5 w-5 rounded-full p-0 text-xs">
                      !
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter Products</SheetTitle>
                  <SheetDescription>
                    Refine your product search with these options
                  </SheetDescription>
                </SheetHeader>

                <div className="mt-6 space-y-6">
                  {/* Price Range Filter */}
                  <div>
                    <h3 className="mb-4 text-sm font-medium">Price Range</h3>
                    <Slider
                      defaultValue={priceRange}
                      max={5000}
                      step={50}
                      value={priceRange}
                      onValueChange={setPriceRange}
                    />
                    <div className="mt-2 flex justify-between text-sm">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>

                  {/* Category Filter */}
                  <div>
                    <h3 className="mb-4 text-sm font-medium">Categories</h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <Button
                          key={category}
                          variant={
                            selectedCategories.includes(category)
                              ? "default"
                              : "outline"
                          }
                          className="mr-2 mb-2"
                          onClick={() => toggleCategory(category)}
                        >
                          {selectedCategories.includes(category) && (
                            <Check className="mr-1 h-4 w-4" />
                          )}
                          {category}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 flex justify-between">
                    <Button variant="outline" onClick={clearFilters}>
                      Clear All
                    </Button>
                    <Button onClick={() => setFilterSheetOpen(false)}>
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {selectedCategories.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {selectedCategories.map((category) => (
              <Badge key={category} variant="secondary" className="px-3 py-1">
                {category}
                <button
                  className="ml-2 text-xs"
                  onClick={() => toggleCategory(category)}
                >
                  ×
                </button>
              </Badge>
            ))}
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs"
              onClick={() => setSelectedCategories([])}
            >
              Clear
            </Button>
          </div>
        )}

        {sortedProducts.length > 0 ? (
          <div>
            <p className="mb-4 text-sm text-muted-foreground">
              Showing {sortedProducts.length} products
            </p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-12 text-center">
            <h2 className="text-xl font-semibold">No products found</h2>
            <p className="mt-2 text-muted-foreground">
              Try adjusting your filters or search query
            </p>
            <Button className="mt-4" onClick={clearFilters}>
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Shop;
