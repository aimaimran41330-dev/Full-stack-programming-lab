"use client";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="border border-gray-200 bg-white hover:shadow-lg transition-shadow duration-300 group">
      {/* Image */}
      <div className="relative overflow-hidden h-48 bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.oldPrice && (
          <span className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 font-bold">
            SALE
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
          {product.category}
        </p>
        <h3 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-xs text-gray-500 line-clamp-2 mb-2">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={`text-xs ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-200"}`}
            />
          ))}
          <span className="text-xs text-gray-400">({product.numReviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-primary font-bold">£{product.price?.toFixed(2)}</span>
          {product.oldPrice && (
            <span className="text-gray-400 line-through text-sm">
              £{product.oldPrice?.toFixed(2)}
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <Link
            href={`/products/${product._id}`}
            className="flex-1 border border-gray-300 text-center py-1.5 text-xs hover:border-primary hover:text-primary transition-colors"
          >
            Detail
          </Link>
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-primary text-white py-1.5 text-xs hover:bg-primary-dark transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
