"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getProducts, getCategories } from "@/lib/api";

export default function HomePage() {
  const [featured, setFeatured] = useState([]);
  const [special, setSpecial] = useState([]);
  const [popular, setPopular] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [featRes, specRes, popRes, catRes] = await Promise.all([
          getProducts({ isFeatured: true }),
          getProducts({ isSpecial: true }),
          getProducts({ isPopular: true }),
          getCategories(),
        ]);
        setFeatured(featRes.data.slice(0, 4));
        setSpecial(specRes.data.slice(0, 4));
        setPopular(popRes.data.slice(0, 4));
        setCategories(catRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative bg-gray-900 text-white overflow-hidden h-96">
        <img
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1400"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex items-center">
          <div>
            <p className="text-primary uppercase tracking-widest text-sm mb-2">
              Handcrafted & Reclaimed
            </p>
            <h1 className="text-5xl font-bold font-serif mb-4">
              Rustik Plank<br />
              <span className="text-primary">Furniture</span>
            </h1>
            <p className="text-gray-300 mb-6 max-w-md">
              Unique, sustainable furniture crafted from reclaimed wood. Each piece tells its own story.
            </p>
            <div className="flex gap-4">
              <Link href="/products" className="bg-primary text-white px-8 py-3 hover:bg-primary-dark transition-colors font-semibold">
                Shop Now
              </Link>
              <Link href="/about" className="border border-white text-white px-8 py-3 hover:bg-white hover:text-gray-900 transition-colors">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Buy Online Banner */}
      <section className="bg-yellow-50 border-y border-yellow-200 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">BUY ONLINE</h2>
            <p className="text-primary font-semibold">PICK UP IN STORE</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">NOW AVAILABLE IN OUR STORE SYSTEM</p>
            <Link href="/products" className="text-primary font-bold hover:underline text-sm">
              LEARN MORE →
            </Link>
          </div>
        </div>
      </section>

      {/* Hot Deals */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Deal 1 */}
          <div className="relative overflow-hidden h-64 bg-gray-100">
            <img
              src="https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600"
              alt="Sale"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-6">
              <h3 className="text-white text-2xl font-bold">Reclaimed and hand crafted</h3>
              <p className="text-primary text-3xl font-bold">Sale OFF 50%</p>
            </div>
          </div>
          {/* Deal 2 */}
          <div className="relative overflow-hidden h-64 bg-gray-100">
            <img
              src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600"
              alt="Elite Collection"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-6">
              <h3 className="text-white text-2xl font-bold">Elite Collection</h3>
              <p className="text-gray-200 text-sm">Best in Furniture</p>
              <div className="absolute top-4 right-4 bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center text-center">
                <span className="text-sm font-bold">35%<br />Off</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section: Featured / Special / Popular */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Featured */}
          <div>
            <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-2">
              <h2 className="text-lg font-bold text-gray-700 uppercase">Featured</h2>
              <Link href="/products?isFeatured=true" className="text-xs text-primary hover:underline">See All Feature</Link>
            </div>
            {loading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-24 bg-gray-100 animate-pulse rounded" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {featured.map((p) => <ProductCard key={p._id} product={p} />)}
              </div>
            )}
          </div>

          {/* Special */}
          <div>
            <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-2">
              <h2 className="text-lg font-bold text-gray-700 uppercase">Special</h2>
              <Link href="/products?isSpecial=true" className="text-xs text-primary hover:underline">See All Special</Link>
            </div>
            {loading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-24 bg-gray-100 animate-pulse rounded" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {special.map((p) => <ProductCard key={p._id} product={p} />)}
              </div>
            )}
          </div>

          {/* Popular */}
          <div>
            <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-2">
              <h2 className="text-lg font-bold text-gray-700 uppercase">Popular</h2>
              <Link href="/products?isPopular=true" className="text-xs text-primary hover:underline">See All Popular</Link>
            </div>
            {loading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-24 bg-gray-100 animate-pulse rounded" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {popular.map((p) => <ProductCard key={p._id} product={p} />)}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Category Collection */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="section-title">Shop by Collection</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { name: "Chairs Collection", img: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400" },
            { name: "Beds Collection", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400" },
            { name: "Tables Collection", img: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=400" },
          ].map((col) => (
            <Link
              key={col.name}
              href={`/products?category=${col.name.split(" ")[0]}`}
              className="relative overflow-hidden h-48 group"
            >
              <img
                src={col.img}
                alt={col.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end p-4">
                <h3 className="text-white font-bold text-lg uppercase">{col.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Product - Bottom */}
      <section className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-primary uppercase tracking-widest text-sm mb-2">Our Price</p>
            <h2 className="text-5xl font-bold text-primary mb-2">£129.99</h2>
            <p className="text-gray-300 mb-6">
              Our signature handcrafted rocking chair made from 100% reclaimed wood.
              Each piece is unique and built to last generations. Perfect for any living space.
            </p>
            <button className="bg-primary text-white px-8 py-3 hover:bg-primary-dark transition-colors font-semibold">
              ADD TO CART
            </button>
          </div>
          <div className="flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=500"
              alt="Featured Chair"
              className="max-h-64 object-contain"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
