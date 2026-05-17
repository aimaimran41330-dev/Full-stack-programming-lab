"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getProduct } from "@/lib/api";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";
import { FaStar, FaMinus, FaPlus, FaArrowLeft } from "react-icons/fa";

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await getProduct(id);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${product.name} (x${quantity}) added to cart!`);
  };

  if (loading)
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-pulse">
          <div className="h-96 bg-gray-100 rounded" />
          <div className="space-y-4">
            <div className="h-8 bg-gray-100 rounded w-3/4" />
            <div className="h-4 bg-gray-100 rounded" />
            <div className="h-4 bg-gray-100 rounded w-1/2" />
          </div>
        </div>
      </div>
    );

  if (!product)
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">Product not found.</p>
        <Link href="/products" className="text-primary hover:underline">← Back to Products</Link>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-primary">Products</Link>
        <span>/</span>
        <Link href={`/products?category=${product.category}`} className="hover:text-primary">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-gray-800">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="border border-gray-100 p-4 bg-white">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover"
          />
        </div>

        {/* Details */}
        <div>
          <p className="text-primary text-sm uppercase tracking-widest mb-1">
            {product.category}
          </p>
          <h1 className="text-3xl font-bold text-gray-800 mb-3">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-200"}
                />
              ))}
            </div>
            <span className="text-gray-500 text-sm">({product.numReviews} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-primary">£{product.price?.toFixed(2)}</span>
            {product.oldPrice && (
              <span className="text-xl text-gray-400 line-through">
                £{product.oldPrice?.toFixed(2)}
              </span>
            )}
            {product.oldPrice && (
              <span className="bg-primary text-white text-xs px-2 py-1 font-bold">SALE</span>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

          {/* Stock */}
          <p className="text-sm mb-4">
            <span className="font-semibold">Availability: </span>
            {product.stock > 0 ? (
              <span className="text-green-600">In Stock ({product.stock} available)</span>
            ) : (
              <span className="text-red-500">Out of Stock</span>
            )}
          </p>

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-6">
            <span className="font-semibold text-sm">Quantity:</span>
            <div className="flex items-center border border-gray-300">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-2 hover:bg-gray-100"
              >
                <FaMinus className="text-xs" />
              </button>
              <span className="px-4 py-2 font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-2 hover:bg-gray-100"
              >
                <FaPlus className="text-xs" />
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="flex gap-3">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 bg-primary text-white py-3 font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ADD TO CART
            </button>
            <Link
              href="/products"
              className="border border-gray-300 px-4 py-3 hover:border-primary hover:text-primary flex items-center gap-2 text-sm"
            >
              <FaArrowLeft /> Back
            </Link>
          </div>

          {/* Tags */}
          <div className="mt-6 pt-6 border-t border-gray-100 flex gap-2 flex-wrap">
            {product.isFeatured && (
              <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1">Featured</span>
            )}
            {product.isSpecial && (
              <span className="bg-orange-100 text-orange-700 text-xs px-3 py-1">Special</span>
            )}
            {product.isPopular && (
              <span className="bg-green-100 text-green-700 text-xs px-3 py-1">Popular</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
