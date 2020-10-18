const express = require("express");
const {
  check,
} = require("express-validator");
const router = express.Router();

const control = require("../controllers/user");
const {
  getUserById,
  isSignedIn,
  isAuthenticated,
} = require("../middlewares/userAuth");

router.post(
  "/user/signup",
  [
    check("username", "You must provide a username")
      .not()
      .isEmpty(),
    check(
      "username",
      "Username should be atleast 4 char"
    ).isLength({ min: 4 }),
    check("email", "Email is required").not().isEmpty(),
    check(
      "email",
      "Provide Email in proper format"
    ).isEmail(),
    check(
      "password",
      "Password should be atleast 8 char"
    ).isLength({ min: 8 }),
  ],
  control.signup
);

router.get("/login", control.login);

router.post(
  "/user/signin",
  [
    check("username", "You must provide a username")
      .not()
      .isEmpty(),
    check(
      "username",
      "Username should be atleast 4 char"
    ).isLength({ min: 4 }),
    check(
      "password",
      "Password should be atleast 8 char"
    ).isLength({ min: 8 }),
  ],
  control.signin
);

router.param("userId", getUserById);

router.get("/user/signout", control.signout);

router.get(
  "/user/me/:userId",
  isSignedIn,
  isAuthenticated,
  control.userProfile
);

router.patch(
  "/user/me/:userId",
  isSignedIn,
  isAuthenticated,
  control.updateUserProfile
);

router.delete(
  "/user/deleteUser/:userId",
  isSignedIn,
  isAuthenticated,
  control.deleteUser
);

module.exports = router;
