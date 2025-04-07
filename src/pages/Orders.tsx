
import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { useAuth } from "@/context/AuthContext";
import { Navigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Package, 
  ArrowLeft, 
  ShoppingBag, 
  Clock, 
  Truck, 
  MapPin 
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Order tracking status steps
const trackingSteps = [
  { status: "processing", name: "Order Processing", icon: Clock },
  { status: "shipped", name: "Order Shipped", icon: Package },
  { status: "out_for_delivery", name: "Out for Delivery", icon: Truck },
  { status: "delivered", name: "Delivered", icon: MapPin },
];

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [trackingDialogOpen, setTrackingDialogOpen] = useState(false);
  
  // Load orders from localStorage
  useEffect(() => {
    const savedOrders = localStorage.getItem("furniture-orders");
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (error) {
        console.error("Failed to parse orders from localStorage:", error);
      }
    }
  }, []);
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If no saved orders, use these mock orders
  const ordersToDisplay = orders.length > 0 ? orders : [
    {
      id: "ORD-1234",
      date: "2025-03-01",
      status: "delivered",
      total: 459.99,
      items: 3
    },
    {
      id: "ORD-5678",
      date: "2025-03-27",
      status: "processing",
      total: 129.50,
      items: 1
    }
  ];

  const handleTrackOrder = (order) => {
    setSelectedOrder(order);
    setTrackingDialogOpen(true);
  };

  // Determine the current step based on order status
  const getCurrentStep = (status) => {
    switch (status) {
      case "processing": return 0;
      case "shipped": return 1;
      case "out_for_delivery": return 2;
      case "delivered": return 3;
      default: return 0;
    }
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex items-center text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/profile" className="hover:text-primary">Profile</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Orders</span>
          </nav>
        </div>
        
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Your Orders</h1>
            <p className="mt-1 text-muted-foreground">
              Track and manage your purchases
            </p>
          </div>
          <Link to="/shop">
            <Button className="mt-4 sm:mt-0" variant="outline">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Continue Shopping
            </Button>
          </Link>
        </div>
        
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="shipped">Shipped</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            {ordersToDisplay.length > 0 ? (
              <div className="space-y-4">
                {ordersToDisplay.map((order) => (
                  <div key={order.id} className="rounded-lg border bg-card p-4 shadow-sm">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{order.id}</h3>
                          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                            order.status === "delivered" 
                              ? "bg-green-100 text-green-700" 
                              : order.status === "processing" 
                                ? "bg-yellow-100 text-yellow-700" 
                                : "bg-blue-100 text-blue-700"
                          }`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Ordered on {new Date(order.date).toLocaleDateString()}
                        </p>
                        <p className="mt-1 text-sm">
                          {order.items} {order.items === 1 ? "item" : "items"} · ${Number(order.total).toFixed(2)}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleTrackOrder(order)}
                        >
                          <Truck className="mr-1 h-4 w-4" />
                          Track Order
                        </Button>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-md border bg-card/60 p-10 text-center">
                <Package className="mx-auto h-10 w-10 text-muted-foreground" />
                <p className="mt-4 text-lg font-medium">No orders found</p>
                <p className="mt-2 text-muted-foreground">
                  You haven't placed any orders yet.
                </p>
                <Button className="mt-4" asChild>
                  <Link to="/shop">Start Shopping</Link>
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="processing">
            {ordersToDisplay.filter(order => order.status === "processing").length > 0 ? (
              <div className="space-y-4">
                {ordersToDisplay.filter(order => order.status === "processing").map((order) => (
                  <div key={order.id} className="rounded-lg border bg-card p-4 shadow-sm">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{order.id}</h3>
                          <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-700">
                            Processing
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Ordered on {new Date(order.date).toLocaleDateString()}
                        </p>
                        <p className="mt-1 text-sm">
                          {order.items} {order.items === 1 ? "item" : "items"} · ${Number(order.total).toFixed(2)}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleTrackOrder(order)}
                        >
                          <Truck className="mr-1 h-4 w-4" />
                          Track Order
                        </Button>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-md border bg-card/60 p-10 text-center">
                <Package className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="mt-4 text-muted-foreground">
                  No processing orders found.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="shipped">
            <div className="rounded-md border bg-card/60 p-10 text-center">
              <Package className="mx-auto h-8 w-8 text-muted-foreground" />
              <p className="mt-4 text-muted-foreground">
                No shipped orders found.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="delivered">
            {ordersToDisplay.filter(order => order.status === "delivered").length > 0 ? (
              <div className="space-y-4">
                {ordersToDisplay.filter(order => order.status === "delivered").map((order) => (
                  <div key={order.id} className="rounded-lg border bg-card p-4 shadow-sm">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{order.id}</h3>
                          <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                            Delivered
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Ordered on {new Date(order.date).toLocaleDateString()}
                        </p>
                        <p className="mt-1 text-sm">
                          {order.items} {order.items === 1 ? "item" : "items"} · ${Number(order.total).toFixed(2)}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleTrackOrder(order)}
                        >
                          <Truck className="mr-1 h-4 w-4" />
                          Track Order
                        </Button>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-md border bg-card/60 p-10 text-center">
                <Package className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="mt-4 text-muted-foreground">
                  No delivered orders found.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Order Tracking Dialog */}
        {selectedOrder && (
          <Dialog open={trackingDialogOpen} onOpenChange={setTrackingDialogOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Track Your Order</DialogTitle>
                <DialogDescription>
                  Order #{selectedOrder.id} placed on {new Date(selectedOrder.date).toLocaleDateString()}
                </DialogDescription>
              </DialogHeader>
              
              <div className="py-4">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Estimated Delivery</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedOrder.status === "delivered" 
                        ? "Delivered"
                        : "April 15, 2025"}
                    </p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                    selectedOrder.status === "delivered" 
                      ? "bg-green-100 text-green-700" 
                      : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                  </span>
                </div>
                
                <div className="mt-8 space-y-8">
                  {trackingSteps.map((step, index) => {
                    const currentStep = getCurrentStep(selectedOrder.status);
                    const isCompleted = index <= currentStep;
                    const isActive = index === currentStep;
                    
                    return (
                      <div key={step.status} className="relative flex">
                        {index !== 0 && (
                          <div 
                            className={`absolute left-6 top-0 h-full w-0.5 -translate-x-1/2 ${
                              index <= currentStep ? "bg-primary" : "bg-gray-200"
                            }`} 
                            style={{ top: '-2rem', height: '2rem' }}
                          />
                        )}
                        
                        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 ${
                          isCompleted 
                            ? "border-primary bg-primary text-primary-foreground" 
                            : "border-gray-200 bg-background text-muted-foreground"
                        }`}>
                          <step.icon className="h-5 w-5" />
                        </div>
                        
                        <div className="ml-4">
                          <p className={`font-medium ${isActive ? "text-primary" : ""}`}>
                            {step.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {isCompleted 
                              ? index === currentStep 
                                ? "In progress" 
                                : "Completed"
                              : "Pending"}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <DialogFooter>
                <Button onClick={() => setTrackingDialogOpen(false)} className="w-full">
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </MainLayout>
  );
};

export default Orders;
