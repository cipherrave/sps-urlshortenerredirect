import fs from "fs";

const postRegisterHtmlContent = fs.readFileSync(
  "./pages/post-register.html",
  "utf-8"
);

function postRegisterPage(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.send(loginHtmlContent);
}

export default postRegisterPage;
