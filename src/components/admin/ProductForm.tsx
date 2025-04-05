
import React, { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { X, ImageOff } from "lucide-react";

import { Product, Category } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/data/mockData";

// Product schema validation
const productSchema = z.object({
  name: z.string().min(2, "Product name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.coerce.number().positive("Price must be a positive number"),
  categoryId: z.string().min(1, "Please select a category"),
  stock: z.coerce.number().int().nonnegative("Stock must be a non-negative integer"),
  images: z.array(z.string()).min(1, "At least one image is required"),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
  product?: Product;
  onSubmit: (data: ProductFormValues) => void;
  onCancel: () => void;
}

export function ProductForm({ product, onSubmit, onCancel }: ProductFormProps) {
  const [imageUrls, setImageUrls] = useState<string[]>(
    product?.images || [""]
  );
  
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  
  const defaultValues: Partial<ProductFormValues> = {
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || 0,
    categoryId: product?.category.id || "",
    stock: product?.stock || 0,
    images: product?.images || [""],
  };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues,
  });

  // Update form values when product changes
  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name,
        description: product.description,
        price: product.price,
        categoryId: product.category.id,
        stock: product.stock,
        images: product.images,
      });
      setImageUrls(product.images);
      setImageErrors({});
    }
  }, [product, form]);

  const handleAddImageField = () => {
    setImageUrls([...imageUrls, ""]);
  };

  const handleRemoveImageField = (index: number) => {
    const newImageUrls = [...imageUrls];
    newImageUrls.splice(index, 1);
    setImageUrls(newImageUrls);
    
    // Also update the image errors state
    const newImageErrors = { ...imageErrors };
    delete newImageErrors[imageUrls[index]];
    setImageErrors(newImageErrors);
    
    form.setValue("images", newImageUrls);
  };

  const handleImageChange = (index: number, value: string) => {
    const newImageUrls = [...imageUrls];
    
    // If the URL is changing, reset any error state for the old URL
    if (imageErrors[newImageUrls[index]]) {
      const newImageErrors = { ...imageErrors };
      delete newImageErrors[newImageUrls[index]];
      setImageErrors(newImageErrors);
    }
    
    newImageUrls[index] = value;
    setImageUrls(newImageUrls);
    form.setValue("images", newImageUrls.filter(url => url.trim() !== ""));
  };

  const handleImageError = (url: string) => {
    setImageErrors(prev => ({ ...prev, [url]: true }));
  };

  const validateForm = (data: ProductFormValues) => {
    // Check if any of the images have loading errors
    const validImages = data.images.filter(url => !imageErrors[url]);
    
    if (validImages.length === 0 && data.images.length > 0) {
      toast.error("All images are invalid. Please provide at least one valid image URL.");
      return false;
    }
    
    // Filter out images with errors before submitting
    const filteredData = {
      ...data,
      images: data.images.filter(url => !imageErrors[url])
    };
    
    onSubmit(filteredData);
    return true;
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6">
        {product ? "Edit Product" : "Add New Product"}
      </h2>

      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(validateForm)}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter product description" 
                    className="min-h-[100px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price ($)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" min="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" step="1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <FormLabel>Product Images</FormLabel>
            {imageUrls.map((url, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center gap-2">
                  <Input
                    value={url}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    placeholder="Enter image URL"
                    className="flex-1"
                  />
                  {imageUrls.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => handleRemoveImageField(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                {url && (
                  <div className="relative h-20 w-20 overflow-hidden rounded border bg-gray-50">
                    {!imageErrors[url] ? (
                      <img 
                        src={url} 
                        alt="Product preview" 
                        className="h-full w-full object-cover"
                        onError={() => handleImageError(url)}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gray-100">
                        <ImageOff className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={handleAddImageField}
              className="w-full mt-2"
            >
              Add Another Image
            </Button>
            {form.formState.errors.images && (
              <p className="text-sm font-medium text-destructive">
                {form.formState.errors.images.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              {product ? "Update Product" : "Add Product"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
