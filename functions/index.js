const functions = require("firebase-functions");

const admin = require("firebase-admin");
admin.initializeApp();


exports.getAllPlaces = functions.https.onRequest(async (req, res) => {
  // Get all places from database
  const databaseResult = await admin.firestore().collection("places").get();

  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Access-Control-Allow-Origin, " +
  "Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  res.status(200);
  res.json({result: databaseResult.docs.map((doc) => doc.data())});
});
