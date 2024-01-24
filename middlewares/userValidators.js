const { check, validationResult } = require("express-validator");
const createError = require("http-errors");
const path = require("path");
const { unlink } = require("fs");

const User = require("../models/People");

const addUserValidators = [
 check("name")
  .isLength({ min: 3 })
  .withMessage("Name is required (at least 3 characters long)")
  .isAlpha("en-US", { ignore: " -" })
  .withMessage("Name mustn't contain anything other than alphabet and space")
  .trim(),

 check("username")
  .isLength({ min: 3 })
  .withMessage("Username is required (at least 3 characters long)")
  .isAlpha("en-US", { ignore: "_" })
  .withMessage(
   "Username mustn't contain anything other than alphabet and underscore"
  )
  .trim()
  .custom(async (value) => {
   try {
    const user = await User.findOne({ username: value });
    if (user) {
     throw createError("Username already in use");
    }
   } catch (err) {
    throw createError(err);
   }
  }),

 check("email")
  .isEmail()
  .withMessage("Email is not valid")
  .trim()
  .custom(async (value) => {
   try {
    const user = await User.findOne({ email: value });
    if (user) {
     throw createError("Email already in use");
    }
   } catch (err) {
    throw createError(err);
   }
  }),

 check("password")
  .isStrongPassword()
  .withMessage(
   "Password should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol"
  )
  .isLength({ min: 8 })
  .withMessage("Password should be at least 8 characters long"),

 check("mobile")
  .isMobilePhone("bn-BD", {
   strictMode: true,
  })
  .withMessage("Mobile number must be a valid Bangladeshi mobile number"),
];

const addUserValidationHandler = (req, res, next) => {
 const errors = validationResult(req);
 const mappedErrors = errors.mapped();

 if (Object.keys(mappedErrors).length === 0) {
  next();
 } else {
  if (req.files.length > 0) {
   const { filename } = req.files[0];
   unlink(
    path.join(__dirname, `/../public/uploads/avatars/${filename}`),
    (err) => {
     if (err) console.log(err);
    }
   );
  }
  res.status(500).json({
   errors: mappedErrors,
  });
 }
};

module.exports = {
 addUserValidators,
 addUserValidationHandler,
};
