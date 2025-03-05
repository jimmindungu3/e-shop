const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const router = express.Router();

const {sendVerificationCode, generateVerificationCode} = require("../services/sendCode");

// POST /api/register - Create new user route
router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, password, confirmPassword } = req.body;
    if (!firstName || !lastName || !email || !phoneNumber || !password || !confirmPassword) {
      return res.status(400).json({ error: "All fields are required." });
    }

    if (password !== confirmPassword)
      return res.status(400).json({ error: "Passwords don't match." });

    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User with that email already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate verification code
    const verificationCode = generateVerificationCode();

    const newUser = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      verificationCode,
      password: hashedPassword,
    });

    await newUser.save();

    // Send verification email only if user is saved successfully
    await sendVerificationCode(email, verificationCode);

    res.status(201).json({ message: "User registered successfully. Verification code sent." });
  } catch (error) {
    res.status(500).json({ error });
  }
});


// POST /api/signin - User sign-in route with JWT
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ error: "Email and password are required." });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials." });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ error: "Invalid credentials." });

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    const fullName = `${user.firstName} ${user.lastName}`;

    res.status(200).json({
      message: "User signed in successfully.",
      token,
      fullName,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error." });
  }
});

router.put("/user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;

    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found." });
    }

    res
      .status(200)
      .json({ message: "User updated successfully.", user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: "Server error.", details: error.message });
  }
});

// DELETE /api/user/:email - Delete user by email
router.delete("/user/:email", async (req, res) => {
  try {
    const { email } = req.params;

    // Find and delete the user
    const deletedUser = await User.findOneAndDelete({ email });

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Server error.", details: error.message });
  }
});


module.exports = router;
