const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../db");
const secrets = require("../secrets.json");
const jwtSecret = secrets.jwtSecret;

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

module.exports = { register, login };
