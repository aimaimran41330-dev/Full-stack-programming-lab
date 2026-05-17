const express = require("express");
const router = express.Router();

// Static categories for Rustik Plank
const categories = [
  { id: 1, name: "Beds", slug: "beds", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300" },
  { id: 2, name: "Chairs", slug: "chairs", image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=300" },
  { id: 3, name: "Tables", slug: "tables", image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=300" },
  { id: 4, name: "Bookcases", slug: "bookcases", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300" },
  { id: 5, name: "Cabinets", slug: "cabinets", image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=300" },
  { id: 6, name: "Boxes", slug: "boxes", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300" },
];

router.get("/", (req, res) => {
  res.json(categories);
});

module.exports = router;
