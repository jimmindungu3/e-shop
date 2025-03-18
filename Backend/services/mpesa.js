const axios = require("axios");
const base64 = require("base-64");
const moment = require("moment");
require("dotenv").config();

const {
  MPESA_CONSUMER_KEY,
  MPESA_CONSUMER_SECRET,
  MPESA_SHORTCODE,
  MPESA_PASS_KEY,
  MPESA_CALLBACK_URL,
} = process.env;

// Gets an access token from the M-Pesa API
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
    throw new Error(`Failed to get Mpesa access token: ${error.message}`);
  }
};

/**
 * Initiates an STK push request to the customer's phone
 * @param {string} phoneNumber - Customer's phone number (format: 254XXXXXXXXX)
 * @param {number} amount - Amount to charge
 * @returns {Object} - Payment request details
 */
const initiateSTKPush = async (phoneNumber, amount) => {
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
      PartyA: phoneNumber,
      PartyB: MPESA_SHORTCODE,
      PhoneNumber: phoneNumber,
      CallBackURL: MPESA_CALLBACK_URL,
      AccountReference: "XirionAfrica",
      TransactionDesc: "Shop at Xirion Africa",
    };

    console.log("Sending STK push request:", JSON.stringify(payload, null, 2));

    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      payload,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

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

/**
 * Processes callback data from M-Pesa
 * @param {Array} metadataItems - Array of callback metadata items
 * @returns {Object} - Processed payment details
 */
const processCallbackMetadata = (metadataItems) => {
  if (!Array.isArray(metadataItems)) return {};

  return metadataItems.reduce((acc, item) => {
    if (item.Name && item.Value !== undefined) {
      acc[item.Name] = item.Value;
    }
    return acc;
  }, {});
};

/**
 * Handles the M-Pesa callback
 * @param {Object} callbackData - Raw callback data from M-Pesa
 * @returns {Object} - Processed payment result
 */
const handleSTKCallback = (callbackData) => {
  try {
    if (!callbackData?.Body?.stkCallback) {
      return {
        success: false,
        message: "Invalid callback data",
        data: null,
      };
    }

    const { ResultCode, ResultDesc, CallbackMetadata } =
      callbackData.Body.stkCallback;
    const paymentDetails = CallbackMetadata?.Item
      ? processCallbackMetadata(CallbackMetadata.Item)
      : {};

    return {
      success: ResultCode === 0,
      message: ResultDesc,
      data:
        ResultCode === 0
          ? {
              amount: paymentDetails.Amount,
              mpesaReceiptNumber: paymentDetails.MpesaReceiptNumber,
              transactionDate: paymentDetails.TransactionDate,
              phoneNumber: paymentDetails.PhoneNumber,
            }
          : null,
    };
  } catch (error) {
    console.error("Error processing M-Pesa callback:", error);
    return {
      success: false,
      message: `Error processing callback: ${error.message}`,
      data: null,
    };
  }
};

module.exports = {
  initiateSTKPush,
  handleSTKCallback,
};
