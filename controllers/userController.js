const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const { validationResult } = require("express-validator");
const colors = require("colors");

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
          "USERNAME does not exists! If you are new user consider Registering Yourself First.",
      });
    }

    const isMatch = await User.matchPass(
      password,
      userExists.dataValues.password
    );

    if (!isMatch) {
      return res.status(401).json({
        error: "Username and Password do not match",
      });
    }

    const {
      id,
      name,
      email,
      avatar,
      bio,
      createdAt,
    } = userExists.dataValues;

    return res.status(200).json({
      id,
      name,
      email,
      avatar,
      bio,
      createdAt,
      token: generateToken(id),
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
