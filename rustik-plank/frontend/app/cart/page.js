"use client";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { FaTrash, FaMinus, FaPlus, FaArrowLeft, FaShoppingCart } from "react-icons/fa";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <FaShoppingCart className="text-6xl text-gray-200 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-gray-700 mb-3">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Looks like you haven't added any items yet.</p>
        <Link href="/products" className="bg-primary text-white px-8 py-3 hover:bg-primary-dark transition-colors font-semibold">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Shopping Cart ({totalItems} items)</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {/* Header */}
          <div className="hidden md:grid grid-cols-5 gap-4 text-sm font-semibold text-gray-600 border-b pb-3">
            <span className="col-span-2">Product</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Total</span>
          </div>

          {cart.map((item) => (
            <div key={item._id} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center border-b pb-4">
              {/* Product */}
              <div className="md:col-span-2 flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover border"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-xs text-gray-400">{item.category}</p>
                </div>
              </div>

              {/* Price */}
              <div className="text-primary font-semibold">£{item.price?.toFixed(2)}</div>

              {/* Quantity */}
              <div className="flex items-center border border-gray-300 w-fit">
                <button
                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  className="px-2 py-1 hover:bg-gray-100"
                >
                  <FaMinus className="text-xs" />
                </button>
                <span className="px-3 py-1">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  className="px-2 py-1 hover:bg-gray-100"
                >
                  <FaPlus className="text-xs" />
                </button>
              </div>

              {/* Total + Remove */}
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-800">
                  £{(item.price * item.quantity).toFixed(2)}
                </span>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-400 hover:text-red-600 ml-4"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}

          <Link href="/products" className="inline-flex items-center gap-2 text-primary hover:underline text-sm mt-4">
            <FaArrowLeft /> Continue Shopping
          </Link>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 pb-3 border-b">Order Summary</h2>

            <div className="space-y-3 text-sm mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal ({totalItems} items)</span>
                <span className="font-semibold">£{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-green-600 font-semibold">FREE</span>
              </div>
              <div className="border-t pt-3 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">£{totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="block w-full bg-primary text-white text-center py-3 font-semibold hover:bg-primary-dark transition-colors"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
