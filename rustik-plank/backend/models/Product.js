const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: 0,
    },
    oldPrice: {
      type: Number,
      default: null,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["Beds", "Chairs", "Tables", "Bookcases", "Cabinets", "Boxes"],
    },
    image: {
      type: String,
      default: "/images/placeholder.jpg",
    },
    stock: {
      type: Number,
      default: 10,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isSpecial: {
      type: Boolean,
      default: false,
    },
    isPopular: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
