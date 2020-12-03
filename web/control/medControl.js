const LoginDetails = require("../models/loginDetails");
const User = require("../models/user");

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const home_get = (req, res) => {
  res.render("home");
};

const account_get = async (req, res) => {
  const token = req.cookies.jwtoken;
  if (token) {
    jwt.verify(token, process.env.JWT_SEC, (err, decoded) => {
      if (err) {
        res.redirect("/log-in");
      } else {
        const { id } = decoded;
        User.findById(id)
          .then((data) => {
            LoginDetails.find({ user: id }).sort({ createdAt: -1 })
              .then((result) => {
                const name = `${data.fname} ${data.lname}`
                const place= data.place
                res.render("account",{name,place,result});
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((errs) => {
            console.log(errs);
          });

        
      }
    });
  } else {
    res.redirect("/log-in");
  }
};

module.exports = {
  home_get,
  account_get,
};
