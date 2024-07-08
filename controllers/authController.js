const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { Op } = require("sequelize"); // Import Sequelize operators
const { User } = require("../models");

const secretKey = process.env.JWT_SECRET;

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const user = await User.create({ name, email, password: hashedPassword });
    const token = jwt.sign({ id: user.id, email: user.email }, secretKey, {
      expiresIn: "1h",
    });

    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User Not Found" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(403).json({ message: "Invalid Credentials" });

    const token = jwt.sign({ id: user.id, email: user.email }, secretKey, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  try {
    const user = await User.findByPk(req.user.id);
    const validPassword = await bcrypt.compare(oldPassword, user.password);
    if (!validPassword)
      return res.status(403).json({ message: "Invalid Old Password" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ message: "Password Changed Successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User Not Found" });

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    // Send reset link via email (stubbed)
    const resetUrl = `http://localhost:9000/auth/reset-password/${resetToken}`;
    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL_PASS,
      subject: "Password Reset",
      text:
        `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
        `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
        `${resetUrl}\n\n` +
        `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Password reset link has been sent to your email." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const user = await User.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: { [Op.gt]: Date.now() },
      },
    });
    console.log(user, "user");
    if (!user)
      return res
        .status(400)
        .json({ message: "Password reset token is invalid or has expired." });

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();
    res.json({ message: "Password has been reset successfully." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
