
import { Category } from "@/types";
import { Link } from "react-router-dom";

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link
      to={`/category/${category.slug}`}
      className="group relative overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
        <div className="absolute bottom-0 p-4 text-white">
          <h3 className="text-xl font-semibold group-hover:underline">{category.name}</h3>
        </div>
      </div>
      <img
        src={category.image || "/placeholder.svg"}
        alt={category.name}
        className="aspect-[4/3] h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
    </Link>
  );
};

export default CategoryCard;
