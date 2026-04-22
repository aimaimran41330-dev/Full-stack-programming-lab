import ProductList from "@/components/ProductList";

export default function ProductsPage() {
  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-2">Our Products</h1>
      <p className="text-gray-500 mb-8">Click on any product to see full details</p>
      <ProductList />
    </div>
  );
}