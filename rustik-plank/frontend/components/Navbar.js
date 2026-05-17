"use client";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { FaShoppingCart, FaBars, FaTimes, FaSearch, FaUser } from "react-icons/fa";

export default function Navbar() {
  const { totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["Beds", "Bookcases", "Cabinets", "Boxes", "Chairs", "Tables"];

  return (
    <header className="w-full">
      {/* Top Info Bar */}
      <div className="bg-gray-100 text-xs text-gray-600 py-1">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <span>📞 07584 031409</span>
          <div className="flex gap-4">
            <Link href="/about" className="hover:text-primary">About Us</Link>
            <Link href="/contact" className="hover:text-primary">Contact Us</Link>
            <Link href="/blog" className="hover:text-primary">Blog</Link>
            <Link href="/" className="hover:text-primary">Home</Link>
          </div>
          <div className="flex gap-4 items-center">
            <Link href="/admin" className="hover:text-primary">
              <FaUser className="inline mr-1" /> My Account
            </Link>
            <span>0 items</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col">
            <span className="text-3xl font-bold text-gray-800 font-serif tracking-wide">
              Rustik Plank
            </span>
            <span className="text-xs text-gray-500 tracking-widest uppercase">
              Furniture
            </span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="flex w-full border border-gray-300">
              <input
                type="text"
                placeholder="Search products..."
                className="flex-1 px-4 py-2 outline-none text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchQuery.trim()) {
                    window.location.href = `/products?search=${searchQuery}`;
                  }
                }}
              />
              <Link
                href={`/products?search=${searchQuery}`}
                className="bg-primary text-white px-4 py-2 hover:bg-primary-dark"
              >
                <FaSearch />
              </Link>
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <Link href="/cart" className="relative">
              <FaShoppingCart className="text-2xl text-gray-700 hover:text-primary" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="hidden md:flex items-center gap-0">
            <Link href="/" className="px-4 py-3 hover:bg-primary text-sm transition-colors">
              Home
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/products?category=${cat}`}
                className="px-4 py-3 hover:bg-primary text-sm transition-colors capitalize"
              >
                {cat}
              </Link>
            ))}
            <Link href="/about" className="px-4 py-3 hover:bg-primary text-sm transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="px-4 py-3 hover:bg-primary text-sm transition-colors">
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden py-2">
              <Link href="/" className="block px-4 py-2 hover:bg-primary text-sm">Home</Link>
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={`/products?category=${cat}`}
                  className="block px-4 py-2 hover:bg-primary text-sm capitalize"
                >
                  {cat}
                </Link>
              ))}
              <Link href="/about" className="block px-4 py-2 hover:bg-primary text-sm">About</Link>
              <Link href="/contact" className="block px-4 py-2 hover:bg-primary text-sm">Contact</Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
