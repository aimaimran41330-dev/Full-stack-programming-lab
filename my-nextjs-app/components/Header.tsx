import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-blue-700 text-white px-6 py-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">🎓 My Next.js App</h1>
        <nav className="flex gap-6">
          <Link href="/" className="hover:text-yellow-300 font-medium transition">
            Home
          </Link>
          <Link href="/about" className="hover:text-yellow-300 font-medium transition">
            About
          </Link>
          <Link href="/contact" className="hover:text-yellow-300 font-medium transition">
            Contact
          </Link>
          <Link href="/products" className="hover:text-yellow-300 font-medium transition">
            Products
          </Link>
        </nav>
      </div>
    </header>
  );
}