const mongoose = require("mongoose");

const peopleSchema = mongoose.Schema(
 {
  name: {
   type: String,
   required: true,
   trim: true,
  },
  username: {
   type: String,
   trim: true,
   lowercase: true,
   required: true,
   unique: true,
  },
  email: {
   type: String,
   required: true,
   trim: true,
   lowercase: true,
   unique: true,
  },
  mobile: {
   type: String,
   required: true,
  },
  password: {
   type: String,
   required: true,
  },
  avatar: {
   type: String,
  },
  role: {
   type: String,
   enum: ["admin", "user"],
   default: "user",
  },
 },
 {
  timestamps: true,
 }
);

const People = mongoose.model("People", peopleSchema);

module.exports = People;
