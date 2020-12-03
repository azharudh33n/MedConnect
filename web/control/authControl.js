const User = require("../models/user");
const LoginDetails = require("../models/loginDetails");
const jwt = require("jsonwebtoken");

const handleErr = (err) => {
  const errors = {
    email: "",
    password: "",
  };
  if (err.code === 11000) {
    errors.email = "Email already taken";
  }
  if (err.message.includes("password")) {
    errors.password = err.errors.password.message;
  }
  if (err.message === "inc-mail") {
    errors.email = "Invalid Email";
  }
  if (err.message === "inc-pas") {
    errors.password = "Invalid Password";
  }
  return errors;
};

const jwtGen = (id, sec) => {
  return jwt.sign({ id }, sec, {
    expiresIn: 2 * 24 * 60 * 60,
  });
};

//Method:Post
//Api:/sign-in
//Desc:Sign-in route

const sign_in_post = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const fname = req.body.fname;
  const lname = req.body.lname;
  const place = req.body.place;

  if (email && password && fname && lname && place) {
    try {
      const user = await User.create({
        fname,
        lname,
        email,
        password,
        place,
      });
      const tok = jwtGen(user._id, process.env.JWT_SEC);
      res.cookie("jwtoken", tok, {
        httpOnly: true,
        maxAge: 2 * 24 * 60 * 60 * 1000,
      });
      res.json({ user });
    } catch (err) {
      const errs = handleErr(err);
      res.json({ errs });
    }
  } else {
    res.json({ message: "some field is missing" });
  }
};

//Method:Post
//Api:/log-in
//Desc:log-in route

const log_in_post = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.findOne({ email });
    if (user) {
      if (user.password === password) {
        try {
          const login = await LoginDetails.create({
            user: user._id,
          });
          const tok = jwtGen(user._id, process.env.JWT_SEC);
          res.cookie("jwtoken", tok, {
            httpOnly: true,
            maxAge: 2 * 24 * 60 * 60 * 1000,
          });
          res.json({ user, login });
        } catch (err) {
          
          res.json({ err: "error" });
        }
      } else {
        throw Error("inc-pas");
      }
    } else {
      throw Error("inc-mail");
    }
  } catch (err) {
    const errs = handleErr(err);
    res.json({ errs });
  }
};

//Method:Get
//Api:/log-out
//Desc:log-out route

const log_out_get = async (req, res) => {
  await res.cookie("jwtoken", "", { maxAge: 1 });
  res.redirect('/log-in')
};

const log_in_get = (req,res)=>{
  res.render('signin')
}

const sign_in_get = (req,res)=>{
  res.render('signup')
}

const verify_account_get = (req, res) => {
  res.json({ method: "verify account get" });
};

module.exports = {
  sign_in_post,
  log_in_post,
  log_out_get,
  verify_account_get,
  log_in_get,
  sign_in_get
};
