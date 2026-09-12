const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "ShopEase API is running",
    status: "success"
  });
});

app.get("/api/products", (req, res) => {
  res.json([
    {
      _id: "1",
      name: "Wireless Headphones",
      price: 1499,
      category: "Electronics",
      stock: 20,
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
    },
    {
      _id: "2",
      name: "Smart Watch",
      price: 2499,
      category: "Electronics",
      stock: 15,
      rating: 4.3,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
    },
    {
      _id: "3",
      name: "Running Shoes",
      price: 1999,
      category: "Fashion",
      stock: 25,
      rating: 4.4,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
    },
    {
      _id: "4",
      name: "Backpack",
      price: 999,
      category: "Fashion",
      stock: 30,
      rating: 4.2,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62"
    },
    {
      _id: "5",
      name: "Coffee Maker",
      price: 2999,
      category: "Home",
      stock: 10,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085"
    },
    {
      _id: "6",
      name: "Laptop",
      price: 54999,
      category: "Electronics",
      stock: 8,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853"
    }
  ]);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`ShopEase server running on port ${PORT}`);
});