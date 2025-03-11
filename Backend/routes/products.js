const express = require("express");
const Product = require("../models/product");

const router = express.Router();

// POST /api/products - Create a new product
router.post("/", async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET /api/products - Retrieve all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/products/random - Retrieve 15 random products
router.get("/random", async (req, res) => {
  try {
    const products = await Product.aggregate([{ $sample: { size: 15 } }]);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/products/category/:category - Fetch products by category
router.get("/category/:category", async (req, res) => {
  try {
    const { category } = req.params;

    const products = await Product.find({
      category: { $regex: category, $options: "i" }, // Case-insensitive match
    });

    // Handle case where no products match
    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found in this category" });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/products/keywords - Fetch products by multiple keywords
router.get("/keywords", async (req, res) => {
  try {
    let { keywords } = req.query;

    if (!keywords) {
      return res
        .status(400)
        .json({ error: "Keywords query parameter is required" });
    }

    // Convert single string into an array (comma-separated values)
    const keywordsArray = keywords.split(",").map((keyword) => keyword.trim());

    // Use $or and $regex to find products with similar keywords
    const products = await Product.find({
      keywords: {
        $in: keywordsArray.map((keyword) => new RegExp(keyword, "i")), // Case-insensitive match
      },
    });

    // Handle case where no products match
    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found matching the given keywords" });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/products/:id – Retrieve a single product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/products/:id - Edit a product
router.put("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const updates = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(productId, updates, {
      new: true,
      runValidators: true,
    });
    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found." });
    }
    res.status(200).json({
      message: "Product updated successfully.",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/products/:id – Delete a product by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found." });
    }
    res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
