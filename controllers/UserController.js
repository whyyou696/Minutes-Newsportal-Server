const { User } = require("../models/index")
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

module.exports = class UserController {
  static async register(req, res, next) {
    try {
      let { username, email, password, role, phoneNumber, address } = req.body;
      //console.log(req.body)
      let userCreate = await User.create({
        username,
        email,
        password,
        role,
        phoneNumber,
        address,
      });
      res.status(201).json({
        id: userCreate.id,
        username: userCreate.username,
        email: userCreate.email,
        phoneNumber: userCreate.phoneNumber,
        address: userCreate.address,
      });
    } catch (error) {
      //   console.log(error);
      //   if (
      //     error.name === "SequelizeValidationError" ||
      //     error.name === "SequelizeUniqueConstraintError"
      //   ) {
      //     res.status(400).json({ message: error.errors[0].message });
      //   } else {
      //     res.status(500).json({ message: "Internal Server Error" });
      //   }
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      console.log(req.body);
      //validasi email & password yang diberikan
      let { email, password } = req.body;
      if (!email || !password) {
        throw { name: "ValidationError" };
      }

      //cek apakah user ada di database
      let user = await User.findOne({ where: { email } });
      if (!user) {
        throw { name: "InvalidUser" };
      }

      //cek apakah password benar
      let isPasswordValid = comparePassword(password, user.password);
      if (!isPasswordValid) {
        throw { name: "InvalidUser" };
      }
      //generate token
      let access_token = signToken({ id: user.id });

      //kirim response token ke client
      res.status(200).json({ access_token });
    } catch (error) {
    //   console.log(error);
    //   if (error.name === "ValidationError") {
    //     res.status(400).json({ message: "Email and Password is Required" });
    //   } else if (error.name === "InvalidUser") {
    //     res.status(401).json({ message: "Invalid Email or Password" });
    //   } else {
    //     res.status(500).json({ message: "Internal Server Error" });
    //   }
    next(error)
    }
  }
};
