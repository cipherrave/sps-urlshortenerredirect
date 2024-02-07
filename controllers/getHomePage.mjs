import fs from "fs";

const homeHtmlContent = fs.readFileSync("./pages/home.html", "utf-8");

function homePage(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.send(homeHtmlContent);
}

export default homePage;
