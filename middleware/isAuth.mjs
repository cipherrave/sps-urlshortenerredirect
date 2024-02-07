import jwt from "jsonwebtoken";

// middleware to check if user is authenticated
async function isAuth(req, res, next) {
  try {
    //optional chaining operator
    const token = req.headers.authorization?.split("")[1];
    if (!token) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    const decoded = jwt.verify(token, "superSecret");
    console.log(decoded);
    // IMPORTANT: this is how you pass data from middleware to the next function
    req.user = decoded;
    next();
  } catch (error) {
    res.status(500).json(error);
  }
}

export default isAuth;
