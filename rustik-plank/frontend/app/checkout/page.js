"use client";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { createOrder } from "@/lib/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    customerName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    paymentMethod: "cash_on_delivery",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        customerName: form.customerName,
        email: form.email,
        phone: form.phone,
        address: { street: form.street, city: form.city, country: "Pakistan" },
        items: cart.map((item) => ({
          product: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        totalPrice,
        paymentMethod: form.paymentMethod,
      };

      await createOrder(orderData);
      clearCart();
      toast.success("Order placed successfully! 🎉");
      router.push("/");
    } catch (err) {
      toast.error("Failed to place order. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 text-lg">Your cart is empty!</p>
        <Link href="/products" className="text-primary hover:underline">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Checkout Form */}
        <div>
          <h2 className="text-xl font-bold text-gray-700 mb-4 pb-2 border-b border-primary">
            Shipping Information
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="customerName"
                  required
                  value={form.customerName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-2 outline-none focus:border-primary text-sm"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-2 outline-none focus:border-primary text-sm"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 outline-none focus:border-primary text-sm"
                placeholder="03xx-xxxxxxx"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                Street Address *
              </label>
              <input
                type="text"
                name="street"
                required
                value={form.street}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 outline-none focus:border-primary text-sm"
                placeholder="House # 123, Street 4"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">City *</label>
              <input
                type="text"
                name="city"
                required
                value={form.city}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 outline-none focus:border-primary text-sm"
                placeholder="Islamabad"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Payment Method *
              </label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer text-sm">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash_on_delivery"
                    checked={form.paymentMethod === "cash_on_delivery"}
                    onChange={handleChange}
                    className="accent-primary"
                  />
                  Cash on Delivery
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-sm">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={form.paymentMethod === "card"}
                    onChange={handleChange}
                    className="accent-primary"
                  />
                  Credit/Debit Card
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-3 font-semibold hover:bg-primary-dark transition-colors disabled:opacity-60"
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <h2 className="text-xl font-bold text-gray-700 mb-4 pb-2 border-b border-primary">
            Order Summary
          </h2>
          <div className="bg-gray-50 border border-gray-200 p-4 space-y-3">
            {cart.map((item) => (
              <div key={item._id} className="flex items-center gap-3 border-b pb-3">
                <img src={item.image} alt={item.name} className="w-12 h-12 object-cover" />
                <div className="flex-1">
                  <p className="text-sm font-semibold">{item.name}</p>
                  <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                </div>
                <span className="text-primary font-bold text-sm">
                  £{(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
            <div className="flex justify-between font-bold text-lg pt-2">
              <span>Total:</span>
              <span className="text-primary">£{totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
