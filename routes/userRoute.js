const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

const {
  signup,
  signin,
  userProfile,
  updateUserProfile,
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

router.post(
  "/signin",
  [
    check(
      "u_email",
      "Email is required with proper format."
    )
      .not()
      .isEmpty()
      .isEmail(),
    check(
      "password",
      "Password should be atleast 6 char"
    ).isLength({ min: 6 }),
  ],
  signin
);

router.get("/:userId", isSignedIn, isAuth, userProfile);

router.patch(
  "/update/:userId",
  isSignedIn,
  isAuth,
  updateUserProfile
);

router.delete(
  "/deleteUser/:userId",
  isSignedIn,
  isAuth,
  deleteUser
);

module.exports = router;
