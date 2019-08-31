const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access Denied!!! No token provided");

  try {
    //we get decoded payload
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    //400 code is for bad request. Client sends us wrong data
    res.status(400).send("Invalid Token!");
  }
}
module.exports = auth;
