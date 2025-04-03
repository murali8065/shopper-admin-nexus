
import MainLayout from "@/components/layout/MainLayout";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { mockSalesData, products } from "@/data/mockData";
import {
  AlertCircle,
  ArrowUpRight,
  DollarSign,
  Package,
  ShoppingCart,
  Users,
  Plus,
  X,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/sonner";
import { useState } from "react";
import { Product, Category } from "@/types";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ProductForm } from "@/components/admin/ProductForm";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [productsList, setProductsList] = useState([...products]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | undefined>(undefined);

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  const filteredProducts = productsList.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = () => {
    setCurrentProduct(undefined);
    setIsFormOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setCurrentProduct(product);
    setIsFormOpen(true);
  };

  const handleDeleteProduct = (id: string) => {
    setProductsList(productsList.filter(product => product.id !== id));
    toast.success(`Product deleted successfully`);
  };

  const handleProductSubmit = (data: any) => {
    // Find the category from its ID
    const selectedCategory = productsList.find(p => p.id === currentProduct?.id)?.category || 
                            productsList[0].category;
    
    if (currentProduct) {
      // Update existing product
      const updatedProducts = productsList.map(product => {
        if (product.id === currentProduct.id) {
          return {
            ...product,
            name: data.name,
            description: data.description,
            price: Number(data.price),
            stock: Number(data.stock),
            images: data.images,
            category: selectedCategory
          };
        }
        return product;
      });
      
      setProductsList(updatedProducts);
      toast.success("Product updated successfully");
    } else {
      // Add new product
      const newProduct: Product = {
        id: Math.random().toString(36).substring(2, 9),
        slug: data.name.toLowerCase().replace(/\s+/g, "-"),
        name: data.name,
        description: data.description,
        price: Number(data.price),
        stock: Number(data.stock),
        images: data.images,
        category: selectedCategory,
        rating: 0,
        reviews: [],
        seller: user
      };
      
      setProductsList([newProduct, ...productsList]);
      toast.success("Product added successfully");
    }
    
    setIsFormOpen(false);
  };

  const totalRevenue = mockSalesData.reduce((sum, data) => sum + data.sales, 0);
  const totalOrders = 145;
  const totalCustomers = 78;
  const totalProducts = productsList.length;

  return (
    <MainLayout hideFooter>
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Admin Dashboard</h1>
          <Button onClick={handleAddProduct}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Product
          </Button>
        </div>

        {/* Product Form Dialog */}
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent className="sm:max-w-[800px]">
            <ProductForm
              product={currentProduct}
              onSubmit={handleProductSubmit}
              onCancel={() => setIsFormOpen(false)}
            />
          </DialogContent>
        </Dialog>

        {/* Stats Cards */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalOrders}</div>
              <p className="text-xs text-muted-foreground">
                +12.3% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCustomers}</div>
              <p className="text-xs text-muted-foreground">
                +8.2% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProducts}</div>
              <p className="text-xs text-muted-foreground">
                +4 new this month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Sales Chart */}
        <div className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Sales Overview</CardTitle>
                  <CardDescription>
                    Monthly sales performance
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-emerald-600 dark:text-emerald-500">
                    +12.5%
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-emerald-600 dark:text-emerald-500" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={mockSalesData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis
                      dataKey="date"
                      tickFormatter={(value) => {
                        const date = new Date(value);
                        return date.toLocaleDateString("en-US", {
                          month: "short",
                        });
                      }}
                    />
                    <YAxis />
                    <Tooltip
                      formatter={(value: number) =>
                        [`$${value.toLocaleString()}`, "Revenue"]
                      }
                      labelFormatter={(label) => {
                        const date = new Date(label);
                        return date.toLocaleDateString("en-US", {
                          month: "long",
                          year: "numeric",
                        });
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="sales"
                      name="Revenue"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Products Tab */}
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Management</CardTitle>
              <CardDescription>
                Manage your product inventory
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all-products" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="all-products">All Products</TabsTrigger>
                  <TabsTrigger value="low-stock">Low Stock</TabsTrigger>
                  <TabsTrigger value="out-of-stock">Out of Stock</TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-4">
                  <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                  <Button variant="outline" onClick={() => setSearchTerm("")}>
                    Clear
                  </Button>
                </div>

                <TabsContent value="all-products">
                  <div className="overflow-auto rounded-md border">
                    <table className="w-full border-collapse">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-semibold text-muted-foreground">
                            Product Name
                          </th>
                          <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-semibold text-muted-foreground">
                            Category
                          </th>
                          <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-semibold text-muted-foreground">
                            Price
                          </th>
                          <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-semibold text-muted-foreground">
                            Stock
                          </th>
                          <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-semibold text-muted-foreground">
                            Rating
                          </th>
                          <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-semibold text-muted-foreground">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredProducts.map((product) => (
                          <tr key={product.id} className="border-t hover:bg-muted/30">
                            <td className="whitespace-nowrap px-6 py-4">
                              <div className="flex items-center">
                                <img
                                  src={product.images[0]}
                                  alt={product.name}
                                  className="mr-3 h-8 w-8 rounded-md object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = "/placeholder.svg";
                                  }}
                                />
                                <span className="font-medium">{product.name}</span>
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {product.category.name}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              ${product.price.toLocaleString()}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {product.stock <= 5 ? (
                                <Badge variant="outline" className="bg-amber-100/80 text-amber-800">
                                  {product.stock} left
                                </Badge>
                              ) : product.stock === 0 ? (
                                <Badge variant="destructive">Out of stock</Badge>
                              ) : (
                                product.stock
                              )}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              <div className="flex items-center">
                                <span className="text-amber-500 mr-1">★</span>
                                {product.rating}
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              <div className="flex space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleEditProduct(product)}
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-destructive hover:bg-destructive/10"
                                  onClick={() => handleDeleteProduct(product.id)}
                                >
                                  Delete
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {filteredProducts.length === 0 && (
                      <div className="py-12 text-center">
                        <AlertCircle className="mx-auto h-8 w-8 text-muted-foreground" />
                        <p className="mt-2 text-muted-foreground">
                          No products found
                        </p>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="low-stock">
                  <div className="overflow-auto rounded-md border">
                    <table className="w-full border-collapse">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-semibold text-muted-foreground">
                            Product Name
                          </th>
                          <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-semibold text-muted-foreground">
                            Category
                          </th>
                          <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-semibold text-muted-foreground">
                            Price
                          </th>
                          <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-semibold text-muted-foreground">
                            Stock
                          </th>
                          <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-semibold text-muted-foreground">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {productsList
                          .filter((product) => product.stock > 0 && product.stock <= 5)
                          .map((product) => (
                            <tr key={product.id} className="border-t hover:bg-muted/30">
                              <td className="whitespace-nowrap px-6 py-4">
                                <div className="flex items-center">
                                  <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="mr-3 h-8 w-8 rounded-md object-cover"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                                    }}
                                  />
                                  <span className="font-medium">{product.name}</span>
                                </div>
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                {product.category.name}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                ${product.price.toLocaleString()}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                <Badge variant="outline" className="bg-amber-100/80 text-amber-800">
                                  Only {product.stock} left
                                </Badge>
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleEditProduct(product)}
                                >
                                  Edit Stock
                                </Button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>

                <TabsContent value="out-of-stock">
                  <div className="overflow-auto rounded-md border">
                    <table className="w-full border-collapse">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-semibold text-muted-foreground">
                            Product Name
                          </th>
                          <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-semibold text-muted-foreground">
                            Category
                          </th>
                          <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-semibold text-muted-foreground">
                            Price
                          </th>
                          <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-semibold text-muted-foreground">
                            Status
                          </th>
                          <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-semibold text-muted-foreground">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {productsList
                          .filter((product) => product.stock === 0)
                          .map((product) => (
                            <tr key={product.id} className="border-t hover:bg-muted/30">
                              <td className="whitespace-nowrap px-6 py-4">
                                <div className="flex items-center">
                                  <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="mr-3 h-8 w-8 rounded-md object-cover"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                                    }}
                                  />
                                  <span className="font-medium">{product.name}</span>
                                </div>
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                {product.category.name}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                ${product.price.toLocaleString()}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                <Badge variant="destructive">
                                  Out of stock
                                </Badge>
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleEditProduct(product)}
                                >
                                  Restock
                                </Button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;
