# fe-places
Places is the publicly available map for searching for businesses such as restaurants, offices, theaters, hotels, etc.

## Installation
You can run the app by cloning it to your local machine and running ```npm install && npm start``` in the project folder.
Requirements:  
1. Node.js is of version >=15.12.0
Check your Node.js version using the following command ``` node -v ```
2. Npm is of version =>7.6.3
Check your Npm version using the following command ``` npm -v ```

## FE Architecture
The Frontend app is built using VanillaJS bundled using Snowpack.  
LESS is used as a superset of CSS (compiled by Snowpack's snowpack-plugin-less).  
Snowpack plugins are used for processing of LESS and minification of JS (using PostCSS, cssnano, autoprefixer, terser).  

## BE Architecture
The Backend is built using Google Cloud Functions for data processing and Firebase Firestore for data storage.  
Currently only one cloud function is implemented and most of the processing takes place on FE. // TODO  
https://us-central1-lamia-application.cloudfunctions.net/getAllPlaces  

---

## Contact
Roman Zakharenkov  
+358452502330  
roman.zakharenkov@gmail.com  
