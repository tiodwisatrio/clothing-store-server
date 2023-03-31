import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";

export const Login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const response = await Admin.findOne({
      where: {
        username: username,
        password: password,
      },
    });
    response
      ? res.status(200).json({ msg: "Login Success" })
      : res.status(404).json({ msg: "Login Failed" });
  } catch (error) {
    console.log(error.message);
  }
};

// export const Register = async (req, res) => {
//   const { username, password, email } = req.body;
//   try {
//     const response = await Admin.create({
//       email: email,
//       username: username,
//       password: password,
//     });
//     response && res.status(201).json({ msg: "Register Success" });
//   } catch (error) {
//     console.log(error.message);
//   }
// };
