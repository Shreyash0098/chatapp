const User = require("../model/auth");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "shreyash.p@brilworkss.com",
    pass: "fbmo zpyz sdbq afmo",
  },
});

exports.signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { password, email, displayName, uid, profilePic } = req.body;
    // console.log(req.body, "bodyyyyyyyyy");
    if (!password || !email || !displayName) {
      return res.status(404).json({ message: "please enter required fields" });
    }
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.json({ message: "Email already used" });
    }
    const hashedpsw = await bcrypt.hash(password, 12);

    const user = new User({
      uid,
      displayName,
      email,
      profilePic,
      password: hashedpsw,
    });

    const result = await user.save();
    res.status(200).json({
      message: "user Signed up",
      user: result,
    });
    await transport.sendMail(
      {
        from: "shreyash.p@brilworkss.com",
        to: email,
        subject: "Signup succeded",
        text: "You have successfully signup in chatapp, now you are incharge of the app.",
      },
      function (err, info) {
        if (err) {
          console.log(err);
        } else {
          console.log("Email Sent successfully", email);
        }
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Try again after some time" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let logedinUser;
    if (!password || !email) {
      return res.status(404).json({ message: "please enter required fields" });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "User with this email not found" });
    }
    logedinUser = user;
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      res.status(401).json({ message: "Wrong password" });
    }
    const token = jwt.sign(
      { email: logedinUser.email, userId: logedinUser._id.toString() },
      "ifyouknowyouknow",
      { expiresIn: "1h" }
    );
    res.status(200).json({
      token: token,
      user: logedinUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUsers = async (req, res) => {
  try {
    let matchFilter = {
      _id: { $ne: req.userId },
    };
    if (req.query.search) {
      matchFilter = {
        ...matchFilter,
        $or: [
          { displayName: { $regex: req.query.search, $options: "i" } },
          // { email: { $regex: req.query.search, $options: "i" } },
        ],
      };
    }
    const users = await User.find(matchFilter);
    res.send(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.postResetPSW = async (req, res) => {
  try {
    const { email } = req.body.email;
    crypto.rendomBytes(32, async (err, buffer) => {
      if (err) {
        res.json({ message: err });
      }
      const token = buffer.toString();
      const user = await User.findOne({ email });
      if (!user) {
        res.json({ message: "No account with that email found" });
      }
      user.resetToken = token;
      user.resetTokenExp = Date.now() + 3600000;
      await user.save();
      // await
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
