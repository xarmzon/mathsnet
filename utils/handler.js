export const errorHandler = (err) => {
  console.log(err);
  return res.status(501).json({ msg: CONSTANT.MESSAGES.UNKNOWN_ERROR });
};
