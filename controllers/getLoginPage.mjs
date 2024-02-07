import fs from "fs";

const loginHtmlContent = fs.readFileSync("./pages/login.html", "utf-8");

function loginPage(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.send(loginHtmlContent);
}

export default loginPage;
