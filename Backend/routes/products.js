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
    // Finds products where the category array includes the specified category
    const products = await Product.find({ category });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/products/keywords - Fetch products by multiple keywords provided as an array in the query string
router.get("/keywords", async (req, res) => {
  try {
    let { keywords } = req.query;
    if (!keywords) {
      return res
        .status(400)
        .json({ error: "Keywords query parameter is required" });
    }
    // Ensure keywords is an array
    if (!Array.isArray(keywords)) {
      keywords = [keywords];
    }
    // Finds products where the keywords array contains any of the provided keywords
    const products = await Product.find({ keywords: { $in: keywords } });
    res.status(200).json(products);
  } catch (error) {
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

// GET /api/products/search?q= – Search products by title or description
router.get("/search", async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ error: "Search query is required." });
    }
    const products = await Product.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      ],
    });
    res.status(200).json(products);
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
