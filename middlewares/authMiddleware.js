const User = require("../models/User");
const expressJwt = require("express-jwt");
const colors = require("colors");

exports.getUserById = async (req, res, next, id) => {
  try {
    const user = await User.findOne({
      where: { u_id: id },
    });

    if (!user) {
      return res.status(400).json({
        error: "No user was found in DB",
      });
    }

    req.profile = user;

    next();
  } catch (err) {
    return res.status(400).json({
      error: "Something Wrong In Auth Middleware",
    });
  }
};

exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

exports.isAuth = (req, res, next) => {

  let checker =
    req.profile &&
    req.auth &&
    req.profile.u_id == req.auth.id;

  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED",
    });
  }

  next();
};
