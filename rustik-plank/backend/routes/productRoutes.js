const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// GET all products (with filters)
router.get("/", async (req, res) => {
  try {
    const { category, isFeatured, isSpecial, isPopular, search } = req.query;
    let filter = {};

    if (category) filter.category = category;
    if (isFeatured) filter.isFeatured = isFeatured === "true";
    if (isSpecial) filter.isSpecial = isSpecial === "true";
    if (isPopular) filter.isPopular = isPopular === "true";
    if (search) filter.name = { $regex: search, $options: "i" };

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create product
router.post("/", async (req, res) => {
  try {
    const product = new Product(req.body);
    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update product
router.put("/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: "Product not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE product
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST seed sample data
router.post("/seed/all", async (req, res) => {
  try {
    await Product.deleteMany({});
    const sampleProducts = [
      { name: "Wooden Bed Frame", description: "Handcrafted solid wood bed frame with rustic finish", price: 134.99, category: "Beds", isFeatured: true, isPopular: true, rating: 4.5, numReviews: 12, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400" },
      { name: "Oak Dining Chair", description: "Comfortable oak dining chair with ergonomic design", price: 89.99, oldPrice: 120.00, category: "Chairs", isSpecial: true, isPopular: true, rating: 4.2, numReviews: 8, image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400" },
      { name: "Rustic Coffee Table", description: "Reclaimed wood coffee table, unique grain patterns", price: 134.99, category: "Tables", isFeatured: true, isSpecial: true, rating: 4.8, numReviews: 20, image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=400" },
      { name: "Bookcase Shelf", description: "5-tier solid wood bookcase with adjustable shelves", price: 134.99, category: "Bookcases", isPopular: true, rating: 4.0, numReviews: 5, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400" },
      { name: "Wooden Cabinet", description: "Storage cabinet with hand-carved details", price: 134.99, oldPrice: 160.00, category: "Cabinets", isSpecial: true, isFeatured: true, rating: 4.6, numReviews: 15, image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400" },
      { name: "Storage Box Set", description: "Set of 3 handcrafted wooden storage boxes", price: 134.99, category: "Boxes", isPopular: true, rating: 4.3, numReviews: 9, image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400" },
      { name: "King Size Bed", description: "Luxurious king size bed with reclaimed wood headboard", price: 299.99, oldPrice: 399.99, category: "Beds", isSpecial: true, rating: 4.9, numReviews: 25, image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400" },
      { name: "Rocking Chair", description: "Traditional rocking chair with hand-crafted design", price: 149.99, category: "Chairs", isFeatured: true, rating: 4.7, numReviews: 18, image: "https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=400" },
      { name: "Dining Table", description: "6-seater solid wood dining table with natural finish", price: 249.99, category: "Tables", isPopular: true, isFeatured: true, rating: 4.4, numReviews: 11, image: "https://images.unsplash.com/photo-1549187774-b4e9b0445b41?w=400" },
    ];
    const inserted = await Product.insertMany(sampleProducts);
    res.json({ message: `${inserted.length} products seeded!`, products: inserted });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
