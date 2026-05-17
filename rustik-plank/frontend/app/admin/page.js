"use client";
import { useState, useEffect } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  seedProducts,
  getOrders,
  updateOrderStatus,
} from "@/lib/api";
import toast from "react-hot-toast";
import { FaEdit, FaTrash, FaPlus, FaSeedling } from "react-icons/fa";

const CATEGORIES = ["Beds", "Chairs", "Tables", "Bookcases", "Cabinets", "Boxes"];
const EMPTY_FORM = {
  name: "", description: "", price: "", oldPrice: "",
  category: "Beds", image: "", stock: 10,
  isFeatured: false, isSpecial: false, isPopular: false,
};

export default function AdminPage() {
  const [tab, setTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const fetchProducts = async () => {
    const res = await getProducts();
    setProducts(res.data);
  };
  const fetchOrders = async () => {
    const res = await getOrders();
    setOrders(res.data);
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchProducts(), fetchOrders()]).finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateProduct(editingId, form);
        toast.success("Product updated!");
      } else {
        await createProduct(form);
        toast.success("Product created!");
      }
      setShowForm(false);
      setEditingId(null);
      setForm(EMPTY_FORM);
      fetchProducts();
    } catch (err) {
      toast.error("Error saving product");
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      oldPrice: product.oldPrice || "",
      category: product.category,
      image: product.image,
      stock: product.stock,
      isFeatured: product.isFeatured,
      isSpecial: product.isSpecial,
      isPopular: product.isPopular,
    });
    setEditingId(product._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    await deleteProduct(id);
    toast.success("Product deleted");
    fetchProducts();
  };

  const handleSeed = async () => {
    try {
      await seedProducts();
      toast.success("Sample products seeded!");
      fetchProducts();
    } catch {
      toast.error("Failed to seed");
    }
  };

  const handleOrderStatus = async (id, status) => {
    await updateOrderStatus(id, status);
    toast.success("Order updated!");
    fetchOrders();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b">
        <button
          onClick={() => setTab("products")}
          className={`pb-2 px-4 font-semibold text-sm transition-colors ${
            tab === "products" ? "border-b-2 border-primary text-primary" : "text-gray-500"
          }`}
        >
          Products ({products.length})
        </button>
        <button
          onClick={() => setTab("orders")}
          className={`pb-2 px-4 font-semibold text-sm transition-colors ${
            tab === "orders" ? "border-b-2 border-primary text-primary" : "text-gray-500"
          }`}
        >
          Orders ({orders.length})
        </button>
      </div>

      {/* Products Tab */}
      {tab === "products" && (
        <div>
          <div className="flex gap-3 mb-4">
            <button
              onClick={() => { setShowForm(true); setEditingId(null); setForm(EMPTY_FORM); }}
              className="bg-primary text-white px-4 py-2 text-sm flex items-center gap-2 hover:bg-primary-dark"
            >
              <FaPlus /> Add Product
            </button>
            <button
              onClick={handleSeed}
              className="border border-primary text-primary px-4 py-2 text-sm flex items-center gap-2 hover:bg-primary hover:text-white"
            >
              <FaSeedling /> Seed Sample Data
            </button>
          </div>

          {/* Product Form */}
          {showForm && (
            <div className="bg-gray-50 border border-gray-200 p-6 mb-6 rounded">
              <h3 className="font-bold text-lg mb-4">
                {editingId ? "Edit Product" : "Add New Product"}
              </h3>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-600 block mb-1">Name *</label>
                  <input name="name" required value={form.name} onChange={handleChange}
                    className="w-full border px-3 py-2 text-sm outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600 block mb-1">Category *</label>
                  <select name="category" value={form.category} onChange={handleChange}
                    className="w-full border px-3 py-2 text-sm outline-none focus:border-primary">
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600 block mb-1">Price (£) *</label>
                  <input type="number" name="price" required value={form.price} onChange={handleChange}
                    className="w-full border px-3 py-2 text-sm outline-none focus:border-primary" min="0" step="0.01" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600 block mb-1">Old Price (£)</label>
                  <input type="number" name="oldPrice" value={form.oldPrice} onChange={handleChange}
                    className="w-full border px-3 py-2 text-sm outline-none focus:border-primary" min="0" step="0.01" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600 block mb-1">Stock</label>
                  <input type="number" name="stock" value={form.stock} onChange={handleChange}
                    className="w-full border px-3 py-2 text-sm outline-none focus:border-primary" min="0" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600 block mb-1">Image URL</label>
                  <input name="image" value={form.image} onChange={handleChange}
                    className="w-full border px-3 py-2 text-sm outline-none focus:border-primary"
                    placeholder="https://..." />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-semibold text-gray-600 block mb-1">Description *</label>
                  <textarea name="description" required value={form.description} onChange={handleChange}
                    rows={3} className="w-full border px-3 py-2 text-sm outline-none focus:border-primary" />
                </div>
                <div className="md:col-span-2 flex gap-6">
                  {[["isFeatured", "Featured"], ["isSpecial", "Special"], ["isPopular", "Popular"]].map(([key, label]) => (
                    <label key={key} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input type="checkbox" name={key} checked={form[key]} onChange={handleChange}
                        className="accent-primary" />
                      {label}
                    </label>
                  ))}
                </div>
                <div className="md:col-span-2 flex gap-3">
                  <button type="submit"
                    className="bg-primary text-white px-6 py-2 text-sm hover:bg-primary-dark">
                    {editingId ? "Update" : "Create"}
                  </button>
                  <button type="button" onClick={() => { setShowForm(false); setEditingId(null); }}
                    className="border border-gray-300 px-6 py-2 text-sm hover:bg-gray-100">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Products Table */}
          {loading ? (
            <div className="animate-pulse space-y-2">
              {[...Array(5)].map((_, i) => <div key={i} className="h-12 bg-gray-100 rounded" />)}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-left">Product</th>
                    <th className="p-3 text-left">Category</th>
                    <th className="p-3 text-left">Price</th>
                    <th className="p-3 text-left">Stock</th>
                    <th className="p-3 text-left">Tags</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p, i) => (
                    <tr key={p._id} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <img src={p.image} alt={p.name} className="w-10 h-10 object-cover" />
                          <span className="font-medium">{p.name}</span>
                        </div>
                      </td>
                      <td className="p-3 text-gray-600">{p.category}</td>
                      <td className="p-3 text-primary font-bold">£{p.price?.toFixed(2)}</td>
                      <td className="p-3">
                        <span className={p.stock > 0 ? "text-green-600" : "text-red-500"}>
                          {p.stock}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex gap-1">
                          {p.isFeatured && <span className="bg-blue-100 text-blue-600 text-xs px-1">F</span>}
                          {p.isSpecial && <span className="bg-orange-100 text-orange-600 text-xs px-1">S</span>}
                          {p.isPopular && <span className="bg-green-100 text-green-600 text-xs px-1">P</span>}
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <button onClick={() => handleEdit(p)} className="text-blue-500 hover:text-blue-700">
                            <FaEdit />
                          </button>
                          <button onClick={() => handleDelete(p._id)} className="text-red-400 hover:text-red-600">
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {products.length === 0 && (
                <p className="text-center py-8 text-gray-400">No products yet. Click "Seed Sample Data" to add some!</p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Orders Tab */}
      {tab === "orders" && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Customer</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Items</th>
                <th className="p-3 text-left">Total</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, i) => (
                <tr key={order._id} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="p-3 font-medium">{order.customerName}</td>
                  <td className="p-3 text-gray-600">{order.email}</td>
                  <td className="p-3">{order.items?.length} item(s)</td>
                  <td className="p-3 text-primary font-bold">£{order.totalPrice?.toFixed(2)}</td>
                  <td className="p-3">
                    <select
                      value={order.status}
                      onChange={(e) => handleOrderStatus(order._id, e.target.value)}
                      className={`border rounded px-2 py-1 text-xs ${
                        order.status === "delivered" ? "text-green-600 border-green-300" :
                        order.status === "cancelled" ? "text-red-500 border-red-300" :
                        "text-orange-500 border-orange-300"
                      }`}
                    >
                      {["pending","processing","shipped","delivered","cancelled"].map((s) => (
                        <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                      ))}
                    </select>
                  </td>
                  <td className="p-3 text-gray-500 text-xs">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {orders.length === 0 && (
            <p className="text-center py-8 text-gray-400">No orders yet.</p>
          )}
        </div>
      )}
    </div>
  );
}
