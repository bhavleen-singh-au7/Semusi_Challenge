const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

const {
  signup,
  userProfile,
  deleteUser,
} = require("../controllers/userController");

const {
  isAuth,
  isSignedIn,
  getUserById,
} = require("../middlewares/authMiddleware");

router.param("userId", getUserById);

router.post(
  "/",
  [
    check(
      "u_name",
      "You must provide a username with atleast 4 char"
    )
      .not()
      .isEmpty()
      .isLength({ min: 4 }),
    check("u_email", "Email is required with proper format")
      .not()
      .isEmpty()
      .isEmail(),
    check(
      "password",
      "Password should be atleast 6 char"
    ).isLength({ min: 6 }),
  ],
  signup
);

// router.post(
//   "/signin",
//   [
//     check("username", "You must provide a username")
//       .not()
//       .isEmpty(),
//     check(
//       "username",
//       "Username should be atleast 4 char"
//     ).isLength({ min: 4 }),
//     check(
//       "password",
//       "Password should be atleast 8 char"
//     ).isLength({ min: 8 }),
//   ],
//   control.signin
// );

// router.param("userId", getUserById);

router.get("/:userId", isSignedIn, isAuth, userProfile);

// router.patch(
//   "/user/me/:userId",
//   isSignedIn,
//   isAuthenticated,
//   control.updateUserProfile
// );

router.delete(
  "/deleteUser/:userId",
  isSignedIn,
  isAuth,
  deleteUser
);

module.exports = router;
