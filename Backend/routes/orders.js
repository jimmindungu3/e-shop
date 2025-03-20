const express = require("express");
const Product = require("../models/product");
const Order = require("../models/order");
const router = express.Router();

const { initiateSTKPush, handleSTKCallback } = require("../services/mpesa");

// Cities with their shipping fees
const kenyanCities = [
  { name: "Nairobi", fee: 200 },
  { name: "Mombasa", fee: 550 },
  { name: "Kisumu", fee: 500 },
  { name: "Nakuru", fee: 250 },
  { name: "Eldoret", fee: 300 },
  { name: "Thika", fee: 220 },
  { name: "Malindi", fee: 5500 },
  { name: "Kitale", fee: 450 },
  { name: "Garissa", fee: 500 },
  { name: "Kakamega", fee: 520 },
  { name: "Nyeri", fee: 250 },
  { name: "Machakos", fee: 240 },
  { name: "Kisii", fee: 450 },
  { name: "Kericho", fee: 400 },
  { name: "Embu", fee: 380 },
];

const formatNumber = (number) => {
  let cleaned = number.replace(/\D/g, "");

  if (cleaned.startsWith("07") || cleaned.startsWith("01")) {
    return "254" + cleaned.substring(1); // Remove leading 0
  } else if (cleaned.startsWith("254")) {
    return cleaned; // Already in the correct format
  } else if (cleaned.startsWith("+254")) {
    return cleaned.replace("+", ""); // Remove '+'
  } else {
    return "Invalid Number";
  }
};
let orderDetails = {};
let newOrder;

router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, city, mpesaNumber, order } =
      req.body;

    // Validate required fields
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !city ||
      !order ||
      !Array.isArray(order) ||
      order.length === 0
    ) {
      return res
        .status(400)
        .json({ error: "Missing required checkout information" });
    }

    // Get shipping fee for selected city
    const selectedCity = kenyanCities.find((c) => c.name === city);
    if (!selectedCity) {
      return res.status(400).json({ error: "Invalid city selected" });
    }

    // Calculate order total
    let subtotal = 0;
    let orderItems = [];

    // Fetch all product details and calculate totals
    for (const item of order) {
      const { productId, quantity } = item;

      // Validate product ID and quantity
      if (!productId || !quantity || quantity <= 0) {
        return res.status(400).json({ error: "Invalid product information" });
      }

      // Fetch product from database
      const product = await Product.findById(productId);
      if (!product) {
        return res
          .status(404)
          .json({ error: `Product with ID ${productId} not found` });
      }

      // Calculate item total
      const itemTotal = product.price * quantity;
      subtotal += itemTotal;

      // Add to order items array
      orderItems.push({
        productId,
        productName: product.name,
        price: product.price,
        quantity,
        itemTotal,
      });
    }

    // Calculate shipping fee (0.5% of goods value or city fee, whichever is higher)
    const percentageFee = Math.ceil(subtotal * 0.005);
    const shippingFee = Math.ceil(percentageFee + selectedCity.fee);

    // Calculate order total
    const totalAmount = subtotal + shippingFee;

    // Create order object with all details
    orderDetails = {
      customer: {
        firstName,
        lastName,
        email,
        phone,
        city,
      },
      items: orderItems,
      pricing: {
        subtotal,
        shippingFee,
        totalAmount,
      },
      // status: "placed",
      createdAt: new Date(),
    };

    // Process M-Pesa payment
    {
      try {
        const formattedNumber = formatNumber(mpesaNumber);

        // Validate phone number
        if (formattedNumber === "Invalid Safaricom number") {
          return res.status(400).json({ error: "Invalid Number" });
        }

        // Initiate STK push with the actual order amount
        const paymentResponse = await initiateSTKPush(
          formattedNumber,
          totalAmount
        );

        // Return success response with order details and payment information
        return res.status(200).json({
          success: true,
          message: "M-Pesa payment initiated",
          orderDetails,
          paymentInfo: paymentResponse,
        });
      } catch (error) {
        console.error("M-Pesa payment failed:", error);
        return res.status(500).json({
          error: "Failed to process M-Pesa payment",
          details: error.message,
        });
      }
    }
  } catch (error) {
    console.error("Checkout error:", error);
    res.status(500).json({ error: "Failed to process checkout" });
  }
});

router.post("/mpesa/callback", async (req, res) => {
  console.log("🚀 ================== Callback Hit! ================== ");
  console.log(req.body);

  handleSTKCallback(req.body, orderDetails);

  return res
    .status(200)
    .json({ ResultCode: 0, ResultDesc: "Callback received" });
});

module.exports = router;
