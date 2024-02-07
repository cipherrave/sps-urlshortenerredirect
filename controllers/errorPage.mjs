import fs from "fs";

const errorHtmlContent = fs.readFileSync("./pages/error.html", "utf-8");

function errorPage(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.send(errorHtmlContent);
}

export default errorPage;
