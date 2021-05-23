const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const router = new express.Router();

const auth = require("../middlewares/auth");
const User = require("../models/User");

const cookieParser = require("cookie-parser");

router.use(cookieParser());

// main path is /user

// Register a user

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, cpassword } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({ name, email, passwordHash });
    await user.save();
    res.status(201).send("Registration Successfull");
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ msg: "Please fill all the fields" });
    }
    const theuser = await User.findOne({ email });
    // console.log(theuser);

    if (!theuser) {
      res.status(401).json({ msg: "invalid credentials" });
    }

    const passMatch = await bcrypt.compare(password, theuser.passwordHash);

    if (!passMatch) {
      res.status(401).json({ msg: "invalid credentials" });
    }
    const token = jwt.sign(
      {
        user: theuser._id,
      },
      process.env.KEY
    );
    // console.log(token);
    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send();
  } catch (error) {
    console.log(error);
    res.status(401).send("invalid credentials");
  }
});

// getting the logged user
router.get("/get", auth, async (req, res) => {
  try {
    const _id = req.user;
    const auser = await User.findById(_id);
    res.status(200).json(auser);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

// logout

router.get("/logout", (req, res) => {
  res.clearCookie("token").send();
});

// update user
router.patch("/update", auth, async (req, res) => {
  try {
    //   console.log(req.user);
    const _id = req.user;
    const upuser = await User.findByIdAndUpdate(_id, req.body, { new: true });
    res.status(200).json(upuser);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

// to check user loggedin or not

router.get("/loggedIn", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.json(false);
    } else {
      res.json(true);
    }
  } catch (error) {
    console.log(error);
  }
});

// get all users

// router.get("/", async (req, res) => {
//   try {
//     const allUsers = await User.find();
//     res.status(200).json(allUsers);
//   } catch (error) {
//     console.log(error);
//     res.status(400).json(error);
//   }
// });

// get a user

// router.get("/:id", async (req, res) => {
//   try {
//     const _id = req.params.id;
//     const auser = await User.findById(_id);
//     res.status(200).json(auser);
//   } catch (error) {
//     console.log(error);
//     res.status(400).json(error);
//   }
// });

module.exports = router;
