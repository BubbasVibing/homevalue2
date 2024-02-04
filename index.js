// import axios from "axios";
// import qs from "qs";
import express from "express";
import Scraper from "./scraper.js";
import bodyParser from "body-parser";
import cors from "cors";
import path, { dirname } from "path";
import { fileURLToPath } from "url";


global.__dirname = () => dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = 8000

app.disable("x-powered-by");

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.static(path.join(__dirname(), "views")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors({ origin: "*" }));

const scraper = new Scraper();

app.get("/home_value", async (req, res) => {
  res.render("index.ejs");
});

app.post("/home_value", async (req, res) => {
  if (!req.body.address)
    return res.json({ status: 401, message: "Please enter the address." });
  let response;

  try {
    response = await scraper.scrapeLocationData(req.body.address);
  } catch (err) {
    response = err;
  }
  res.json({ status: 200, response });
});
// app.get("/initiate", async (req, res) => {
//   const options = {
//     requestType: "code",
//     redirectUri: "http://localhost:8000/oauth/callback",
//     clientId: "65a459d3b8b91156bf207c64-lre1ma2j",
//     scopes: [
//       "contacts.readonly",
//       "conversations.readonly",
//       "users.write",
//       "users.readonly",
//     ],
//   };

//   return res.redirect(
//     `https://marketplace.gohighlevel.com/oauth/chooselocation?response_type=${
//       options.requestType
//     }&redirect_uri=${options.redirectUri}&client_id=${
//       options.clientId
//     }&scope=${options.scopes.join(" ")}`
//   );
// });
// app.get("/refresh", async (req, res) => {
//   const data = qs.stringify({
//     client_id: "65a459d3b8b91156bf207c64-lre1ma2j",
//     client_secret: "e5bfa666-3280-484c-9071-6d7f1dece24e",
//     grant_type: "refresh_token",
//     refresh_token: req.query.token,
//     user_type: "Location",
//     redirect_uri: "http://localhost:8000/oauth/callback",
//   });

//   const config = {
//     method: "post",
//     maxBodyLength: Infinity,
//     url: "https://services.leadconnectorhq.com/oauth/token",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     data: data,
//   };

//   const response = await axios.request(config).catch((err) => {});

//   return res.json({ data: response?.data });
// });
// app.get("/oauth/callback", async (req, res) => {
//   const data = qs.stringify({
//     client_id: "65a459d3b8b91156bf207c64-lre1ma2j",
//     client_secret: "e5bfa666-3280-484c-9071-6d7f1dece24e",
//     grant_type: "authorization_code",
//     code: req.query.code,
//     user_type: "Location",
//     redirect_uri: "http://localhost:8000/oauth/callback",
//   });

//   const config = {
//     method: "post",
//     maxBodyLength: Infinity,
//     url: "https://services.leadconnectorhq.com/oauth/token",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     data: data,
//   };

//   const response = await axios.request(config).catch((err) => {});

//   return res.json({ data: response?.data });
// });

// app.post("/create-user", async (req, res) => {
//   // Check if the required data is present in the request body
//   if (!req.body.access_token || !req.body.companyId || !req.body.locationId) {
//     return res.status(400).json({
//       status: 400,
//       message: "Please provide access_token, companyId, and locationId.",
//     });
//   }

//   // Define the data for creating a user using values from req.body
//   const userData = {
//     companyId: req.body.companyId,
//     firstName: req.body.firstName, 
//     email: req.body.email, 
//     phone: req.body.phone, 
//     type: "account",
//     role: "admin",
//     locationIds: [req.body.locationId],
//     permissions: {
//       "campaignsEnabled": true,
//       "campaignsReadOnly": false,
//       "contactsEnabled": true,
//       "workflowsEnabled": true,
//       "workflowsReadOnly": true,
//       "triggersEnabled": true,
//       "funnelsEnabled": true,
//       "websitesEnabled": false,
//       "opportunitiesEnabled": true,
//       "dashboardStatsEnabled": true,
//       "bulkRequestsEnabled": true,
//       "appointmentsEnabled": true,
//       "reviewsEnabled": true,
//       "onlineListingsEnabled": true,
//       "phoneCallEnabled": true,
//       "conversationsEnabled": true,
//       "assignedDataOnly": false,
//       "adwordsReportingEnabled": false,
//       "membershipEnabled": false,
//       "facebookAdsReportingEnabled": false,
//       "attributionsReportingEnabled": false,
//       "settingsEnabled": true,
//       "tagsEnabled": true,
//       "leadValueEnabled": true,
//       "marketingEnabled": true,
//       "agentReportingEnabled": true,
//       "botService": false,
//       "socialPlanner": true,
//       "bloggingEnabled": true,
//       "invoiceEnabled": true,
//       "affiliateManagerEnabled": true,
//       "contentAiEnabled": true,
//       "refundsEnabled": true,
//       "recordPaymentEnabled": true,
//       "cancelSubscriptionEnabled": true,
//       "paymentsEnabled": true
//     },
//   };

//   // Set the headers with the access_token and other required headers
//   const headers = {
//     Accept: "application/json",
//     Authorization: `Bearer ${req.body.access_token}`,
//     "Content-Type": "application/json",
//     Version: "2021-07-28",
//   };

//   // Make the POST request to create the user
//   try {
//     const response = await axios.post(
//       "https://services.leadconnectorhq.com/users/",
//       userData,
//       { headers }
//     );

//     // Handle the response from the API
//     res.status(200).json({
//       status: 200,
//       message: "User created successfully.",
//       data: response.data,
//     });
//   } catch (error) {
//     // Handle errors
//     res.status(500).json({
//       status: 500,
//       message: "An error occurred while creating the user.",
//       error: error.message,
//     });
//   }
// });
app.listen(PORT, () => console.log(`listening on port ${PORT}`));