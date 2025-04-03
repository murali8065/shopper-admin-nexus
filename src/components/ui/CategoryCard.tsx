
import { Category } from "@/types";
import { Link } from "react-router-dom";
import { ImageOff } from "lucide-react";
import { useState } from "react";

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Link
      to={`/category/${category.slug}`}
      className="group relative overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10">
        <div className="absolute bottom-0 p-4 text-white">
          <h3 className="text-xl font-semibold group-hover:underline">{category.name}</h3>
        </div>
      </div>
      {!imageError ? (
        <img
          src={category.image || "/placeholder.svg"}
          alt={category.name}
          className="aspect-[4/3] h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={handleImageError}
        />
      ) : (
        <div className="flex items-center justify-center aspect-[4/3] h-full w-full bg-gray-100">
          <ImageOff className="h-12 w-12 text-gray-400" />
        </div>
      )}
    </Link>
  );
};

export default CategoryCard;
