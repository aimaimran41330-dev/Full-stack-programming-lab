import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaPinterest } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 mt-12">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4 border-b border-primary pb-2">
            Rustik Plank
          </h3>
          <p className="text-sm leading-relaxed">
            We craft unique, handmade furniture from reclaimed and responsibly sourced wood.
            Every piece tells a story of craftsmanship and sustainability.
          </p>
          <div className="flex gap-3 mt-4">
            <a href="#" className="hover:text-primary"><FaFacebook size={20} /></a>
            <a href="#" className="hover:text-primary"><FaTwitter size={20} /></a>
            <a href="#" className="hover:text-primary"><FaInstagram size={20} /></a>
            <a href="#" className="hover:text-primary"><FaPinterest size={20} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4 border-b border-primary pb-2">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            {["Beds", "Chairs", "Tables", "Bookcases", "Cabinets", "Boxes"].map((cat) => (
              <li key={cat}>
                <Link href={`/products?category=${cat}`} className="hover:text-primary transition-colors">
                  → {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* My Account */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4 border-b border-primary pb-2">
            My Account
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/admin" className="hover:text-primary">Admin Dashboard</Link></li>
            <li><Link href="/cart" className="hover:text-primary">Shopping Cart</Link></li>
            <li><Link href="/checkout" className="hover:text-primary">Checkout</Link></li>
            <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-primary">Contact Us</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4 border-b border-primary pb-2">
            Contact Info
          </h3>
          <ul className="space-y-2 text-sm">
            <li>📞 07584 031409</li>
            <li>✉️ info@rustikplank.com</li>
            <li>📍 Islamabad, Pakistan</li>
            <li className="mt-3">
              <span className="text-primary font-semibold">Opening Hours:</span><br />
              Mon - Sat: 9am - 6pm
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-4 text-center text-xs text-gray-500">
        <p>© 2024 Rustik Plank Furniture. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
