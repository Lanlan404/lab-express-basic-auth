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
  const hiddenpass = bcryptjs.hashSync(req.body.password);
  const email = req.body.email;
  User.findOne({ email }).then().catch();
});

module.exports = router;
