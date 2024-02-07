import express from "express";
import homePage from "./controllers/homePage.mjs";
import registerPage from "./controllers/registerPage.mjs";
import loginPage from "./controllers/loginPage.mjs";
import errorPage from "./controllers/errorPage.mjs";

const server = express();

// include "public" folder in server (DOESNT WORK)
// app.use(express.static(path.join(__dirname, "public")));

// initialize database
// dbInit();

// setting controllers script for website navigation
server.get("/", homePage);
server.get("/login", loginPage);
server.get("/register", registerPage);
server.get("/*", errorPage);

// setting port used and console log the address
const PORT = 3000;
server.listen(PORT, () => {
  console.log("server is running on http://localhost:3000");
});
