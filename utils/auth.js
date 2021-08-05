import jwt from "jsonwebtoken";

const key = process.env.JWT_SECRET_KEY;

export const generateToken = (data) => {
  return jwt.sign(data, key);
};

export const verifyToken = (token) => {
  return jwt.verify(token, key);
};
