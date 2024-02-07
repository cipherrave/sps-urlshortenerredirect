import express from "express";
import homePage from "./controllers/getHomePage.mjs";
import registerPage from "./controllers/getRegisterPage.mjs";
import loginPage from "./controllers/getLoginPage.mjs";
import errorPage from "./controllers/getErrorPage.mjs";
import postRegisterPage from "./controllers/postRegisterPage.mjs";

const server = express();

// initialize database
// dbInit();

// include "public" folder in server (DOESNT WORK)
server.use(express.static("public"));

// GET routings
server.get("/", homePage);
server.get("/login", loginPage);
server.get("/register", registerPage);
server.get("/*", errorPage);

// POST routings
server.post("/thankyou", postRegisterPage);
server.post("/urlshortener", isAuth,  )

// setting port used and console log the address
const PORT = 3000;
server.listen(PORT, () => {
  console.log("server is running on http://localhost:3000");
});
