const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const { validationResult } = require("express-validator");
// const colors = require("colors");
// const jwt = require("jsonwebtoken");
// const emailSenderFunction = require("../utils/emailSenderFunction");

exports.signup = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  try {
    const user = req.body;

    const userExists = await User.findOne({
      where: { u_email: user.u_email },
    });

    if (userExists) {
      return res.status(400).json({
        error: "User already Exists",
      });
    }

    const createUser = await User.create(user);

    if (createUser) {
      return res.status(201).json({
        id: createUser.u_id,
        name: createUser.u_name,
        email: createUser.u_email,
        token: generateToken(user.id),
      });
    }
  } catch (err) {
    return res.status(400).json({
      error: err.errors[0].message,
    });
  }
};

exports.signin = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  try {
    const { u_email, password } = req.body;

    const userExists = await User.findOne({
      where: { u_email },
    });

    if (!userExists) {
      return res.status(400).json({
        error:
          "EMAIL does not exists! If you are new user consider Registering Yourself First.",
      });
    }

    const isMatch = await User.matchPass(
      password,
      userExists.password
    );

    if (!isMatch) {
      return res.status(401).json({
        error: "Email and Password do not match",
      });
    }

    const {
      u_id: id,
      u_name: name,
      u_email: email,
      u_avatar: avatar,
      u_bio: bio,
    } = userExists.dataValues;

    return res.status(200).json({
      id,
      name,
      email,
      avatar,
      bio,
      token: await generateToken(id),
    });
  } catch (err) {
    return res.status(404).json({
      error: `Error: ${err}`,
    });
  }
};

exports.userProfile = (req, res) => {
  try {
    let user = req.profile;

    user.password = undefined;
    return res.status(200).json(user);
  } catch (err) {
    return res.status(400).json({
      error: `ERROR: ${err}`,
    });
  }
};

exports.updateUserProfile = async (req, res) => {
  const user = req.profile;

  const updates = Object.keys(req.body);

  const allowedUpdates = ["u_name", "u_bio"];
  const isvalidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isvalidOperation) {
    return res
      .status(400)
      .send({ error: "Invalid updates" });
  }

  try {
    updates.forEach(
      (update) => (user[update] = req.body[update])
    );
    await user.save();

    return res.status(200).json({
      message: "User Data Updated",
      user,
    });
  } catch (err) {
    return res.status(400).json({
      error: `Error: ${err}`,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const u_id = req.profile.u_id;

    await User.destroy({ where: { u_id } });

    res.status(200).json({
      message: "USER no longer exists",
    });
  } catch (err) {
    return res.status(404).json({
      error: `Error: ${err}`,
    });
  }
};

// exports.forgotPassword = async (req, res) => {
//   const { u_email } = req.body;

//   const userExists = await User.findOne({
//     where: { u_email },
//   });

//   if (!userExists) {
//     return res.status(400).json({
//       error:
//         "User with that Email Address does not exists.",
//     });
//   }

//   // Generate Token which will be sent to mail & valid only for 10mins
//   const token = jwt.sign(
//     { id: userExists.u_id },
//     process.env.SECRET,
//     { expiresIn: "10m" }
//   );
//   try {
//     /* ****************
//       Mail Format
//       ******************* */
//     const emailSubject =
//       "Password Reset link for TPF Technologies.";

//     const emailFormat = `
//         <h1 style="text-align: center;color: RED;">
//           TPF TECHNOLOGIES
//         </h1><hr/>
//         <h3>Please use the following link to reset your password.</h3>
//         <p>${process.env.CLIENT_URL}/auth/password/reset/${token}</p><hr />
//         <p>This email may contain sensetive information</p>
//         <p>${process.env.CLIENT_URL}</p>
//       `;

//     // Email Configuration
//     emailSenderFunction(u_email, emailSubject, emailFormat);

//     return userExists.update(
//       { resetPasswordLink: token },
//       (err, success) => {
//         if (err) {
//           return res.status(400).json({
//             error:
//               "Database connection error on user password forgot requiest.",
//           });
//         } else {
//           return res.status(200).json({
//             message: `Email has been sent to ${email}. Follow the instruction to reset your password.`,
//           });
//         }
//       }
//     );
//   } catch (err) {
//     res.status(400).json({
//       error: err.message,
//     });
//   }
// };

// exports.resetPassword = async (req, res) => {
//   //
// };
