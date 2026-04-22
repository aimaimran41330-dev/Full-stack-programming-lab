import Link from "next/link";
import { products } from "@/app/data/products";

export default function ProductList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
        >
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
            {product.category}
          </span>
          <h2 className="text-xl font-bold text-gray-800 mt-3 mb-2">
            {product.title}
          </h2>
          <p className="text-gray-500 text-sm mb-4">{product.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-green-600 font-bold text-lg">
              Rs. {product.price.toLocaleString()}
            </span>
            <Link
              href={`/products/${product.id}`}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
            >
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}