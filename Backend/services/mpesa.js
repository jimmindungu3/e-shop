const axios = require("axios");
require("dotenv").config();

const {
  MPESA_CONSUMER_KEY,
  MPESA_CONSUMER_SECRET,
  MPESA_SHORTCODE,
  MPESA_PASS_KEY,
  MPESA_CALLBACK_URL,
} = process.env;

const getAccessToken = async () => {
  try {
    const credentials = `${MPESA_CONSUMER_KEY}:${MPESA_CONSUMER_SECRET}`;
    const encodedCredentials = Buffer.from(credentials).toString("base64");

    const response = await axios.get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      { headers: { Authorization: `Basic ${encodedCredentials}` } }
    );

    return response.data.access_token;
  } catch (error) {
    console.error(
      "Error getting access token:",
      error.response?.data || error.message
    );
    throw new Error(`Failed to get Mpesa access token: ${error.message}`);
  }
};

const initiateSTKPush = async (phoneNumber, amount) => {
  try {
    const accessToken = await getAccessToken();
    const date = new Date();
    const timestamp =
      date.getFullYear() +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      ("0" + date.getDate()).slice(-2) +
      ("0" + date.getHours()).slice(-2) +
      ("0" + date.getMinutes()).slice(-2) +
      ("0" + date.getSeconds()).slice(-2);
    const password = new Buffer.from(
      `${MPESA_SHORTCODE}${MPESA_PASS_KEY}${timestamp}`
    ).toString("base64");

    const payload = {
      BusinessShortCode: MPESA_SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: 1,
      PartyA: phoneNumber,
      PartyB: MPESA_SHORTCODE,
      PhoneNumber: phoneNumber,
      CallBackURL: MPESA_CALLBACK_URL,
      AccountReference: "XirionAfrica",
      TransactionDesc: "Shop at Xirion Africa",
    };

    // console.log("Initiating STK Push:", JSON.stringify(payload, null, 2));

    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      payload,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    // console.log(response);
    // Return only the necessary data
    return {
      CheckoutRequestID: response.data.CheckoutRequestID,
      ResponseCode: response.data.ResponseCode,
      ResponseDescription: response.data.ResponseDescription,
      CustomerMessage: response.data.CustomerMessage,
    };
  } catch (error) {
    console.error(
      "Error initiating STK Push:",
      error.response?.data || error.message
    );
    throw new Error(`Failed to initiate M-Pesa payment: ${error.message}`);
  }
};

const handleSTKCallback = async (callbackData) => {
  try {
    console.log("M-Pesa callback received:", JSON.stringify(callbackData, null, 2));

    const { ResultCode, ResultDesc, CallbackMetadata } = callbackData.Body.stkCallback;
    
    // Log the result
    console.log(`M-Pesa Result: Code=${ResultCode}, Desc=${ResultDesc}`);
    
    if (ResultCode === 0) {
      // Payment successful
      // Extract payment details from CallbackMetadata
      const paymentDetails = {};
      
      if (CallbackMetadata && CallbackMetadata.Item) {
        CallbackMetadata.Item.forEach(item => {
          if (item.Name === "MpesaReceiptNumber") paymentDetails.receiptNumber = item.Value;
          if (item.Name === "TransactionDate") paymentDetails.transactionDate = item.Value;
          if (item.Name === "PhoneNumber") paymentDetails.phoneNumber = item.Value;
          if (item.Name === "Amount") paymentDetails.amount = item.Value;
        });
      }
      
      console.log("Payment details:", paymentDetails);
      
      // Here you would update your order with payment details
      // Example: await Order.findOneAndUpdate({ checkoutRequestId: callbackData.Body.stkCallback.CheckoutRequestID }, 
      //          { status: 'paid', paymentDetails: paymentDetails }, { new: true });
      
      return { success: true, paymentDetails };
    } else {
      // Payment failed
      console.error(`Payment failed: ${ResultDesc}`);
      
      // Here you would update your order status
      // Example: await Order.findOneAndUpdate({ checkoutRequestId: callbackData.Body.stkCallback.CheckoutRequestID },
      //          { status: 'failed', failureReason: ResultDesc }, { new: true });
      
      return { success: false, message: ResultDesc };
    }
  } catch (error) {
    console.error("Error processing M-Pesa callback:", error);
    return { success: false, message: error.message };
  }
};

module.exports = {
  initiateSTKPush,
  handleSTKCallback,
};
