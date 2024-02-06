const express = require("express");
const getHomePage = require("./controllers/getHomePage");
const getAboutPage = require("./controllers/getAboutPage");
const getErrorPage = require("./controllers/getErrorPage");
const path = require("path");

const server = express();

// include "public" folder in server
server.use(express.static(path.join(__dirname, "public")));

// setting controllers script for website navigation
server.get("/", getHomePage);
server.get("/about", getAboutPage);
server.get("/*", getErrorPage);

// setting port used and console log the address
const PORT = 5050;
server.listen(PORT, function () {
  console.log("server is running at http://localhost:5050");
});
