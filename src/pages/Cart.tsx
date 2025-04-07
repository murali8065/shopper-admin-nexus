
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Trash2, ShoppingCart, CreditCard, ArrowRight, ImageOff, Clock, Package, Truck } from "lucide-react";
import { CartItem } from "@/types";

const Cart = () => {
  const { items, updateQuantity, removeFromCart, clearCart, totalPrice } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const handleQuantityChange = (item: CartItem, newQuantity: number) => {
    if (newQuantity > 0 && newQuantity <= item.product.stock) {
      updateQuantity(item.product.id, newQuantity);
    }
  };

  const handleImageError = (imageUrl: string) => {
    setImageErrors(prev => ({
      ...prev,
      [imageUrl]: true
    }));
  };

  const generateOrderNumber = () => {
    const prefix = "ORD";
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    return `${prefix}-${randomDigits}`;
  };

  const handleCheckout = () => {
    if (!user) {
      toast.error("Please sign in to checkout");
      navigate("/login");
      return;
    }
    
    setProcessing(true);
    
    // Generate order number
    const newOrderNumber = generateOrderNumber();
    setOrderNumber(newOrderNumber);
    
    // Simulate processing
    setTimeout(() => {
      // Store order in localStorage
      const existingOrders = JSON.parse(localStorage.getItem("furniture-orders") || "[]");
      const newOrder = {
        id: newOrderNumber,
        date: new Date().toISOString(),
        status: "processing",
        total: calculateTotalWithTaxAndShipping(),
        items: items.length,
        products: items.map(item => ({
          id: item.product.id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          image: item.product.images[0]
        }))
      };
      
      localStorage.setItem("furniture-orders", JSON.stringify([...existingOrders, newOrder]));
      
      setProcessing(false);
      setShowOrderConfirmation(true);
    }, 1500);
  };

  const calculateTotalWithTaxAndShipping = () => {
    const shippingCost = totalPrice > 100 ? 0 : 10;
    const tax = totalPrice * 0.07;
    return totalPrice + shippingCost + tax;
  };

  const handleOrderConfirmationClose = () => {
    setShowOrderConfirmation(false);
    clearCart();
    navigate("/orders");
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold">Your Cart</h1>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="rounded-md border shadow-sm">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Product</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((item) => (
                      <TableRow key={item.product.id}>
                        <TableCell>
                          {!imageErrors[item.product.images[0]] ? (
                            <img
                              src={item.product.images[0]}
                              alt={item.product.name}
                              className="h-16 w-16 rounded object-cover"
                              onError={() => handleImageError(item.product.images[0])}
                            />
                          ) : (
                            <div className="flex h-16 w-16 items-center justify-center rounded bg-gray-100">
                              <ImageOff className="h-8 w-8 text-gray-400" />
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <Link 
                            to={`/product/${item.product.slug}`} 
                            className="font-medium hover:text-primary hover:underline"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-sm text-muted-foreground">
                            {item.product.category.name}
                          </p>
                        </TableCell>
                        <TableCell className="text-right">
                          ${item.product.price.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <div className="flex h-10 w-32 items-center rounded-md border">
                            <button 
                              type="button"
                              className="flex h-full w-10 items-center justify-center border-r text-lg"
                              onClick={() => handleQuantityChange(item, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              −
                            </button>
                            <input
                              type="number"
                              className="h-full w-full border-0 text-center focus:outline-none focus:ring-0"
                              value={item.quantity}
                              min={1}
                              max={item.product.stock}
                              onChange={(e) => handleQuantityChange(item, parseInt(e.target.value))}
                            />
                            <button 
                              type="button"
                              className="flex h-full w-10 items-center justify-center border-l text-lg"
                              onClick={() => handleQuantityChange(item, item.quantity + 1)}
                              disabled={item.quantity >= item.product.stock}
                            >
                              +
                            </button>
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500"
                            onClick={() => removeFromCart(item.product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="mt-4 flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/shop")}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Continue Shopping
                </Button>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="text-red-500">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Clear Cart
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Clear Cart</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to remove all items from your cart? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={clearCart} className="bg-red-500 hover:bg-red-600">
                        Clear Cart
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>

            <div>
              <div className="rounded-md border bg-card p-6 shadow-sm">
                <h2 className="text-xl font-semibold">Order Summary</h2>
                
                <div className="mt-6 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{totalPrice > 100 ? "Free" : "$10.00"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>${(totalPrice * 0.07).toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>
                        ${calculateTotalWithTaxAndShipping().toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="mt-6 w-full" 
                  onClick={handleCheckout}
                  disabled={processing}
                >
                  {processing ? (
                    "Processing..."
                  ) : (
                    <>
                      <CreditCard className="mr-2 h-4 w-4" />
                      Checkout
                    </>
                  )}
                </Button>
                
                {!user && (
                  <div className="mt-4 rounded-md bg-muted p-3 text-center text-sm">
                    <p>Please <Link to="/login" className="text-primary hover:underline">sign in</Link> to checkout</p>
                  </div>
                )}
                
                <p className="mt-4 text-xs text-muted-foreground">
                  By proceeding to checkout, you agree to our terms and conditions.
                </p>
              </div>

              <div className="mt-6 rounded-md border bg-card p-6 shadow-sm">
                <h2 className="text-lg font-semibold">Need Help?</h2>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>
                    <Link to="#" className="text-primary hover:underline">Shipping Information</Link>
                  </li>
                  <li>
                    <Link to="#" className="text-primary hover:underline">Return Policy</Link>
                  </li>
                  <li>
                    <Link to="#" className="text-primary hover:underline">Contact Customer Support</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-md border bg-card p-10 text-center">
            <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground" />
            <h2 className="mt-4 text-xl font-semibold">Your cart is empty</h2>
            <p className="mt-2 text-muted-foreground">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Button className="mt-6" asChild>
              <Link to="/shop">
                Start Shopping <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}

        {/* Order Confirmation Dialog */}
        <Dialog open={showOrderConfirmation} onOpenChange={setShowOrderConfirmation}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center">Order Placed Successfully!</DialogTitle>
              <DialogDescription className="text-center">
                Thank you for your purchase
              </DialogDescription>
            </DialogHeader>
            
            <div className="flex flex-col items-center justify-center space-y-4 py-4">
              <div className="rounded-full bg-green-100 p-3">
                <Package className="h-8 w-8 text-green-600" />
              </div>
              
              <div className="text-center">
                <p className="text-lg font-semibold">Order #{orderNumber}</p>
                <p className="text-sm text-muted-foreground">
                  A confirmation email has been sent to your email address.
                </p>
              </div>
              
              <div className="mt-4 w-full space-y-2 rounded-md bg-muted p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Order Total:</span>
                  <span className="font-semibold">${calculateTotalWithTaxAndShipping().toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Estimated Delivery:</span>
                  <span className="text-sm">3-5 business days</span>
                </div>
              </div>
            </div>
            
            <DialogFooter className="flex-col sm:flex-col sm:space-x-0 sm:space-y-2">
              <Button onClick={handleOrderConfirmationClose} className="w-full">
                <Truck className="mr-2 h-4 w-4" />
                Track Your Order
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link to="/shop">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Continue Shopping
                </Link>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

      </div>
    </MainLayout>
  );
};

export default Cart;
