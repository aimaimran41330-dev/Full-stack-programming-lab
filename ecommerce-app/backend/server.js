const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connect
mongoose.connect('mongodb://localhost:27017/ecommercedb')
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ Error: " + err));

mongoose.connection.on('connected', () => {
  console.log("🔗 Mongoose connected to DB");
});

mongoose.connection.on('error', (err) => {
  console.log("❌ Mongoose connection error: " + err);
});

// Product Schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String
});

// Product Model
const Product = mongoose.model('Product', productSchema);

// Home route
app.get('/', (req, res) => {
  res.send("Ecommerce Backend Running!");
});

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.send("Error: " + err.message);
  }
});

app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});