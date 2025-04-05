
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { ProductForm } from "@/components/admin/ProductForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Edit, Trash2, Plus, ImageOff } from "lucide-react";
import { Product } from "@/types";
import { products as initialProducts, categories } from "@/data/mockData";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [activeTab, setActiveTab] = useState("products");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showProductForm, setShowProductForm] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  // Check if user is admin
  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  const handleImageError = (productId: string, imageUrl: string) => {
    setImageErrors(prev => ({
      ...prev,
      [`${productId}-${imageUrl}`]: true
    }));
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setShowProductForm(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setShowProductForm(true);
  };

  const handleDeleteProduct = (product: Product) => {
    setProductToDelete(product);
  };

  const confirmDeleteProduct = () => {
    if (productToDelete) {
      setProducts(products.filter((p) => p.id !== productToDelete.id));
      toast.success(`${productToDelete.name} has been deleted`);
      setProductToDelete(null);
    }
  };

  const handleProductSubmit = (formData: any) => {
    // Find the category object based on the categoryId
    const category = categories.find((c) => c.id === formData.categoryId);
    
    if (!category) {
      toast.error("Invalid category selected");
      return;
    }

    if (selectedProduct) {
      // Update existing product
      const updatedProducts = products.map((p) => {
        if (p.id === selectedProduct.id) {
          const updatedProduct = {
            ...p,
            name: formData.name,
            description: formData.description,
            price: formData.price,
            stock: formData.stock,
            category,
            images: formData.images,
          };
          return updatedProduct;
        }
        return p;
      });
      
      setProducts(updatedProducts);
      toast.success(`${formData.name} has been updated`);
    } else {
      // Create new product
      const newProduct: Product = {
        id: Math.random().toString(36).substring(2, 9),
        slug: formData.name.toLowerCase().replace(/\s+/g, "-"),
        name: formData.name,
        description: formData.description,
        price: formData.price,
        stock: formData.stock,
        category,
        images: formData.images,
        rating: 0,
        reviews: [],
        seller: user,
      };
      
      setProducts([...products, newProduct]);
      toast.success(`${formData.name} has been added`);
    }
    
    setShowProductForm(false);
  };

  const handleCancelProductForm = () => {
    setShowProductForm(false);
    setSelectedProduct(null);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold">Admin Dashboard</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="w-full grid grid-cols-3 max-w-md">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            {showProductForm ? (
              <ProductForm
                product={selectedProduct || undefined}
                onSubmit={handleProductSubmit}
                onCancel={handleCancelProductForm}
              />
            ) : (
              <>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="max-w-sm"
                  />
                  <Button onClick={handleAddProduct}>
                    <Plus className="mr-2 h-4 w-4" /> Add New Product
                  </Button>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                          <TableRow key={product.id}>
                            <TableCell>
                              {product.images[0] && !imageErrors[`${product.id}-${product.images[0]}`] ? (
                                <img
                                  src={product.images[0]}
                                  alt={product.name}
                                  className="h-10 w-10 rounded object-cover"
                                  onError={() => handleImageError(product.id, product.images[0])}
                                />
                              ) : (
                                <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100">
                                  <ImageOff className="h-5 w-5 text-gray-400" />
                                </div>
                              )}
                            </TableCell>
                            <TableCell className="font-medium">{product.name}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{product.category.name}</Badge>
                            </TableCell>
                            <TableCell>${product.price.toFixed(2)}</TableCell>
                            <TableCell>
                              {product.stock > 0 ? product.stock : (
                                <span className="text-red-500">Out of stock</span>
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleEditProduct(product)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="text-red-500"
                                      onClick={() => handleDeleteProduct(product)}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Delete Product</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to delete "{product.name}"? This action cannot be undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction className="bg-red-500 hover:bg-red-600" onClick={confirmDeleteProduct}>
                                        Delete
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="h-24 text-center">
                            No products found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <div className="rounded-md border bg-card p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
              <div className="rounded-md border bg-card/60 p-10 text-center">
                <p className="text-muted-foreground">No orders to display.</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="rounded-md border bg-card p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">User Management</h2>
              <div className="rounded-md border bg-card/60 p-10 text-center">
                <p className="text-muted-foreground">User management coming soon.</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;
