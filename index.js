// VARIABLES D'ENVIRONNEMENT
require("dotenv").config();

// SERVEUR EXPRESS
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

// ROUTEUR
const router = require("./app/router");

// SESSION
const session = require("express-session");

app.use(session({
  secret: 'keyboard cat', 
  resave: true,
  saveUninitialized: true,
  cookie: { 
  }
}));

// METHODE POST
app.use(express.json());
app.use(express.urlencoded({
  extended : false
}));

// SET EJS
app.set("view engine", "ejs");
app.set("views", "./app/views");

app.use(express.static("public"));

// ROUTES
app.use(router);

// ECOUTE DU PORT
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
