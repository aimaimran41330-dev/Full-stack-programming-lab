import { products } from "@/app/data/products";
import Link from "next/link";

export default function ProductDetail({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === parseInt(params.id));

  if (!product) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold text-red-500">Product Not Found!</h1>
        <Link href="/products" className="text-blue-600 mt-4 inline-block hover:underline">
          ← Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-10">
      <Link href="/products" className="text-blue-600 hover:underline mb-6 inline-block">
        ← Back to Products
      </Link>
      
      <div className="bg-white rounded-xl shadow-lg p-8">
        <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
          {product.category}
        </span>
        <h1 className="text-3xl font-bold text-gray-800 mt-4 mb-3">
          {product.title}
        </h1>
        <p className="text-gray-600 text-lg mb-6">{product.description}</p>
        <div className="border-t pt-6">
          <span className="text-4xl font-bold text-green-600">
            Rs. {product.price.toLocaleString()}
          </span>
        </div>
        <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition">
          Add to Cart 🛒
        </button>
      </div>
    </div>
  );
}