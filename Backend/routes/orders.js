const express = require("express");
const Product = require("../models/product");
const router = express.Router();

const { initiateSTKPush, handleSTKCallback } = require("../services/mpesa");

// Cities in Kenya with their shipping fees
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

/**
 * Formats a phone number to the required M-Pesa format (254XXXXXXXXX)
 * @param {string} phone - Phone number to format
 * @returns {string} - Formatted phone number
 */
function formatPhoneNumber(phone) {
  // Remove any non-digit characters
  let cleaned = phone.replace(/\D/g, "");

  // Validate and format the number
  if (cleaned.startsWith("07") || cleaned.startsWith("01")) {
    return "254" + cleaned.slice(1);
  } else if (cleaned.startsWith("7") || cleaned.startsWith("1")) {
    return "254" + cleaned;
  } else if (cleaned.startsWith("2547") || cleaned.startsWith("2541")) {
    return cleaned;
  } else if (cleaned.startsWith("+2547") || cleaned.startsWith("+2541")) {
    return cleaned.slice(1);
  } else {
    return "Invalid Safaricom number";
  }
}

// Handle checkout process
router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, city, mpesaNumber, order } = req.body;

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
    const orderDetails = {
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
      paymentMethod: mpesaNumber ? "mpesa" : "card",
      status: "pending",
      createdAt: new Date(),
    };

    // Here you would typically save this order to your database
    // const savedOrder = await Order.create(orderDetails);

    // Process M-Pesa payment if mpesaNumber is provided
    if (mpesaNumber) {
      try {
        // Format phone number (ensure it starts with 254)
        const formattedNumber = formatPhoneNumber(mpesaNumber);
        
        // Validate phone number
        if (formattedNumber === "Invalid Safaricom number") {
          return res.status(400).json({ error: "Invalid Safaricom number provided" });
        }

        // Initiate STK push with the actual order amount
        const paymentResponse = await initiateSTKPush(formattedNumber, totalAmount);

        // Return success response with order details and payment information
        return res.status(200).json({
          success: true,
          message: "M-Pesa payment initiated",
          orderDetails,
          paymentInfo: paymentResponse,
        });
      } catch (error) {
        console.error("M-Pesa payment failed:", error);
        return res
          .status(500)
          .json({ error: "Failed to process M-Pesa payment", details: error.message });
      }
    } else {
      // Handle non-M-Pesa payment methods
      return res.status(200).json({
        success: true,
        message: "Order created successfully",
        orderDetails,
      });
    }
  } catch (error) {
    console.error("Checkout error:", error);
    res.status(500).json({ error: "Failed to process checkout" });
  }
});

// M-Pesa callback endpoint
// Enhanced logging middleware specifically for M-Pesa callbacks
router.post("/mpesa/callback", (req, res) => {
    try {
      console.log("=================== M-PESA CALLBACK RECEIVED ===================");
      console.log("HEADERS:", JSON.stringify(req.headers, null, 2));
      console.log("BODY:", JSON.stringify(req.body, null, 2));
      console.log("================================================================");
      
      // Process the callback data
      const result = handleSTKCallback(req.body);
      
      if (result.success) {
        console.log("✅ PAYMENT SUCCESSFUL:", JSON.stringify(result.data, null, 2));
        
        // TODO: Update order status in the database
        // 1. Find the order by CheckoutRequestID
        // 2. Update status to "paid"
        // 3. Save payment details
        // 4. Send confirmation email to customer
      } else {
        console.log("❌ PAYMENT FAILED:", result.message);
        
        // TODO: Handle failed payment
        // 1. Update order status to "payment_failed"
        // 2. Send notification to customer
      }
      
      // Always return 200 to M-Pesa regardless of our internal processing
      return res.status(200).json({ ResultCode: 0, ResultDesc: "Callback received" });
    } catch (error) {
      console.error("ERROR HANDLING M-PESA CALLBACK:", error);
      
      // Always return 200 to M-Pesa regardless of our internal processing
      return res.status(200).json({ ResultCode: 0, ResultDesc: "Callback received" });
    }
  });

module.exports = router;