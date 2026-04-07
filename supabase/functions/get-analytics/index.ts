import express from "express";
import dotenv from "dotenv";
import { JWT } from "google-auth-library";

dotenv.config();

const app = express();
app.use(express.json());

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
};

const client = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
  scopes: ["https://www.googleapis.com/auth/analytics.readonly"],
});

// 🔐 Get Access Token
async function getAccessToken() {
  const tokens = await client.authorize();
  return tokens.access_token;
}

// 📊 Analytics API Call
async function fetchAnalytics() {
  const access_token = await getAccessToken();
  const PROPERTY_ID = process.env.GA_PROPERTY_ID;

  // ---------------- REALTIME ----------------
  const realtimeRes = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/properties/${PROPERTY_ID}:runRealtimeReport`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        metrics: [{ name: "activeUsers" }],
        dimensions: [{ name: "country" }],
      }),
    }
  );

  const realtime = await realtimeRes.json();

  // ---------------- HISTORY ----------------
  const historyRes = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/properties/${PROPERTY_ID}:runReport`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
        dimensions: [{ name: "date" }],
        metrics: [
          { name: "sessions" },
          { name: "activeUsers" },
          { name: "eventCount" },
        ],
        orderBys: [
          { dimension: { dimensionName: "date" }, desc: false },
        ],
      }),
    }
  );

  const history = await historyRes.json();

  // ---------------- DEVICE ----------------
  const deviceRes = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/properties/${PROPERTY_ID}:runReport`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
        dimensions: [{ name: "deviceCategory" }],
        metrics: [{ name: "sessions" }],
      }),
    }
  );

  const devices = await deviceRes.json();

  return { realtime, history, devices };
}

// 🌐 API Route
app.get("/analytics", async (req, res) => {
  try {
    const data = await fetchAnalytics();
    res.set(corsHeaders).json(data);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// 🚀 Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});