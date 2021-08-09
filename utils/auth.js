import jwt from "jsonwebtoken";
import { compare, hash } from "bcryptjs";

import validator from "validator";
import { CONSTANTS } from "./constants";
const key = process.env.JWT_SECRET_KEY;

export const generateToken = (data) => {
  return jwt.sign(data, key);
};

export const verifyToken = (token) => {
  return jwt.verify(token, key);
};

export const validateEmail = (email) => {
  const valid = validator.isEmail(email);

  if (!valid) return {};

  return {};
};

export const validateRegForm = (formData) => {
  const { fullName, username, email, password, cPassword } = formData;
  const fn = validateFullName(fullName);
  console.log(fn);
};

export const validateFullName = (fullname) => {
  const valid = /^[a-zA-Z][a-zA-Z\s]{6,50}$/.test(fullname);

  if (!valid) return { msg: "Invalid Full Name", type: "fullName" };

  return "";
};

export const validateUsername = (username) => {
  const maxLen = CONSTANTS.ENTITY.USERNAME_MAX;
  const minLen = CONSTANTS.ENTITY.USERNAME_MIN;
  const valid = /^\w{6,15}/.test(username);

  if (!valid) return {};

  return {};
};

export const validateRegPassword = (password) => {
  const valid = validator.isStrongPassword(password, {});

  if (!valid) return {};

  return {};
};

export const validateConfirmPassword = (password, confirmPassword) => {
  const valid = password === confirmPassword;

  if (!valid) return {};

  return {};
};

export const validUserPassword = async (password, hashPassword) =>
  await compare(password, hashPassword);

export const hashPassword = async (password) =>
  await hash(password, CONSTANTS.HASH_SALT_ROUND);
