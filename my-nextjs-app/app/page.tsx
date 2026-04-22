import Link from "next/link";

export default function Home() {
  return (
    <div className="text-center py-10">
      <h1 className="text-4xl font-bold text-blue-700 mb-4">
        Welcome to My Next.js App! 🚀
      </h1>
      <p className="text-gray-600 text-lg mb-8">
        This is Lab 08 - Full Stack Programming (BSSE-VI)
      </p>
      <div className="flex gap-4 justify-center">
        <Link
          href="/about"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          About Us
        </Link>
        <Link
          href="/products"
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
        >
          View Products
        </Link>
      </div>
    </div>
  );
}