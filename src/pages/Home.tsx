
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Category, Product } from "@/types";
import { Link } from "react-router-dom";
import ProductCard from "@/components/ui/ProductCard";
import CategoryCard from "@/components/ui/CategoryCard";
import { ChevronRight } from "lucide-react";
import { categories, products } from "@/data/mockData";

const Home = () => {
  const featuredProducts = products.slice(0, 4);
  const topCategories = categories.slice(0, 6);

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aW50ZXJpb3IlMjBkZXNpZ258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1200&q=80')",
            backgroundPosition: "center 65%"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20" />
        </div>
        
        <div className="container relative mx-auto flex min-h-[500px] items-center px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-xl space-y-5 text-white">
            <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
              Find Perfect Furniture for Your Home
            </h1>
            <p className="text-lg">
              Discover quality furniture pieces from top sellers and transform your living space.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link to="/shop">Shop Now</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white bg-transparent hover:bg-white hover:text-black" asChild>
                <Link to="/categories">Browse Categories</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto mt-16 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold sm:text-3xl">Browse Categories</h2>
          <Button variant="ghost" size="sm" className="hidden sm:flex" asChild>
            <Link to="/categories">
              View all categories <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {topCategories.map((category: Category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
        <div className="mt-6 text-center sm:hidden">
          <Button variant="outline" asChild>
            <Link to="/categories">View all categories</Link>
          </Button>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="container mx-auto mt-16 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold sm:text-3xl">Featured Products</h2>
          <Button variant="ghost" size="sm" className="hidden sm:flex" asChild>
            <Link to="/shop">
              View all products <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {featuredProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-8 text-center sm:hidden">
          <Button variant="outline" asChild>
            <Link to="/shop">View all products</Link>
          </Button>
        </div>
      </section>

      {/* Special Offer Banner */}
      <section className="container mx-auto mt-16 px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-xl bg-earth-light/30">
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-1 flex-col justify-center p-6 sm:p-10">
              <div className="mb-2 text-sm font-medium uppercase tracking-wider text-primary">Limited Time Offer</div>
              <h2 className="text-3xl font-bold sm:text-4xl">
                Get 20% Off on All Outdoor Furniture
              </h2>
              <p className="mt-4 max-w-md text-muted-foreground">
                Transform your backyard into a relaxing retreat with our premium outdoor furniture collection. Sale ends soon!
              </p>
              <div className="mt-6">
                <Button size="lg" asChild>
                  <Link to="/offers">Shop the Sale</Link>
                </Button>
              </div>
            </div>
            <div className="flex-1">
              <img
                src="https://images.unsplash.com/photo-1595515106969-1ce29566ff1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG91dGRvb3IlMjBmdXJuaXR1cmV8ZW58MHwxfDB8fHww&auto=format&fit=crop&w=500&q=60"
                alt="Outdoor Furniture Sale"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container mx-auto mt-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">Why Choose Us</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            We provide the best furniture shopping experience with quality products, trusted sellers, and excellent customer service.
          </p>
        </div>
        
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg p-6 text-center shadow-md">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M7 7h.01" />
                <path d="M12 7h.01" />
                <path d="M17 7h.01" />
                <path d="M7 12h.01" />
                <path d="M12 12h.01" />
                <path d="M17 12h.01" />
                <path d="M7 17h.01" />
                <path d="M12 17h.01" />
                <path d="M17 17h.01" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium">Quality Products</h3>
            <p className="mt-2 text-muted-foreground">
              All furniture on our platform is carefully vetted for quality and craftsmanship.
            </p>
          </div>
          
          <div className="rounded-lg p-6 text-center shadow-md">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium">Trusted Sellers</h3>
            <p className="mt-2 text-muted-foreground">
              Our platform connects you with verified and rated furniture sellers.
            </p>
          </div>
          
          <div className="rounded-lg p-6 text-center shadow-md">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium">Secure Payments</h3>
            <p className="mt-2 text-muted-foreground">
              Shop with confidence with our secure payment processing and buyer protection.
            </p>
          </div>
          
          <div className="rounded-lg p-6 text-center shadow-md">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium">Flexible Returns</h3>
            <p className="mt-2 text-muted-foreground">
              Not satisfied? Our sellers offer hassle-free returns within the specified period.
            </p>
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="container mx-auto mt-16 px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl bg-primary p-8 text-center sm:p-10">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Subscribe to Our Newsletter
            </h2>
            <p className="mt-3 text-primary-foreground/90">
              Be the first to know about new products, exclusive offers, and interior design tips.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full rounded-md border-0 px-4 py-2 text-foreground sm:max-w-xs"
              />
              <Button variant="secondary">
                Subscribe
              </Button>
            </div>
            <p className="mt-4 text-xs text-primary-foreground/70">
              By subscribing, you agree to our Privacy Policy. You can unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Home;
