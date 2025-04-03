
import { Product } from "@/types";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Eye, ImageOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="product-card group animate-fade-in furniture-shadow transition-all duration-300">
      <Link to={`/product/${product.slug}`} className="block overflow-hidden">
        <div className="relative overflow-hidden rounded-md bg-gray-100 aspect-square">
          {!imageError ? (
            <img 
              src={product.images[0]} 
              alt={product.name} 
              className="product-image h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
              onError={handleImageError}
            />
          ) : (
            <div className="flex items-center justify-center h-full w-full bg-gray-100">
              <ImageOff className="h-12 w-12 text-gray-400" />
            </div>
          )}
          {product.stock <= 5 && product.stock > 0 && (
            <Badge variant="secondary" className="absolute right-2 top-2 bg-amber-100/80 text-amber-800 backdrop-blur">
              Only {product.stock} left
            </Badge>
          )}
          {product.stock === 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <Badge variant="destructive" className="text-sm font-medium">
                Out of Stock
              </Badge>
            </div>
          )}
        </div>
        <div className="mt-3 text-left">
          <p className="text-sm text-muted-foreground">{product.category.name}</p>
          <h3 className="mt-1 line-clamp-1 font-medium">{product.name}</h3>
          <div className="mt-1.5 flex items-center justify-between">
            <p className="font-semibold text-primary">${product.price.toLocaleString()}</p>
            <div className="flex items-center">
              <span className="text-amber-500">★</span>
              <span className="ml-1 text-sm">{product.rating}</span>
            </div>
          </div>
        </div>
      </Link>

      <div className="mt-3 flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1"
          asChild
        >
          <Link to={`/product/${product.slug}`}>
            <Eye className="mr-1 h-4 w-4" /> View
          </Link>
        </Button>
        <Button
          size="sm"
          className="flex-1"
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
          disabled={product.stock <= 0}
        >
          <ShoppingCart className="mr-1 h-4 w-4" /> Add
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
