const md5 = require("md5");
const { User } = require("../models/index");
const bcrypt = require("bcrypt");

module.exports = class UserController {
  static async register(req, res) {
    const { username, name, password, confpass } = req.body;

    if (!username || !name || !password || !confpass) {
      res
        .status(422)
        .json({ message: "send user, name, password and confpass" });
    }

    //confirm password and conf pass match

    if (password !== confpass) {
      res
        .status(422)
        .json({ message: "Password and conf Password does not match" });
    }

    // check if user exists

    const userExists = await User.findOne({ where: { user: username } });

    if (userExists) {
      res.status(422).json({ message: "User already exists" });
      return;
    }

    // create password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = md5(salt + password);

    const myuser = new User({
      user: username,
      name,
      password: passwordHash,
      salt,
    });

    try {
      const newUser = await myuser.save();
      res.status(201).json({ message: "User saved successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error: We cannot save the user on database" });
      return;
    }
  }

  static async login(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
      res
        .status(421)
        .json({ message: "Username and Password cannot be empty" });
      return;
    }

    const user = await User.findOne({ where: { user: username } });

    if (!user) {
      res.status(422).json({ message: "User or passord incorrect" });
      return;
    }

    const passwordHashed = md5(user.salt + password);

    if (user.password !== passwordHashed) {
      res.status(422).json({ message: "User or passord incorrect 2" });
      return;
    }

    res.status(201).json({ message: `You are logged in ${user.name}` });
  }
};
