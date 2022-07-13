const User = require("../models/User.model");
const bcryptjs = require("bcryptjs");
const { findOne } = require("../models/User.model");
const router = require("express").Router();

router.get("/signup", (req, res, next) => {
  res.render("signup");
});

router.post("/signup", (req, res, next) => {
  const hiddenpass = bcryptjs.hashSync(req.body.password);
  console.log(`passowrd hashed is: ${hiddenpass}`);
  User.create({
    email: req.body.email,
    password: hiddenpass,
  })
    .then((userfromdb) => {
      console.log(`creation sucessfull ${userfromdb}`);
      res.redirect("/");
    })
    .catch((err) => {
      console.log("err", err);
      next(err);
    });
});

router.get("/login", (req, res, next) => {
  res.render("login");
});

router.post("/login", (req, res, next) => {
  console.log("SESSION:", req.session);
  /*const hiddenpass = bcryptjs.hashSync(req.body.password);*/
  const password = req.body.password;
  const email = req.body.email;
  if (email === "" || password === "") {
    res.render("login", {
      errorMessage: "Please enter value for both Email & Password",
    });
    return;
  }
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        res.render("login", { errorMessage: "Email not found please Signup" });
        return;
      } else if (bcryptjs.compareSync(password, user.password)) {
        req.session.currentUser = user;
        res.render("index", { user: req.session.currentUser });
      } else {
        res.render("login", { errorMessage: "incorrect password" });
      }
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

module.exports = router;
