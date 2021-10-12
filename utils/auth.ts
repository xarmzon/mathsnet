import jwt from "jsonwebtoken";
import { compare, hash } from "bcryptjs";
import _ from "lodash";
import Cookies from "cookie";
import validator from "validator";
import { CONSTANTS } from "./constants";

const key = process.env.JWT_SECRET_KEY;
export interface IDataError {
  type: string;
  msg: string;
}
export interface IRegError {
  name: string;
  msg: string;
}
export const generateToken = (data) => {
  return jwt.sign(data, key, { expiresIn: "7d", subject: "User Access Token" });
};

export const verifyToken = (token) => {
  return jwt.verify(token, key);
};

export const validateRegForm = async (formData, cPass = false) => {
  const errors: IRegError[] = [];

  const { fullName, username, email, password, cPassword } = formData;
  const validFullname = validateFullName(
    typeof fullName === "object" ? fullName.value : fullName
  );
  if (!validFullname)
    errors.push({ name: "fullName", msg: CONSTANTS.MESSAGES.FORM.FULL_NAME });

  const validUsername = validateUsername(
    typeof username === "object" ? username.value : username
  );
  if (!validUsername)
    errors.push({ name: "username", msg: CONSTANTS.MESSAGES.FORM.USERNAME });

  const validEmail = validateEmail(
    typeof email === "object" ? email.value : email
  );
  if (!validEmail)
    errors.push({ name: "email", msg: CONSTANTS.MESSAGES.FORM.EMAIL });

  const validPassword = validateRegPassword(
    typeof password === "object" ? password.value : password
  );
  if (!validPassword)
    errors.push({ name: "password", msg: CONSTANTS.MESSAGES.FORM.PASSWORD });

  if (cPass) {
    const p = typeof password === "object" ? password.value : password;
    const cp = typeof cPassword === "object" ? cPassword.value : cPassword;
    const validcPass = validateConfirmPassword(p, cp);
    if (!validcPass)
      errors.push({
        name: "cPassword",
        msg: CONSTANTS.MESSAGES.FORM.CPASSWORD,
      });
  }

  return errors;
};

export const validateEmail = (email) => {
  return validator.isEmail(email);
};

export const validateFullName = (fullname) => {
  return /^[a-zA-Z][a-zA-Z\s]{6,50}$/.test(fullname);
};

export const validateUsername = (username) => {
  const maxLen = CONSTANTS.ENTITY.USERNAME_MAX;
  const minLen = CONSTANTS.ENTITY.USERNAME_MIN;
  const reg = new RegExp(`^\\w{${minLen},${maxLen}}$`);
  return reg.test(username);
};

export const validateRegPassword = (password) => {
  const minLength = CONSTANTS.ENTITY.PASSWORD_MIN;
  return validator.isStrongPassword(password, { minLength, minSymbols: 0 });
};

export const validateConfirmPassword = (password, confirmPassword) => {
  return password === confirmPassword;
};

export const validateUserPassword = async (password, hashPassword) =>
  await compare(password, hashPassword);

export const hashPassword = async (password) =>
  await hash(password, CONSTANTS.HASH_SALT_ROUND);

export const prepareUser = (user) => {
  return {
    username: user.username,
    email: user.email,
    fullName: user.fullName,
    userType: user.userType,
    dpUrl: user.dp_url,
  };
};

export const isValidUser = (cookie) => {
  const token = Cookies.parse(cookie || "");
  //console.log(token);
  return !!token;
};
