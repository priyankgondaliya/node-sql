const jwt = require("jsonwebtoken");
const secretKey = "your-secret-key";

module.exports = (req, res, next) => {
  const token =
    req.header("Authorization") && req.header("Authorization").split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access Token Required" });

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid Token" });
    req.user = user;
    next();
  });
};
