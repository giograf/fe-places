const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();


exports.getAllPlaces = functions.https.onRequest(async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Access-Control-Allow-Origin, " +
  "Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

  // Get all places from database
  const databaseResult = await admin.firestore().collection("places").get();
  res.status(200);
  res.json({result: databaseResult.docs.map((doc) => doc.data())});
});

exports.removePlace = functions.https.onRequest(async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Access-Control-Allow-Origin, " +
  "Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  // Get all places from database
  const itemId = req.body.itemId;
  console.log(itemId);
  const databaseCollection = admin.firestore().collection("places");
  console.log(databaseCollection);

  res.status(404);

  const placesQuery = await databaseCollection.where("id", "==", itemId).get();
  placesQuery.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      doc.ref.delete();
      console.log(`Location with ID of ${itemId} was deleted`);
      res.status(200);
    });
  });
});
