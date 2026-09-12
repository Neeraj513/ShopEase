const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

const User = require("./models/User");
const Product = require("./models/Product");

dotenv.config();

const products = [
  {
    name: "Wireless Headphones",
    description: "High quality wireless headphones",
    price: 1499,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    category: "Electronics",
    stock: 25,
    rating: 4.5
  },

  {
    name: "Smart Watch",
    description: "Modern smart watch with fitness tracking",
    price: 2499,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    category: "Electronics",
    stock: 20,
    rating: 4.3
  },

  {
    name: "Running Shoes",
    description: "Comfortable running shoes",
    price: 1999,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    category: "Fashion",
    stock: 30,
    rating: 4.6
  },

  {
    name: "Backpack",
    description: "Durable everyday backpack",
    price: 999,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
    category: "Fashion",
    stock: 40,
    rating: 4.2
  },

  {
    name: "Coffee Maker",
    description: "Automatic coffee maker",
    price: 3499,
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6",
    category: "Home",
    stock: 15,
    rating: 4.4
  },

  {
    name: "Laptop",
    description: "Powerful laptop for work and study",
    price: 54999,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    category: "Electronics",
    stock: 10,
    rating: 4.7
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    await Product.deleteMany({});

    await Product.insertMany(products);

    const adminExists = await User.findOne({
      email: "admin@shopease.com"
    });

    if (!adminExists) {
      const password = await bcrypt.hash(
        "admin123",
        10
      );

      await User.create({
        name: "ShopEase Admin",
        email: "admin@shopease.com",
        password,
        role: "admin"
      });
    }

    console.log("Seed data inserted successfully");

    console.log("Admin Login:");
    console.log("Email: admin@shopease.com");
    console.log("Password: admin123");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedData();