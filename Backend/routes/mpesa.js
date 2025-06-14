const express = require("express");
const axios = require("axios");
const moment = require("moment");
const base66 = require("base-64"); 

const router = express.Router();

// M-Pesa API credentials
const consumerKey = "uGCv8Z7hgMpNclAznTOJFxz8opDwJBT20JGTHweXPXrGQyRH";
const consumerSecret = "mXh7duSY1rdYwsT2WPgejOAD1yqinZkqb7wdZjdE74GMLTzowDHye63jYRrp225k";
const shortcode = "174379";
const passkey = "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";

// 🔐 Access Token Generator
const getAccessToken = async () => {
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");
  console.log("🔐 Getting access token with credentials:", consumerKey, consumerSecret);

  try {
    const res = await axios.get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: { Authorization: `Basic ${auth}` },
      }
    );

    console.log("✅ Access token acquired:", res.data.access_token);
    return res.data.access_token;
  } catch (error) {
    console.error("❌ Error acquiring access token:");
    if (error.response) {
      console.error(JSON.stringify(error.response.data, null, 2));
    } else {
      console.error(error.message);
    }
    throw new Error("Failed to acquire M-Pesa access token."); 
  }
};


router.post("/stk-push", async (req, res) => {
  try {
    const { phone, amount } = req.body;

    console.log("📥 Incoming STK Push request:", { phone, amount });

    if (!phone || !amount) {
      console.warn("⚠️ Missing phone or amount");
      return res.status(400).json({ message: "Phone and amount are required" });
    }

    const token = await getAccessToken();
    const timestamp = moment().format("YYYYMMDDHHmmss");

    const password = base66.encode(shortcode + passkey + timestamp); 

    const stkPayload = {
      BusinessShortCode: shortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phone,
      PartyB: shortcode,
      PhoneNumber: phone,
      CallBackURL: "https://4f65-197-248-74-74.ngrok-free.app/api/callback",
      AccountReference: "Test123", 
      TransactionDesc: "Testing Daraja STK Push",
    };

    console.log("📤 Sending STK Push request to Safaricom with payload:");
    console.log(JSON.stringify(stkPayload, null, 2));

    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      stkPayload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Safaricom STK Push response:");
    console.log(JSON.stringify(response.data, null, 2));

    res.status(200).json({
      message: "STK push initiated",
      data: response.data,
    });
  } catch (err) {
    console.error("❌ STK Push Error:");
    if (err.response) {
      console.error(JSON.stringify(err.response.data, null, 2)); 
    } else {
      console.error(err.message);
    }

    res.status(500).json({
      message: "Something went wrong during STK push",
      error: err.response?.data || err.message,
    });
  }
});

// ✅ M-Pesa Callback Endpoint
router.post("/callback", (req, res) => {
  const data = req.body;

  console.log("📥 ✅ MPESA CALLBACK RECEIVED:");
  console.log(JSON.stringify(data, null, 2));
  res.status(200).send("Callback received");
});


module.exports = router;