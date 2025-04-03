import MainLayout from "@/components/layout/MainLayout";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MinusCircle, PlusCircle, ShoppingBag, Trash2 } from "lucide-react";
import { toast } from "sonner";

const Cart = () => {
  const { items, updateQuantity, removeFromCart, totalItems, totalPrice } = useCart();

  const handleCheckout = () => {
    toast.success("Redirecting to checkout...");
    // In a real app, this would navigate to the checkout page or process
  };

  if (items.length === 0) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12 text-center sm:px-6">
          <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
          <h1 className="mt-4 text-2xl font-bold">Your cart is empty</h1>
          <p className="mt-2 text-muted-foreground">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Button className="mt-6" asChild>
            <Link to="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold sm:text-3xl">Shopping Cart</h1>
        <p className="mt-2 text-muted-foreground">
          You have {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="rounded-md border">
              <div className="divide-y">
                {items.map((item) => (
                  <div key={item.product.id} className="flex p-4 sm:p-6">
                    <div className="h-24 w-24 flex-shrink-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="h-full w-full rounded-md object-cover object-center"
                      />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div className="flex flex-1 items-start justify-between">
                        <div>
                          <h3 className="font-medium text-foreground">
                            <Link to={`/product/${item.product.slug}`}>
                              {item.product.name}
                            </Link>
                          </h3>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {item.product.category.name}
                          </p>
                        </div>
                        <p className="font-medium text-foreground">
                          ${item.product.price.toLocaleString()}
                        </p>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className={`${
                              item.quantity <= 1 ? 'text-gray-300' : 'text-muted-foreground hover:text-primary'
                            }`}
                          >
                            <MinusCircle className="h-5 w-5" />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            disabled={item.quantity >= item.product.stock}
                            className={`${
                              item.quantity >= item.product.stock ? 'text-gray-300' : 'text-muted-foreground hover:text-primary'
                            }`}
                          >
                            <PlusCircle className="h-5 w-5" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="rounded-md border bg-card p-6 shadow-sm">
              <h2 className="text-lg font-medium">Order Summary</h2>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground">Subtotal</p>
                  <p className="font-medium">${totalPrice.toLocaleString()}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground">Shipping</p>
                  <p className="font-medium">
                    {totalPrice >= 100 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      '$10.00'
                    )}
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-border pt-4">
                  <p className="font-medium">Total</p>
                  <p className="text-xl font-bold text-primary">
                    ${(totalPrice + (totalPrice >= 100 ? 0 : 10)).toLocaleString()}
                  </p>
                </div>
              </div>

              <Button className="mt-6 w-full" size="lg" onClick={handleCheckout}>
                Proceed to Checkout
              </Button>

              <div className="mt-4">
                <Link
                  to="/shop"
                  className="flex items-center justify-center text-sm text-muted-foreground hover:text-primary"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Cart;
