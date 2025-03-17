const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  client: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
  },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true, min: 1 },
    },
  ],
  payment: {
    method: { type: String, enum: ["Mpesa", "Credit Card", "Cash on Delivery"], required: true },
    transactionId: { type: String },
    status: { type: String, enum: ["Pending", "Completed", "Failed"], default: "Pending" },
  },
  delivery: {
    status: { type: String, enum: ["Pending", "Shipped", "Delivered", "Cancelled"], default: "Pending" },
    trackingNumber: { type: String },
  },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
