const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const jwtverify = (req, res, next) => {
  const token = req.cookies.jwtoken;
  if (token) {
    jwt.verify(token, process.env.JWT_SEC, (err, decoded) => {
      if (err) {
        res.redirect("/log-in");
      } else {
        next();
      }
    });
  } else {
    res.redirect("/log-in");
  }
};



module.exports = { jwtverify };
