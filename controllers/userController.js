import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
const generateToken = require("../utils/generateToken")
import { validationResult } from "express-validator";

exports.signup = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  try {
    const userExists = await User.findOne({ email });

    console.log(userExists);

    if (userExists) {
      return res.status(400).json({
        error: "User already Exists",
      });
    }

    const user = await User.create(req.body);

    console.log(user);

    if (user) {
      return res.status(201).json({
        id: user.u_id,
        name: user.u_name,
        token: generateToken(user.id),
      });
    }
  } catch (err) {
    return res.status(400).json({
      error: err.errors[0].message,
    });
  }
};

// exports.signin = async (req, res) => {
//   const errors = validationResult(req);

//   if (!errors.isEmpty()) {
//     return res.status(422).json({
//       error: errors.array()[0].msg,
//     });
//   }

//   try {
//     const { username, password } = req.body;

//     const user = await User.findOne({
//       where: { username },
//     });

//     if (!user) {
//       return res.status(400).json({
//         error:
//           "USERNAME does not exists! If you are new user consider login first",
//       });
//     }

//     const isMatch = await User.matchPass(
//       req.body.password,
//       user.dataValues.password
//     );

//     if (!isMatch) {
//       return res.status(401).json({
//         error: "Username and Password do not match",
//       });
//     }

//     // CREATE TOKEN
//     const token = jwt.sign(
//       { id: user.id },
//       process.env.SECRET
//     );

//     // PUT TOKEN IN COOKIE
//     res.cookie("token", token, {
//       expire: new Date() + 9999,
//     });

//     // SEND RESPONSE TO FRONT END
//     const { id, email, phoneNumber } = user;
//     return res.json({
//       token,
//       user: { id, username, email, phoneNumber },
//     });
//   } catch (err) {
//     return res.status(404).json({
//       error: `Error: ${err}`,
//     });
//   }
// };

// exports.signout = (req, res) => {
//   res.clearCookie("token");
//   res.json({
//     message: "User Signout Successfully",
//   });
// };

// exports.userProfile = (req, res) => {
//   try {
//     let user = req.profile;

//     user.password = undefined;
//     user.token = undefined;
//     user.createdAt = undefined;
//     user.updatedAt = undefined;
//     return res.status(200).json(user);
//   } catch (err) {
//     return res.status(400).json({
//       error: `ERROR: ${err}`,
//     });
//   }
// };

// exports.updateUserProfile = async (req, res) => {
//   const user = req.profile;
//   const updates = Object.keys(req.body);

//   const allowedUpdates = ["username", "password"];
//   const isvalidOperation = updates.every((update) =>
//     allowedUpdates.includes(update)
//   );

//   if (!isvalidOperation) {
//     return res
//       .status(400)
//       .send({ error: "Invalid updates" });
//   }

//   try {
//     updates.forEach(
//       (update) => (user[update] = req.body[update])
//     );
//     await user.save();

//     return res.status(200).json({
//       message: "User Data Updated",
//       user: user,
//     });
//   } catch (err) {
//     return res.status(400).json({
//       error: `Error: ${err}`,
//     });
//   }
// };

// exports.deleteUser = async (req, res) => {
//   try {
//     const user = req.profile;
//     await User.destroy({ where: { id: user.id } });
//     await sendCancellationEmail(user.email, user.username);

//     res.status(200).json({
//       message: "USER no longer exists",
//     });
//   } catch (err) {
//     return res.status(404).json({
//       error: `Error: ${err}`,
//     });
//   }
// };
