import { Sequelize, DataTypes } from "sequelize";
import { dsn } from "../utils/dbUtils.js";

const sequelize = new Sequelize(dsn);

export const usersModel = sequelize.define(
  "Users",
  {
    username: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    password_hash: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);

export const createUsersTable = async () => {
  try {
    await usersModel.sync();
  } catch (error) {
    console.error("Error creating Users table:", error);
  }
};

export const lookupUser = async (username) => {
  try {
    const user = await usersModel.findOne({
      where: { username },
    });
    return user;
  } catch (error) {
    console.error("Error looking up user:", error);
    throw error;
  }
}
export const addUser = async (username, password_hash) => {
  try {
    const user = await usersModel.create({
      username,
      password_hash,
    });
    return user;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};

export const countUsers = async () => {
  try {
    const count = await usersModel.count();
    return count;
  } catch (error) {
    console.error("Error counting users:", error);
    throw error;
  }
};

export const updateUser = async (username, password_hash) => {
  try {
    const user = await usersModel.update(
      { password_hash },
      { where: { username } }
    );
    return user;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const deleteUser = async (username) => {
  try {
    const result = await usersModel.destroy({
      where: { username },
    });
    return result;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
