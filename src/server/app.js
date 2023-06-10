require("dotenv").config();

const express = require("express");
const mongodb = require("mongodb");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const MongoClient = mongodb.MongoClient;

const user = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;
const dbUrl = process.env.MONGO_DB_URL;

const url = `mongodb+srv://${user}:${password}@${dbUrl}?retryWrites=true&w=majority`;

app.use(bodyParser.json());

// Replace "src/pages" with the directory that contains your static files
app.use(express.static(path.join(__dirname, "../client/pages")));

// Add a route for the root URL ("/") to serve your index.html file
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/pages/index.html"));
});

app.post("/submit-form", (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myobj = {
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
    };
    dbo.collection("users").insertOne(myobj, function (err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });
  res.json({ message: "Data received" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
