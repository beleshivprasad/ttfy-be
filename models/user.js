const { sequelize, DataTypes } = require("../config/db");
const bcrypt = require("bcrypt");

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      },
    },
  }
);

User.prototype.hasValidPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

User.sync({ force: true })
  .then(() => console.log("User Table Sync Success"))
  .catch((err) => console.log("User Table Sync Failed", err));

module.exports = User;
