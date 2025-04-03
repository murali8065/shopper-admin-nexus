import { useParams, Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { products } from "@/data/mockData";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Check, AlertCircle, ShoppingCart, Home, ImageOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/ui/ProductCard";

const Product = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = products.find(p => p.slug === slug);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product?.images[0] || "");
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const { addToCart } = useCart();
  
  // Find related products from the same category
  const relatedProducts = products
    .filter(p => p.category.id === product?.category.id && p.id !== product?.id)
    .slice(0, 4);

  const handleImageError = (imageSrc: string) => {
    setImageErrors(prev => ({ ...prev, [imageSrc]: true }));
    
    // If the active image failed to load, try to set another non-failed image as active
    if (imageSrc === activeImage && product) {
      const nonFailedImage = product.images.find(img => !imageErrors[img]);
      if (nonFailedImage) {
        setActiveImage(nonFailedImage);
      }
    }
  };

  if (!product) {
    return (
      <MainLayout>
        <div className="container mx-auto mt-10 px-4 text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-destructive" />
          <h1 className="mt-4 text-2xl font-bold">Product Not Found</h1>
          <p className="mt-2 text-muted-foreground">
            Sorry, we couldn't find the product you're looking for.
          </p>
          <Button className="mt-6" variant="outline" asChild>
            <Link to="/shop">Browse All Products</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= product.stock) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
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
            <Link to={`/category/${product.category.slug}`} className="hover:text-primary">
              {product.category.name}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="overflow-hidden rounded-lg bg-gray-100 aspect-square">
              {!imageErrors[activeImage] ? (
                <img 
                  src={activeImage} 
                  alt={product.name} 
                  className="h-full w-full object-cover object-center"
                  onError={() => handleImageError(activeImage)}
                />
              ) : (
                <div className="flex items-center justify-center h-full w-full">
                  <ImageOff className="h-16 w-16 text-gray-400" />
                </div>
              )}
            </div>
            <div className="flex gap-2 overflow-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`relative min-w-[80px] overflow-hidden rounded-md border border-gray-200 bg-gray-50 ${
                    activeImage === image ? 'ring-2 ring-primary ring-offset-2' : ''
                  }`}
                  onClick={() => setActiveImage(image)}
                >
                  {!imageErrors[image] ? (
                    <img 
                      src={image} 
                      alt={`${product.name} - Image ${index + 1}`} 
                      className="h-20 w-20 object-cover object-center"
                      onError={() => handleImageError(image)}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-20 w-20">
                      <ImageOff className="h-6 w-6 text-gray-400" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Link 
                to={`/category/${product.category.slug}`}
                className="text-sm font-medium text-muted-foreground hover:text-primary"
              >
                {product.category.name}
              </Link>
              <h1 className="mt-2 text-3xl font-bold">{product.name}</h1>
              
              <div className="mt-2 flex items-center space-x-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating) ? 'fill-amber-500 text-amber-500' : 
                          i < product.rating ? 'fill-amber-500 text-amber-500 opacity-50' : 'text-gray-300'
                      }`} 
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">{product.rating}</span>
                <span className="text-sm text-muted-foreground">
                  ({product.reviews.length} reviews)
                </span>
              </div>

              <div className="mt-4">
                <span className="text-3xl font-bold text-primary">
                  ${product.price.toLocaleString()}
                </span>
              </div>
            </div>

            <div>
              <p className="text-muted-foreground">
                {product.description}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                <span>Free shipping on orders over $100</span>
              </div>
              <div className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                <span>30-day hassle-free returns</span>
              </div>
              <div className="flex items-center">
                {product.stock > 0 ? (
                  <>
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>In stock: {product.stock} units</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="mr-2 h-4 w-4 text-destructive" />
                    <span className="text-destructive">Out of stock</span>
                  </>
                )}
              </div>
            </div>
            
            {product.stock > 0 && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <label htmlFor="quantity" className="font-medium">
                    Quantity:
                  </label>
                  <div className="flex h-10 w-32 items-center rounded-md border">
                    <button 
                      type="button"
                      className="flex h-full w-10 items-center justify-center border-r text-lg"
                      onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    >
                      −
                    </button>
                    <input
                      type="number"
                      id="quantity"
                      className="h-full w-full border-0 text-center focus:outline-none focus:ring-0"
                      value={quantity}
                      min={1}
                      max={product.stock}
                      onChange={handleQuantityChange}
                    />
                    <button 
                      type="button"
                      className="flex h-full w-10 items-center justify-center border-l text-lg"
                      onClick={() => quantity < product.stock && setQuantity(quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <Button 
                  size="lg"
                  className="w-full"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
              </div>
            )}

            <div className="rounded-md bg-muted p-4">
              <div className="flex items-center">
                <img 
                  src={product.seller.avatar} 
                  alt={product.seller.name}
                  className="mr-3 h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">{product.seller.name}</p>
                  <p className="text-sm text-muted-foreground">Verified Seller</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs for Details & Reviews */}
        <div className="mt-12">
          <Tabs defaultValue="description">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="reviews">
                Reviews ({product.reviews.length})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-4">
              <div className="rounded-md border p-6">
                <p className="leading-relaxed text-muted-foreground">
                  {product.description}
                </p>
                <div className="mt-6 space-y-4">
                  <h3 className="text-lg font-semibold">Product Details</h3>
                  <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                    <li>High-quality materials for durability</li>
                    <li>Ergonomic design for comfort</li>
                    <li>Easy assembly with included tools</li>
                    <li>Modern style to complement any decor</li>
                    <li>Dimensions: Please refer to product specifications</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-4">
              <div className="rounded-md border p-6">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Customer Reviews</h3>
                  <Button variant="outline">Write a Review</Button>
                </div>
                
                <div className="divide-y">
                  {product.reviews.map(review => (
                    <div key={review.id} className="py-6">
                      <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <img 
                            src={review.user.avatar} 
                            alt={review.user.name}
                            className="h-8 w-8 rounded-full object-cover"
                          />
                          <span className="font-medium">{review.user.name}</span>
                          {review.verified && (
                            <Badge variant="outline" className="ml-2 text-xs text-green-600">
                              <Check className="mr-1 h-3 w-3" />
                              Verified Purchase
                            </Badge>
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>
                      <div className="mb-2 flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${
                              i < review.rating ? 'fill-amber-500 text-amber-500' : 'text-gray-300'
                            }`} 
                          />
                        ))}
                      </div>
                      <p className="text-muted-foreground">{review.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold">You May Also Like</h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {relatedProducts.map(relatedProduct => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Product;
