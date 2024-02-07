import fs from "fs";

const registerHtmlContent = fs.readFileSync("./pages/register.html", "utf-8");

function registerPage(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.send(registerHtmlContent);
}

export default registerPage;
