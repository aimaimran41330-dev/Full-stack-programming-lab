"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/api";

const CATEGORIES = ["All", "Beds", "Chairs", "Tables", "Bookcases", "Cabinets", "Boxes"];

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const isFeatured = searchParams.get("isFeatured");
    const isSpecial = searchParams.get("isSpecial");
    const isPopular = searchParams.get("isPopular");

    if (category) setActiveCategory(category);

    async function fetchProducts() {
      setLoading(true);
      try {
        const params = {};
        if (category && category !== "All") params.category = category;
        if (search) params.search = search;
        if (isFeatured) params.isFeatured = isFeatured;
        if (isSpecial) params.isSpecial = isSpecial;
        if (isPopular) params.isPopular = isPopular;

        const res = await getProducts(params);
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [searchParams]);

  const filterByCategory = async (cat) => {
    setActiveCategory(cat);
    setLoading(true);
    try {
      const params = cat !== "All" ? { category: cat } : {};
      const res = await getProducts(params);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Our Products</h1>
      <p className="text-gray-500 mb-6">Handcrafted furniture from reclaimed wood</p>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => filterByCategory(cat)}
            className={`px-4 py-2 text-sm border transition-colors ${
              activeCategory === cat
                ? "bg-primary text-white border-primary"
                : "border-gray-300 hover:border-primary hover:text-primary"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-64 bg-gray-100 animate-pulse rounded" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No products found.</p>
          <p className="text-gray-400 text-sm mt-2">
            Try a different category or{" "}
            <button onClick={() => filterByCategory("All")} className="text-primary hover:underline">
              view all products
            </button>
          </p>
        </div>
      ) : (
        <>
          <p className="text-gray-500 text-sm mb-4">{products.length} products found</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
