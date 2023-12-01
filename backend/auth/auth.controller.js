const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../db");
const secrets = require("../secrets.json");
const jwtSecret = secrets.jwtSecret;
const { OAuth2Client } = require("google-auth-library");
const GOOGLE_CLIENT_ID = require("../secrets.json").GOOGLE_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

const register = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res
        .status(401)
        .send({ message: "Incorrect username or password" });
    }
    const token = jwt.sign({ userId: user.id }, jwtSecret, {
      expiresIn: "24h",
    });
    res.send({ token });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

// Authenticate Google token
const authenticateWithGoogle = async (token) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID, // Use the GOOGLE_CLIENT_ID from your secrets
    });
    return ticket.getPayload(); // Contains user info from Google
  } catch (error) {
    console.error("Error verifying Google token: ", error);
    throw new Error("Invalid Google token");
  }
};

// Function to handle login with Google
const handleLoginWithGoogle = async (req, res) => {
  const { token } = req.body;

  try {
    const payload = await authenticateWithGoogle(token);

    const user = await User.findOne({ where: { googleId: payload["sub"] } });
    if (!user) {
      return res.status(404).json({
        message: "Google account not linked. Please link your account first.",
      });
    }

    // Generate a token for the user
    const jwtToken = jwt.sign({ userId: user.id }, jwtSecret, {
      expiresIn: "24h",
    });

    res.status(200).json({ success: true, user: user, token: jwtToken });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Function to check if Google account is linked
const isGoogleLinked = async (req, res) => {
  // Assuming req.user is your authenticated user
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const user = await User.findByPk(req.user.id);
  res.status(200).json({ isLinked: !!user.googleId });
};

// Function to unlink Google account
const unlinkGoogleAccount = async (req, res) => {
  // Assuming req.user is your authenticated user
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const user = await User.findByPk(req.user.id);
  user.googleId = null;
  await user.save();

  res.status(200).json({ message: "Google account unlinked successfully" });
};

// Function to link new Google account
const linkGoogleAccount = async (req, res) => {
  const { token } = req.body;

  if (!req.isAuthenticated || !req.user) {
    return res
      .status(401)
      .json({ message: "You must be signed in to link an account." });
  }

  try {
    const payload = await authenticateWithGoogle(token);

    const existingUser = await User.findOne({
      where: { googleId: payload["sub"] },
    });
    if (existingUser) {
      return res.status(400).json({
        message: "This Google account is already linked to another account.",
      });
    }

    const user = await User.findByPk(req.user.id);
    user.googleId = payload["sub"];
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Google account linked successfully." });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const verifyGoogleToken = async (req, res) => {
  const { token } = req.body;
  try {
    const payload = await authenticateWithGoogle(token);
    res.status(200).json({ success: true, payload });
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid Google token" });
  }
};

module.exports = {
  register,
  login,
  handleLoginWithGoogle,
  linkGoogleAccount,
  isGoogleLinked,
  unlinkGoogleAccount,
  verifyGoogleToken,
};
