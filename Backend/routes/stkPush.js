const express = require("express");
const axios = require("axios");
const base64 = require("base-64");
const moment = require("moment");
require("dotenv").config();

const router = express.Router();

const {
  MPESA_CONSUMER_KEY,
  MPESA_CONSUMER_SECRET,
  MPESA_SHORTCODE,
  MPESA_PASS_KEY,
  MPESA_CALLBACK_URL,
} = process.env;

const getAccessToken = async () => {
  try {
    const auth = base64.encode(
      `${MPESA_CONSUMER_KEY}:${MPESA_CONSUMER_SECRET}`
    );

    const response = await axios.get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      { headers: { Authorization: `Basic ${auth}` } }
    );

    return response.data.access_token;
  } catch (error) {
    console.error(
      "Error getting access token:",
      error.response?.data || error.message
    );
    throw error;
  }
};

router.post("/", async (req, res) => {
  try {
    const accessToken = await getAccessToken();
    const timestamp = moment().format("YYYYMMDDHHmmss");
    const password = base64.encode(
      `${MPESA_SHORTCODE}${MPESA_PASS_KEY}${timestamp}`
    );

    const payload = {
      BusinessShortCode: MPESA_SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: 1,
      PartyA: 254717055495,
      PartyB: MPESA_SHORTCODE,
      PhoneNumber: 254717055495,
      CallBackURL: MPESA_CALLBACK_URL,
      AccountReference: "XirionAfrica",
      TransactionDesc: "Pay For Goods",
    };

    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      payload,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    res.json(response.data);
  } catch (error) {
    console.error(
      "Error initiating STK Push:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "STK Push failed" });
  }
});

/**
 * M-Pesa STK Push Callback Handler
 * This route handles callbacks from Safaricom's M-Pesa STK Push service.
 * It processes payment notifications and handles various response scenarios.
 */
router.post("/callback", async (req, res) => {
    try {
      console.log("Received M-Pesa Callback:", JSON.stringify(req.body, null, 2));
  
      // Validate that the request body exists
      if (!req.body || typeof req.body !== 'object') {
        return res.status(400).json({ error: "Missing or invalid request body" });
      }
  
      const { Body } = req.body;
  
      // Validate the Body object and stkCallback property
      if (!Body || !Body.stkCallback) {
        return res.status(400).json({ error: "Invalid callback data structure" });
      }
  
      const callbackData = Body.stkCallback;
      const { ResultCode, ResultDesc, CallbackMetadata } = callbackData;
  
      // Log the structured callback data
      console.log("STK Push Callback Data:", JSON.stringify(callbackData, null, 2));
  
      // Process based on ResultCode
      switch (ResultCode) {
        case 0: // Success
          console.log("✅ Payment Successful");
          
          // Extract and process payment details from CallbackMetadata
          if (CallbackMetadata && CallbackMetadata.Item) {
            const paymentDetails = processCallbackMetadata(CallbackMetadata.Item);
            console.log("Payment Details:", paymentDetails);
            
            // TODO: Store transaction in database
            // await storeTransaction(paymentDetails);
            
            // TODO: Update order status
            // await updateOrderStatus(paymentDetails.MerchantRequestID, 'PAID');
            
            // TODO: Send confirmation to user
            // await sendPaymentConfirmation(paymentDetails);
          } else {
            console.warn("Payment successful but metadata missing");
          }
          break;
          
        case 1032: // Cancelled by user
          console.log("🔁 Payment Cancelled by User");
          // TODO: Update transaction status in database
          // await updateTransactionStatus(callbackData.MerchantRequestID, 'CANCELLED');
          break;
          
        case 1037: // Timeout in completing transaction
          console.log("⏱️ Payment Timed Out");
          // TODO: Handle timeout scenario
          // await handlePaymentTimeout(callbackData.MerchantRequestID);
          break;
          
        case 1: // Insufficient funds
          console.log("💸 Insufficient Funds");
          // TODO: Notify user about insufficient funds
          // await notifyInsufficientFunds(callbackData.MerchantRequestID);
          break;
          
        default: // Other failure cases
          console.log(`❌ Payment Failed: ${ResultDesc} (Code: ${ResultCode})`);
          // TODO: Log failed transaction with reason
          // await logFailedTransaction(callbackData.MerchantRequestID, ResultCode, ResultDesc);
      }
  
      // Always return 200 OK to acknowledge receipt of callback
      // Safaricom expects this response regardless of how we process the data
      return res.status(200).json({ 
        success: true, 
        message: "Callback processed successfully" 
      });
      
    } catch (error) {
      // Log the full error for debugging
      console.error("Error handling M-Pesa callback:", error);
      
      // Still return 200 OK to prevent Safaricom from retrying
      // Log the error internally but don't expose details
      return res.status(200).json({ 
        success: false, 
        message: "Callback received but processing failed" 
      });
    }
  });
  
  /**
   * Process the CallbackMetadata.Item array and convert it to a structured object
   * @param {Array} metadataItems - The CallbackMetadata.Item array from the callback
   * @returns {Object} Structured payment details object
   */
  function processCallbackMetadata(metadataItems) {
    if (!Array.isArray(metadataItems)) {
      return {};
    }
    
    const paymentDetails = {};
    
    metadataItems.forEach(item => {
      if (item.Name && item.Value !== undefined) {
        paymentDetails[item.Name] = item.Value;
      }
    });
    
    return paymentDetails;
  }
  
  /**
   * Safaricom M-Pesa STK Push Result Codes Reference:
   * 
   * 0 - Success
   * 1 - Insufficient funds
   * 1032 - Cancelled by user
   * 1037 - Timeout in completing transaction
   * 1001 - Invalid MSISDN (phone number)
   * 2001 - Wrong PIN provided
   * 1018 - Transaction already processed
   * 1019 - Transaction canceled by customer
   * 1020 - Another transaction in progress
   * 1021 - AGE_LIMIT_EXCEEDED
   * 1022 - LIMIT_RULE_VIOLATION
   * 1023 - DUPLICATE_INVOICE
   * 1024 - INVALID_ACCOUNT
   * 1025 - INVALID_AMOUNT
   * 1026 - GENERIC_ERROR
   */

module.exports = router;
