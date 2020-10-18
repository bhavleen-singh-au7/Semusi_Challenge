const sequelize = require("../db/postgres");
const { Sequelize, Model } = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class User extends Model {}

const UserSchema = {
  id: {
    type: Sequelize.DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    isEmail: true,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
};

User.init(UserSchema, { sequelize, tableName: "users" });

// Encrypt password using bcrypt
User.beforeSave(async function (user) {
  const hashedPass = await bcrypt.hash(user.password, 10);
  user.password = hashedPass;

  // CREATE TOKEN
  const token = jwt.sign(
    { id: user.dataValues.id },
    process.env.SECRET
  );

  user.dataValues.token = token;
});

// Match user entered password to hashed password in DB
User.matchPass = async function (enteredPass, hashedPass) {
  return await bcrypt.compare(enteredPass, hashedPass);
};

module.exports = User;
