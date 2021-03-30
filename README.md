# fe-places
Places is the publicly available map for searching for businesses such as restaurants, offices, theaters, hotels, etc.

## Installation
You can run the app by cloning it to your local machine and running ```npm start``` in the project folder.

## FE Architecture
The Frontend app is built using VanillaJS bundled using Snowpack.
LESS is used as a superset of CSS.
Snowpack plugins are used for processing of CSS (using PostCSS, cssnano, autoprefixer).

## BE Architecture
The Backend is built using Google Cloud Functions for data processing and Firebase Firestore for data storage.
Currently only one cloud function is implemented:
https://us-central1-lamia-application.cloudfunctions.net/getAllPlaces

---

## Contact
Roman Zakharenkov
+358452502330
roman.zakharenkov@gmail.com