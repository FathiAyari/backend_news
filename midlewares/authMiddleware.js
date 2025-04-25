const jwt = require("jsonwebtoken");
const userModel = require("../models/userSchema");

const requireAuthUser = (req, res, next) => {
  const token = req.cookies.jwt_token_9antra ||
                (req.headers.authorization && req.headers.authorization.split(" ")[1]);

  if (token) {
    jwt.verify(token, 'net secret pfe', async (err, decodedToken) => {
      if (err) {
        console.log("Invalid token", err.message);
        req.session.user = null;
        return res.status(401).json({ message: "Token invalid" });
      } else {
        req.session.user = await userModel.findById(decodedToken.id);
        next();
      }
    });
  } else {
    req.session.user = null;
    return res.status(401).json({ message: "No token provided" });
  }
};

module.exports = { requireAuthUser };