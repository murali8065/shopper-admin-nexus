
import MainLayout from "@/components/layout/MainLayout";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Package, MapPin, CreditCard, User as UserIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { toast } from "@/components/ui/sonner";

const Profile = () => {
  const { user } = useAuth();
  
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  
  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile updated successfully!");
  };
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col items-center sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col items-center text-center sm:flex-row sm:text-left">
            <Avatar className="h-20 w-20 sm:h-24 sm:w-24">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="mt-4 sm:ml-6 sm:mt-0">
              <h1 className="text-2xl font-bold sm:text-3xl">{user.name}</h1>
              <p className="text-muted-foreground">{user.email}</p>
              {user.role === "admin" && (
                <span className="mt-2 inline-block rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
                  Admin
                </span>
              )}
            </div>
          </div>
          <Button className="mt-4 sm:mt-0">Change Avatar</Button>
        </div>
        
        <Tabs defaultValue="account" className="space-y-4">
          <TabsList>
            <TabsTrigger value="account">
              <UserIcon className="mr-2 h-4 w-4" /> Account
            </TabsTrigger>
            <TabsTrigger value="orders">
              <Package className="mr-2 h-4 w-4" /> Orders
            </TabsTrigger>
            <TabsTrigger value="addresses">
              <MapPin className="mr-2 h-4 w-4" /> Addresses
            </TabsTrigger>
            <TabsTrigger value="payment">
              <CreditCard className="mr-2 h-4 w-4" /> Payment Methods
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="account">
            <div className="rounded-md border bg-card p-6 shadow-sm">
              <h2 className="text-xl font-semibold">Account Information</h2>
              <form onSubmit={handleUpdateProfile} className="mt-6 space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="(123) 456-7890" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="birthday">Birthday</Label>
                    <Input id="birthday" type="date" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input 
                    id="currentPassword" 
                    type="password" 
                    placeholder="Enter your current password to make changes" 
                  />
                </div>
                
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input 
                      id="newPassword" 
                      type="password" 
                      placeholder="Leave blank to keep current password" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input 
                      id="confirmPassword" 
                      type="password" 
                      placeholder="Leave blank to keep current password" 
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit">Save Changes</Button>
                </div>
              </form>
            </div>
          </TabsContent>
          
          <TabsContent value="orders">
            <div className="rounded-md border bg-card p-6 shadow-sm">
              <h2 className="text-xl font-semibold">Your Orders</h2>
              <div className="mt-6">
                <div className="rounded-md border bg-card/60 p-10 text-center">
                  <Package className="mx-auto h-8 w-8 text-muted-foreground" />
                  <p className="mt-4 text-muted-foreground">
                    You haven't placed any orders yet.
                  </p>
                  <Button className="mt-4" asChild>
                    <a href="/shop">Start Shopping</a>
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="addresses">
            <div className="rounded-md border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Your Addresses</h2>
                <Button>Add New Address</Button>
              </div>
              <div className="mt-6">
                <div className="rounded-md border bg-card/60 p-10 text-center">
                  <MapPin className="mx-auto h-8 w-8 text-muted-foreground" />
                  <p className="mt-4 text-muted-foreground">
                    You haven't added any addresses yet.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="payment">
            <div className="rounded-md border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Payment Methods</h2>
                <Button>Add New Payment Method</Button>
              </div>
              <div className="mt-6">
                <div className="rounded-md border bg-card/60 p-10 text-center">
                  <CreditCard className="mx-auto h-8 w-8 text-muted-foreground" />
                  <p className="mt-4 text-muted-foreground">
                    You haven't added any payment methods yet.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Profile;
