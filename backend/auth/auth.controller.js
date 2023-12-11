const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db/db");
const { User, Employee, Dept_manager } = require("../db/db");
const secrets = require("../../secrets.json");
const jwtSecret = secrets.jwtSecret;
const { OAuth2Client } = require("google-auth-library");
const GOOGLE_CLIENT_ID = secrets.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

const getUserInfo = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findByPk(userId, {
      include: [
        {
          model: Employee,
          as: "employee",
          attributes: ["emp_no", "first_name", "last_name"],
        },
      ],
    });

    if (!user || !user.employee) {
      return res.status(404).send({ message: "User not found." });
    }

    const isManager = await Dept_manager.findOne({
      where: { emp_no: user.employee.emp_no },
    });

    res.json({
      name: `${user.employee.first_name} ${user.employee.last_name}`,
      emp_no: user.employee.emp_no,
      isManager: !!isManager,
      email: user.email,
      googleEmail: user.googleEmail,
    });
  } catch (error) {
    console.error("Error retrieving user information:", error);
    res.status(500).send({ message: "Error retrieving user information." });
  }
};

const register = async (req, res) => {
  try {
    const employeeId = parseInt(req.body.employeeId);
    console.log("Raw employee_id:", req.body.employeeId);

    if (isNaN(employeeId)) {
      return res.status(400).send({ message: "Invalid employee ID." });
    }

    const existingUserWithEmployeeId = await User.findOne({
      where: { employee_id: employeeId },
    });
    if (existingUserWithEmployeeId) {
      return res
        .status(400)
        .send({ message: "Employee ID is already linked to a User." });
    }

    const employeeExists = await Employee.findByPk(employeeId);
    if (!employeeExists) {
      return res.status(404).send({ message: "Employee ID does not exist." });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      employee_id: employeeId,
    });

    res.status(201).send(user);
  } catch (error) {
    console.error(error);
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

const authenticateWithGoogle = async (token) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });
    return ticket.getPayload();
  } catch (error) {
    console.error("Error verifying Google token: ", error);
    throw new Error("Invalid Google token");
  }
};

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

    const jwtToken = jwt.sign({ userId: user.userId }, jwtSecret, {
      expiresIn: "24h",
    });

    res.status(200).json({ success: true, user: user, token: jwtToken });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const isGoogleLinked = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  try {
    const user = await User.findByPk(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isLinked = user.googleId != null;
    const googleEmail = isLinked ? user.googleEmail : null;

    res.status(200).json({ isLinked, email: googleEmail });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const unlinkGoogleAccount = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const user = await User.findByPk(req.user.userId);
  user.googleId = null;
  user.googleEmail = null;
  await user.save();

  res.status(200).json({ message: "Google account unlinked successfully" });
};

const linkGoogleAccount = async (req, res) => {
  const { token } = req.body;

  if (!req.user) {
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

    const user = await User.findByPk(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.googleId = payload["sub"];
    user.googleEmail = payload["email"];
    await user.save();

    res.status(200).json({
      success: true,
      message: "Google account linked successfully.",
      email: user.googleEmail,
    });
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

const loginWithGoogle = async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const user = await User.findOne({ where: { googleId: payload["sub"] } });

    if (!user) {
      return res.status(401).json({
        message:
          "No account linked with this Google ID. Please register or link your account.",
      });
    }

    const sessionToken = jwt.sign({ userId: user.id }, jwtSecret, {
      expiresIn: "24h",
    });

    return res.status(200).json({ token: sessionToken });
  } catch (error) {
    console.error("Error logging in with Google: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const userId = req.user.userId;

    const user = await User.findByPk(userId);

    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect old password" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: "Password successfully changed" });
  } catch (error) {
    console.error("Error changing password: ", error);
    res.status(500).json({ message: "Error changing password" });
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
  loginWithGoogle,
  getUserInfo,
  changePassword,
};
