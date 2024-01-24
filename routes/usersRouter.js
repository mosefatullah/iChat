const express = require("express");
const router = express.Router();

const {
 getUsers,
 addUser,
 removeUser,
} = require("../controllers/usersController");
const decorateHtmlResponse = require("../middlewares/decorateHtmlResponse");
const avatarUpload = require("../middlewares/avaterUpload");
const {
 addUserValidators,
 addUserValidationHandler,
} = require("../middlewares/userValidators");

router.get("/", decorateHtmlResponse("Users"), getUsers);
router.post(
 "/",
 avatarUpload,
 addUserValidators,
 addUserValidationHandler,
 addUser
);
router.delete("/:id", removeUser);

module.exports = router;
