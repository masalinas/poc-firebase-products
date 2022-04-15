const functions = require("firebase-functions");
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const app = express();

var permisos = require("./permissions.json");

admin.initializeApp({
  credential: admin.credential.cert(permisos),
  databaseURL: "https://product-3a5fb.firebaseio.com"
});

const db = admin.firestore();

app.use(cors({ origin: true }));

function output(code, input){
    var today = new Date();
    var date = today.getFullYear()+'-'
    +(today.getMonth()+1)+'-'
    +today.getDate()+"|"
    +today.getHours() + ":" 
    + today.getMinutes() + ":" 
    + today.getSeconds();
    
    if(code === "200") return {
        message : "Process completed successfully",
        date : date,
        result : input
    }

    if(code === "201") return {
        message : "Entity created successfully",
        date : date,
        result : input
    }

    if(code === "500") return {
        message: "Internal server error",
        date : date,
        result : input
    }

    return {
        message: "Internal server error",
        date : date,
        result : input
    }
}

app.post('/api/products', (req, res) => {
    (async () => {
        try {
          await db.collection('products').doc('/' + req.body.id + '/')
              .create({
                  code: req.body.code,
                  description: req.body.description,
                  price: req.body.price,
                  active: req.body.active
              });
            
          return res.status(200).send(output("200", "Product created successfully"));
        } catch (error) {
          console.log(error);
          return res.status(500).send(output("500", error));
        }
    })();
});

app.get("/api/products", async (req, res) => {
  try{
      
      let query = db.collection("products");
      
      const querySnapshot = await query.get();
      let docs = querySnapshot.docs;

      const response = docs.map((doc) => ({
          id: doc.id,
          code: doc.data().code,
          description: doc.data().description,
          price: doc.data().price,
          active: doc.data().active
      }));

      return res.status(200).json(output("200", response));
  } catch (error) {
      return res.status(500).json(output("500", error));
  }
})

app.put("/api/products/:id", async (req, res) => {
  try {      
      const document = db.collection("products").doc(req.params.id);
      
      await document.update({
          code: req.body.code,
          description: req.body.description,
          price: req.body.price,
          active: req.body.active,
      });
      
      return res.status(200).json(output("200", "Product updated successfully"));
  } catch (error) {
    return res.status(500).json(output("500", error));
  }
});

app.delete("/api/products/:id", async (req, res) => {
  try {
      const doc = db.collection("products").doc(req.params.id);
      
      await doc.delete();
      return res.status(200).json(output("200", "Product deleted successfully"));
  } catch (error) {
    return res.status(500).send(output("500", error));
  }
});

exports.app = functions.https.onRequest(app);
