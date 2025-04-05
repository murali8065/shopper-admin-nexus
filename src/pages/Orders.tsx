
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { useAuth } from "@/context/AuthContext";
import { Navigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, ArrowLeft, ShoppingBag } from "lucide-react";

// Mock orders data (in a real app, this would come from an API)
const mockOrders = [
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

const Orders = () => {
  const { user } = useAuth();
  const [orders] = useState(mockOrders);
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
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
            {orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order) => (
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
                          {order.items} {order.items === 1 ? "item" : "items"} · ${order.total.toFixed(2)}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
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
            {orders.filter(order => order.status === "processing").length > 0 ? (
              <div className="space-y-4">
                {orders.filter(order => order.status === "processing").map((order) => (
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
                          {order.items} {order.items === 1 ? "item" : "items"} · ${order.total.toFixed(2)}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
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
            {orders.filter(order => order.status === "delivered").length > 0 ? (
              <div className="space-y-4">
                {orders.filter(order => order.status === "delivered").map((order) => (
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
                          {order.items} {order.items === 1 ? "item" : "items"} · ${order.total.toFixed(2)}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
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
      </div>
    </MainLayout>
  );
};

export default Orders;
