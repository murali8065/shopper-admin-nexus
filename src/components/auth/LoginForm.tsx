
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState("buyer");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await login(email, password, userType);
      if (success) {
        navigate("/");
      } else {
        // The toast is shown in the login function
      }
    } catch (error) {
      toast.error("An error occurred during sign in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Tabs defaultValue="buyer" onValueChange={setUserType} className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="buyer">Buyer Sign In</TabsTrigger>
        <TabsTrigger value="seller">Seller Sign In</TabsTrigger>
      </TabsList>
      <TabsContent value="buyer">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link to="/forgot-password" className="text-sm text-primary">
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            <p className="text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary underline-offset-4 hover:underline">
                Register
              </Link>
            </p>
          </div>
          <div className="mt-4 text-center text-xs text-muted-foreground">
            <p>Demo accounts:</p>
            <p>User: user@example.com / Password: user</p>
            <p>Admin: admin@example.com / Password: admin</p>
            <p>Seller: seller@example.com / Password: seller</p>
          </div>
        </form>
      </TabsContent>
      <TabsContent value="seller">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="seller-email">Email</Label>
            <Input
              id="seller-email"
              type="email"
              placeholder="your@business.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="seller-password">Password</Label>
              <Link to="/forgot-password" className="text-sm text-primary">
                Forgot password?
              </Link>
            </div>
            <Input
              id="seller-password"
              type="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            <p className="text-muted-foreground">
              Don't have a seller account?{" "}
              <Link to="/register" className="text-primary underline-offset-4 hover:underline">
                Register as Seller
              </Link>
            </p>
          </div>
          <div className="mt-4 text-center text-xs text-muted-foreground">
            <p>Demo seller account:</p>
            <p>Email: seller@example.com / Password: seller</p>
          </div>
        </form>
      </TabsContent>
    </Tabs>
  );
};

export default LoginForm;
